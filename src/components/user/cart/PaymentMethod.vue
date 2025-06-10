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