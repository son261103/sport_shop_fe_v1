import { ref, computed } from 'vue';
import { SepayService } from '../services/sepayService';
import type { 
  SepayWebhookRequest, 
  SepayWebhookResponse, 
  PaymentStatus,
  OrderPaymentUpdate,
  SepayQRResponse,
  BankInfoResponse 
} from '../types/payment';
import { useNotification } from './useNotification';
import { useLoading } from './useLoading';

/**
 * Composable để xử lý SePay webhook và thanh toán
 */
export function useSepay() {
  const { showNotification } = useNotification();
  const { showLoading, hideLoading } = useLoading();
  
  // Reactive state
  const isProcessing = ref(false);
  const lastWebhookResult = ref<SepayWebhookResponse | null>(null);
  const paymentStatus = ref<PaymentStatus | null>(null);
  const qrCodeData = ref<SepayQRResponse | null>(null);
  const bankInfo = ref<BankInfoResponse | null>(null);
  const error = ref<string | null>(null);
  
  // Computed properties
  const hasError = computed(() => !!error.value);
  const isPaymentCompleted = computed(() => 
    paymentStatus.value?.status === 'completed'
  );
  const isPaymentPending = computed(() => 
    paymentStatus.value?.status === 'pending'
  );
  const isPaymentFailed = computed(() => 
    paymentStatus.value?.status === 'failed'
  );
  
  /**
   * Xử lý webhook từ SePay
   */
  const handleWebhook = async (webhookData: SepayWebhookRequest): Promise<SepayWebhookResponse | null> => {
    try {
      isProcessing.value = true;
      error.value = null;
      showLoading('Đang xử lý thanh toán...');
      
      const result = await SepayService.handleWebhook(webhookData);
      lastWebhookResult.value = result;
      
      if (result.success) {
        showNotification({
          type: 'success',
          title: 'Thanh toán thành công',
          message: 'Đơn hàng của bạn đã được thanh toán thành công!'
        });
      } else {
        showNotification({
          type: 'error',
          title: 'Lỗi thanh toán',
          message: result.message || 'Có lỗi xảy ra khi xử lý thanh toán'
        });
      }
      
      return result;
    } catch (err: any) {
      error.value = err.message || 'Có lỗi xảy ra khi xử lý webhook';
      showNotification({
        type: 'error',
        title: 'Lỗi xử lý thanh toán',
        message: error.value
      });
      return null;
    } finally {
      isProcessing.value = false;
      hideLoading();
    }
  };
  
  /**
   * Lấy trạng thái thanh toán của đơn hàng
   */
  const getPaymentStatus = async (orderId: string): Promise<PaymentStatus | null> => {
    try {
      isProcessing.value = true;
      error.value = null;
      
      const status = await SepayService.getPaymentStatus(orderId);
      paymentStatus.value = status;
      
      return status;
    } catch (err: any) {
      error.value = err.message || 'Có lỗi xảy ra khi lấy trạng thái thanh toán';
      showNotification({
        type: 'error',
        title: 'Lỗi lấy trạng thái thanh toán',
        message: error.value
      });
      return null;
    } finally {
      isProcessing.value = false;
    }
  };

  /**
   * Tạo QR code thanh toán cho đơn hàng
   */
  const createPaymentQR = async (orderId: string): Promise<SepayQRResponse | null> => {
    try {
      isProcessing.value = true;
      error.value = null;
      showLoading('Đang tạo mã QR thanh toán...');
      
      const qrResponse = await SepayService.createPaymentQR(orderId);
      qrCodeData.value = qrResponse;
      
      if (qrResponse.success) {
        showNotification({
          type: 'success',
          title: 'Tạo QR thành công',
          message: 'Mã QR thanh toán đã được tạo thành công!'
        });
      }
      
      return qrResponse;
    } catch (err: any) {
      error.value = err.message || 'Có lỗi xảy ra khi tạo QR code thanh toán';
      showNotification({
        type: 'error',
        title: 'Lỗi tạo QR code',
        message: error.value
      });
      return null;
    } finally {
      isProcessing.value = false;
      hideLoading();
    }
  };
  
  /**
   * Cập nhật trạng thái thanh toán
   */
  const updatePaymentStatus = async (
    orderId: string, 
    paymentData: Partial<OrderPaymentUpdate>
  ): Promise<SepayWebhookResponse | null> => {
    try {
      isProcessing.value = true;
      error.value = null;
      showLoading('Đang cập nhật trạng thái thanh toán...');
      
      const result = await SepayService.updatePaymentStatus(orderId, paymentData);
      
      if (result.success) {
        showNotification({
          type: 'success',
          title: 'Cập nhật thành công',
          message: 'Trạng thái thanh toán đã được cập nhật'
        });
        
        // Refresh payment status
        await getPaymentStatus(orderId);
      }
      
      return result;
    } catch (err: any) {
      error.value = err.message || 'Có lỗi xảy ra khi cập nhật trạng thái thanh toán';
      showNotification({
        type: 'error',
        title: 'Lỗi cập nhật thanh toán',
        message: error.value
      });
      return null;
    } finally {
      isProcessing.value = false;
      hideLoading();
    }
  };
  
  /**
   * Reset state
   */
  const resetState = () => {
    isProcessing.value = false;
    lastWebhookResult.value = null;
    paymentStatus.value = null;
    qrCodeData.value = null;
    error.value = null;
  };
  
  /**
   * Kiểm tra xem reference code có hợp lệ không
   */
  const isValidReferenceCode = (referenceCode: string): boolean => {
    return /ORDER\d+/.test(referenceCode);
  };
  
  /**
   * Trích xuất order ID từ reference code
   */
  const extractOrderId = (referenceCode: string): string | null => {
    const match = referenceCode.match(/ORDER\d+/);
    return match ? match[0] : null;
  };
  
  /**
   * Lấy thông tin tài khoản ngân hàng
   */
  const getBankInfo = async (): Promise<void> => {
    try {
      isProcessing.value = true;
      error.value = null;
      showLoading('Đang lấy thông tin ngân hàng...');
      
      const result = await SepayService.getBankInfo();
      bankInfo.value = result;
      
      showNotification({
        type: 'success',
        message: 'Lấy thông tin ngân hàng thành công'
      });
    } catch (err: any) {
      error.value = err.message || 'Lỗi khi lấy thông tin ngân hàng';
      showNotification({
        type: 'error',
        message: error.value
      });
      console.error('Lỗi lấy thông tin ngân hàng:', err);
    } finally {
      isProcessing.value = false;
      hideLoading();
    }
   };
  
  return {
    // State
    isProcessing: computed(() => isProcessing.value),
    lastWebhookResult: computed(() => lastWebhookResult.value),
    paymentStatus: computed(() => paymentStatus.value),
    qrCodeData: computed(() => qrCodeData.value),
    bankInfo: computed(() => bankInfo.value),
    error: computed(() => error.value),
    
    // Computed
    hasError,
    isPaymentCompleted,
    isPaymentPending,
    isPaymentFailed,
    
    // Methods
    handleWebhook,
    getPaymentStatus,
    createPaymentQR,
    getBankInfo,
    updatePaymentStatus,
    resetState,
    isValidReferenceCode,
    extractOrderId
  };
}

export default useSepay;