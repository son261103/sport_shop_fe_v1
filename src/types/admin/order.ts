export interface Order {
  id: number;
  user_id: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: 'sepay' | 'cod';
  total_amount: string;
  shipping_address: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  items?: OrderItem[];
}

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
  message: string;
  data: Order[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
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