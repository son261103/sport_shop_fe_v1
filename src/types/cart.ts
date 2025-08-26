// Cart API Types
export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  product_price: number;
  product_description?: string;
  brand_name?: string;
  unit_price?: number;
  quantity: number;
  total_price: number;
  variant_id?: number;
  variant_name?: string;
  variant_image?: string;
  variant_price?: number;
  created_at: string;
  updated_at: string;
}

export interface CartResponse {
  success: boolean;
  data: {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    cart_items: Array<{
      id: number;
      cart_id: number;
      product_id: number;
      quantity: number;
      created_at: string;
      updated_at: string;
      product: {
        id: number;
        name: string;
        price: string;
        discount_price?: string;
        description: string;
        image: string;
        cloudinary_public_id: string;
        stock_quantity: number;
        is_active: boolean;
        category_id: number;
        brand_id: number;
        created_at: string;
        updated_at: string;
        category: {
          id: number;
          name: string;
        };
        brand: {
          id: number;
          name: string;
        };
      };
    }>;
    // Optional fields for backward compatibility
    items?: CartItem[];
    total_items?: number;
    total_price?: number;
    subtotal?: number;
    shipping_fee?: number;
    discount_amount?: number;
  };
  message: string;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
  variant_id?: number;
}

export interface AddToCartResponse {
  success: boolean;
  data: {
    item?: CartItem;
    cart_count?: number;
  };
  message: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface UpdateCartItemResponse {
  success: boolean;
  data: {
    item?: CartItem;
    cart_count?: number;
  };
  message: string;
}

export interface RemoveFromCartResponse {
  success: boolean;
  data?: {
    cart_count?: number;
  };
  message: string;
}

export interface ClearCartResponse {
  success: boolean;
  data?: {
    cart_count?: number;
  };
  message: string;
}

export interface CartCountResponse {
  success: boolean;
  data: {
    count: number;
  };
  message: string;
}

// Error response interface
export interface CartErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
