<template>
  <div class="relative">
    <!-- Cart Button with Badge -->
    <button 
      @mouseenter="showCart"
      @mouseleave="startHideTimer"
      class="header-icon p-1.5 text-light-text-secondary dark:text-dark-text-secondary transition-colors relative"
      :class="{ 'text-light-accent-sport dark:text-dark-accent-sport active-icon': isOpen }"
      data-cart-icon
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
      @mouseenter="cancelHideTimer"
      @mouseleave="startHideTimer"
      class="cart-dropdown dropdown-menu w-80"
      :class="{ 'show': isOpen }"
    >
      <!-- Cart Header -->
      <div class="dropdown-header flex justify-between items-center">
        <h5 class="font-medium text-light-text-primary dark:text-dark-text-primary">Giỏ hàng</h5>
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
        <div class="flex justify-center">
          <n-button size="small" @click="closeCart" class="btn-primary">
            Tiếp tục mua sắm
          </n-button>
        </div>
      </div>

      <!-- Cart Items -->
      <div v-else class="max-h-80 overflow-y-auto">
        <div 
          v-for="item in cartItems" 
          :key="item.id"
          class="p-3 border-b border-light-border-primary dark:border-dark-border-primary flex items-center gap-3 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
        >
          <!-- Product Image -->
          <div class="w-16 h-16 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-md overflow-hidden flex-shrink-0">
            <img :src="item.product_image || '/placeholder.jpg'" :alt="item.product_name" class="w-full h-full object-cover" />
          </div>
          
          <!-- Product Details -->
          <div class="flex-grow min-w-0">
            <h4 class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">{{ item.product_name }}</h4>
            <div class="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">{{ item.variant_name || 'Mặc định' }}</div>
            
            <!-- Quantity Controls -->
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-light-border-primary dark:border-dark-border-primary rounded-md overflow-hidden bg-light-bg-primary dark:bg-dark-bg-primary">
                <button 
                  @click="updateItemQuantity(item.id, item.quantity - 1)"
                  class="px-2 py-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="item.quantity <= 1 || isLoading"
                >
                  <n-icon size="14">
                    <RemoveOutline />
                  </n-icon>
                </button>
                <span class="px-3 py-1 text-xs text-light-text-primary dark:text-dark-text-primary font-medium min-w-[2rem] text-center">{{ item.quantity }}</span>
                <button 
                  @click="updateItemQuantity(item.id, item.quantity + 1)"
                  class="px-2 py-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-all"
                  :disabled="isLoading"
                >
                  <n-icon size="14">
                    <AddOutline />
                  </n-icon>
                </button>
              </div>
              <div class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                {{ formatPrice(item.total_price) }}
              </div>
            </div>
          </div>
          
          <!-- Remove Button -->
          <button 
            @click="removeItem(item.id)"
            class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-danger dark:hover:text-dark-accent-danger transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
            :disabled="isLoading"
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


  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon, NBadge, NButton } from 'naive-ui'
import { CartOutline, CloseOutline, TrashOutline, AddOutline, RemoveOutline } from '@vicons/ionicons5'
import { useCartStore } from '@/stores/cart'
import { useCartNotifications } from '@/composables/useCartNotifications'
import { useAuthStore } from '@/stores/auth'

// Store and composables
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const { updateCartItemWithNotification, removeFromCartWithNotification } = useCartNotifications()

// Cart dropdown state
const isOpen = ref(false)
const hideTimer = ref<number | null>(null)

// Computed properties from store
const cartItems = computed(() => cartStore.items || [])
const cartItemCount = computed(() => cartStore.cartCount || 0)
const cartTotal = computed(() => cartStore.totalPrice || 0)
const isLoading = computed(() => cartStore.isLoading || false)

// Methods
const showCart = () => {
  cancelHideTimer()
  isOpen.value = true
}

const startHideTimer = () => {
  hideTimer.value = setTimeout(() => {
    isOpen.value = false
  }, 300) // Delay to prevent accidental closes
}

const cancelHideTimer = () => {
  if (hideTimer.value) {
    clearTimeout(hideTimer.value)
    hideTimer.value = null
  }
}

const closeCart = () => {
  cancelHideTimer()
  isOpen.value = false
}

const updateItemQuantity = async (itemId: number, quantity: number) => {
  if (quantity <= 0) {
    await removeFromCartWithNotification(itemId)
    return
  }
  
  await updateCartItemWithNotification(itemId, quantity)
}

const removeItem = async (itemId: number) => {
  await removeFromCartWithNotification(itemId)
}



const viewCart = () => {
  router.push('/cart')
  closeCart()
}

const checkout = () => {
  router.push('/checkout')
  closeCart()
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

// Initialize cart on mount without auto-loading sample data
onMounted(async () => {
  await cartStore.initializeCart()
})

// Watch for auth state changes and refresh cart
watch(
  () => authStore.isAuthenticated,
  async (isAuthenticated, wasAuthenticated) => {
    // Only refresh if auth state actually changed
    if (isAuthenticated !== wasAuthenticated) {
      if (isAuthenticated) {
        // User just logged in - initialize cart
        await cartStore.initializeCart()
      } else {
        // User just logged out - clear cart
        cartStore.clearCart()
      }
    }
  },
  { immediate: false }
)

// Cleanup timer on unmount
onBeforeUnmount(() => {
  if (hideTimer.value) {
    clearTimeout(hideTimer.value)
  }
})

// Expose methods to parent component
defineExpose({
  openCart: () => {
    cancelHideTimer()
    isOpen.value = true
  },
  closeCart
})
</script>

