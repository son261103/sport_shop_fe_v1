export interface ProductVariant {
  id: number;
  product_id: number;
  size: string;
  color: string;
  stock_quantity: number;
  is_active: boolean;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface VariantFormData {
  size: string;
  color: string;
  stock_quantity: number;
  is_active?: boolean;
  image?: File;
}

export interface VariantListResponse {
  success: boolean;
  message: string;
  data: ProductVariant[];
}

export interface VariantResponse {
  success: boolean;
  message: string;
  data: ProductVariant;
}