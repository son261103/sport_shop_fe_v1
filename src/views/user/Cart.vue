<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <Loading size="lg" color="sport" text="Đang tải giỏ hàng..." />
    </div>

    <!-- Page Content -->
    <div v-else class="section-padding">
      <!-- Page Title -->
      <div class="container-custom mb-8">
        <div data-aos="fade-up" class="text-center">
          <h1 class="text-gradient-sport-animated font-bold mb-4">
            <i class="fas fa-shopping-cart mr-3"></i>
            Giỏ hàng của bạn
          </h1>
          <div class="w-24 h-1 bg-gradient-sport mx-auto rounded-full"></div>
        </div>
      </div>

      <!-- Progress Steps -->
      <div v-if="!isEmpty" class="container-custom mb-8">
        <ProgressSteps :currentStep="1" />
      </div>

      <!-- Empty Cart State -->
      <div v-if="isEmpty" class="text-center py-16">
        <div data-aos="fade-up" class="max-w-md mx-auto">
          <div class="w-32 h-32 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center mx-auto mb-8">
            <i class="fas fa-shopping-cart text-4xl text-light-text-muted dark:text-dark-text-muted"></i>
          </div>
          <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
            Giỏ hàng trống
          </h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary mb-8">
            Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
          </p>
          <n-button @click="router.push('/')" type="primary" size="large" class="btn-primary">
            <i class="fas fa-shopping-bag mr-2"></i>
            Tiếp tục mua sắm
          </n-button>
        </div>
      </div>

      <!-- Cart Content -->
      <div v-else class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-dark-surface-primary rounded-lg shadow-lg p-6">
              <h2 class="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
                Sản phẩm trong giỏ hàng ({{ cartCount }})
              </h2>
              
              <div class="space-y-6">
                <div
                  v-for="item in cartItems"
                  :key="item.id"
                  class="card p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div class="flex flex-col lg:flex-row gap-6">
                    <!-- Product Image -->
                    <div class="w-full lg:w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden flex-shrink-0 group">
                      <img 
                        :src="item.product_image || '/placeholder.jpg'" 
                        :alt="item.product_name" 
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    
                    <!-- Product Details -->
                    <div class="flex-grow space-y-4">
                      <!-- Product Name & Brand -->
                      <div>
                        <h3 class="text-xl font-bold text-gradient-sport mb-2">{{ item.product_name }}</h3>
                        <div class="flex flex-wrap gap-2 mb-3">
                          <span class="badge badge-primary px-3 py-1 rounded-full text-xs font-medium">
                            <i class="fas fa-tag mr-1"></i>
                            {{ item.brand_name || 'Thương hiệu' }}
                          </span>
                          <span class="badge bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                            <i class="fas fa-palette mr-1"></i>
                            {{ item.variant_name || 'Mặc định' }}
                          </span>
                        </div>
                        <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                          {{ item.product_description || 'Sản phẩm chất lượng cao, phù hợp cho mọi hoạt động thể thao.' }}
                        </p>
                      </div>

                      <!-- Price Information -->
                      <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-xl">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div class="space-y-1">
                            <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Đơn giá:</div>
                            <div class="text-lg font-bold text-light-accent-sport dark:text-dark-accent-sport">
                              {{ formatPrice(item.unit_price || item.total_price / item.quantity) }}
                            </div>
                          </div>
                          <div class="space-y-1 text-right">
                            <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Thành tiền:</div>
                            <div class="text-2xl font-bold text-gradient-sport">
                              {{ formatPrice(item.total_price) }}
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Quantity Controls & Actions -->
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <!-- Quantity Controls -->
                        <div class="flex items-center gap-3">
                          <span class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Số lượng:</span>
                          <div class="flex items-center gap-2">
                            <button 
                              @click="updateQuantity(item.id, item.quantity - 1)"
                              class="btn-outline w-10 h-10 rounded-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              :disabled="item.quantity <= 1 || isLoading"
                            >
                              -
                            </button>
                            <div class="bg-light-bg-secondary dark:bg-dark-bg-secondary px-4 py-2 rounded-lg border border-light-border-primary dark:border-dark-border-primary">
                              <span class="text-lg font-medium text-light-text-primary dark:text-dark-text-primary min-w-[2rem] text-center block">{{ item.quantity }}</span>
                            </div>
                            <button 
                              @click="updateQuantity(item.id, item.quantity + 1)"
                              class="btn-outline w-10 h-10 rounded-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              :disabled="isLoading"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <!-- Remove Button -->
                        <button 
                          @click="removeItem(item.id)"
                          class="btn-primary-animated px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                          :disabled="isLoading"
                        >
                          <i class="fas fa-trash-alt mr-2 transition-transform duration-300 group-hover:animate-bounce"></i>
                          Xóa sản phẩm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Cart Summary -->
          <div class="lg:col-span-1">
            <div class="card p-8 sticky top-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-light-accent-sport/20 dark:border-dark-accent-sport/20">
              <div class="text-center mb-8">
                <div class="w-16 h-16 bg-gradient-to-r from-light-accent-sport to-light-accent-info dark:from-dark-accent-sport dark:to-dark-accent-info rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i class="fas fa-receipt text-2xl text-white"></i>
                </div>
                <h2 class="text-2xl font-bold text-gradient-sport-animated mb-2">
                  Tổng kết đơn hàng
                </h2>
                <div class="w-16 h-1 bg-gradient-sport mx-auto rounded-full"></div>
              </div>
              
              <div class="space-y-6">
                <!-- Order Details -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-2xl space-y-4">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-calculator text-light-accent-info dark:text-dark-accent-info"></i>
                      <span class="font-medium text-light-text-secondary dark:text-dark-text-secondary">Tạm tính:</span>
                    </div>
                    <span class="font-bold text-lg text-light-text-primary dark:text-dark-text-primary">{{ formatPrice(subtotal) }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-shipping-fast text-blue-500"></i>
                      <span class="font-medium text-light-text-secondary dark:text-dark-text-secondary">Phí vận chuyển:</span>
                    </div>
                    <span class="font-bold text-lg text-light-text-primary dark:text-dark-text-primary">{{ formatPrice(shippingFee) }}</span>
                  </div>
                  
                  <div v-if="discountAmount > 0" class="flex justify-between items-center bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-tags text-green-600 dark:text-green-400"></i>
                      <span class="font-medium text-green-700 dark:text-green-300">Giảm giá:</span>
                    </div>
                    <span class="font-bold text-lg text-green-600 dark:text-green-400">-{{ formatPrice(discountAmount) }}</span>
                  </div>
                </div>
                
                <!-- Total -->
                <div class="bg-gradient-to-r from-light-accent-sport/10 to-light-accent-info/10 dark:from-dark-accent-sport/10 dark:to-dark-accent-info/10 p-6 rounded-2xl border-2 border-light-accent-sport/30 dark:border-dark-accent-sport/30">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                      <i class="fas fa-money-bill-wave text-2xl text-light-accent-sport dark:text-dark-accent-sport"></i>
                      <span class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Tổng cộng:</span>
                    </div>
                    <div class="text-right">
                      <div class="text-3xl font-bold text-gradient-sport-animated">{{ formatPrice(totalPrice) }}</div>
                      <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">Đã bao gồm VAT</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="mt-8 space-y-4">
                <button
                  @click="proceedToCheckout"
                  :disabled="isLoading"
                  class="btn-primary-animated w-full py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <i class="fas fa-credit-card mr-3 text-xl"></i>
                  Thanh toán ngay
                  <i class="fas fa-arrow-right ml-3 transition-transform duration-300 group-hover:translate-x-1"></i>
                </button>
                
                <button
                  @click="router.push('/')"
                  class="btn-outline w-full py-3 text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <i class="fas fa-arrow-left mr-2"></i>
                  Tiếp tục mua sắm
                </button>
                
                <!-- Security Badge -->
                <div class="flex items-center justify-center gap-2 mt-6 text-sm text-light-text-muted dark:text-dark-text-muted">
                  <i class="fas fa-shield-alt text-green-500"></i>
                  <span>Thanh toán an toàn & bảo mật</span>
                  <i class="fas fa-lock text-green-500"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
import AOS from 'aos';

// Composables
import { useCartStore } from '@/stores/cart';
import { useCartNotifications } from '@/composables/useCartNotifications';
import { Loading } from '@/components/ui';
import { ProgressSteps } from '@/components/user/cart';

const router = useRouter();
const cartStore = useCartStore();
const { updateCartItemWithNotification, removeFromCartWithNotification } = useCartNotifications();

// Computed properties from store
const cartItems = computed(() => cartStore.items);
const cartCount = computed(() => cartStore.cartCount);
const isEmpty = computed(() => cartStore.isEmpty);
const isLoading = computed(() => cartStore.isLoading);
const totalPrice = computed(() => cartStore.totalPrice);
const subtotal = computed(() => cartStore.subtotal);
const shippingFee = computed(() => cartStore.shippingFee);
const discountAmount = computed(() => cartStore.discountAmount);

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const updateQuantity = async (itemId: number, newQuantity: number) => {
  try {
    if (newQuantity <= 0) {
      await removeFromCartWithNotification(itemId);
      return;
    }
    await updateCartItemWithNotification(itemId, newQuantity);
  } catch (error) {
    console.error('Lỗi cập nhật số lượng:', error);
  }
};

const removeItem = async (itemId: number) => {
  try {
    await removeFromCartWithNotification(itemId);
  } catch (error) {
    console.error('Lỗi xóa sản phẩm:', error);
  }
};

const proceedToCheckout = () => {
  router.push('/checkout');
};

onMounted(async () => {
  AOS.init({
    duration: 1000,
    once: true,
  });
  
  // Load cart data
  await cartStore.fetchCart();
});
</script>
