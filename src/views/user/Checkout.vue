<template>
  <div class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
    <div class="container mx-auto px-4 py-8">
      <ProgressSteps :currentStep="currentStep" class="mb-8" />

      <div class="max-w-4xl mx-auto">
        <!-- Step 2: Delivery Information -->
        <div v-if="currentStep === 2">
          <DeliveryInfo 
            :deliveryInfo="deliveryInfo" 
            @update:deliveryInfo="deliveryInfo = $event"
            @goBack="router.push('/cart')"
            @proceedToNextStep="validateAndProceedToPayment"
          />
        </div>

        <!-- Step 3: Payment -->
        <div v-if="currentStep === 3" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl shadow-xl p-6">
          <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            <i class="fas fa-credit-card mr-3 text-light-accent-sport dark:text-dark-accent-sport"></i>
            Phương thức thanh toán
          </h2>
          
          <div v-if="!sepayPaymentInfo">
            <div class="space-y-4 mb-6">
              <div class="p-4 border border-light-border dark:border-dark-border rounded-xl cursor-pointer" @click="paymentMethod = 'cod'">
                <label class="flex items-center gap-3">
                  <input type="radio" name="payment" value="cod" v-model="paymentMethod" class="text-light-accent-sport dark:text-dark-accent-sport">
                  <i class="fas fa-money-bill-wave text-green-500"></i>
                  <span class="font-medium">Thanh toán khi nhận hàng (COD)</span>
                </label>
              </div>
              <div class="p-4 border border-light-border dark:border-dark-border rounded-xl cursor-pointer" @click="paymentMethod = 'sepay'">
                <label class="flex items-center gap-3">
                  <input type="radio" name="payment" value="sepay" v-model="paymentMethod" class="text-light-accent-sport dark:text-dark-accent-sport">
                  <i class="fas fa-university text-blue-500"></i>
                  <span class="font-medium">Chuyển khoản (SePay)</span>
                </label>
              </div>
            </div>
            <div class="flex justify-between">
              <button @click="previousStep" :disabled="orderCreating" class="btn-outline px-6 py-3 rounded-xl">Quay lại</button>
              <button @click="handleCompleteOrder" :disabled="!paymentMethod || orderCreating" class="btn-primary-animated px-6 py-3 rounded-xl">
                <span v-if="orderCreating"><i class="fas fa-spinner fa-spin mr-2"></i>Đang xử lý...</span>
                <span v-else>Hoàn tất đặt hàng</span>
              </button>
            </div>
          </div>

          <!-- SePay QR Code Display -->
          <div v-else>
            <QRCodeDisplay 
              :payment-info="sepayPaymentInfo"
              :loading="orderCreating"
              :error="paymentError"
              :payment-status="paymentStatus"
              @cancel="cancelPayment"
              @retry="handleCompleteOrder"
              @timeout="handlePaymentTimeout"
            />
          </div>
        </div>

        <!-- Step 4: Order Complete -->
        <div v-if="currentStep === 4" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl shadow-xl p-6 text-center">
           <div class="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-check text-3xl text-green-500"></i>
            </div>
            <h2 class="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
            <p class="text-light-text-secondary dark:text-dark-text-secondary">Cảm ơn bạn đã mua sắm. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
            <div class="mt-6 space-x-4">
                <button @click="router.push('/')" class="btn-primary-animated px-6 py-3 rounded-xl">Về trang chủ</button>
                <button @click="router.push('/products')" class="btn-outline px-6 py-3 rounded-xl">Tiếp tục mua sắm</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { ProgressSteps, DeliveryInfo } from '@/components/user/cart';
import QRCodeDisplay from '@/components/user/payment/QRCodeDisplay.vue';
import { OrderService } from '@/services/orderService';
import type { CreateOrderRequest } from '@/types/order';
import type { SepayOrderPaymentInfo } from '@/types/payment';
import { useNotification } from '@/composables/useNotification';
import { usePaymentPolling } from '@/composables/usePaymentPolling';

const router = useRouter();
const cartStore = useCartStore();
const { showError, showSuccess, showInfo } = useNotification();

const { isPolling, isPaid, isTimeout, error: paymentError, startPolling, stopPolling } = usePaymentPolling();

const currentStep = ref(2);
const paymentMethod = ref<'cod' | 'sepay' | ''>('');
const deliveryInfo = ref({ fullName: '', phone: '', province: '', district: '', ward: '', address: '' });
const orderCreating = ref(false);
const currentOrderId = ref<string | null>(null);
const sepayPaymentInfo = ref<SepayOrderPaymentInfo | null>(null);

import { watch } from 'vue';

const paymentStatus = computed(() => {
  if (isPolling.value) return 'checking';
  if (isPaid.value) return 'success';
  if (isTimeout.value) return 'timeout';
  if (paymentError.value) return 'failed';
  return 'idle';
});

const nextStep = () => { if (currentStep.value < 4) currentStep.value++; };
const previousStep = () => { if (currentStep.value > 2) currentStep.value--; };

const validateAndProceedToPayment = () => {
    const { fullName, phone, province, district, address } = deliveryInfo.value;
    if (!fullName || !phone || !province || !district || !address) {
        showError('Vui lòng điền đầy đủ thông tin giao hàng.', 'Thiếu thông tin');
        return;
    }
    nextStep();
}

const handleCompleteOrder = async () => {
  if (!paymentMethod.value) {
    showError('Vui lòng chọn phương thức thanh toán', 'Thiếu thông tin');
    return;
  }

  orderCreating.value = true;
  try {
            const fullAddress = `${deliveryInfo.value.address}, ${deliveryInfo.value.ward}, ${deliveryInfo.value.district}, ${deliveryInfo.value.province}`;

    const orderData: CreateOrderRequest = {
      shipping_address: fullAddress,
      shipping_city: deliveryInfo.value.province,
      shipping_district: deliveryInfo.value.district,
            shipping_ward: deliveryInfo.value.ward,
      shipping_phone: deliveryInfo.value.phone,
      payment_method: paymentMethod.value,
      notes: '',
    };

    const response = await OrderService.createOrder(orderData);
    if (response.success && response.data) {
      currentOrderId.value = response.data.id.toString();
      showSuccess(`Đã tạo đơn hàng #${response.data.id}`, 'Thành công');

      if (paymentMethod.value === 'sepay' && response.payment_info) {
        sepayPaymentInfo.value = response.payment_info;
        startPolling(currentOrderId.value, {
          onSuccess: () => {
            showSuccess('Thanh toán thành công!');
            setTimeout(() => nextStep(), 1500);
          },
          onTimeout: handlePaymentTimeout,
          onError: (err: Error) => showError(err.message, 'Lỗi thanh toán'),
        });
      } else {
        nextStep(); // For COD orders, clear cart on success step
      }
    } else {
      throw new Error(response.message || 'Không thể tạo đơn hàng');
    }
  } catch (err: any) {
    showError(err.message, 'Lỗi tạo đơn hàng');
  } finally {
    orderCreating.value = false;
  }
};

const cancelPayment = () => {
  stopPolling();
  showInfo('Đơn hàng của bạn đã được tạo và đang chờ xử lý. Bạn sẽ được chuyển về trang chủ.', 'Thông báo');
  router.push('/');
};

const handlePaymentTimeout = () => {
    showError('Phiên thanh toán đã hết hạn. Vui lòng thử lại.', 'Thanh toán quá hạn');
    cancelPayment();
}

watch(currentStep, (newStep) => {
  if (newStep === 4) {
    cartStore.clearCart();
  }
});

onUnmounted(() => {
  stopPolling();
});
</script>
