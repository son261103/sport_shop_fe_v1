// Order related types

export interface OrderUser {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface OrderCategory {
  id: number;
  name: string;
}

export interface OrderBrand {
  id: number;
  name: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  description: string;
  image: string;
  cloudinary_public_id: string;
  stock_quantity: number;
  is_active: boolean;
  category_id: number;
  brand_id: number;
  category: OrderCategory;
  brand: OrderBrand;
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  product: OrderProduct;
  quantity: number;
  price: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  user: OrderUser;
  total_price: number;
  shipping_fee: number;
  discount_amount: number;
  final_total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'cod' | 'sepay';
  payment_status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transaction_id?: string;
  paid_at?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward: string;
  shipping_phone: string;
  notes?: string;
  sepay_reference_code?: string;
  order_details: OrderDetail[];
  created_at: string;
  updated_at: string;
}

export interface OrdersResponse {
  success: true;
  data: Order[];
}

export interface OrderErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Create order request
export interface CreateOrderRequest {
  payment_method: 'cod' | 'sepay';
  shipping_address: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward: string;
  shipping_phone: string;
  notes?: string;
}

export interface CreateOrderResponse {
  success: true;
  message: string;
  data: Order;
}