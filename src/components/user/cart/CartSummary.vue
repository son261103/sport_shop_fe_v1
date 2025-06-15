<template>
  <!-- Total Price Section -->
  <div class="mt-6 max-w-5xl mx-auto">
    <div class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-xl p-4 shadow-md border border-light-border-primary dark:border-dark-border-primary hover:shadow-lg transition-all duration-300">
      <div class="flex flex-col xl:flex-row items-center justify-between gap-6">
        <!-- Total Price -->
        <div class="text-center xl:text-left">
          <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary block mb-1">Tổng cộng</span>
          <span class="text-3xl font-bold text-light-accent-sport dark:text-dark-accent-sport">{{ formatPrice(total) }}</span>
        </div>
        
        <!-- Voucher Section -->
        <div class="flex-1 max-w-md">
          <div class="flex gap-3">
            <input 
              type="text" 
              :value="voucherCode"
              @input="$emit('update:voucherCode', ($event.target as HTMLInputElement).value)"
              placeholder="Nhập mã voucher"
              class="flex-1 px-4 py-3 text-sm bg-light-surface-secondary dark:bg-dark-surface-secondary border border-light-border-primary dark:border-dark-border-primary rounded-xl text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:border-transparent transition-all duration-200"
            >
            <button 
              @click="$emit('applyVoucher')"
              class="px-4 py-3 bg-light-accent-sport dark:bg-dark-accent-sport text-white text-sm font-medium rounded-xl hover:opacity-90 hover:shadow-lg transition-all duration-200 min-w-[80px]"
            >
              Áp dụng
            </button>
          </div>
        </div>
        
        <!-- Proceed Button -->
        <div class="text-center xl:text-right">
          <button 
            @click="$emit('proceedToNextStep')"
            :disabled="selectedItemsCount === 0"
            class="px-8 py-3 bg-gradient-sport text-white font-medium rounded-xl hover:shadow-sport transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
          >
            <span class="flex items-center justify-center gap-2">
              <span>Tiếp tục</span>
              <i class="fas fa-arrow-right text-sm"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  total: number;
  voucherCode: string;
  selectedItemsCount: number;
}

interface Emits {
  'update:voucherCode': [value: string];
  applyVoucher: [];
  proceedToNextStep: [];
}

defineProps<Props>();
defineEmits<Emits>();

// Format price function
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};
</script>