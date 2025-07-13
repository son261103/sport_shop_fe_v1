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
import { apiClient } from './api';

export class CartService {
  private static readonly BASE_URL = '/api/cart';

  /**
   * Get user's cart
   */
  static async getCart(): Promise<CartResponse> {
    const response = await apiClient.get<CartResponse>(this.BASE_URL);
    return response.data;
  }

  /**
   * Add item to cart
   */
  static async addToCart(request: AddToCartRequest): Promise<AddToCartResponse> {
    const response = await apiClient.post<AddToCartResponse>(
      `${this.BASE_URL}/add`,
      request
    );
    return response.data;
  }

  /**
   * Update cart item quantity
   */
  static async updateCartItem(
    itemId: number,
    request: UpdateCartItemRequest
  ): Promise<UpdateCartItemResponse> {
    const response = await apiClient.put<UpdateCartItemResponse>(
      `${this.BASE_URL}/update/${itemId}`,
      request
    );
    return response.data;
  }

  /**
   * Remove item from cart
   */
  static async removeFromCart(itemId: number): Promise<RemoveFromCartResponse> {
    const response = await apiClient.delete<RemoveFromCartResponse>(
      `${this.BASE_URL}/remove/${itemId}`
    );
    return response.data;
  }

  /**
   * Clear all items from cart
   */
  static async clearCart(): Promise<ClearCartResponse> {
    const response = await apiClient.delete<ClearCartResponse>(
      `${this.BASE_URL}/clear`
    );
    return response.data;
  }

  /**
   * Get cart items count
   */
  static async getCartCount(): Promise<CartCountResponse> {
    const response = await apiClient.get<CartCountResponse>(
      `${this.BASE_URL}/count`
    );
    return response.data;
  }
}

export default CartService;
