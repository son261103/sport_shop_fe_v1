<template>
  <div class="space-y-6">
    <!-- Cart Header -->
    <div class="space-y-3 max-w-5xl mx-auto">
      <div data-aos="fade-up" data-aos-delay="200" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-xl p-4 shadow-md border border-light-border-primary dark:border-dark-border-primary hover:shadow-lg transition-all duration-300">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <input 
              type="checkbox" 
              :checked="allSelected" 
              @change="$emit('toggleSelectAll')"
              class="w-5 h-5 text-light-accent-sport dark:text-dark-accent-sport bg-light-surface-secondary dark:bg-dark-surface-secondary border-light-border-primary dark:border-dark-border-primary rounded-lg focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 transform scale-110"
            >
            <span class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              Chọn tất cả ({{ cartItems.length }} sản phẩm)
            </span>
          </div>
          
          <button 
            @click="$emit('clearCart')" 
            class="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 font-medium border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
          >
            <i class="fas fa-trash"></i>
            <span class="hidden sm:inline">Xóa tất cả</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Items -->
    <div class="space-y-3 max-w-5xl mx-auto">
      <div 
        v-for="item in sortedCartItems" 
        :key="item.id"
        data-aos="fade-up" 
        data-aos-delay="300"
        class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-xl p-4 shadow-md border border-light-border-primary dark:border-dark-border-primary hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
      >
        <div class="flex items-center gap-6">
          <!-- Checkbox -->
          <input 
            type="checkbox" 
            :value="item.id" 
            :checked="selectedItems.includes(item.id)"
            @change="$emit('toggleItem', item.id)"
            class="w-5 h-5 text-light-accent-sport dark:text-dark-accent-sport bg-light-surface-secondary dark:bg-dark-surface-secondary border-light-border-primary dark:border-dark-border-primary rounded-lg focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 transform scale-110"
          >
          
          <!-- Product Image -->
          <div class="flex-shrink-0">
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-20 h-20 object-cover rounded-xl border-2 border-light-border-primary dark:border-dark-border-primary shadow-sm hover:shadow-md transition-shadow duration-300"
            >
          </div>
          
          <!-- Product Info -->
          <div class="flex-1 min-w-0">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <!-- Product Details -->
              <div class="lg:col-span-2">
                <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2 line-clamp-2 hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors duration-200">
                  {{ item.name }}
                </h3>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
                  <span class="flex items-center gap-2 bg-light-surface-secondary dark:bg-dark-surface-secondary px-3 py-1 rounded-full">
                    <i class="fas fa-tag text-light-accent-sport dark:text-dark-accent-sport"></i>
                    {{ item.brand }}
                  </span>
                  <span class="flex items-center gap-2 bg-light-surface-secondary dark:bg-dark-surface-secondary px-3 py-1 rounded-full">
                     <i class="fas fa-palette text-light-accent-sport dark:text-dark-accent-sport"></i>
                    {{ item.selectedColor || 'Mặc định' }}
                  </span>
                  <span class="flex items-center gap-2 bg-light-surface-secondary dark:bg-dark-surface-secondary px-3 py-1 rounded-full">
                    <i class="fas fa-expand-arrows-alt text-light-accent-sport dark:text-dark-accent-sport"></i>
                    {{ item.selectedSize || 'M' }}
                  </span>
                  <span class="flex items-center gap-2 px-3 py-1 rounded-full" :class="(item.stock || 0) > 10 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : (item.stock || 0) > 0 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'">
                    <i class="fas fa-box"></i>
                    Còn {{ item.stock || 0 }}
                  </span>
                </div>
                
                <!-- Price -->
                <div class="flex items-center gap-3">
                  <span class="text-xl font-bold text-light-accent-sport dark:text-dark-accent-sport">
                    {{ formatPrice((item.discount ? item.price * (1 - item.discount / 100) : item.price)) }}
                  </span>
                  <span v-if="item.discount" class="text-sm text-light-text-muted dark:text-dark-text-muted line-through">
                    {{ formatPrice(item.price) }}
                  </span>
                  <span v-if="item.discount" class="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-full font-medium">
                    -{{ item.discount }}%
                  </span>
                </div>
              </div>
              
              <!-- Quantity Controls and Actions -->
              <div class="flex flex-col sm:flex-row lg:flex-col items-center gap-4">
                <!-- Quantity Controls -->
                 <div class="flex items-center gap-2">
                   <button 
                     @click="$emit('updateQuantity', item.id, item.quantity - 1)"
                     :disabled="item.quantity <= 1"
                     class="w-8 h-8 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-accent-sport hover:text-white dark:hover:bg-dark-accent-sport disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold text-sm"
                   >
                     -
                   </button>
                   
                   <span class="w-12 text-center font-semibold text-light-text-primary dark:text-dark-text-primary">
                     {{ item.quantity }}
                   </span>
                   
                   <button 
                     @click="$emit('updateQuantity', item.id, item.quantity + 1)"
                     :disabled="item.quantity >= (item.stock || 0)"
                     class="w-8 h-8 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-accent-sport hover:text-white dark:hover:bg-dark-accent-sport disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold text-sm"
                   >
                     +
                   </button>
                 </div>
                
                <!-- Delete Button -->
                <button 
                  @click="$emit('removeItem', item.id)"
                  class="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 font-medium border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
                >
                  <i class="fas fa-trash"></i>
                  <span class="hidden sm:inline">Xóa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/types/sport';

interface Props {
  cartItems: CartItem[];
  selectedItems: string[];
  allSelected: boolean;
  sortedCartItems: CartItem[];
}

interface Emits {
  toggleSelectAll: [];
  clearCart: [];
  toggleItem: [id: string];
  updateQuantity: [id: string, quantity: number];
  removeItem: [id: string];
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