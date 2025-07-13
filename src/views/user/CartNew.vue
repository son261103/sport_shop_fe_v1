<template>
  <div class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
          Giỏ hàng của bạn
        </h1>
        <p class="text-light-text-secondary dark:text-dark-text-secondary">
          {{ items.length }} sản phẩm trong giỏ hàng
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sport-primary mx-auto"></div>
        <p class="mt-4 text-light-text-secondary dark:text-dark-text-secondary">
          Đang tải giỏ hàng...
        </p>
      </div>

      <!-- Empty Cart -->
      <div v-else-if="isEmpty" class="text-center py-12">
        <svg class="w-24 h-24 mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
        </svg>
        <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Giỏ hàng trống
        </h2>
        <p class="text-light-text-secondary dark:text-dark-text-secondary mb-6">
          Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
        </p>
        <router-link
          to="/products"
          class="inline-block bg-sport-primary text-white px-6 py-3 rounded-lg hover:bg-sport-primary/90 transition-colors"
        >
          Tiếp tục mua sắm
        </router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-6">
            <!-- Cart Header -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                Sản phẩm ({{ items.length }})
              </h2>
              <button
                @click="clearCart"
                class="text-sport-danger hover:text-sport-danger/80 text-sm"
              >
                Xóa tất cả
              </button>
            </div>

            <!-- Cart Items List -->
            <div class="space-y-4">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center space-x-4 p-4 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary transition-colors"
              >
                <!-- Product Image -->
                <img
                  :src="item.product_image || '/placeholder.svg'"
                  :alt="item.product_name"
                  class="w-20 h-20 object-cover rounded-lg"
                />

                <!-- Product Details -->
                <div class="flex-1">
                  <h3 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                    {{ item.product_name }}
                  </h3>
                  <p v-if="item.variant_name" class="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                    Phiên bản: {{ item.variant_name }}
                  </p>
                  <p class="text-lg font-bold text-sport-primary dark:text-sport-accent">
                    {{ formatPrice(item.product_price) }}
                  </p>
                  <p v-if="item.variant_price && item.variant_price > item.product_price" class="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through">
                    {{ formatPrice(item.variant_price) }}
                  </p>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center space-x-3">
                  <button
                    @click="decreaseQuantity(item.id)"
                    class="w-8 h-8 flex items-center justify-center border border-light-border dark:border-dark-border rounded-full hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span class="w-8 text-center font-medium text-light-text-primary dark:text-dark-text-primary">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="increaseQuantity(item.id)"
                    class="w-8 h-8 flex items-center justify-center border border-light-border dark:border-dark-border rounded-full hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>

                <!-- Total Price -->
                <div class="text-right">
                  <p class="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">
                    {{ formatPrice(item.total_price) }}
                  </p>
                </div>

                <!-- Remove Button -->
                <button
                  @click="removeFromCart(item.id)"
                  class="text-sport-danger hover:text-sport-danger/80 p-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="lg:col-span-1">
          <div class="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-6 sticky top-8">
            <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
              Tổng quan đơn hàng
            </h2>

            <!-- Summary Items -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span class="text-light-text-secondary dark:text-dark-text-secondary">
                  Tạm tính:
                </span>
                <span class="text-light-text-primary dark:text-dark-text-primary">
                  {{ formatPrice(subtotal) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-light-text-secondary dark:text-dark-text-secondary">
                  Phí vận chuyển:
                </span>
                <span class="text-light-text-primary dark:text-dark-text-primary">
                  {{ shippingFee > 0 ? formatPrice(shippingFee) : 'Miễn phí' }}
                </span>
              </div>
              <div v-if="discountAmount > 0" class="flex justify-between">
                <span class="text-light-text-secondary dark:text-dark-text-secondary">
                  Giảm giá:
                </span>
                <span class="text-sport-primary dark:text-sport-accent">
                  -{{ formatPrice(discountAmount) }}
                </span>
              </div>
              <hr class="border-light-border dark:border-dark-border">
              <div class="flex justify-between text-lg font-bold">
                <span class="text-light-text-primary dark:text-dark-text-primary">
                  Tổng cộng:
                </span>
                <span class="text-sport-primary dark:text-sport-accent">
                  {{ formattedTotal }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button
                @click="checkout"
                class="w-full bg-sport-primary text-white py-3 rounded-lg hover:bg-sport-primary/90 transition-colors font-semibold"
              >
                Tiến hành thanh toán
              </button>
              <router-link
                to="/products"
                class="w-full block text-center border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary py-3 rounded-lg hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary transition-colors"
              >
                Tiếp tục mua sắm
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';

const router = useRouter();
const {
  items,
  isLoading,
  isEmpty,
  formattedTotal,
  subtotal,
  shippingFee,
  discountAmount,
  fetchCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  formatPrice
} = useCart();

// Initialize cart data
onMounted(() => {
  fetchCart();
});

const checkout = () => {
  router.push('/checkout');
};
</script>

<style scoped>
.sport-primary {
  background-color: #2563eb;
}

.sport-danger {
  color: #dc2626;
}
</style>
