import { apiClient } from './api';
import { OrderService } from './orderService';
import { WebhookLogger } from '../utils/webhookLogger';
import type {
  SepayWebhookRequest,
  SepayWebhookResponse,
  PaymentStatus,
  OrderPaymentUpdate,
  SepayQRRequest,
  SepayQRResponse,
  SepayErrorResponse,
  BankInfoResponse,
  PaymentStatusCheckResponse,
  SepayOrderPaymentInfo
} from '@/types/payment';

/**
 * Service để xử lý SePay webhook và thanh toán
 */
export class SepayService {
  /**
   * Xử lý webhook từ SePay
   * @param webhookData - Dữ liệu webhook từ SePay
   * @returns Promise<SepayWebhookResponse>
   */
  static async handleWebhook(webhookData: SepayWebhookRequest): Promise<SepayWebhookResponse> {
    const startTime = Date.now();
    const logId = WebhookLogger.logWebhookReceived(webhookData);
    
    try {
      // Validate webhook data
      this.validateWebhookData(webhookData);
      
      // Extract order ID from reference code
      const orderId = this.extractOrderId(webhookData.referenceCode);
      
      if (!orderId) {
        throw new Error('Không thể trích xuất mã đơn hàng từ reference code');
      }
      
      // Validate payment amount with order
      const isAmountValid = await OrderService.validatePaymentAmount(
        orderId, 
        webhookData.transferAmount
      );
      
      if (!isAmountValid) {
        console.warn(`⚠️ Số tiền thanh toán không khớp cho đơn hàng ${orderId}`);
        // Vẫn tiếp tục xử lý nhưng ghi log cảnh báo
      }
      
      // Update order payment status using OrderService
      const response = await OrderService.updateOrderPaymentFromWebhook(webhookData);
      
      // If payment is successful, send confirmation email
      if (response.success && webhookData.transferType === 'in') {
        const paymentUpdate: OrderPaymentUpdate = {
          orderId,
          paymentStatus: 'completed',
          transactionId: webhookData.id.toString(),
          gateway: webhookData.gateway,
          amount: webhookData.transferAmount,
          transactionDate: webhookData.transactionDate
        };
        
        // Log payment status update
        WebhookLogger.logPaymentUpdated(
          orderId, 
          'pending', 
          'completed', 
          webhookData.id.toString()
        );
        
        // Send confirmation email (non-blocking)
        OrderService.sendPaymentConfirmationEmail(orderId, paymentUpdate)
          .catch(error => console.error('Lỗi gửi email xác nhận:', error));
        
        // Update order status to confirmed if payment is completed
        OrderService.updateOrderStatus(orderId, 'confirmed')
          .catch(error => console.error('Lỗi cập nhật trạng thái đơn hàng:', error));
      }
      
      // Log successful processing
      const processingTime = Date.now() - startTime;
      WebhookLogger.logWebhookProcessed(logId, response, processingTime);
      
      return response;
    } catch (error) {
      // Log error
      WebhookLogger.logWebhookError(logId, error, webhookData);
      throw error;
    }
  }
  
  /**
   * Validate dữ liệu webhook
   * @param data - Dữ liệu webhook cần validate
   */
  private static validateWebhookData(data: SepayWebhookRequest): void {
    const requiredFields: (keyof SepayWebhookRequest)[] = [
      'gateway',
      'transactionDate', 
      'accountNumber',
      'content',
      'transferType',
      'transferAmount',
      'referenceCode',
      'id'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Thiếu trường bắt buộc: ${field}`);
      }
    }
    
    // Validate transfer type
    if (!['in', 'out'].includes(data.transferType)) {
      throw new Error('transferType phải là "in" hoặc "out"');
    }
    
    // Validate amount
    if (data.transferAmount <= 0) {
      throw new Error('transferAmount phải lớn hơn 0');
    }
    
    // Validate transaction date format
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!dateRegex.test(data.transactionDate)) {
      throw new Error('transactionDate phải có định dạng YYYY-MM-DD HH:mm:ss');
    }
  }
  
  /**
   * Trích xuất order ID từ reference code
   * @param referenceCode - Reference code từ webhook
   * @returns Order ID hoặc null nếu không tìm thấy
   */
  private static extractOrderId(referenceCode: string): string | null {
    // Giả sử reference code có format: "Thanh toan don hang ORDER0000011703515862"
    // hoặc chỉ là ORDER ID: "ORDER0000011703515862"
    const orderIdMatch = referenceCode.match(/ORDER\d+/);
    return orderIdMatch ? orderIdMatch[0] : null;
  }
  
  /**
   * Lấy thông tin tài khoản ngân hàng
   * @returns Promise với thông tin tài khoản ngân hàng
   */
  /**
   * Lấy thông tin tài khoản ngân hàng
   * @returns Promise với thông tin ngân hàng
   */
  static async getBankInfo(): Promise<BankInfoResponse> {
    try {
      const response = await apiClient.get('/sepay/bank-info');
      
      // Kiểm tra response success
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể lấy thông tin ngân hàng');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Lỗi lấy thông tin ngân hàng:', error);
      
      // Xử lý các loại lỗi HTTP
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 401:
            throw new Error('Không có quyền truy cập thông tin ngân hàng');
          case 500:
            throw new Error('Lỗi server khi lấy thông tin ngân hàng');
          default:
            throw new Error(error.response.data?.message || 'Lỗi không xác định');
        }
      }
      
      throw error;
    }
  }
  
  /**
   * Kiểm tra trạng thái thanh toán (Polling-based approach)
   * @param orderId - ID đơn hàng
   * @returns Promise<PaymentStatusCheckResponse>
   */
  static async checkPaymentStatus(orderId: string): Promise<PaymentStatusCheckResponse> {
    try {
      console.log(`🔍 Kiểm tra trạng thái thanh toán cho đơn hàng: ${orderId}`);

      const response = await apiClient.post<PaymentStatusCheckResponse>(`/orders/${orderId}/check-payment`);

      if (!response.data.success) {
        throw new Error('Không thể kiểm tra trạng thái thanh toán');
      }

      console.log(`📊 Trạng thái thanh toán đơn hàng ${orderId}:`, {
        paid: response.data.paid,
        success: response.data.success
      });

      return response.data;
    } catch (error: any) {
      console.error('❌ Lỗi kiểm tra trạng thái thanh toán:', error);

      // Handle different error types
      if (error.response?.status === 404) {
        throw new Error('Không tìm thấy đơn hàng');
      } else if (error.response?.status === 401) {
        throw new Error('Không có quyền truy cập');
      } else if (error.response?.status === 500) {
        throw new Error('Lỗi server khi kiểm tra thanh toán');
      }

      throw error;
    }
  }
  
  /**
   * Tạo QR code thanh toán SePay
   * @param orderId - ID đơn hàng
   * @param amount - Số tiền thanh toán
   * @returns Promise với thông tin QR code
   */
  /**
   * Tạo QR code thanh toán cho đơn hàng
   * @param orderId - ID đơn hàng
   * @returns Promise<SepayQRResponse> với dữ liệu QR code và thông tin thanh toán
   */
  static async createPaymentQR(orderId: string): Promise<SepayQRResponse> {
    try {
      const requestData: SepayQRRequest = {
        order_id: parseInt(orderId) // Chuyển đổi sang số nguyên
      };
      
      const response = await apiClient.post<SepayQRResponse>('/sepay/generate-qr', requestData);
      
      // Kiểm tra response success
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể tạo QR code thanh toán');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Lỗi tạo QR code thanh toán:', error);
      
      // Xử lý các loại lỗi khác nhau
      if (error.response?.status === 400) {
        throw new Error('Dữ liệu đơn hàng không hợp lệ');
      } else if (error.response?.status === 401) {
        throw new Error('Không có quyền truy cập');
      } else if (error.response?.status === 404) {
        throw new Error('Không tìm thấy đơn hàng');
      }
      
      throw error;
    }
  }

  /**
   * Lấy trạng thái thanh toán của đơn hàng
   * @param orderId - ID đơn hàng
   * @returns Promise<PaymentStatus>
   */
  static async getPaymentStatus(orderId: string): Promise<PaymentStatus> {
    try {
      const response = await apiClient.get<PaymentStatus>(
        `/orders/${orderId}/payment-status`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi lấy trạng thái thanh toán:', error);
      throw error;
    }
  }
  
  /**
   * Cập nhật trạng thái thanh toán đơn hàng
   * @param orderId - ID đơn hàng
   * @param paymentData - Dữ liệu thanh toán cần cập nhật
   * @returns Promise<SepayWebhookResponse>
   */
  static async updatePaymentStatus(
    orderId: string,
    paymentData: Partial<OrderPaymentUpdate>
  ): Promise<SepayWebhookResponse> {
    try {
      const response = await apiClient.patch<SepayWebhookResponse>(
        `/orders/${orderId}/payment-status`,
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái thanh toán:', error);
      throw error;
    }
  }

  /**
   * Bắt đầu polling kiểm tra trạng thái thanh toán
   * @param orderId - ID đơn hàng
   * @param options - Tùy chọn polling
   * @returns Promise<PaymentStatusCheckResponse> - Kết quả cuối cùng
   */
  static async startPaymentPolling(
    orderId: string,
    options: {
      intervalMs?: number; // Khoảng thời gian giữa các lần kiểm tra (mặc định: 5000ms)
      timeoutMs?: number; // Thời gian chờ tối đa (mặc định: 600000ms = 10 phút)
      onStatusUpdate?: (status: PaymentStatusCheckResponse) => void; // Callback khi có cập nhật
      onTimeout?: () => void; // Callback khi hết thời gian chờ
    } = {}
  ): Promise<PaymentStatusCheckResponse> {
    const {
      intervalMs = 5000, // 5 giây
      timeoutMs = 600000, // 10 phút
      onStatusUpdate,
      onTimeout
    } = options;

    console.log(`🔄 Bắt đầu polling thanh toán cho đơn hàng ${orderId}`, {
      interval: `${intervalMs}ms`,
      timeout: `${timeoutMs}ms`
    });

    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      let intervalId: NodeJS.Timeout;

      const checkStatus = async () => {
        try {
          // Kiểm tra timeout
          if (Date.now() - startTime > timeoutMs) {
            clearInterval(intervalId);
            console.log(`⏰ Hết thời gian chờ thanh toán cho đơn hàng ${orderId}`);

            if (onTimeout) {
              onTimeout();
            }

            const timeoutResponse: PaymentStatusCheckResponse = {
              success: false,
              paid: false,
              order: null
            };

            resolve(timeoutResponse);
            return;
          }

          // Kiểm tra trạng thái thanh toán
          const status = await this.checkPaymentStatus(orderId);

          // Gọi callback nếu có
          if (onStatusUpdate) {
            onStatusUpdate(status);
          }

          // Nếu đã thanh toán thành công
          if (status.paid) {
            clearInterval(intervalId);
            console.log(`✅ Thanh toán thành công cho đơn hàng ${orderId}`);
            resolve(status);
            return;
          }

          // Nếu chưa thanh toán, tiếp tục polling
          console.log(`⏳ Đơn hàng ${orderId} chưa được thanh toán, tiếp tục kiểm tra...`);

        } catch (error) {
          clearInterval(intervalId);
          console.error(`❌ Lỗi trong quá trình polling đơn hàng ${orderId}:`, error);
          reject(error);
        }
      };

      // Kiểm tra ngay lập tức
      checkStatus();

      // Thiết lập interval để kiểm tra định kỳ
      intervalId = setInterval(checkStatus, intervalMs);
    });
  }

  /**
   * Dừng polling thanh toán (utility method để dừng từ bên ngoài nếu cần)
   * @param intervalId - ID của interval cần dừng
   */
  static stopPaymentPolling(intervalId: NodeJS.Timeout): void {
    clearInterval(intervalId);
    console.log('🛑 Đã dừng polling thanh toán');
  }
}

export default SepayService;