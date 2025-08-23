<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <button
            @click="$router.back()"
            class="btn btn-ghost btn-sm"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Quay lại
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Chi tiết đơn hàng #{{ orderId }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Thông tin chi tiết và trạng thái đơn hàng
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="refreshOrder"
            class="btn btn-outline btn-sm"
            :disabled="loading"
          >
            <i class="fas fa-refresh mr-2"></i>
            Làm mới
          </button>
          <button
            v-if="order"
            @click="editOrderStatus"
            class="btn btn-primary btn-sm"
          >
            <i class="fas fa-edit mr-2"></i>
            Cập nhật trạng thái
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
      <div class="flex items-center justify-center">
        <span class="loading loading-spinner loading-lg mr-3"></span>
        <span class="text-lg">Đang tải thông tin đơn hàng...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
      <div class="text-center text-red-500">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <h3 class="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
        <p class="mb-4">{{ error }}</p>
        <button @click="refreshOrder" class="btn btn-primary">
          Thử lại
        </button>
      </div>
    </div>

    <!-- Order Details -->
    <div v-else-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Order Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Order Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">Trạng thái đơn hàng</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Trạng thái đơn hàng</div>
              <span :class="getStatusBadgeClass(order.status)" class="badge badge-lg">
                {{ getStatusText(order.status) }}
              </span>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Trạng thái thanh toán</div>
              <span :class="getPaymentStatusBadgeClass(order.payment_status)" class="badge badge-lg">
                {{ getPaymentStatusText(order.payment_status) }}
              </span>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Phương thức thanh toán</div>
              <span class="badge badge-outline badge-lg">
                {{ getPaymentMethodText(order.payment_method) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">Sản phẩm đã đặt</h2>
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                <img
                  v-if="item.product?.image"
                  :src="item.product.image"
                  :alt="item.product?.name"
                  class="w-full h-full object-cover rounded-lg"
                />
                <i v-else class="fas fa-image text-gray-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  {{ item.product?.name || 'Sản phẩm không xác định' }}
                </h3>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Số lượng: {{ item.quantity }} × {{ formatPrice(item.price) }}
                </div>
              </div>
              <div class="text-right">
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ formatPrice(parseFloat(item.price) * item.quantity) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Notes -->
        <div v-if="order.notes" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">Ghi chú đơn hàng</h2>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p class="text-gray-700 dark:text-gray-300">{{ order.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Customer Info -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">Thông tin khách hàng</h2>
          <div class="space-y-3">
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Tên khách hàng</div>
              <div class="font-medium">{{ order.user?.name || 'N/A' }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Email</div>
              <div class="font-medium">{{ order.user?.email || 'N/A' }}</div>
            </div>
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">Địa chỉ giao hàng</h2>
          <div class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {{ order.shipping_address || 'Chưa có thông tin địa chỉ' }}
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">Tổng kết đơn hàng</h2>
          <div class="space-y-3">
            <div class="flex justify-between text-lg font-semibold text-green-600">
              <span>Tổng tiền:</span>
              <span>{{ formatPrice(order.total_amount) }}</span>
            </div>
          </div>
        </div>

        <!-- Order Timeline -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">Thời gian</h2>
          <div class="space-y-3">
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Ngày tạo</div>
              <div class="font-medium">{{ formatDate(order.created_at) }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Cập nhật lần cuối</div>
              <div class="font-medium">{{ formatDate(order.updated_at) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { orderService } from '../../../services/admin/orderService';
import type { Order } from '../../../types/admin/order';
import { useNotification } from '../../../composables/useNotification';

const route = useRoute();
const { showNotification } = useNotification();

const orderId = ref<number>(parseInt(route.params.id as string));
const loading = ref(false);
const error = ref<string>('');
const order = ref<Order | null>(null);

const loadOrder = async () => {
  try {
    loading.value = true;
    error.value = '';
    const response = await orderService.getOrder(orderId.value);
    order.value = response.data;
  } catch (err: any) {
    console.error('Error loading order:', err);
    error.value = err.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin đơn hàng';
  } finally {
    loading.value = false;
  }
};

const refreshOrder = () => {
  loadOrder();
};

const editOrderStatus = () => {
  // TODO: Open status update modal
  console.log('Edit order status:', order.value);
};

const formatPrice = (price: string | number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(numPrice);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    processing: 'Đang xử lý',
    shipped: 'Đã gửi hàng',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy'
  };
  return statusMap[status] || status;
};

const getStatusBadgeClass = (status: string) => {
  const classMap: Record<string, string> = {
    pending: 'badge-warning',
    confirmed: 'badge-info',
    processing: 'badge-primary',
    shipped: 'badge-accent',
    delivered: 'badge-success',
    cancelled: 'badge-error'
  };
  return classMap[status] || 'badge-neutral';
};

const getPaymentStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'Chờ thanh toán',
    paid: 'Đã thanh toán',
    failed: 'Thất bại',
    refunded: 'Đã hoàn tiền'
  };
  return statusMap[status] || status;
};

const getPaymentStatusBadgeClass = (status: string) => {
  const classMap: Record<string, string> = {
    pending: 'badge-warning',
    paid: 'badge-success',
    failed: 'badge-error',
    refunded: 'badge-info'
  };
  return classMap[status] || 'badge-neutral';
};

const getPaymentMethodText = (method: string) => {
  const methodMap: Record<string, string> = {
    sepay: 'SePay',
    cod: 'Thanh toán khi nhận hàng'
  };
  return methodMap[method] || method;
};

onMounted(() => {
  loadOrder();
});
</script>