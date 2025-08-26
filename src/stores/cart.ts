// Cart Store with Pinia
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import CartService from '@/services/cartService';
import type { CartItem, AddToCartRequest } from '@/types/cart';
import { validateItemForRemoval, getCartErrorMessage } from '@/utils/cartValidation';

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);
  const totalItems = ref(0);
  const totalPrice = ref(0);
  const subtotal = ref(0);
  const shippingFee = ref(0);
  const discountAmount = ref(0);
  const isLoading = ref(false);
  const isCartOpen = ref(false);

  // Helper function để update cart count an toàn
  const updateCartCountSafely = async (response: any) => {
    if (response?.data && typeof response.data.cart_count === 'number') {
      totalItems.value = response.data.cart_count;
    } else {
      // Fallback: lấy cart count từ API riêng
      try {
        await getCartCount();
      } catch (countError) {
        console.warn('Failed to get cart count:', countError);
      }
    }
  };

  // Computed
  const cartCount = computed(() => totalItems.value);
  const isEmpty = computed(() => items.value.length === 0);
  const formattedTotal = computed(() => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(totalPrice.value);
  });

  // Actions
  const fetchCart = async () => {
    try {
      isLoading.value = true;
      const response = await CartService.getCart();

      if (response && response.data) {
        // Handle the API response structure with cart_items
        const cartItems = response.data.cart_items || [];
        
        // Transform cart_items to match our CartItem interface
        items.value = cartItems.map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          product_name: item.product?.name || '',
          product_image: item.product?.image || '',
          product_price: parseFloat(item.product?.discount_price || item.product?.price || '0'),
          quantity: item.quantity,
          total_price: parseFloat(item.product?.discount_price || item.product?.price || '0') * item.quantity,
          variant_id: item.variant_id,
          variant_name: item.variant_name,
          variant_image: item.variant_image,
          variant_price: item.variant_price,
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        
        // Calculate totals from cart items
        totalItems.value = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
                subtotal.value = items.value.reduce((sum, item) => sum + item.total_price, 0);
        shippingFee.value = 30000; // Phí vận chuyển cố định
        discountAmount.value = response.data.discount_amount || 0;
        totalPrice.value = subtotal.value + shippingFee.value - discountAmount.value;
      }

    } catch (error: any) {
      console.error('Error fetching cart:', error);
      // Reset to default values on error
      items.value = [];
      totalItems.value = 0;
      totalPrice.value = 0;
      subtotal.value = 0;
      shippingFee.value = 0;
      discountAmount.value = 0;
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (request: AddToCartRequest) => {
    try {
      isLoading.value = true;
      const response = await CartService.addToCart(request);

      // Update cart count an toàn
      await updateCartCountSafely(response);

      // Refresh cart data
      await fetchCart();

      return response.data;
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      return await removeFromCart(itemId);
    }

    try {
      isLoading.value = true;
      const response = await CartService.updateCartItem(itemId, { quantity });

      // Update cart count an toàn
      await updateCartCountSafely(response);

      // Refresh cart data
      await fetchCart();

      return response.data;
    } catch (error: any) {
      console.error('Error updating cart item:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      isLoading.value = true;

      // Debug: Log trước khi gọi API
      console.log('Attempting to remove cart item:', itemId);
      console.log('Current cart items:', items.value);

      // Validate item trước khi xóa
      const validation = await validateItemForRemoval(itemId, items.value, fetchCart);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }

      const response = await CartService.removeFromCart(itemId);

      // Update cart count an toàn
      await updateCartCountSafely(response);

      // Refresh cart data để đồng bộ với server
      await fetchCart();

      return response.data;
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      console.error('Error response:', error.response?.data);

      // Sử dụng utility function để tạo error message
      const errorMessage = getCartErrorMessage(error);

      // Refresh cart nếu gặp lỗi 404 để đồng bộ với server
      if (error.type === 'not_found' || error.response?.status === 404) {
        console.warn('Cart item not found on server, refreshing cart...');
        try {
          await fetchCart();
        } catch (refreshError) {
          console.error('Failed to refresh cart:', refreshError);
        }
      }

      throw new Error(errorMessage);
    } finally {
      isLoading.value = false;
    }
  };

  const clearCart = async () => {
    try {
      isLoading.value = true;
      const response = await CartService.clearCart();
      
      // Reset cart data
      items.value = [];
      totalItems.value = 0;
      totalPrice.value = 0;
      subtotal.value = 0;
      shippingFee.value = 0;
      discountAmount.value = 0;
      
      return response.data;
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const getCartCount = async () => {
    try {
      const response = await CartService.getCartCount();
      if (response && response.data) {
        totalItems.value = response.data.count || 0;
        return response.data.count || 0;
      }
      return 0;
    } catch (error: any) {
      console.error('Error getting cart count:', error);
      totalItems.value = 0;
      return 0;
    }
  };

  // UI Actions
  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  const openCart = () => {
    isCartOpen.value = true;
  };

  const closeCart = () => {
    isCartOpen.value = false;
  };

  // Initialize cart on store creation
  const initializeCart = async () => {
    await Promise.all([
      fetchCart(),
      getCartCount()
    ]);
  };



  return {
    // State
    items,
    totalItems,
    totalPrice,
    subtotal,
    shippingFee,
    discountAmount,
    isLoading,
    isCartOpen,

    // Computed
    cartCount,
    isEmpty,
    formattedTotal,

    // Actions
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    toggleCart,
    openCart,
    closeCart,
    initializeCart
  };
});

export default useCartStore;
