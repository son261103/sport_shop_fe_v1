// 🌐 API Types for Sport Shop
// Types for categories, brands, products endpoints

// Category Types
export interface Category {
  id: number;
  name: string;
  products_count: number;
  created_at: string;
}

export interface CategoriesResponse {
  status: boolean;
  message: string;
  data: Category[];
}

export interface CategoriesParams {
  search?: string;
  sort_by?: "name" | "created_at";
  sort_order?: "asc" | "desc";
}

// Brand Types
export interface Brand {
  id: number;
  name: string;
  products_count: number;
  created_at: string;
}

export interface BrandsResponse {
  status: boolean;
  message: string;
  data: Brand[];
}

export interface BrandsParams {
  search?: string;
  sort_by?: "name" | "created_at";
  sort_order?: "asc" | "desc";
}

// Filter Options for UI
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

// Data Store State
export interface DataState {
  categories: Category[];
  brands: Brand[];
  categoriesLoading: boolean;
  brandsLoading: boolean;
  categoriesError: string | null;
  brandsError: string | null;
  lastCategoriesFetch: number;
  lastBrandsFetch: number;
}