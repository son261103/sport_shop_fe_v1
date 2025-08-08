// Cart API Service
import type {
  CartResponse,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartItemRequest,
  UpdateCartItemResponse,
  RemoveFromCartResponse,
  CartCountResponse,
  ClearCartResponse
} from '../types/cart';
import { api } from './api';

export class CartService {
  /**
   * Get user's cart
   */
  static async getCart(): Promise<CartResponse> {
    return await api.cart.getCart();
  }

  /**
   * Add item to cart
   */
  static async addToCart(request: AddToCartRequest): Promise<AddToCartResponse> {
    return await api.cart.addToCart(request);
  }

  /**
   * Update cart item quantity
   */
  static async updateCartItem(
    itemId: number,
    request: UpdateCartItemRequest
  ): Promise<UpdateCartItemResponse> {
    return await api.cart.updateCartItem(itemId, request);
  }

  /**
   * Remove item from cart
   */
  static async removeFromCart(itemId: number): Promise<RemoveFromCartResponse> {
    return await api.cart.removeFromCart(itemId);
  }

  /**
   * Clear all items from cart
   */
  static async clearCart(): Promise<ClearCartResponse> {
    return await api.cart.clearCart();
  }

  /**
   * Get cart items count
   */
  static async getCartCount(): Promise<CartCountResponse> {
    return await api.cart.getCartCount();
  }
}

export default CartService;
