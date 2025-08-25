export interface Order {
  id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  total_price: number;
  shipping_fee: number;
  discount_amount: number;
  final_total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'sepay' | 'cod';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
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

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  product: {
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
    category: {
      id: number;
      name: string;
    };
    brand: {
      id: number;
      name: string;
    };
    created_at: string;
    updated_at: string;
  };
  quantity: number;
  price: number;
  total: number;
  created_at: string;
  updated_at: string;
}

// Keep OrderItem for backward compatibility
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  product?: {
    id: number;
    name: string;
    image?: string;
  };
}

export interface OrderListParams {
  status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: 'sepay' | 'cod';
  page?: number;
  per_page?: number;
  search?: string;
}

export interface OrderPaginationData {
  current_page: number;
  data: Order[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface OrderListResponse {
  success: boolean;
  data: Order[];
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
}

export interface OrderStatusUpdateRequest {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
}

export interface OrderStatistics {
  total_orders: number;
  pending_orders: number;
  confirmed_orders: number;
  processing_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  total_revenue: string;
  period: 'today' | 'week' | 'month' | 'year';
}

export interface OrderStatisticsResponse {
  success: boolean;
  message: string;
  data: OrderStatistics;
}

export interface OrderStatisticsParams {
  period?: 'today' | 'week' | 'month' | 'year';
}