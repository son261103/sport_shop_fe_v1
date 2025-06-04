export interface Brand {
  id: number;
  name: string;
  products_count: number;
  created_at: string;
  updated_at: string;
}

export interface BrandFormData {
  name: string;
}

export interface BrandListResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: Brand[];
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
  };
}

export interface BrandResponse {
  status: boolean;
  message: string;
  data: Brand;
}

export interface BrandListParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface BulkDeleteRequest {
  ids: number[];
}
