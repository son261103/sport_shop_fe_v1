import { apiClient } from './api';
import { api } from './api';
import type {
  SepayWebhookRequest,
  SepayWebhookResponse,
  PaymentStatus,
  OrderPaymentUpdate
} from '../types/payment';
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  OrdersResponse
} from '../types/order';

// Legacy interface - keeping for backward compatibility
export interface LegacyCreateOrderResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      created_at: string;
      updated_at: string;
    };
    total_price: number;
    shipping_fee: number;
    discount_amount: number;
    final_total: number;
    status: string;
    payment_method: string;
    payment_status: string;
    transaction_id: string;
    paid_at: string;
    shipping_address: string;
    shipping_city: string;
    shipping_district: string;
    shipping_ward: string;
    shipping_phone: string;
    notes: string;
    sepay_reference_code: string;
    order_details: Array<{
      id: number;
      order_id: number;
      product_id: number;
      product: {
        id: number;
        name: string;
        price: number;
        discount_price: number;
        description: string;
        image: string;
        cloudinary_public_id: string;
        stock_quantity: number;
        is_active: boolean;
        category_id: number;
        brand_id: number;
        category: {
          id: number;
          name: string;
        };
        brand: {
          id: number;
          name: string;
        };
        created_at: string;
        updated_at: string;
      };
      quantity: number;
      price: number;
      total: number;
      created_at: string;
      updated_at: string;
    }>;
    created_at: string;
    updated_at: string;
  };
}

/**
 * Service để xử lý đơn hàng và cập nhật trạng thái thanh toán
 */
export class OrderService {
  /**
   * Tạo đơn hàng mới từ giỏ hàng
   * @param orderData - Dữ liệu đơn hàng
   * @returns Promise<CreateOrderResponse>
   */
  static async createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      console.log('🛒 Đang tạo đơn hàng mới:', orderData);

      const response = await api.orders.createOrder(orderData);

      console.log('✅ Đã tạo đơn hàng thành công:', {
        orderId: response.data.id,
        totalAmount: response.data.final_total,
        paymentMethod: response.data.payment_method,
        status: response.data.status
      });

      // Check if response includes payment_info (for SePay orders)
      const hasPaymentInfo = response.payment_info && orderData.payment_method === 'sepay';

      if (hasPaymentInfo) {
        console.log('💳 Đơn hàng SePay với thông tin thanh toán:', {
          referenceCode: response.payment_info.reference_code,
          amount: response.payment_info.payment_info.amount,
          bankName: response.payment_info.payment_info.bank_name
        });
      }

      // Return the response in the expected format
      return {
        success: true,
        message: response.message,
        data: {
          ...response.data,
          status: response.data.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
          payment_method: response.data.payment_method as 'cod' | 'sepay',
          payment_status: response.data.payment_status as 'pending' | 'completed' | 'failed' | 'cancelled'
        },
        payment_info: hasPaymentInfo ? response.payment_info : undefined
      };
    } catch (error: any) {
      console.error('❌ Lỗi tạo đơn hàng:', error);

      // Xử lý các loại lỗi khác nhau
      if (error.response?.status === 400) {
        throw new Error('Dữ liệu đơn hàng không hợp lệ');
      } else if (error.response?.status === 401) {
        throw new Error('Bạn cần đăng nhập để tạo đơn hàng');
      } else if (error.response?.status === 422) {
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          const errorMessages = Object.values(validationErrors).flat();
          throw new Error(`Lỗi validation: ${errorMessages.join(', ')}`);
        }
        throw new Error('Dữ liệu đơn hàng không hợp lệ');
      } else if (error.response?.status === 500) {
        throw new Error('Lỗi server, vui lòng thử lại sau');
      } else {
        throw new Error(error.message || 'Có lỗi xảy ra khi tạo đơn hàng');
      }
    }
  }
  /**
   * Cập nhật trạng thái thanh toán đơn hàng từ webhook
   * @param webhookData - Dữ liệu webhook từ SePay
   * @returns Promise<SepayWebhookResponse>
   */
  static async updateOrderPaymentFromWebhook(
    webhookData: SepayWebhookRequest
  ): Promise<SepayWebhookResponse> {
    try {
      // Extract order ID from reference code
      const orderId = this.extractOrderId(webhookData.referenceCode);

      if (!orderId) {
        throw new Error('Không thể trích xuất mã đơn hàng từ reference code');
      }

      // Determine payment status based on transfer type and amount
      const paymentStatus = this.determinePaymentStatus(webhookData);

      // Prepare update data
      const updateData: OrderPaymentUpdate = {
        orderId,
        paymentStatus,
        transactionId: webhookData.id.toString(),
        gateway: webhookData.gateway,
        amount: webhookData.transferAmount,
        transactionDate: webhookData.transactionDate
      };

      // Call API to update order
      const response = await apiClient.patch<SepayWebhookResponse>(
        `/orders/${orderId}/payment`,
        updateData
      );

      // Log successful update
      console.log(`✅ Đã cập nhật trạng thái thanh toán cho đơn hàng ${orderId}:`, {
        status: paymentStatus,
        amount: webhookData.transferAmount,
        gateway: webhookData.gateway,
        transactionId: webhookData.id
      });

      return response.data;
    } catch (error: any) {
      console.error('❌ Lỗi cập nhật trạng thái thanh toán:', error);
      throw error;
    }
  }

  /**
   * Lấy thông tin đơn hàng
   * @param orderId - ID đơn hàng
   * @returns Promise với thông tin đơn hàng
   */
  static async getOrderById(orderId: string) {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi lấy thông tin đơn hàng ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Lấy trạng thái thanh toán của đơn hàng
   * @param orderId - ID đơn hàng
   * @returns Promise<PaymentStatus>
   */
  static async getOrderPaymentStatus(orderId: string): Promise<PaymentStatus> {
    try {
      const response = await apiClient.get<PaymentStatus>(
        `/orders/${orderId}/payment-status`
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi lấy trạng thái thanh toán đơn hàng ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Cập nhật trạng thái đơn hàng
   * @param orderId - ID đơn hàng
   * @param status - Trạng thái mới
   * @returns Promise với kết quả cập nhật
   */
  static async updateOrderStatus(
    orderId: string,
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ) {
    try {
      const response = await apiClient.patch(
        `/orders/${orderId}/status`,
        { status }
      );

      console.log(`✅ Đã cập nhật trạng thái đơn hàng ${orderId} thành: ${status}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi cập nhật trạng thái đơn hàng ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Xác định trạng thái thanh toán dựa trên dữ liệu webhook
   * @param webhookData - Dữ liệu webhook
   * @returns Trạng thái thanh toán
   */
  private static determinePaymentStatus(
    webhookData: SepayWebhookRequest
  ): 'pending' | 'completed' | 'failed' | 'cancelled' {
    // Nếu là giao dịch nhận tiền (in) thì thanh toán thành công
    if (webhookData.transferType === 'in' && webhookData.transferAmount > 0) {
      return 'completed';
    }

    // Nếu là giao dịch chuyển tiền (out) thì có thể là hoàn tiền
    if (webhookData.transferType === 'out') {
      return 'cancelled';
    }

    // Mặc định là thất bại
    return 'failed';
  }

  /**
   * Trích xuất order ID từ reference code
   * @param referenceCode - Reference code từ webhook
   * @returns Order ID hoặc null nếu không tìm thấy
   */
  private static extractOrderId(referenceCode: string): string | null {
    // Tìm pattern ORDER + số
    const orderIdMatch = referenceCode.match(/ORDER\d+/);
    return orderIdMatch ? orderIdMatch[0] : null;
  }

  /**
   * Validate số tiền thanh toán với đơn hàng
   * @param orderId - ID đơn hàng
   * @param amount - Số tiền từ webhook
   * @returns Promise<boolean> - true nếu số tiền khớp
   */
  static async validatePaymentAmount(orderId: string, amount: number): Promise<boolean> {
    try {
      const order = await this.getOrderById(orderId);

      // So sánh số tiền (có thể có sai lệch nhỏ do làm tròn)
      const tolerance = 1000; // Cho phép sai lệch 1000 VND
      const amountDiff = Math.abs(order.totalAmount - amount);

      const isValid = amountDiff <= tolerance;

      if (!isValid) {
        console.warn(`⚠️ Số tiền không khớp cho đơn hàng ${orderId}:`, {
          orderAmount: order.totalAmount,
          webhookAmount: amount,
          difference: amountDiff
        });
      }

      return isValid;
    } catch (error) {
      console.error(`Lỗi validate số tiền đơn hàng ${orderId}:`, error);
      return false;
    }
  }

  /**
   * Gửi email thông báo thanh toán thành công
   * @param orderId - ID đơn hàng
   * @param paymentData - Dữ liệu thanh toán
   */
  static async sendPaymentConfirmationEmail(
    orderId: string,
    paymentData: OrderPaymentUpdate
  ): Promise<void> {
    try {
      await apiClient.post('/notifications/payment-confirmation', {
        orderId,
        paymentData
      });

      console.log(`📧 Đã gửi email xác nhận thanh toán cho đơn hàng ${orderId}`);
    } catch (error) {
      console.error(`Lỗi gửi email xác nhận thanh toán cho đơn hàng ${orderId}:`, error);
      // Không throw error vì email không phải là critical
    }
  }

  /**
   * Get user orders
   */
  static async getOrders(): Promise<OrdersResponse> {
    try {
      const response = await apiClient.get('/orders');

      if (response.data.success) {
        return response.data as OrdersResponse;
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);

      if (error.response?.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }

      if (error.response?.status === 500) {
        throw new Error('Server error - Please try again later');
      }

      throw new Error(error.message || 'Failed to fetch orders');
    }
  }

  static async retryPayment(orderId: number): Promise<CreateOrderResponse> {
    try {
      const response = await apiClient.post(`/orders/${orderId}/retry-payment`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi thanh toán lại đơn hàng ${orderId}:`, error);
      throw error;
    }
  }

  static async checkPaymentStatus(orderId: number): Promise<PaymentStatusCheckResponse> {
    try {
      const response = await apiClient.post(`/sepay/check-payment`, { order_id: orderId });
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi kiểm tra trạng thái thanh toán cho đơn hàng ${orderId}:`, error);
      // Return a default "not paid" status on API error to prevent polling from stopping
      return {
        success: false,
        paid: false,
        message: error.response?.data?.message || 'Không thể kiểm tra trạng thái thanh toán.'
      };
    }
  }

  static async confirmPayment(orderId: number): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await apiClient.post(`/orders/${orderId}/confirm-payment`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi xác nhận thanh toán cho đơn hàng ${orderId}:`, error);
      throw error.response?.data || new Error('Không thể xác nhận thanh toán.');
    }
  }


}

export default OrderService;