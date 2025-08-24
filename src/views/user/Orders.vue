<template>
  <div class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary">
    <div class="container-custom py-8">
      <h1 class="text-3xl font-bold mb-8">Đơn hàng của bạn</h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-lg">Đang tải đơn hàng...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
        <p class="font-semibold">Đã xảy ra lỗi</p>
        <p>{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="text-center py-20 border-2 border-dashed border-light-border-primary dark:border-dark-border-primary rounded-lg">
        <p class="text-xl font-semibold text-light-text-secondary dark:text-dark-text-secondary">Bạn chưa có đơn hàng nào.</p>
        <p class="mt-2">Hãy bắt đầu mua sắm ngay!</p>
        <router-link to="/products" class="btn-primary mt-6">Khám phá sản phẩm</router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order.id" class="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-md p-6 transition-shadow duration-300 hover:shadow-lg">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h2 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Đơn hàng #{{ order.id }}</h2>
              <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Ngày đặt: {{ new Date(order.created_at).toLocaleString('vi-VN') }}
              </p>
            </div>
            <div :class="statusClass(order.status)" class="mt-4 sm:mt-0">
              {{ translateStatus(order.status) }}
            </div>
          </div>
          <div class="border-t border-light-border-primary dark:border-dark-border-primary my-4"></div>
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end">
            <div>
              <p class="text-light-text-secondary dark:text-dark-text-secondary">Tổng tiền</p>
              <p class="text-2xl font-bold text-light-accent-sport dark:text-dark-accent-sport">{{ formatPrice(order.final_total) }}</p>
            </div>
            <div class="mt-4 sm:mt-0 flex items-center space-x-3">
              <button v-if="order.status === 'pending'" @click="retryPayment(order.id)" class="btn-primary">
                Thanh toán lại
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code Modal -->
    <Teleport to="body">
      <div v-if="showQRCodeModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
        <QRCodeDisplay
          :order-id="currentOrderId"
          :payment-info="paymentInfo"
          :loading="isRetryingPayment"
          @cancel="showQRCodeModal = false"
          @payment-success="handlePaymentSuccess"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { OrderService } from '@/services/orderService';
import QRCodeDisplay from '@/components/user/payment/QRCodeDisplay.vue';
import type { Order } from '@/types/order';
import type { SepayOrderPaymentInfo } from '@/types/payment';

const orders = ref<Order[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const showQRCodeModal = ref(false);
const paymentInfo = ref<SepayOrderPaymentInfo | null>(null);
const isRetryingPayment = ref(false);
const currentOrderId = ref<number | null>(null);

const formatPrice = (price: number | string) => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericPrice);
};

const translateStatus = (status: string) => {
  const statuses: { [key: string]: string } = {
    pending: 'Đang chờ xử lý',
    processing: 'Đang xử lý',
    shipped: 'Đang giao hàng',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy',
  };
  return statuses[status] || status;
};

const statusClass = (status: string) => {
  const classes: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    shipped: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };
  return `px-3 py-1 rounded-full text-sm font-semibold ${classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`;
};

onMounted(async () => {
  try {
    const response = await OrderService.getOrders();
    if (response.success && response.data) {
      orders.value = response.data.data; // Corrected to access nested data array
    } else {
      throw new Error(response.message || 'Không thể tải danh sách đơn hàng.');
    }
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});

const retryPayment = async (orderId: number) => {
  isRetryingPayment.value = true;
  error.value = null;
  try {
    const response = await OrderService.retryPayment(orderId);
    if (response.success && response.payment_info) {
      paymentInfo.value = response.payment_info;
      currentOrderId.value = orderId; // Store the current order ID
      showQRCodeModal.value = true;
    } else {
      throw new Error(response.message || 'Không thể tạo mã thanh toán.');
    }
  } catch (err: any) {
    error.value = `Lỗi khi thử thanh toán lại cho đơn hàng #${orderId}: ${err.message}`;
    showQRCodeModal.value = false;
  } finally {
    isRetryingPayment.value = false;
  }
};

const handlePaymentSuccess = () => {
  showQRCodeModal.value = false;
  fetchOrders(); // Reload orders to show the updated status
};
</script>
