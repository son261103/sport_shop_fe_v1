<template>
  <div class="max-w-4xl mx-auto">
    <div data-aos="fade-up" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl p-8 shadow-card border border-light-border-primary dark:border-dark-border-primary">
      <h2 class="text-base font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
        <i class="fas fa-credit-card mr-2 text-light-accent-sport dark:text-dark-accent-sport"></i>
        Phương thức thanh toán
      </h2>
      
      <div class="space-y-2">
        <div 
          v-for="method in paymentMethods" 
          :key="method.id"
          @click="selectPaymentMethod(method.id)"
          class="p-2 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md"
          :class="{
            'border-light-accent-sport dark:border-dark-accent-sport bg-light-accent-sport/5 dark:bg-dark-accent-sport/5': selectedPaymentMethod === method.id,
            'border-light-border-primary dark:border-dark-border-primary': selectedPaymentMethod !== method.id
          }"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                   :class="{
                     'border-light-accent-sport dark:border-dark-accent-sport': selectedPaymentMethod === method.id,
                     'border-light-border-primary dark:border-dark-border-primary': selectedPaymentMethod !== method.id
                   }">
                <div v-if="selectedPaymentMethod === method.id" 
                     class="w-2 h-2 rounded-full bg-light-accent-sport dark:bg-dark-accent-sport"></div>
              </div>
              
              <div class="flex items-center gap-2">
                <i :class="method.icon" class="text-sm text-light-accent-sport dark:text-dark-accent-sport"></i>
                <div>
                  <h3 class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">{{ method.name }}</h3>
                  <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary">{{ method.description }}</p>
                </div>
              </div>
            </div>
            
            <div v-if="method.fee" class="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Phí: {{ formatPrice(method.fee) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Payment Details -->
      <div v-if="selectedPaymentMethod === 'bank'" class="mt-6 p-6 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-xl border border-light-border-primary dark:border-dark-border-primary">
        <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          <i class="fas fa-qrcode mr-2 text-light-accent-sport dark:text-dark-accent-sport"></i>
          Thông tin chuyển khoản
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- QR Code -->
          <div class="text-center">
            <div class="bg-white p-4 rounded-lg inline-block shadow-md">
              <svg width="200" height="200" viewBox="0 0 200 200" class="border">
                <!-- Simple QR code pattern -->
                <rect width="200" height="200" fill="white"/>
                <g fill="black">
                  <!-- Corner squares -->
                  <rect x="10" y="10" width="60" height="60"/>
                  <rect x="130" y="10" width="60" height="60"/>
                  <rect x="10" y="130" width="60" height="60"/>
                  <!-- Inner corner squares -->
                  <rect x="20" y="20" width="40" height="40" fill="white"/>
                  <rect x="140" y="20" width="40" height="40" fill="white"/>
                  <rect x="20" y="140" width="40" height="40" fill="white"/>
                  <rect x="30" y="30" width="20" height="20"/>
                  <rect x="150" y="30" width="20" height="20"/>
                  <rect x="30" y="150" width="20" height="20"/>
                  <!-- Random pattern -->
                  <rect x="80" y="20" width="10" height="10"/>
                  <rect x="100" y="20" width="10" height="10"/>
                  <rect x="80" y="40" width="10" height="10"/>
                  <rect x="110" y="40" width="10" height="10"/>
                  <rect x="90" y="60" width="10" height="10"/>
                  <rect x="80" y="80" width="10" height="10"/>
                  <rect x="100" y="80" width="10" height="10"/>
                  <rect x="120" y="80" width="10" height="10"/>
                  <rect x="90" y="100" width="10" height="10"/>
                  <rect x="110" y="100" width="10" height="10"/>
                  <rect x="80" y="120" width="10" height="10"/>
                  <rect x="100" y="120" width="10" height="10"/>
                  <rect x="120" y="120" width="10" height="10"/>
                  <rect x="140" y="120" width="10" height="10"/>
                  <rect x="160" y="120" width="10" height="10"/>
                  <rect x="80" y="140" width="10" height="10"/>
                  <rect x="100" y="140" width="10" height="10"/>
                  <rect x="120" y="140" width="10" height="10"/>
                  <rect x="140" y="140" width="10" height="10"/>
                  <rect x="160" y="140" width="10" height="10"/>
                  <rect x="80" y="160" width="10" height="10"/>
                  <rect x="100" y="160" width="10" height="10"/>
                  <rect x="120" y="160" width="10" height="10"/>
                  <rect x="140" y="160" width="10" height="10"/>
                  <rect x="160" y="160" width="10" height="10"/>
                  <rect x="80" y="180" width="10" height="10"/>
                  <rect x="100" y="180" width="10" height="10"/>
                  <rect x="120" y="180" width="10" height="10"/>
                  <rect x="140" y="180" width="10" height="10"/>
                  <rect x="160" y="180" width="10" height="10"/>
                </g>
              </svg>
            </div>
            <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
              Quét mã QR để chuyển khoản
            </p>
          </div>
          
          <!-- Bank Info -->
          <div class="space-y-4">
            <div class="bg-light-surface-primary dark:bg-dark-surface-primary p-4 rounded-lg border border-light-border-primary dark:border-dark-border-primary">
              <h4 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">Thông tin tài khoản</h4>
              
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Ngân hàng:</span>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Vietcombank</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Số tài khoản:</span>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary font-mono">1234567890</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Chủ tài khoản:</span>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">SPORT SHOP</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Số tiền:</span>
                  <span class="font-bold text-light-accent-sport dark:text-dark-accent-sport">{{ formatPrice(total) }}</span>
                </div>
                
                <div class="border-t border-light-border-primary dark:border-dark-border-primary pt-3 mt-3">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Nội dung chuyển khoản:</span>
                  <div class="mt-1 p-2 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded border border-light-border-primary dark:border-dark-border-primary">
                    <span class="font-mono text-sm text-light-text-primary dark:text-dark-text-primary">SPORTSHOP {{ Date.now().toString().slice(-6) }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <i class="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 mt-1"></i>
                <div class="text-sm">
                  <p class="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Lưu ý quan trọng:</p>
                  <ul class="text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Vui lòng chuyển khoản đúng số tiền và nội dung</li>
                    <li>• Đơn hàng sẽ được xử lý sau khi nhận được thanh toán</li>
                    <li>• Liên hệ hotline nếu cần hỗ trợ: 1900-xxxx</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- VNPay Details -->
      <div v-if="selectedPaymentMethod === 'vnpay'" class="mt-6 p-6 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-xl border border-light-border-primary dark:border-dark-border-primary">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-wallet text-2xl text-white"></i>
          </div>
          <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Thanh toán qua VNPay
          </h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Bạn sẽ được chuyển hướng đến cổng thanh toán VNPay để hoàn tất giao dịch
          </p>
          <div class="bg-light-surface-primary dark:bg-dark-surface-primary p-4 rounded-lg border border-light-border-primary dark:border-dark-border-primary">
            <div class="flex justify-between items-center">
              <span class="text-light-text-secondary dark:text-dark-text-secondary">Số tiền thanh toán:</span>
              <span class="font-bold text-xl text-light-accent-sport dark:text-dark-accent-sport">{{ formatPrice(total) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="mt-8 p-6 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-xl">
        <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Tóm tắt đơn hàng
        </h3>
        
        <div class="space-y-3">
          <div class="flex justify-between text-light-text-secondary dark:text-dark-text-secondary">
            <span>Tạm tính:</span>
            <span>{{ formatPrice(subtotal) }}</span>
          </div>
          
          <div v-if="shippingFee > 0" class="flex justify-between text-light-text-secondary dark:text-dark-text-secondary">
            <span>Phí vận chuyển:</span>
            <span>{{ formatPrice(shippingFee) }}</span>
          </div>
          
          <div v-if="paymentFee > 0" class="flex justify-between text-light-text-secondary dark:text-dark-text-secondary">
            <span>Phí thanh toán:</span>
            <span>{{ formatPrice(paymentFee) }}</span>
          </div>
          
          <div v-if="discount > 0" class="flex justify-between text-green-600">
            <span>Giảm giá:</span>
            <span>-{{ formatPrice(discount) }}</span>
          </div>
          
          <hr class="border-light-border-primary dark:border-dark-border-primary">
          
          <div class="flex justify-between text-lg font-bold text-light-text-primary dark:text-dark-text-primary">
            <span>Tổng cộng:</span>
            <span class="text-light-accent-sport dark:text-dark-accent-sport">{{ formatPrice(total) }}</span>
          </div>
        </div>
      </div>
      
      <div class="flex justify-between mt-8">
        <button 
          @click="$emit('goBack')"
          class="flex items-center gap-2 px-6 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary text-light-text-primary dark:text-dark-text-primary rounded-xl hover:bg-light-border-primary dark:hover:bg-dark-border-primary transition-all duration-200 font-medium border border-light-border-primary dark:border-dark-border-primary"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </button>
        
        <button 
          @click="$emit('placeOrder')"
          :disabled="!selectedPaymentMethod"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-sport text-white rounded-xl hover:shadow-sport transition-all duration-300 font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <i class="fas fa-check-circle"></i>
          <span>Đặt hàng</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  fee?: number;
}

interface Props {
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: string;
  subtotal: number;
  shippingFee: number;
  paymentFee: number;
  discount: number;
  total: number;
}

interface Emits {
  'update:selectedPaymentMethod': [methodId: string];
  goBack: [];
  placeOrder: [];
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const selectPaymentMethod = (methodId: string) => {
  emit('update:selectedPaymentMethod', methodId);
};

// Format price function
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};
</script>