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
              
              <div class="space-y-4">
                <div
                  v-for="item in cartItems"
                  :key="item.id"
                  class="flex items-center gap-4 p-4 border border-light-border-primary dark:border-dark-border-primary rounded-lg hover:bg-light-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
                >
                  <!-- Product Image -->
                  <div class="w-20 h-20 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <img :src="item.product_image || '/placeholder.jpg'" :alt="item.product_name" class="w-full h-full object-cover" />
                  </div>
                  
                  <!-- Product Info -->
                  <div class="flex-grow">
                    <h3 class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ item.product_name }}</h3>
                    <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      {{ item.variant_name || 'Mặc định' }}
                    </p>
                    <div class="flex items-center justify-between mt-2">
                      <!-- Quantity Controls -->
                      <div class="flex items-center border border-light-border-primary dark:border-dark-border-primary rounded-md overflow-hidden">
                        <button 
                          @click="updateQuantity(item.id, item.quantity - 1)"
                          class="px-3 py-1 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
                          :disabled="item.quantity <= 1 || isLoading"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="px-4 py-1 text-light-text-primary dark:text-dark-text-primary font-medium">{{ item.quantity }}</span>
                        <button 
                          @click="updateQuantity(item.id, item.quantity + 1)"
                          class="px-3 py-1 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors"
                          :disabled="isLoading"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      
                      <!-- Price -->
                      <div class="text-right">
                        <div class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                          {{ formatPrice(item.total_price) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Remove Button -->
                  <button 
                    @click="removeItem(item.id)"
                    class="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-2"
                    :disabled="isLoading"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Cart Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-dark-surface-primary rounded-lg shadow-lg p-6 sticky top-6">
              <h2 class="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
                Tổng kết đơn hàng
              </h2>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Tạm tính:</span>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ formatPrice(subtotal) }}</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">Phí vận chuyển:</span>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ formatPrice(shippingFee) }}</span>
                </div>
                
                <div v-if="discountAmount > 0" class="flex justify-between items-center text-green-600 dark:text-green-400">
                  <span>Giảm giá:</span>
                  <span class="font-medium">-{{ formatPrice(discountAmount) }}</span>
                </div>
                
                <div class="border-t border-light-border-primary dark:border-dark-border-primary pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Tổng cộng:</span>
                    <span class="text-2xl font-bold text-light-accent-sport dark:text-dark-accent-sport">{{ formatPrice(totalPrice) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 space-y-3">
                <n-button 
                  @click="proceedToCheckout"
                  :disabled="isLoading"
                  type="primary" 
                  size="large" 
                  class="btn-primary w-full"
                >
                  <i class="fas fa-credit-card mr-2"></i>
                  Thanh toán
                </n-button>
                
                <n-button 
                  @click="router.push('/')"
                  size="large" 
                  class="btn-secondary w-full"
                >
                  <i class="fas fa-arrow-left mr-2"></i>
                  Tiếp tục mua sắm
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
          :total="total"
          v-model:voucher-code="voucherCode"
          :selected-items-count="selectedCartItems.length"
          @apply-voucher="applyVoucher"
          @proceed-to-next-step="proceedToNextStep"
        />
        </div>
      
      <!-- Information Step -->
      <DeliveryInfo 
        v-else-if="currentStep === 2"
        v-model:delivery-info="deliveryInfo"
        @go-back="currentStep = 1"
        @proceed-to-next-step="proceedToNextStep"
      />
      <!-- Payment Step -->
      <PaymentMethod 
        v-else-if="currentStep === 3"
        :payment-methods="[{id: 'cod', name: 'Thanh toán khi nhận hàng', description: 'Thanh toán bằng tiền mặt khi nhận hàng', icon: 'fas fa-money-bill-wave'}, {id: 'bank', name: 'Chuyển khoản ngân hàng', description: 'Chuyển khoản qua ngân hàng', icon: 'fas fa-university'}, {id: 'vnpay', name: 'Thanh toán bằng VNPay', description: 'Thanh toán qua ví điện tử VNPay', icon: 'fas fa-wallet'}]"
        :selected-payment-method="selectedPayment"
        :subtotal="subtotal"
        :shipping-fee="shippingFee"
        :payment-fee="0"
        :discount="appliedDiscount"
        :total="total"
        @update:selected-payment-method="selectedPayment = $event"
        @go-back="currentStep = 2"
        @place-order="proceedToNextStep"
      />
      <!-- Completion Step -->
      <OrderComplete 
        v-else-if="currentStep === 4"
        :order-info="{
          orderCode: 'ORD-' + Date.now(),
          orderDate: new Date(),
          total: total,
          paymentMethod: selectedPayment,
          deliveryInfo: deliveryInfo
        }"
        @view-order-history="router.push('/orders')"
        @continue-shopping="router.push('/')"
      />

      <!-- Empty Cart State -->
      <div v-else-if="cartItems.length === 0" class="text-center py-16">
        <div data-aos="fade-up" class="max-w-md mx-auto">
          <div class="w-32 h-32 bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center mx-auto mb-8">
            <i class="fas fa-shopping-cart text-4xl text-light-text-muted dark:text-dark-text-muted"></i>
          </div>
          
          <h3 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Giỏ hàng trống
          </h3>
          
          <p class="text-light-text-secondary dark:text-dark-text-secondary mb-8">
            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
          </p>
          
          <button 
            @click="router.push('/products')"
            class="px-8 py-3 bg-gradient-sport text-white rounded-lg hover:shadow-sport transition-all duration-200 inline-flex items-center gap-2"
          >
            <i class="fas fa-shopping-bag"></i>
            Mua sắm ngay
          </button>
        </div>
      </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div data-aos="zoom-in" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl p-8 max-w-md w-full shadow-modal border border-light-border-primary dark:border-dark-border-primary">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-sport rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-check text-2xl text-white"></i>
          </div>
          
          <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            {{ successMessage.title }}
          </h3>
          
          <p class="text-light-text-secondary dark:text-dark-text-secondary mb-8">
            {{ successMessage.content }}
          </p>
          
          <button 
            @click="showSuccessModal = false"
            class="w-full px-6 py-3 bg-gradient-sport text-white rounded-lg hover:shadow-sport transition-all duration-200"
          >
            Đóng
          </button>
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
  if (newQuantity <= 0) {
    await removeFromCartWithNotification(itemId);
    return;
  }
  await updateCartItemWithNotification(itemId, newQuantity);
};

const removeItem = async (itemId: number) => {
  await removeFromCartWithNotification(itemId);
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
