// Cart testing utilities
import { useCartStore } from '@/stores/cart';

/**
 * Test cart removal function
 */
export const testCartRemoval = async (itemId: number) => {
  const cartStore = useCartStore();
  
  try {
    console.log(`🧪 Testing removal of cart item ${itemId}`);
    console.log('📦 Current cart items:', cartStore.items);
    
    const result = await cartStore.removeFromCart(itemId);
    
    console.log('✅ Removal successful:', result);
    console.log('📊 Updated cart count:', cartStore.totalItems);
    console.log('📦 Updated cart items:', cartStore.items);
    
    return { success: true, result };
  } catch (error) {
    console.error('❌ Removal failed:', error);
    return { success: false, error };
  }
};

// Make available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testCartRemoval = testCartRemoval;
}
