<template>
  <div class="bank-info bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Thông tin tài khoản ngân hàng</h3>
    
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="loading-spinner"></div>
      <span class="ml-3 text-gray-600">Đang tải thông tin...</span>
    </div>
    
    <div v-else-if="error" class="text-center text-red-600 p-4">
      <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="font-medium mb-2">Không thể tải thông tin ngân hàng</p>
      <p class="text-sm">{{ error }}</p>
      <button @click="fetchBankInfo" class="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Thử lại
      </button>
    </div>
    
    <div v-else-if="bankInfo" class="space-y-4">
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Ngân hàng:</span>
            <span class="font-medium text-gray-800">{{ bankInfo.bank_name }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Số tài khoản:</span>
            <span class="font-medium text-gray-800">{{ bankInfo.account_number }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Chủ tài khoản:</span>
            <span class="font-medium text-gray-800">{{ bankInfo.account_holder_name }}</span>
          </div>
        </div>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 class="font-medium text-blue-800 mb-2">Hướng dẫn chuyển khoản:</h4>
        <ol class="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>Mở ứng dụng ngân hàng trên điện thoại</li>
          <li>Chọn chức năng chuyển khoản</li>
          <li>Nhập thông tin tài khoản như trên</li>
          <li>Nhập số tiền: <span class="font-medium">{{ formatCurrency(amount) }}</span></li>
          <li>Nhập nội dung chuyển khoản: <span class="font-medium">{{ orderCode }}</span></li>
          <li>Xác nhận và thực hiện chuyển khoản</li>
        </ol>
      </div>
      
      <div class="flex justify-between items-center">
        <button 
          @click="copyAccountNumber" 
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Sao chép số tài khoản
        </button>
        
        <button 
          @click="copyAmount" 
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Sao chép số tiền
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiClient } from '@/services/api'

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  orderCode: {
    type: String,
    required: true
  }
})

const bankInfo = ref(null)
const loading = ref(false)
const error = ref('')
const copySuccess = ref(false)

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const fetchBankInfo = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await apiClient.get('/sepay/bank-info')
    if (response.data.success) {
      bankInfo.value = response.data.data
    } else {
      error.value = response.data.message || 'Không thể tải thông tin ngân hàng'
    }
  } catch (err) {
    console.error('Lỗi khi tải thông tin ngân hàng:', err)
    error.value = 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
    return true
  } catch (err) {
    console.error('Lỗi khi sao chép:', err)
    return false
  }
}

const copyAccountNumber = () => {
  if (bankInfo.value) {
    copyToClipboard(bankInfo.value.account_number)
  }
}

const copyAmount = () => {
  copyToClipboard(props.amount.toString())
}

onMounted(() => {
  fetchBankInfo()
})
</script>

<style scoped>
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