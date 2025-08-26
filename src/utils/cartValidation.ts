// Cart validation utilities
import type { CartItem } from '@/types/cart';

/**
 * Validate if cart item exists in current cart
 */
export const validateCartItem = (items: CartItem[], itemId: number): boolean => {
  return items.some(item => item.id === itemId);
};

/**
 * Get cart item by ID
 */
export const getCartItemById = (items: CartItem[], itemId: number): CartItem | undefined => {
  return items.find(item => item.id === itemId);
};

/**
 * Check if cart is in sync with server
 */
export const isCartSynced = (localItems: CartItem[], serverItems: CartItem[]): boolean => {
  if (localItems.length !== serverItems.length) {
    return false;
  }
  
  return localItems.every(localItem => 
    serverItems.some(serverItem => 
      serverItem.id === localItem.id && 
      serverItem.quantity === localItem.quantity
    )
  );
};

/**
 * Find items that exist locally but not on server
 */
export const findOrphanedItems = (localItems: CartItem[], serverItems: CartItem[]): CartItem[] => {
  return localItems.filter(localItem => 
    !serverItems.some(serverItem => serverItem.id === localItem.id)
  );
};

/**
 * Validate cart item before removal
 */
export const validateItemForRemoval = async (
  itemId: number, 
  currentItems: CartItem[],
  refreshCartFn: () => Promise<void>
): Promise<{ isValid: boolean; message?: string }> => {
  // Check if item exists in current cart
  const existingItem = getCartItemById(currentItems, itemId);
  
  if (!existingItem) {
    // Item not found locally, try refreshing cart
    try {
      await refreshCartFn();
      return { 
        isValid: false, 
        message: 'Sản phẩm không tồn tại trong giỏ hàng hoặc đã được xóa' 
      };
    } catch (error) {
      return { 
        isValid: false, 
        message: 'Không thể kiểm tra trạng thái giỏ hàng' 
      };
    }
  }
  
  return { isValid: true };
};

/**
 * Create error message based on error type
 */
export const getCartErrorMessage = (error: any): string => {
  if (error.type === 'not_found') {
    return 'Sản phẩm không tồn tại trong giỏ hàng hoặc đã được xóa';
  }
  
  if (error.type === 'unauthorized') {
    return 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
  }
  
  if (error.type === 'server') {
    return 'Lỗi server, vui lòng thử lại sau';
  }
  
  if (error.type === 'network') {
    return 'Không thể kết nối đến server, vui lòng kiểm tra kết nối mạng';
  }
  
  if (error.response?.status === 404) {
    return error.response?.data?.message || 'Sản phẩm không tồn tại trong giỏ hàng';
  }
  
  if (error.response?.status === 401) {
    return 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
  }
  
  if (error.response?.status >= 500) {
    return 'Lỗi server, vui lòng thử lại sau';
  }
  
  return error.message || error.response?.data?.message || 'Không thể xóa sản phẩm khỏi giỏ hàng';
};
