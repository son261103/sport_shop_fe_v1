<template>
  <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
    <!-- Sản phẩm -->
    <td class="py-8 px-4">
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0">
          <div class="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            >
            
            <!-- Overlay for out of stock -->
            <div v-if="!item.inStock" 
                 class="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span class="text-white text-xs font-medium px-1 py-0.5 bg-red-500 rounded">
                Hết hàng
              </span>
            </div>
          </div>
        </div>
        
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
            {{ item.name }}
          </h3>
          
          <div class="text-xs text-gray-500 dark:text-gray-400">
            <span v-if="item.brand">{{ item.brand }}</span>
            <span v-if="item.selectedSize" class="ml-2">Size: {{ item.selectedSize }}</span>
            <span v-if="item.selectedColor" class="ml-2">Màu: {{ item.selectedColor }}</span>
          </div>
        </div>
      </div>
    </td>

    <!-- Đơn giá -->
    <td class="py-8 px-4 text-center">
      <div class="flex flex-col items-center">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">
          {{ formatPrice(item.price) }}
        </span>
        <span v-if="item.originalPrice && item.originalPrice > item.price" 
              class="text-xs text-gray-400 dark:text-gray-500 line-through">
          {{ formatPrice(item.originalPrice) }}
        </span>
        <span v-if="item.discount" 
              class="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-1 py-0.5 rounded mt-1">
          -{{ item.discount }}%
        </span>
      </div>
    </td>

    <!-- Số lượng -->
    <td class="py-8 px-4 text-center">
      <div class="flex items-center justify-center gap-1">
        <button 
          @click="decreaseQuantity"
          :disabled="item.quantity <= 1 || !item.inStock"
          class="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="text-xs font-bold">-</span>
        </button>
        
        <span class="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
          {{ item.quantity }}
        </span>
        
        <button 
          @click="increaseQuantity"
          :disabled="!item.inStock || Boolean(item.stock && item.quantity >= item.stock)"
          class="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="text-xs font-bold">+</span>
        </button>
      </div>
    </td>

    <!-- Số tiền -->
    <td class="py-8 px-4 text-center">
      <div class="text-sm font-semibold text-red-600 dark:text-red-400">
        {{ formatPrice(item.price * item.quantity) }}
      </div>
    </td>

    <!-- Thao tác -->
    <td class="py-8 px-4 text-center">
      <button 
        @click="removeItem"
        class="px-3 py-1 text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
        title="Xóa khỏi giỏ hàng"
      >
        <i class="fas fa-times mr-1"></i>
        Xóa
      </button>
    </td>

    <!-- Loading Overlay -->
    <td v-if="isUpdating" class="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div class="loading-spinner"></div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CartItem } from '@/types';

interface Props {
  item: CartItem;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  updateQuantity: [id: string, quantity: number];
  removeItem: [id: string];
  moveToWishlist: [id: string];
}>();

// Reactive data
const isUpdating = ref(false);

// Methods
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop';
};

const updateQuantity = async (value: string | number) => {
  const quantity = typeof value === 'string' ? parseInt(value) : value;
  
  if (isNaN(quantity) || quantity < 1) return;
  if (props.item.stock && quantity > props.item.stock) return;
  
  isUpdating.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    emit('updateQuantity', props.item.id, quantity);
  } catch (error) {
    console.error('Error updating quantity:', error);
  } finally {
    isUpdating.value = false;
  }
};

const increaseQuantity = () => {
  if (props.item.stock && props.item.quantity >= props.item.stock) return;
  updateQuantity(props.item.quantity + 1);
};

const decreaseQuantity = () => {
  if (props.item.quantity <= 1) return;
  updateQuantity(props.item.quantity - 1);
};

const removeItem = async () => {
  if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) return;
  
  isUpdating.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    emit('removeItem', props.item.id);
  } catch (error) {
    console.error('Error removing item:', error);
  } finally {
    isUpdating.value = false;
  }
};


</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>