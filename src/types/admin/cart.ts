export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  // Relations
  user?: {
    id: number;
    name: string;
    email: string;
  };
  product?: {
    id: number;
    name: string;
    image?: string;
    price: number;
  };
  variant?: {
    id: number;
    name: string;
    price: number;
  };
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total_items: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
  // Relations
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CartListParams {
  page?: number;
  per_page?: number;
  search?: string;
  user_id?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  date_from?: string;
  date_to?: string;
}

export interface CartListResponse {
  data: Cart[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface CartStats {
  total_carts: number;
  total_items: number;
  total_amount: number;
  abandoned_carts: number;
  conversion_rate: number;
}