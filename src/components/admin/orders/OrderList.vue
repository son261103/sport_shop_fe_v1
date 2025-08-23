<template>
  <div class="space-y-6">
    <!-- Header và Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Quản lý đơn hàng</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Quản lý và theo dõi tất cả đơn hàng</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="refreshOrders"
            class="btn btn-outline btn-sm"
            :disabled="loading"
          >
            <i class="fas fa-refresh mr-2"></i>
            Làm mới
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trạng thái đơn hàng
          </label>
          <select
            v-model="filters.status"
            @change="applyFilters"
            class="select select-bordered w-full"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipped">Đã gửi hàng</option>
            <option value="delivered">Đã giao hàng</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trạng thái thanh toán
          </label>
          <select
            v-model="filters.payment_status"
            @change="applyFilters"
            class="select select-bordered w-full"
          >
            <option value="">Tất cả</option>
            <option value="pending">Chờ thanh toán</option>
            <option value="paid">Đã thanh toán</option>
            <option value="failed">Thất bại</option>
            <option value="refunded">Đã hoàn tiền</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phương thức thanh toán
          </label>
          <select
            v-model="filters.payment_method"
            @change="applyFilters"
            class="select select-bordered w-full"
          >
            <option value="">Tất cả</option>
            <option value="sepay">SePay</option>
            <option value="cod">Thanh toán khi nhận hàng</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tìm kiếm
          </label>
          <div class="relative">
            <input
              v-model="filters.search"
              @input="debounceSearch"
              type="text"
              placeholder="Tìm theo ID, tên khách hàng..."
              class="input input-bordered w-full pl-10"
            />
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="text-left">ID</th>
              <th class="text-left">Khách hàng</th>
              <th class="text-left">Tổng tiền</th>
              <th class="text-left">Trạng thái</th>
              <th class="text-left">Thanh toán</th>
              <th class="text-left">Phương thức</th>
              <th class="text-left">Ngày tạo</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" class="text-center">
              <td colspan="8" class="py-8">
                <div class="flex items-center justify-center">
                  <span class="loading loading-spinner loading-md mr-2"></span>
                  Đang tải...
                </div>
              </td>
            </tr>
            <tr v-else-if="orders.length === 0" class="text-center">
              <td colspan="8" class="py-8 text-gray-500 dark:text-gray-400">
                <i class="fas fa-inbox text-4xl mb-2 block"></i>
                Không có đơn hàng nào
              </td>
            </tr>
            <tr v-else v-for="order in orders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="font-mono text-sm">#{{ order.id }}</td>
              <td>
                <div>
                  <div class="font-medium">{{ order.user?.name || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">{{ order.user?.email || 'N/A' }}</div>
                </div>
              </td>
              <td class="font-semibold text-green-600">{{ formatPrice(order.total_amount) }}</td>
              <td>
                <span :class="getStatusBadgeClass(order.status)" class="badge badge-sm">
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td>
                <span :class="getPaymentStatusBadgeClass(order.payment_status)" class="badge badge-sm">
                  {{ getPaymentStatusText(order.payment_status) }}
                </span>
              </td>
              <td>
                <span class="badge badge-outline badge-sm">
                  {{ getPaymentMethodText(order.payment_method) }}
                </span>
              </td>
              <td class="text-sm text-gray-500">{{ formatDate(order.created_at) }}</td>
              <td>
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="viewOrder(order.id)"
                    class="btn btn-ghost btn-xs"
                    title="Xem chi tiết"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    @click="editOrderStatus(order)"
                    class="btn btn-ghost btn-xs"
                    title="Cập nhật trạng thái"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteOrder(order.id)"
                    class="btn btn-ghost btn-xs text-red-500 hover:text-red-700"
                    title="Xóa đơn hàng"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.total > 0" class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {{ pagination.from || 0 }} - {{ pagination.to || 0 }} trong tổng số {{ pagination.total }} đơn hàng
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="goToPage(pagination.current_page - 1)"
              :disabled="pagination.current_page <= 1"
              class="btn btn-sm btn-outline"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="text-sm">
              Trang {{ pagination.current_page }} / {{ pagination.last_page }}
            </span>
            <button
              @click="goToPage(pagination.current_page + 1)"
              :disabled="pagination.current_page >= pagination.last_page"
              class="btn btn-sm btn-outline"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { orderService } from '../../../services/admin/orderService';
import type { Order, OrderListParams } from '../../../types/admin/order';
import { useNotification } from '../../../composables/useNotification';

const router = useRouter();
const { showNotification } = useNotification();

const loading = ref(false);
const orders = ref<Order[]>([]);
const pagination = ref<any>(null);

const filters = reactive<OrderListParams>({
  status: '',
  payment_status: '',
  payment_method: '',
  search: '',
  page: 1,
  per_page: 20
});

let searchTimeout: NodeJS.Timeout;

const debounceSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    applyFilters();
  }, 500);
};

const loadOrders = async () => {
  try {
    loading.value = true;
    const response = await orderService.getOrders(filters);
    orders.value = response.data;
    pagination.value = response.pagination;
  } catch (error: any) {
    console.error('Error loading orders:', error);
    showNotification('Có lỗi xảy ra khi tải danh sách đơn hàng', 'error');
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  filters.page = 1;
  loadOrders();
};

const refreshOrders = () => {
  loadOrders();
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= (pagination.value?.last_page || 1)) {
    filters.page = page;
    loadOrders();
  }
};

const viewOrder = (id: number) => {
  router.push(`/admin/orders/${id}`);
};

const editOrderStatus = (order: Order) => {
  // TODO: Open status update modal
  console.log('Edit order status:', order);
};

const deleteOrder = async (id: number) => {
  if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return;
  
  try {
    await orderService.deleteOrder(id);
    showNotification('Xóa đơn hàng thành công', 'success');
    loadOrders();
  } catch (error: any) {
    console.error('Error deleting order:', error);
    showNotification('Có lỗi xảy ra khi xóa đơn hàng', 'error');
  }
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
    cod: 'COD'
  };
  return methodMap[method] || method;
};

onMounted(() => {
  loadOrders();
});
</script>