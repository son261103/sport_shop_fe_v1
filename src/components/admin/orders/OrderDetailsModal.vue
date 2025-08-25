<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Chi tiết đơn hàng #{{ order?.id }}</h3>
            <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Thông tin chi tiết và sản phẩm</p>
          </div>
        </div>
        <button @click="closeModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <div v-if="order" class="space-y-6">
          <!-- Order Info -->
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Thông tin đơn hàng
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Mã đơn hàng:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">#{{ order.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Ngày đặt:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ formatDate(order.created_at) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Trạng thái:</span>
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ getStatusText(order.status) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Thanh toán:</span>
                  <span :class="getPaymentStatusClass(order.payment_status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ getPaymentStatusText(order.payment_status) }}
                  </span>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Tổng tiền:</span>
                  <span class="font-bold text-green-600 dark:text-green-400 text-lg">{{ formatCurrency(order.final_total) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Phí vận chuyển:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ formatCurrency(order.shipping_fee || 0) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Giảm giá:</span>
                  <span class="font-semibold text-red-600 dark:text-red-400">-{{ formatCurrency(order.discount_amount || 0) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Phương thức thanh toán:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ order.payment_method || 'COD' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Info -->
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Thông tin khách hàng
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Tên khách hàng:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ order.user.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Email:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ order.user.email }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Số điện thoại:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ order.shipping_phone }}</span>
                </div>
              </div>
              <div class="space-y-3">
                <div>
                  <span class="text-light-text-secondary dark:text-dark-text-secondary block mb-1">Địa chỉ giao hàng:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ order.shipping_address }}</span>
                </div>
                <div v-if="order.notes">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary block mb-1">Ghi chú:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ order.notes }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              Sản phẩm đã đặt ({{ order.order_details?.length || 0 }} sản phẩm)
            </h4>
            <div v-if="order.order_details && order.order_details.length > 0" class="space-y-4">
              <div v-for="item in order.order_details" :key="item.id" class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                    <img 
                      v-if="item.product.image" 
                      :src="item.product.image" 
                      :alt="item.product.name"
                      class="w-full h-full object-cover"
                      @error="($event.target as HTMLImageElement).style.display='none'"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="flex-1">
                  <h5 class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ item.product.name }}</h5>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ item.product.brand?.name }}</p>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ formatCurrency(item.price) }} x {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-green-600 dark:text-green-400">{{ formatCurrency(item.total) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"></path>
              </svg>
              <p class="text-light-text-secondary dark:text-dark-text-secondary">Không có sản phẩm nào</p>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              Tổng kết đơn hàng
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span class="text-light-text-secondary dark:text-dark-text-secondary">Tổng sản phẩm:</span>
                <span class="font-bold text-blue-600 dark:text-blue-400">{{ order.order_details?.length || 0 }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span class="text-light-text-secondary dark:text-dark-text-secondary">Tổng số lượng:</span>
                <span class="font-bold text-purple-600 dark:text-purple-400">{{ getTotalQuantity(order.order_details) }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span class="text-light-text-secondary dark:text-dark-text-secondary">Tổng tiền hàng:</span>
                <span class="font-bold text-green-600 dark:text-green-400">{{ formatCurrency(order.total_price) }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span class="text-light-text-secondary dark:text-dark-text-secondary">Thành tiền:</span>
                <span class="font-bold text-red-600 dark:text-red-400 text-lg">{{ formatCurrency(order.final_total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
        >
          Đóng
        </button>
        <button 
          v-if="order && canUpdateStatus(order.status)"
          @click="$emit('update-status', order)"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          Cập nhật trạng thái
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order, OrderDetail } from '@/types/admin/order'

interface Props {
  show: boolean
  order: Order | null
}

interface Emits {
  (e: 'close'): void
  (e: 'update-status', order: Order): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const closeModal = () => {
  emit('close')
}

// Format functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Status functions
const getStatusClass = (status: string) => {
  const statusClasses = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'confirmed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'processing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'shipping': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    'delivered': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    'returned': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
  return statusClasses[status as keyof typeof statusClasses] || statusClasses.pending
}

const getStatusText = (status: string) => {
  const statusTexts = {
    'pending': 'Chờ xử lý',
    'confirmed': 'Đã xác nhận',
    'processing': 'Đang xử lý',
    'shipping': 'Đang giao',
    'delivered': 'Đã giao',
    'cancelled': 'Đã hủy',
    'returned': 'Đã trả'
  }
  return statusTexts[status as keyof typeof statusTexts] || 'Chờ xử lý'
}

const getPaymentStatusClass = (status: string) => {
  const statusClasses = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'paid': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'failed': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    'refunded': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
  return statusClasses[status as keyof typeof statusClasses] || statusClasses.pending
}

const getPaymentStatusText = (status: string) => {
  const statusTexts = {
    'pending': 'Chờ thanh toán',
    'paid': 'Đã thanh toán',
    'failed': 'Thanh toán thất bại',
    'refunded': 'Đã hoàn tiền'
  }
  return statusTexts[status as keyof typeof statusTexts] || 'Chờ thanh toán'
}

const canUpdateStatus = (status: string) => {
  return !['delivered', 'cancelled', 'returned'].includes(status)
}

// Calculate functions
const getTotalQuantity = (items: OrderDetail[] | undefined) => {
  if (!items) return 0
  return items.reduce((total, item) => total + item.quantity, 0)
}
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}
</style>