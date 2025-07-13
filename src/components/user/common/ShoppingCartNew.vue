<template>
  <div class="relative">
    <!-- Cart Button -->
    <button
      @click="toggleCart"
      class="relative p-2 text-light-text-primary dark:text-dark-text-primary hover:text-sport-primary dark:hover:text-sport-accent transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
      </svg>
      
      <!-- Cart Badge -->
      <span
        v-if="cartCount > 0"
        class="absolute -top-1 -right-1 bg-sport-danger text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
      >
        {{ cartCount > 99 ? '99+' : cartCount }}
      </span>
    </button>

    <!-- Cart Dropdown -->
    <div
      v-if="isCartOpen"
      class="absolute right-0 top-full mt-2 w-80 bg-light-bg-primary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border rounded-lg shadow-xl z-50"
    >
      <!-- Cart Header -->
      <div class="p-4 border-b border-light-border dark:border-dark-border">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
            Giỏ hàng
          </h3>
          <button
            @click="closeCart"
            class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Cart Items -->
      <div class="max-h-64 overflow-y-auto">
        <!-- Loading State -->
        <div v-if="isLoading" class="p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sport-primary mx-auto"></div>
          <p class="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Đang tải...
          </p>
        </div>

        <!-- Empty State -->
        <div v-else-if="isEmpty" class="p-8 text-center">
          <svg class="w-12 h-12 mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
          </svg>
          <p class="text-light-text-secondary dark:text-dark-text-secondary">
            Giỏ hàng trống
          </p>
        </div>

        <!-- Cart Items List -->
        <div v-else class="p-2">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center space-x-3 p-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg"
          >
            <!-- Product Image -->
            <img
              :src="item.product_image || '/placeholder.svg'"
              :alt="item.product_name"
              class="w-12 h-12 object-cover rounded-lg"
            />

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                {{ item.product_name }}
              </h4>
              <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {{ formatPrice(item.product_price) }} × {{ item.quantity }}
              </p>
              <p v-if="item.variant_name" class="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {{ item.variant_name }}
              </p>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center space-x-1">
              <button
                @click="decreaseQuantity(item.id)"
                class="w-6 h-6 flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary hover:text-sport-primary dark:hover:text-sport-accent"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </button>
              <span class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary w-6 text-center">
                {{ item.quantity }}
              </span>
              <button
                @click="increaseQuantity(item.id)"
                class="w-6 h-6 flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary hover:text-sport-primary dark:hover:text-sport-accent"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>

            <!-- Remove Button -->
            <button
              @click="removeItem(item.id)"
              class="text-light-text-secondary dark:text-dark-text-secondary hover:text-sport-danger"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Footer -->
      <div v-if="!isEmpty" class="p-4 border-t border-light-border dark:border-dark-border">
        <!-- Total -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
            Tổng cộng:
          </span>
          <span class="text-lg font-bold text-sport-primary dark:text-sport-accent">
            {{ formattedTotal }}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <button
            @click="viewCart"
            class="w-full py-2 px-4 bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border rounded-lg hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors"
          >
            Xem giỏ hàng
          </button>
          <button
            @click="checkout"
            class="w-full py-2 px-4 bg-sport-primary dark:bg-sport-accent text-white rounded-lg hover:bg-sport-primary/90 dark:hover:bg-sport-accent/90 transition-colors"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isCartOpen"
      @click="closeCart"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

// Get reactive state from store
const {
  items,
  cartCount,
  isCartOpen,
  isLoading,
  isEmpty,
  formattedTotal
} = storeToRefs(cartStore);

// Get actions from store
const {
  toggleCart,
  closeCart,
  updateCartItem,
  removeFromCart
} = cartStore;

// Format price helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

// Quantity controls
const increaseQuantity = async (itemId: number) => {
  const item = items.value.find(item => item.id === itemId);
  if (item) {
    await updateCartItem(itemId, item.quantity + 1);
  }
};

const decreaseQuantity = async (itemId: number) => {
  const item = items.value.find(item => item.id === itemId);
  if (item && item.quantity > 1) {
    await updateCartItem(itemId, item.quantity - 1);
  }
};

const removeItem = async (itemId: number) => {
  await removeFromCart(itemId);
};

// Navigation
const viewCart = () => {
  closeCart();
  router.push('/cart');
};

const checkout = () => {
  closeCart();
  router.push('/checkout');
};
</script>

<style scoped>
.sport-danger {
  color: #dc2626;
}

.sport-primary {
  color: #2563eb;
}

.sport-accent {
  color: #3b82f6;
}
</style>
