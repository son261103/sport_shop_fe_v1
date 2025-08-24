<template>
  <div class="qr-code-display bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-xl p-6">
    <div class="text-center mb-4">
      <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Thanh toán qua SePay</h3>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">Quét mã QR hoặc chuyển khoản thủ công</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <i class="fas fa-spinner fa-spin text-3xl text-light-accent-sport dark:text-dark-accent-sport"></i>
    </div>
    <div v-else-if="error" class="text-center text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
      <p class="font-semibold">{{ error }}</p>
      <button @click="$emit('retry')" class="mt-3 btn-outline-danger">Thử lại</button>
    </div>

    <div v-else-if="paymentInfo" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div class="text-center">
        <img :src="paymentInfo.qr_image_url" alt="QR Code Thanh toán" class="mx-auto border-4 border-white dark:border-gray-700 rounded-lg shadow-md w-48 h-48" />
        <div v-if="timeLeft > 0" class="mt-3">
          <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Mã hết hạn sau:</p>
          <p class="text-2xl font-bold text-red-500">{{ formatTime(timeLeft) }}</p>
        </div>
      </div>

      <div class="bg-light-bg-primary dark:bg-dark-bg-primary p-4 rounded-lg space-y-3">
        <div v-for="(item, index) in bankDetails" :key="index" class="flex justify-between items-center text-sm">
          <span class="text-light-text-secondary dark:text-dark-text-secondary">{{ item.label }}:</span>
          <span :class="['font-semibold', item.highlight ? 'text-red-500 text-base' : 'text-light-text-primary dark:text-dark-text-primary']">{{ item.value }}</span>
        </div>
      </div>

      <!-- Payment Status -->
      <div class="payment-status text-center mt-6 h-6 md:col-span-2">
        <div v-if="paymentStatus === 'checking'" class="flex items-center justify-center text-blue-500">
          <i class="fas fa-spinner fa-spin mr-2"></i>
          <span class="font-medium">Đang kiểm tra thanh toán...</span>
        </div>
        <div v-else-if="paymentStatus === 'success'" class="flex items-center justify-center text-green-500">
          <i class="fas fa-check-circle mr-2"></i>
          <span class="font-medium">Thanh toán thành công!</span>
        </div>
        <div v-else-if="paymentStatus === 'timeout'" class="flex items-center justify-center text-orange-500">
          <i class="fas fa-clock mr-2"></i>
          <span class="font-medium">Thanh toán quá hạn.</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-between items-center md:col-span-2">
        <button
          @click="handleConfirmPayment"
          :disabled="isConfirmingPayment || paymentStatus === 'success'"
          class="btn-primary px-6 py-2 rounded-lg"
        >
          <span v-if="isConfirmingPayment">
            <i class="fas fa-spinner fa-spin mr-2"></i>
            Đang xác nhận...
          </span>
          <span v-else>Đã chuyển khoản</span>
        </button>
        <button @click="$emit('cancel')" class="btn-outline px-6 py-2 rounded-lg">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import type { PropType } from 'vue';
import type { SepayOrderPaymentInfo } from '@/types/payment';

const props = defineProps({
  orderId: {
    type: Number as PropType<number | null>,
    required: true,
  },
  paymentInfo: {
    type: Object as PropType<SepayOrderPaymentInfo | null>,
    required: true,
  },
  loading: Boolean,
  error: String,
  timeoutMinutes: {
    type: Number,
    default: 10,
  },

});

import OrderService from '@/services/orderService';

const emit = defineEmits(['cancel', 'retry', 'timeout', 'payment-success']);
const cartStore = useCartStore();

const timeLeft = ref(props.timeoutMinutes * 60);
const paymentStatus = ref<'idle' | 'checking' | 'success' | 'failed' | 'timeout'>('idle');
const isConfirmingPayment = ref(false);
let countdownInterval: number | undefined;
let pollingInterval: number | undefined;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const bankDetails = computed(() => {
    if (!props.paymentInfo) return [];
    const info = props.paymentInfo;
    return [
        { label: 'Ngân hàng', value: info.bank_name },
        { label: 'Số tài khoản', value: info.account_number },
        { label: 'Chủ tài khoản', value: info.account_holder_name },
        { label: 'Tiền hàng', value: formatCurrency(cartStore.subtotal) },
        { label: 'Phí vận chuyển', value: formatCurrency(cartStore.shippingFee) },
        { label: 'Tổng cộng', value: formatCurrency(info.amount), highlight: true },
        { label: 'Nội dung', value: info.content },
    ];
});

const startCountdown = () => {
  stopCountdown();
  timeLeft.value = props.timeoutMinutes * 60;
  countdownInterval = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      stopCountdown();
      emit('timeout');
    }
  }, 1000) as unknown as number;
};

const stopCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = undefined;
  }
};

const checkStatus = async () => {
  if (!props.orderId || paymentStatus.value === 'success') return;

  paymentStatus.value = 'checking';
  try {
    const response = await OrderService.checkPaymentStatus(props.orderId);
    if (response.paid) {
      paymentStatus.value = 'success';
      stopPolling();
      stopCountdown();
      emit('payment-success');
    }
  } catch (err) {
    console.error('Polling check failed, but will continue.');
  }
};

const startPolling = () => {
  stopPolling();
  if (props.orderId) {
    pollingInterval = setInterval(checkStatus, 3000) as unknown as number;
  }
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = undefined;
  }
};

watch(() => props.paymentInfo, (newInfo) => {
  if (newInfo && !props.loading && !props.error) {
    startCountdown();
    startPolling();
  }
}, { immediate: true });

watch(paymentStatus, (newStatus) => {
  if (newStatus === 'success' || newStatus === 'failed' || newStatus === 'timeout') {
    stopCountdown();
    stopPolling();
  }
});

const handleConfirmPayment = async () => {
  if (!props.orderId) return;

  isConfirmingPayment.value = true;
  try {
    const response = await OrderService.confirmPayment(props.orderId);
    if (response.success) {
      // Manually trigger a status check right away
      await checkStatus();
    }
  } catch (error: any) {
    console.error('Lỗi khi xác nhận thanh toán:', error.message);
    // Optionally, show an error message to the user
  } finally {
    isConfirmingPayment.value = false;
  }
};

onUnmounted(() => {
  stopCountdown();
  stopPolling();
});
</script>
