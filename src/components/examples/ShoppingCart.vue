<template>
  <div class="relative">
    <!-- Cart Button with Badge -->
    <button 
      @click="toggleCart"
      class="header-icon p-1.5 text-light-text-secondary dark:text-dark-text-secondary transition-colors relative"
      :class="{ 'text-light-accent-sport dark:text-dark-accent-sport active-icon': isOpen }"
    >
      <n-badge :value="cartItemCount" :max="99" :show-zero="false" :offset="[2, 2]" processing>
        <n-icon size="22">
          <CartOutline />
        </n-icon>
      </n-badge>
    </button>

    <!-- Cart Dropdown -->
    <div 
      v-show="isOpen"
      class="cart-dropdown dropdown-menu w-80"
      :class="{ 'show': isOpen }"
    >
      <!-- Cart Header -->
      <div class="dropdown-header flex justify-between items-center">
        <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary">Giỏ hàng</h3>
        <button 
          @click="closeCart"
          class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors p-1 rounded-md hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary"
        >
          <n-icon size="18">
            <CloseOutline />
          </n-icon>
        </button>
      </div>

      <!-- Empty Cart Message -->
      <div v-if="cartItems.length === 0" class="p-6 text-center">
        <n-icon size="32" class="text-light-text-muted dark:text-dark-text-muted mb-2">
          <CartOutline />
        </n-icon>
        <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4">Giỏ hàng của bạn đang trống</p>
        <n-button size="small" @click="closeCart" class="btn-primary">
          Tiếp tục mua sắm
        </n-button>
      </div>

      <!-- Cart Items -->
      <div v-else class="max-h-80 overflow-y-auto">
        <div 
          v-for="(item, index) in cartItems" 
          :key="index"
          class="p-3 border-b border-light-border-primary dark:border-dark-border-primary flex items-center gap-3 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
        >
          <!-- Product Image -->
          <div class="w-16 h-16 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-md overflow-hidden flex-shrink-0">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>
          
          <!-- Product Details -->
          <div class="flex-grow min-w-0">
            <h4 class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">{{ item.name }}</h4>
            <div class="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">{{ item.variant }}</div>
            
            <!-- Quantity Controls -->
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-light-border-primary dark:border-dark-border-primary rounded-md overflow-hidden bg-light-bg-primary dark:bg-dark-bg-primary">
                <button 
                  @click="updateItemQuantity(index, item.quantity - 1)"
                  class="px-2 py-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="item.quantity <= 1"
                >
                  <n-icon size="14">
                    <RemoveOutline />
                  </n-icon>
                </button>
                <span class="px-3 py-1 text-xs text-light-text-primary dark:text-dark-text-primary font-medium min-w-[2rem] text-center">{{ item.quantity }}</span>
                <button 
                  @click="updateItemQuantity(index, item.quantity + 1)"
                  class="px-2 py-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-all"
                >
                  <n-icon size="14">
                    <AddOutline />
                  </n-icon>
                </button>
              </div>
              <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>
          
          <!-- Remove Button -->
          <button 
            @click="removeItem(index)"
            class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-danger dark:hover:text-dark-accent-danger transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <n-icon size="18">
              <TrashOutline />
            </n-icon>
          </button>
        </div>
      </div>

      <!-- Cart Footer -->
      <div v-if="cartItems.length > 0" class="dropdown-header border-t">
        <!-- Total -->
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Tổng cộng:</span>
          <span class="text-base font-medium text-light-text-primary dark:text-dark-text-primary">{{ formatPrice(cartTotal) }}</span>
        </div>
        
        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-2">
          <n-button size="small" @click="viewCart" class="btn-secondary">
            Xem giỏ hàng
          </n-button>
          <n-button size="small" @click="checkout" class="btn-primary">
            Thanh toán
          </n-button>
        </div>
      </div>
    </div>

    <!-- Backdrop when cart is open -->
    <div
      v-if="isOpen"
      @click="closeCart"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NIcon, NBadge, NButton } from 'naive-ui'
import { CartOutline, CloseOutline, TrashOutline, AddOutline, RemoveOutline } from '@vicons/ionicons5'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
}

// Sample cart items for demonstration
const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'Giày thể thao Nike Air Max',
    price: 2500000,
    image: 'https://via.placeholder.com/150',
    quantity: 1,
    variant: 'Màu: Đen, Kích thước: 42'
  },
  {
    id: 2,
    name: 'Áo thun Adidas Originals',
    price: 850000,
    image: 'https://via.placeholder.com/150',
    quantity: 2,
    variant: 'Màu: Trắng, Kích thước: L'
  }
])

const isOpen = ref(false)

// Computed properties
const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// Methods
const toggleCart = () => {
  isOpen.value = !isOpen.value
}

const closeCart = () => {
  isOpen.value = false
}

const updateItemQuantity = (index: number, quantity: number) => {
  if (quantity <= 0) {
    // Optional: Show confirmation before removing
    removeItem(index)
    return
  }
  
  cartItems.value[index].quantity = quantity
}

const removeItem = (index: number) => {
  cartItems.value.splice(index, 1)
}

const viewCart = () => {
  // Navigate to cart page
  console.log('Navigate to cart page')
  closeCart()
}

const checkout = () => {
  // Navigate to checkout page
  console.log('Navigate to checkout page')
  closeCart()
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

// Handle clicks outside to close cart
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (isOpen.value && !target.closest('.cart-dropdown') && !target.closest('button')) {
    closeCart()
  }
}

// Expose methods to parent component
defineExpose({
  openCart: () => {
    isOpen.value = true
  },
  closeCart,
  addItem: (item: CartItem) => {
    const existingItemIndex = cartItems.value.findIndex(i => i.id === item.id)
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      cartItems.value[existingItemIndex].quantity += item.quantity
    } else {
      // Add new item
      cartItems.value.push(item)
    }
    
    // Optionally open cart when adding items
    isOpen.value = true
  }
})
</script>

<style scoped>
/* Cart specific styles */
.cart-dropdown {
  min-width: 20rem;
  max-width: 24rem;
}

/* Product image styling */
.cart-dropdown img {
  transition: transform 0.2s ease;
}

.cart-dropdown img:hover {
  transform: scale(1.05);
}

/* Quantity controls styling */
.cart-dropdown button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Smooth transitions for cart items */
.cart-dropdown .border-b:last-child {
  border-bottom: none;
}
</style>
