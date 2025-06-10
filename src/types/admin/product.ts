export interface Product {
  id: number;
  name: string;
  price: string;
  discount_price?: string;
  description?: string;
  image?: string;
  stock_quantity: number;
  is_active: boolean;
  category_id?: number;
  brand_id?: number;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
    description?: string;
  };
  brand?: {
    id: number;
    name: string;
    description?: string;
  };
}

export interface ProductFormData {
  name: string;
  price: number;
  discount_price?: number;
  description?: string;
  stock_quantity?: number;
  is_active?: boolean;
  category_id?: number;
  brand_id?: number;
  image?: File;
}

export interface ProductPaginationData {
  current_page: number;
  data: Product[];
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
  sort_by: string;
  sort_order: string;
}

export interface ProductListResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  sort: {
    by: string;
    order: string;
  };
}

export interface ProductResponse {
  status: boolean;
  message: string;
  data: Product;
}

export interface ProductListParams {
  page?: number;
  per_page?: number;
  search?: string;
  category_id?: number;
  brand_id?: number;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface BulkDeleteRequest {
  ids: number[];
}
