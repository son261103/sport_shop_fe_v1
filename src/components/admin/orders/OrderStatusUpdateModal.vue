<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Cập nhật trạng thái</h3>
            <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Đơn hàng #{{ order?.id }}</p>
          </div>
        </div>
        <button @click="closeModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <div v-if="order" class="space-y-6">
          <!-- Current Status -->
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <h4 class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Trạng thái hiện tại</h4>
            <div class="flex items-center gap-2">
              <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ getStatusText(order.status) }}
              </span>
              <span :class="getPaymentStatusClass(order.payment_status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ getPaymentStatusText(order.payment_status) }}
              </span>
            </div>
          </div>

          <!-- Order Status Update -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Trạng thái đơn hàng
              </label>
              <select 
                v-model="newStatus" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary"
              >
                <option value="pending">Chờ xử lý</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipping">Đang giao</option>
                <option value="delivered">Đã giao</option>
                <option value="cancelled">Đã hủy</option>
                <option value="returned">Đã trả</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Trạng thái thanh toán
              </label>
              <select 
                v-model="newPaymentStatus" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary"
              >
                <option value="pending">Chờ thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="failed">Thanh toán thất bại</option>
                <option value="refunded">Đã hoàn tiền</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Ghi chú cập nhật (tùy chọn)
              </label>
              <textarea 
                v-model="updateNote" 
                rows="3"
                placeholder="Nhập ghi chú về việc cập nhật trạng thái..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Status Change Preview -->
          <div v-if="hasChanges" class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h4 class="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Xem trước thay đổi
            </h4>
            <div class="space-y-2 text-sm">
              <div v-if="newStatus !== order.status" class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Trạng thái đơn hàng:</span>
                <div class="flex items-center gap-2">
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded text-xs">
                    {{ getStatusText(order.status) }}
                  </span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  <span :class="getStatusClass(newStatus)" class="px-2 py-1 rounded text-xs">
                    {{ getStatusText(newStatus) }}
                  </span>
                </div>
              </div>
              <div v-if="newPaymentStatus !== order.payment_status" class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Trạng thái thanh toán:</span>
                <div class="flex items-center gap-2">
                  <span :class="getPaymentStatusClass(order.payment_status)" class="px-2 py-1 rounded text-xs">
                    {{ getPaymentStatusText(order.payment_status) }}
                  </span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  <span :class="getPaymentStatusClass(newPaymentStatus)" class="px-2 py-1 rounded text-xs">
                    {{ getPaymentStatusText(newPaymentStatus) }}
                  </span>
                </div>
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
          Hủy
        </button>
        <button 
          @click="updateStatus"
          :disabled="!hasChanges || isUpdating"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg v-if="isUpdating" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Order } from '@/types/admin/order'

interface Props {
  show: boolean
  order: Order | null
}

interface Emits {
  (e: 'close'): void
  (e: 'update', data: { orderId: number, status: string, paymentStatus: string, note?: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form state
const newStatus = ref('')
const newPaymentStatus = ref('')
const updateNote = ref('')
const isUpdating = ref(false)

// Watch for order changes to reset form
watch(() => props.order, (order) => {
  if (order) {
    newStatus.value = order.status
    newPaymentStatus.value = order.payment_status
    updateNote.value = ''
  }
}, { immediate: true })

// Computed properties
const hasChanges = computed(() => {
  if (!props.order) return false
  return newStatus.value !== props.order.status || 
         newPaymentStatus.value !== props.order.payment_status
})

// Methods
const closeModal = () => {
  emit('close')
}

const updateStatus = async () => {
  if (!props.order || !hasChanges.value) return
  
  isUpdating.value = true
  
  try {
    // Emit update event with new status data
    emit('update', {
      orderId: props.order.id,
      status: newStatus.value,
      paymentStatus: newPaymentStatus.value,
      note: updateNote.value || undefined
    })
    
    // Close modal after successful update
    closeModal()
  } catch (error) {
    console.error('Error updating order status:', error)
  } finally {
    isUpdating.value = false
  }
}

// Status helper functions
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