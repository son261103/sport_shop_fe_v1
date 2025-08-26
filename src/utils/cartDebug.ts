// Cart debugging utilities
import { CartService } from '@/services/cartService';
import type { CartItem } from '@/types/cart';

/**
 * Debug cart state - compare local vs server
 */
export const debugCartState = async () => {
  try {
    console.group('🛒 Cart Debug Information');
    
    // Get cart from server
    const serverCart = await CartService.getCart();
    console.log('📡 Server cart:', serverCart);
    
    // Get local cart from store (if available)
    const localCartStore = (window as any).$nuxt?.$pinia?.state?.value?.cart;
    if (localCartStore) {
      console.log('💾 Local cart store:', {
        items: localCartStore.items,
        totalItems: localCartStore.totalItems,
        totalPrice: localCartStore.totalPrice
      });
    }
    
    // Check authentication
    const token = localStorage.getItem('auth_token');
    console.log('🔑 Auth token exists:', !!token);
    if (token) {
      console.log('🔑 Token preview:', token.substring(0, 20) + '...');
    }
    
    // Check API base URL
    console.log('🌐 API Base URL:', import.meta.env.VITE_API_BASE_URL);
    
    console.groupEnd();
    
    return {
      serverCart,
      localCart: localCartStore,
      hasToken: !!token,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL
    };
  } catch (error) {
    console.error('❌ Cart debug failed:', error);
    return { error };
  }
};

/**
 * Test cart item removal
 */
export const testCartItemRemoval = async (itemId: number) => {
  try {
    console.group(`🗑️ Testing removal of cart item ${itemId}`);
    
    // First check if item exists
    const cartData = await CartService.getCart();
    const item = cartData.data.items?.find((item: CartItem) => item.id === itemId) ||
                 cartData.data.cart_items?.find((item: any) => item.id === itemId);
    
    console.log('📦 Item exists in cart:', !!item);
    if (item) {
      console.log('📦 Item details:', item);
    }
    
    // Try to remove
    if (item) {
      console.log('🗑️ Attempting to remove item...');
      const result = await CartService.removeFromCart(itemId);
      console.log('✅ Removal successful:', result);
      return { success: true, result };
    } else {
      console.log('❌ Item not found in cart');
      return { success: false, error: 'Item not found' };
    }
    
  } catch (error) {
    console.error('❌ Removal failed:', error);
    return { success: false, error };
  } finally {
    console.groupEnd();
  }
};

/**
 * Check cart synchronization
 */
export const checkCartSync = async () => {
  try {
    console.group('🔄 Cart Synchronization Check');
    
    const serverCart = await CartService.getCart();
    const serverItems = serverCart.data.items || serverCart.data.cart_items || [];
    
    console.log('📡 Server items count:', serverItems.length);
    console.log('📡 Server items:', serverItems.map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity
    })));
    
    // Get cart count from API
    const countResponse = await CartService.getCartCount();
    console.log('🔢 Server cart count:', countResponse.data.count);
    
    console.groupEnd();
    
    return {
      serverItems,
      serverCount: countResponse.data.count,
      itemIds: serverItems.map((item: any) => item.id)
    };
  } catch (error) {
    console.error('❌ Cart sync check failed:', error);
    return { error };
  }
};

/**
 * Quick cart health check
 */
export const cartHealthCheck = async () => {
  console.log('🏥 Running cart health check...');
  
  const results = await Promise.allSettled([
    CartService.getCart(),
    CartService.getCartCount()
  ]);
  
  const cartResult = results[0];
  const countResult = results[1];
  
  console.log('📊 Health check results:', {
    cartAPI: cartResult.status === 'fulfilled' ? '✅ OK' : '❌ Failed',
    countAPI: countResult.status === 'fulfilled' ? '✅ OK' : '❌ Failed',
    cartError: cartResult.status === 'rejected' ? cartResult.reason : null,
    countError: countResult.status === 'rejected' ? countResult.reason : null
  });
  
  return {
    cartAPI: cartResult.status === 'fulfilled',
    countAPI: countResult.status === 'fulfilled',
    cartData: cartResult.status === 'fulfilled' ? cartResult.value : null,
    countData: countResult.status === 'fulfilled' ? countResult.value : null,
    errors: {
      cart: cartResult.status === 'rejected' ? cartResult.reason : null,
      count: countResult.status === 'rejected' ? countResult.reason : null
    }
  };
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).cartDebug = {
    debugCartState,
    testCartItemRemoval,
    checkCartSync,
    cartHealthCheck
  };
}
