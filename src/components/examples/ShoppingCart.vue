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
        v-if="totalItems > 0"
        class="absolute -top-1 -right-1 bg-sport-danger text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
      >
        {{ totalItems > 99 ? '99+' : totalItems }}
      </span>
    </button>

    <!-- Cart Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-80 bg-light-bg-primary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border rounded-lg shadow-xl z-50"
    >
      <!-- Cart Header -->
      <div class="p-4 border-b border-light-border dark:border-dark-border">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
            Shopping Cart
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
        <div v-if="cartItems.length === 0" class="p-8 text-center">
          <svg class="w-12 h-12 mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
          </svg>
          <p class="text-light-text-secondary dark:text-dark-text-secondary">
            Your cart is empty
          </p>
        </div>

        <div v-else class="p-2">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center space-x-3 p-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg"
          >
            <!-- Product Image -->
            <img
              :src="item.image"
              :alt="item.name"
              class="w-12 h-12 object-cover rounded-lg"
            />

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                {{ item.name }}
              </h4>
              <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                ${{ item.price.toFixed(2) }} × {{ item.quantity }}
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
      <div v-if="cartItems.length > 0" class="p-4 border-t border-light-border dark:border-dark-border">
        <!-- Total -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
            Total:
          </span>
          <span class="text-lg font-bold text-sport-primary dark:text-sport-accent">
            ${{ totalPrice.toFixed(2) }}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <button
            @click="viewCart"
            class="w-full py-2 px-4 bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border rounded-lg hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors"
          >
            View Cart
          </button>
          <button
            @click="checkout"
            class="w-full py-2 px-4 bg-sport-primary dark:bg-sport-accent text-white rounded-lg hover:bg-sport-primary/90 dark:hover:bg-sport-accent/90 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="closeCart"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Props {
  items?: CartItem[]
}

interface Emits {
  (e: 'update-quantity', id: string, quantity: number): void
  (e: 'remove-item', id: string): void
  (e: 'view-cart'): void
  (e: 'checkout'): void
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    {
      id: '1',
      name: 'Nike Air Max 270',
      price: 150.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Adidas Running Shorts',
      price: 45.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1506629905607-d9c8e8b8e6e8?w=100&h=100&fit=crop'
    }
  ]
})

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const cartItems = ref<CartItem[]>(props.items)

const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const toggleCart = () => {
  isOpen.value = !isOpen.value
}

const closeCart = () => {
  isOpen.value = false
}

const increaseQuantity = (id: string) => {
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    item.quantity++
    emit('update-quantity', id, item.quantity)
  }
}

const decreaseQuantity = (id: string) => {
  const item = cartItems.value.find(item => item.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
    emit('update-quantity', id, item.quantity)
  }
}

const removeItem = (id: string) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
  emit('remove-item', id)
}

const viewCart = () => {
  closeCart()
  emit('view-cart')
}

const checkout = () => {
  closeCart()
  emit('checkout')
}
</script>
