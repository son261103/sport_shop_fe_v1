export interface Category {
  id: number;
  name: string;
  products_count: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryFormData {
  name: string;
}

export interface CategoryPaginationData {
  current_page: number;
  data: Category[];
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

export interface CategoryListResponse {
  status: boolean;
  message: string;
  data: CategoryPaginationData;
}

export interface CategoryResponse {
  status: boolean;
  message: string;
  data: Category;
}

export interface CategoryListParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface BulkDeleteRequest {
  ids: number[];
}
