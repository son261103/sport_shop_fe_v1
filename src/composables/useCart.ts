// Cart Composable
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useCartNotifications } from './useCartNotifications';
import type { AddToCartRequest } from '@/types/cart';

export function useCart() {
  const cartStore = useCartStore();
  const cartActions = useCartNotifications();

  // Get reactive state from store
  const {
    items,
    cartCount,
    isCartOpen,
    isLoading,
    isEmpty,
    formattedTotal,
    totalPrice,
    subtotal,
    shippingFee,
    discountAmount
  } = storeToRefs(cartStore);

  // Get basic actions from store (without notifications)
  const {
    fetchCart,
    getCartCount,
    toggleCart,
    openCart,
    closeCart,
    initializeCart
  } = cartStore;

  // Get actions with notifications
  const {
    addToCartWithNotification,
    updateCartItemWithNotification,
    removeFromCartWithNotification,
    clearCartWithNotification
  } = cartActions;

  // Helper function to add product to cart
  const addProductToCart = async (productId: number, quantity: number = 1, variantId?: number) => {
    const request: AddToCartRequest = {
      product_id: productId,
      quantity,
      variant_id: variantId
    };

    return await addToCartWithNotification(request);
  };

  // Helper function to update quantity with validation
  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) {
      return await removeFromCartWithNotification(itemId);
    }
    return await updateCartItemWithNotification(itemId, quantity);
  };

  // Helper function to increase quantity
  const increaseQuantity = async (itemId: number) => {
    const item = items.value.find(item => item.id === itemId);
    if (item) {
      return await updateQuantity(itemId, item.quantity + 1);
    }
  };

  // Helper function to decrease quantity
  const decreaseQuantity = async (itemId: number) => {
    const item = items.value.find(item => item.id === itemId);
    if (item) {
      return await updateQuantity(itemId, item.quantity - 1);
    }
  };

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Calculate total savings
  const totalSavings = computed(() => {
    return items.value.reduce((total, item) => {
      if (item.variant_price && item.variant_price > item.product_price) {
        return total + ((item.variant_price - item.product_price) * item.quantity);
      }
      return total;
    }, 0);
  });

  return {
    // State
    items,
    cartCount,
    isCartOpen,
    isLoading,
    isEmpty,
    formattedTotal,
    totalPrice,
    subtotal,
    shippingFee,
    discountAmount,
    totalSavings,

    // Actions
    fetchCart,
    addProductToCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart: removeFromCartWithNotification,
    clearCart: clearCartWithNotification,
    getCartCount,
    toggleCart,
    openCart,
    closeCart,
    initializeCart,

    // Utilities
    formatPrice
  };
}

export default useCart;
