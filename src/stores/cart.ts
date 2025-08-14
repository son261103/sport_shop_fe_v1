// Cart Store with Pinia
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import CartService from '@/services/cartService';
import type { CartItem, AddToCartRequest } from '@/types/cart';

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
      
      items.value = response.data.items;
      totalItems.value = response.data.total_items;
      totalPrice.value = response.data.total_price;
      subtotal.value = response.data.subtotal;
      shippingFee.value = response.data.shipping_fee;
      discountAmount.value = response.data.discount_amount;
      
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (request: AddToCartRequest) => {
    try {
      isLoading.value = true;
      const response = await CartService.addToCart(request);
      
      // Update cart count
      totalItems.value = response.data.cart_count;
      
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
      
      // Update cart count
      totalItems.value = response.data.cart_count;
      
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
      const response = await CartService.removeFromCart(itemId);
      
      // Update cart count
      totalItems.value = response.data.cart_count;
      
      // Refresh cart data
      await fetchCart();
      
      return response.data;
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      throw error;
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
      totalItems.value = response.data.count;
      return response.data.count;
    } catch (error) {
      console.error('Error getting cart count:', error);
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

  // Add sample data for testing - using real backend data
  const addSampleData = () => {
    items.value = [
      {
        id: 1,
        product_id: 1,
        product_name: 'Nike Air Max 270',
        product_image: 'http://res.cloudinary.com/dzeiafgu0/image/upload/v1752423996/sport_shop/products/wrfqqj7dsvxeghuf6fx0.jpg',
        product_price: 2000.00, // Using discount price from backend
        quantity: 11,
        total_price: 22000.00, // product_price * quantity
        variant_id: undefined,
        variant_name: undefined,
        variant_price: undefined,
        created_at: '2025-08-12T16:28:30.000000Z',
        updated_at: '2025-08-12T17:08:10.000000Z'
      }
    ];
    
    // Update totals based on real backend data
    totalItems.value = items.value.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice.value = items.value.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
    subtotal.value = totalPrice.value;
    shippingFee.value = 0; // No shipping fee in backend response
    discountAmount.value = 0;
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
    initializeCart,
    addSampleData
  };
});

export default useCartStore;
