<template>
  <div class="qr-code-display bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
    <!-- Header -->
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-800 mb-2">Thanh toán đơn hàng</h3>
      <p class="text-gray-600">Vui lòng chọn phương thức thanh toán</p>
    </div>

    <!-- Payment Method Tabs -->
    <div class="payment-tabs mb-6">
      <div class="flex border-b">
        <button 
          @click="activeTab = 'qr'" 
          :class="[activeTab === 'qr' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500', 'flex-1 py-2 font-medium']"
        >
          <i class="fas fa-qrcode mr-2"></i>Quét mã QR
        </button>
        <button 
          @click="activeTab = 'bank'" 
          :class="[activeTab === 'bank' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500', 'flex-1 py-2 font-medium']"
        >
          <i class="fas fa-university mr-2"></i>Chuyển khoản
        </button>
      </div>
    </div>

    <!-- QR Code Section -->
    <div v-if="activeTab === 'qr'" class="qr-code-container mb-6">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="loading-spinner"></div>
        <span class="ml-3 text-gray-600">Đang tạo mã QR...</span>
      </div>
      
      <div v-else-if="error" class="text-center text-red-600 p-4">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="font-medium mb-2">Không thể tạo mã QR</p>
        <p class="text-sm">{{ error }}</p>
        <button @click="$emit('retry')" class="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Thử lại
        </button>
      </div>
      
      <div v-else-if="qrCodeUrl" class="text-center">
        <img :src="qrCodeUrl" alt="QR Code" class="mx-auto mb-4 border rounded" @error="handleImageError" />
        
        <!-- Payment Info -->
        <div v-if="paymentInfo" class="bg-gray-50 rounded-lg p-4 mb-4">
          <div class="text-sm text-gray-600 space-y-2">
            <div class="flex justify-between">
              <span>Số tiền:</span>
              <span class="font-medium text-gray-800">{{ formatCurrency(paymentInfo.amount) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Mã đơn hàng:</span>
              <span class="font-medium text-gray-800">{{ paymentInfo.orderCode }}</span>
            </div>
          </div>
        </div>
        
        <!-- Countdown Timer -->
        <div class="text-center mb-4">
          <p class="text-sm text-gray-600 mb-1">Thời gian còn lại:</p>
          <p class="text-2xl font-bold text-red-600">{{ formatTime(timeLeft) }}</p>
        </div>
      </div>
    </div>
    
    <!-- Bank Transfer Section -->
    <div v-if="activeTab === 'bank'" class="bank-transfer-container mb-6">
      <BankInfo 
        :amount="paymentInfo?.amount || 0" 
        :order-code="paymentInfo?.orderCode || ''"
      />
    </div>

    <!-- Payment Status -->
    <div class="payment-status text-center mb-6">
      <div v-if="paymentStatus === 'checking'" class="text-blue-600">
        <div class="loading-spinner mx-auto mb-2"></div>
        <p class="font-medium">Đang kiểm tra thanh toán...</p>
      </div>
      
      <div v-else-if="paymentStatus === 'success'" class="text-green-600">
        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="font-medium">Thanh toán thành công!</p>
      </div>
      
      <div v-else-if="paymentStatus === 'failed'" class="text-red-600">
        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <p class="font-medium">Thanh toán thất bại</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons space-y-3">
      <button 
        v-if="paymentStatus !== 'success'"
        @click="$emit('check-payment')"
        :disabled="paymentStatus === 'checking'"
        class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {{ paymentStatus === 'checking' ? 'Đang kiểm tra...' : 'Kiểm tra thanh toán' }}
      </button>
      
      <button 
        @click="$emit('cancel')"
        class="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
      >
        Hủy thanh toán
      </button>
    </div>

    <!-- Instructions -->
    <div class="instructions mt-6 text-sm text-gray-600">
      <h4 class="font-medium mb-2">Hướng dẫn thanh toán:</h4>
      <ol class="list-decimal list-inside space-y-1">
        <li>Mở ứng dụng ngân hàng trên điện thoại</li>
        <li>Chọn chức năng quét mã QR</li>
        <li>Quét mã QR hiển thị trên màn hình</li>
        <li>Xác nhận thông tin và thực hiện thanh toán</li>
        <li>Chờ hệ thống xác nhận thanh toán</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import BankInfo from './BankInfo.vue'

const props = defineProps({
  paymentInfo: {
    type: Object,
    default: () => ({})
  },
  qrCodeUrl: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  paymentStatus: {
    type: String,
    default: 'idle'
  },
  timeoutMinutes: {
    type: Number,
    default: 15
  }
})

const emit = defineEmits(['check-payment', 'cancel', 'retry', 'timeout'])

// Active tab state
const activeTab = ref('qr')

// Countdown timer
const timeLeft = ref(props.timeoutMinutes * 60)
let countdownInterval = null

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const handleImageError = () => {
  emit('retry')
}

const startCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  
  countdownInterval = setInterval(() => {
    timeLeft.value--
    
    if (timeLeft.value <= 0) {
      clearInterval(countdownInterval)
      emit('timeout')
    }
  }, 1000)
}

const stopCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
}

onMounted(() => {
  if (!props.loading && !props.error) {
    startCountdown()
  }
})

onUnmounted(() => {
  stopCountdown()
})

// Watch for payment success to stop countdown
watchEffect(() => {
  if (props.paymentStatus === 'success') {
    stopCountdown()
  }
})
</script>

<style scoped>
.qr-code-display {
  min-height: 400px;
}

.qr-code-container img {
  max-width: 200px;
  max-height: 200px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>