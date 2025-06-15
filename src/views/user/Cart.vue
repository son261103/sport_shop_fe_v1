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
            Giỏ hàng
          </h1>
          <div class="w-24 h-1 bg-gradient-sport mx-auto rounded-full"></div>
        </div>
      </div>
      
      <!-- Cart Header -->
      <CartHeader 
        :cart-items="cartItems"
        :selected-items="selectedItems"
        @select-all="toggleSelectAll"
        @remove-selected="clearCart"
        @sort-items="sortBy = $event"
      />

      <!-- Progress Steps -->
      <ProgressSteps :current-step="currentStep" />

      <!-- Main Content -->
      <div v-if="currentStep === 1" class="space-y-6">
        <!-- Cart Items List -->
        <CartList 
          :cart-items="cartItems"
          :selected-items="selectedItems"
          :all-selected="allSelected"
          :sorted-cart-items="sortedCartItems"
          @toggle-item="selectedItems.includes($event) ? selectedItems.splice(selectedItems.indexOf($event), 1) : selectedItems.push($event)"
          @toggle-select-all="toggleSelectAll"
          @clear-cart="clearCart"
          @remove-selected="removeSelectedItems"
          @update-quantity="updateQuantity"
          @remove-item="removeFromCart"
        />
        
        <!-- Cart Summary -->
        <CartSummary 
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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AOS from 'aos';

// Composables
import { useCartData } from '@/composables/useCartData';
import { useCartActions } from '@/composables/useCartActions';

import { Loading } from '@/components/ui';
import { 
  ProgressSteps, 
  CartList, 
  CartSummary, 
  DeliveryInfo, 
  PaymentMethod, 
  OrderComplete 
} from '@/components/user/cart';

// Router
const router = useRouter();

// Use cart data composable
const {
  isLoading,
  currentStep,
  cartItems,
  selectedItems,
  voucherCode,
  appliedDiscount,
  shippingFee,
  sortBy,
  selectedPayment,
  deliveryInfo,
  showSuccessModal,
  successMessage,
  allSelected,
  selectedCartItems,
  subtotal,
  total,
  sortedCartItems,
  loadMockData
} = useCartData();

// Use cart actions composable
const {
  toggleSelectAll,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyVoucher,
  proceedToNextStep,
} = useCartActions(
  cartItems,
  selectedItems,
  deliveryInfo,
  currentStep,
  selectedPayment,
  voucherCode,
  appliedDiscount,
  shippingFee,
  showSuccessModal,
  successMessage
);

// Remove selected items
const removeSelectedItems = () => {
  if (selectedItems.value.length === 0) return;
  
  if (confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.value.length} sản phẩm đã chọn?`)) {
    // Remove selected items from cart
    cartItems.value = cartItems.value.filter(item => !selectedItems.value.includes(item.id));
    // Clear selected items
    selectedItems.value = [];
    // Show success message
    successMessage.value = {
      title: 'Xóa thành công',
      content: 'Các sản phẩm đã chọn đã được xóa khỏi giỏ hàng'
    };
    showSuccessModal.value = true;
  }
};

// Initialize page
const initializePage = async () => {
  try {
    // Load mock data
    loadMockData();
    
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
    
  } catch (error) {
    console.error('Error initializing cart page:', error);
  } finally {
    isLoading.value = false;
  }
};

// Initialize when component is mounted
onMounted(() => {
  initializePage();
});
</script>
