<template>
  <div class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
    <div class="container mx-auto px-4 py-8">
      <!-- Progress Steps -->
      <div class="mb-8">
        <ProgressSteps :currentStep="currentStep" />
      </div>

      <!-- Checkout Content -->
      <div class="max-w-4xl mx-auto">


        <!-- Step 2: Delivery Information -->
        <div v-if="currentStep === 2">
          <DeliveryInfo 
            :deliveryInfo="deliveryInfo" 
            @update:deliveryInfo="deliveryInfo = $event"
            @goBack="router.push('/cart')"
            @proceedToNextStep="nextStep"
          />
        </div>

        <!-- Step 3: Payment -->
        <div v-if="currentStep === 3" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl shadow-xl p-6">
          <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            <i class="fas fa-credit-card mr-3 text-light-accent-sport dark:text-dark-accent-sport"></i>
            Phương thức thanh toán
          </h2>
          
          <div class="space-y-4 mb-6">
            <div class="p-4 border border-light-border dark:border-dark-border rounded-xl">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" value="cod" v-model="paymentMethod" class="text-light-accent-sport dark:text-dark-accent-sport">
                <i class="fas fa-money-bill-wave text-green-500"></i>
                <span class="text-light-text-primary dark:text-dark-text-primary font-medium">Thanh toán khi nhận hàng (COD)</span>
              </label>
            </div>
            <div class="p-4 border border-light-border dark:border-dark-border rounded-xl">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" value="bank" v-model="paymentMethod" class="text-light-accent-sport dark:text-dark-accent-sport">
                <i class="fas fa-university text-blue-500"></i>
                <span class="text-light-text-primary dark:text-dark-text-primary font-medium">Chuyển khoản ngân hàng</span>
              </label>
            </div>
          </div>

          <!-- QR Code Display for Bank Transfer -->
          <div v-if="paymentMethod === 'bank'" class="mb-6">
            <QRCodeDisplay 
              :payment-info="qrPaymentInfo"
              :qr-code-url="qrCodeUrl"
              :loading="qrLoading"
              :error="qrError"
              :payment-status="paymentStatus"
              :timeout-minutes="15"
              @check-payment="checkPaymentStatus"
              @cancel="cancelPayment"
              @retry="handleRetryQRCode"
              @timeout="handlePaymentTimeout"
            />
          </div>

          <!-- Navigation -->
          <div class="flex justify-between" v-if="paymentMethod !== 'bank'">
            <button
              @click="previousStep"
              :disabled="orderCreating"
              class="btn-outline px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Quay lại
            </button>
            <button
              @click="handleCompleteOrder"
              :disabled="!paymentMethod || orderCreating"
              class="btn-primary-animated px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              <span v-if="orderCreating" class="flex items-center">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Đang tạo đơn hàng...
              </span>
              <span v-else class="flex items-center">
                Hoàn tất đặt hàng
                <i class="fas fa-check ml-2"></i>
              </span>
            </button>
          </div>
        </div>

        <!-- Step 4: Order Complete -->
        <div v-if="currentStep === 4" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl shadow-xl p-6 text-center">
          <div class="mb-6">
            <div class="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-check text-3xl text-green-500"></i>
            </div>
            <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
              Đặt hàng thành công!
            </h2>
            <p class="text-light-text-secondary dark:text-dark-text-secondary">
              Cảm ơn bạn đã mua sắm tại Sport Shop. Chúng tôi sẽ liên hệ với bạn sớm nhất.
            </p>
          </div>

          <div class="space-y-4">
            <button
              @click="router.push('/')"
              class="btn-primary-animated px-6 py-3 rounded-xl w-full sm:w-auto"
            >
              <i class="fas fa-home mr-2"></i>
              Về trang chủ
            </button>
            <button
              @click="router.push('/products')"
              class="btn-outline px-6 py-3 rounded-xl w-full sm:w-auto ml-0 sm:ml-4"
            >
              <i class="fas fa-shopping-bag mr-2"></i>
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { ProgressSteps } from '@/components/user/cart';
import { DeliveryInfo } from '@/components/user/cart';
import QRCodeDisplay from '@/components/user/payment/QRCodeDisplay.vue';
import { SepayService } from '@/services/sepayService';
import { OrderService, type CreateOrderRequest } from '@/services/orderService';
import { useNotification } from '@/composables/useNotification';

const router = useRouter();
const cartStore = useCartStore();
const { showError, showSuccess } = useNotification();

// Current step state
const currentStep = ref(2);
const paymentMethod = ref('');

// Delivery info state
const deliveryInfo = ref({
  fullName: '',
  phone: '',
  province: '',
  district: '',
  address: '',
  provinceCode: undefined,
  districtCode: undefined
});

// QR Code payment states
const showQRCode = ref(false);
const qrCodeUrl = ref('');
const qrLoading = ref(false);
const qrError = ref('');
const paymentStatus = ref<'idle' | 'checking' | 'success' | 'failed'>('idle');
const currentOrderId = ref('');
const pollingInterval = ref<NodeJS.Timeout | null>(null);
const pollingEnabled = ref(false);

// Order creation states
const orderCreating = ref(false);
const createdOrder = ref<any>(null);

// QR Payment info
const qrPaymentInfo = computed(() => ({
  amount: cartStore.totalAmount || 0,
  orderCode: currentOrderId.value,
  bankName: 'SePay'
}));

// Methods
const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 2) {
    currentStep.value--;
  }
};

const handlePaymentMethodChange = () => {
  if (paymentMethod.value === 'bank') {
    // Chỉ tạo QR code nếu đã có currentOrderId (đơn hàng đã được tạo)
    if (currentOrderId.value) {
      generateQRCode();
    } else {
      console.log('⚠️ Chưa có mã đơn hàng, cần tạo đơn hàng trước');
    }
  } else {
    showQRCode.value = false;
    qrCodeUrl.value = '';
    qrError.value = '';
    paymentStatus.value = 'idle';
    stopPolling();
  }
};

const generateOrderId = (): string => {
  const timestamp = Date.now();
  return `ORDER${timestamp}`;
};

const startPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
  }
  
  pollingEnabled.value = true;
  pollingInterval.value = setInterval(async () => {
    if (!pollingEnabled.value || !currentOrderId.value) {
      stopPolling();
      return;
    }
    
    try {
      const status = await SepayService.checkPaymentStatus(currentOrderId.value);
      
      if (status.status === 'completed') {
        paymentStatus.value = 'success';
        stopPolling();
        // Chờ 2 giây rồi chuyển sang bước hoàn thành
        setTimeout(() => {
          nextStep();
        }, 2000);
      }
    } catch (error) {
      console.error('Lỗi polling thanh toán:', error);
      // Không dừng polling khi có lỗi, tiếp tục thử
    }
  }, 5000); // Kiểm tra mỗi 5 giây
};

const stopPolling = () => {
  pollingEnabled.value = false;
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
};

const generateQRCode = async () => {
  if (!currentOrderId.value) {
    showError('Chưa có mã đơn hàng. Vui lòng thử lại.', 'Lỗi');
    return;
  }
  
  qrLoading.value = true;
  qrError.value = '';
  paymentStatus.value = 'idle';
  
  try {
    console.log('🔄 Đang tạo QR code cho đơn hàng:', currentOrderId.value);
    
    const response = await SepayService.createPaymentQR(
      currentOrderId.value
    );
    
    if (response.success && response.data) {
      qrCodeUrl.value = response.data.qr_code;
      showQRCode.value = true;
      
      console.log('✅ Đã tạo QR code thành công:', {
        account_number: response.data.account_number,
        bank_name: response.data.bank_name,
        amount: response.data.amount,
        content: response.data.content
      });
    } else {
      throw new Error(response.message || 'Không thể tạo QR code');
    }
    
    // Bắt đầu auto-polling sau khi tạo QR code thành công
    startPolling();
  } catch (error: any) {
    console.error('❌ Lỗi tạo QR code:', error);
    qrError.value = error.message || 'Không thể tạo mã QR. Vui lòng thử lại.';
    
    showError(qrError.value, 'Lỗi tạo QR');
  } finally {
    qrLoading.value = false;
  }
};

const checkPaymentStatus = async () => {
  if (!currentOrderId.value) return;
  
  paymentStatus.value = 'checking';
  
  try {
    const status = await SepayService.checkPaymentStatus(currentOrderId.value);
    
    if (status.status === 'completed') {
      paymentStatus.value = 'success';
      // Chờ 2 giây rồi chuyển sang bước hoàn thành
      setTimeout(() => {
        nextStep();
      }, 2000);
    } else {
      paymentStatus.value = 'idle';
    }
  } catch (error) {
    console.error('Lỗi kiểm tra thanh toán:', error);
    paymentStatus.value = 'failed';
    setTimeout(() => {
      paymentStatus.value = 'idle';
    }, 3000);
  }
};

const cancelPayment = () => {
  stopPolling();
  showQRCode.value = false;
  qrCodeUrl.value = '';
  qrError.value = '';
  paymentStatus.value = 'idle';
  // Không reset paymentMethod và currentOrderId vì đơn hàng đã được tạo
  // paymentMethod.value = '';
  // currentOrderId.value = '';
};

const handlePaymentTimeout = () => {
  stopPolling();
  qrError.value = 'Phiên thanh toán đã hết hạn. Vui lòng tạo mã QR mới.';
  paymentStatus.value = 'failed';
};

const handleRetryQRCode = async () => {
  if (!currentOrderId.value) {
    showError('⚠️ Chưa có mã đơn hàng, cần tạo đơn hàng trước', 'Lỗi');
    return;
  }
  await generateQRCode();
};

const createOrder = async (retryCount = 0): Promise<boolean> => {
  if (orderCreating.value) return false;
  
  const maxRetries = 2;
  
  try {
    orderCreating.value = true;
    
    // Kiểm tra giỏ hàng trước khi tạo đơn hàng
    if (!cartStore.items || cartStore.items.length === 0) {
      throw new Error('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
    }
    
    // Kiểm tra tổng tiền
    if (!cartStore.totalPrice || cartStore.totalPrice <= 0) {
      throw new Error('Tổng tiền đơn hàng không hợp lệ.');
    }
    
    // Chuẩn bị dữ liệu đơn hàng
    const orderData: CreateOrderRequest = {
      shipping_address: deliveryInfo.value.address.trim(),
      shipping_city: deliveryInfo.value.province.trim(),
      shipping_district: deliveryInfo.value.district.trim(),
      shipping_ward: '', // Có thể thêm ward field vào deliveryInfo nếu cần
      shipping_phone: deliveryInfo.value.phone.trim(),
      payment_method: paymentMethod.value === 'bank' ? 'sepay' : 'cod',
      notes: '', // Có thể thêm notes field nếu cần
      discount_amount: 0 // Có thể thêm discount logic nếu cần
    };
    
    console.log('🛒 Đang tạo đơn hàng với dữ liệu:', orderData);
    
    // Gọi API tạo đơn hàng
    const response = await OrderService.createOrder(orderData);
    
    console.log('🔍 Debug - Full API response:', response);
    console.log('🔍 Debug - Response data:', response.data);
    console.log('🔍 Debug - Response data ID:', response.data?.id);
    
    if (response.success && response.data) {
      createdOrder.value = response.data;
      currentOrderId.value = response.data.id.toString();
      
      console.log('🔍 Debug - currentOrderId set to:', currentOrderId.value);
      
      showSuccess(`Đã tạo đơn hàng #${response.data.id} thành công!`, 'Thành công');
      
      console.log('✅ Đã tạo đơn hàng thành công:', response.data);
      return true;
    } else {
      throw new Error(response.message || 'Phản hồi từ server không hợp lệ');
    }
  } catch (error: any) {
    console.error(`❌ Lỗi tạo đơn hàng (lần thử ${retryCount + 1}):`, error);
    
    // Retry logic cho một số lỗi network
    if (retryCount < maxRetries && 
        (error.code === 'NETWORK_ERROR' || 
         error.response?.status >= 500 || 
         error.message?.includes('timeout'))) {
      
      console.log(`🔄 Đang thử lại tạo đơn hàng (lần ${retryCount + 2}/${maxRetries + 1})...`);
      
      showError(`Đang thử lại tạo đơn hàng (lần ${retryCount + 2}/${maxRetries + 1})...`, 'Đang thử lại');
      
      // Đợi 1 giây trước khi retry
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      orderCreating.value = false; // Reset trạng thái để có thể retry
      return await createOrder(retryCount + 1);
    }
    
    // Xử lý các loại lỗi cụ thể
    let errorMessage = 'Có lỗi xảy ra khi tạo đơn hàng';
    
    if (error.response?.status === 400) {
      errorMessage = 'Dữ liệu đơn hàng không hợp lệ. Vui lòng kiểm tra lại thông tin.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      // Có thể redirect về trang login
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } else if (error.response?.status === 422) {
      const validationErrors = error.response.data?.errors;
      if (validationErrors) {
        const errorMessages = Object.values(validationErrors).flat();
        errorMessage = `Lỗi validation: ${errorMessages.join(', ')}`;
      } else {
        errorMessage = 'Dữ liệu đơn hàng không hợp lệ';
      }
    } else if (error.response?.status === 409) {
      errorMessage = 'Một số sản phẩm trong giỏ hàng đã hết hàng. Vui lòng cập nhật giỏ hàng.';
    } else if (error.response?.status >= 500) {
      errorMessage = 'Lỗi server. Vui lòng thử lại sau ít phút.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showError(errorMessage, 'Lỗi tạo đơn hàng');
    
    return false;
  } finally {
    orderCreating.value = false;
  }
};

const handleCompleteOrder = async () => {
  // Kiểm tra thông tin giao hàng
  if (!deliveryInfo.value.fullName || !deliveryInfo.value.phone || 
      !deliveryInfo.value.address || !deliveryInfo.value.province || 
      !deliveryInfo.value.district) {
    showError('Vui lòng điền đầy đủ thông tin giao hàng', 'Thiếu thông tin');
    return;
  }
  
  // Kiểm tra phương thức thanh toán
  if (!paymentMethod.value) {
    showError('Vui lòng chọn phương thức thanh toán', 'Thiếu thông tin');
    return;
  }
  
  // Tạo đơn hàng trước
  const orderCreated = await createOrder();
  
  if (!orderCreated) {
    return; // Dừng lại nếu không tạo được đơn hàng
  }
  
  // Xử lý theo phương thức thanh toán
  if (paymentMethod.value === 'bank') {
    // Tạo QR code với order ID đã được tạo
    await generateQRCode();
  } else {
    // COD payment - chuyển thẳng sang bước hoàn thành
    showSuccess('Đơn hàng COD của bạn đã được tạo thành công!', 'Đặt hàng thành công');
    nextStep();
  }
};

// Initialize cart data
onMounted(() => {
  cartStore.initializeCart();
});

// Cleanup polling when component unmounts
onUnmounted(() => {
  stopPolling();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>