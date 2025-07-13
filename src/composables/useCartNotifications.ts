// Cart Actions Composable with Notifications
import { useCartStore } from '@/stores/cart';
import { useNotification } from '@/composables/useNotification';
import { useLoading } from '@/composables/useLoading';
import type { AddToCartRequest } from '@/types/cart';

export function useCartNotifications() {
  const cartStore = useCartStore();
  const { showSuccess, showError } = useNotification();
  const { showLoading, hideLoading } = useLoading();

  const addToCartWithNotification = async (request: AddToCartRequest) => {
    try {
      showLoading('Đang thêm vào giỏ hàng...');
      const result = await cartStore.addToCart(request);
      showSuccess('Đã thêm sản phẩm vào giỏ hàng!');
      return result;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng';
      showError(message);
      throw error;
    } finally {
      hideLoading();
    }
  };

  const updateCartItemWithNotification = async (itemId: number, quantity: number) => {
    try {
      showLoading('Đang cập nhật giỏ hàng...');
      const result = await cartStore.updateCartItem(itemId, quantity);
      showSuccess('Đã cập nhật giỏ hàng!');
      return result;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể cập nhật giỏ hàng';
      showError(message);
      throw error;
    } finally {
      hideLoading();
    }
  };

  const removeFromCartWithNotification = async (itemId: number) => {
    try {
      showLoading('Đang xóa sản phẩm...');
      const result = await cartStore.removeFromCart(itemId);
      showSuccess('Đã xóa sản phẩm khỏi giỏ hàng!');
      return result;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể xóa sản phẩm khỏi giỏ hàng';
      showError(message);
      throw error;
    } finally {
      hideLoading();
    }
  };

  const clearCartWithNotification = async () => {
    try {
      showLoading('Đang xóa toàn bộ giỏ hàng...');
      const result = await cartStore.clearCart();
      showSuccess('Đã xóa toàn bộ giỏ hàng!');
      return result;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể xóa giỏ hàng';
      showError(message);
      throw error;
    } finally {
      hideLoading();
    }
  };

  return {
    addToCartWithNotification,
    updateCartItemWithNotification,
    removeFromCartWithNotification,
    clearCartWithNotification
  };
}

export default useCartNotifications;
