import { apiClient } from '../api';
import type { VariantFormData, VariantListResponse, VariantResponse } from '@/types/admin/variant';

export const variantService = {
  // GET /api/admin/products/{product_id}/variants
  getVariants: (productId: number): Promise<VariantListResponse> => {
    return apiClient
      .get(`/admin/products/${productId}/variants`)
      .then((response) => response.data);
  },

  // POST /api/admin/products/{product_id}/variants
  createVariant: (productId: number, data: VariantFormData): Promise<VariantResponse> => {
    const formData = new FormData();
    formData.append('size', data.size);
    formData.append('color', data.color);
    formData.append('stock_quantity', data.stock_quantity.toString());
    if (data.is_active !== undefined) {
      formData.append('is_active', data.is_active.toString());
    }
    if (data.image) {
      formData.append('image', data.image);
    }
    return apiClient
      .post(`/admin/products/${productId}/variants`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  // PUT /api/admin/products/{product_id}/variants/{variant_id}
  updateVariant: (
    productId: number,
    variantId: number,
    data: Partial<VariantFormData>
  ): Promise<VariantResponse> => {
    const formData = new FormData();
    if (data.size) formData.append('size', data.size);
    if (data.color) formData.append('color', data.color);
    if (data.stock_quantity !== undefined) {
      formData.append('stock_quantity', data.stock_quantity.toString());
    }
    if (data.is_active !== undefined) {
      formData.append('is_active', data.is_active.toString());
    }
    if (data.image) {
      formData.append('image', data.image);
    }
    
    return apiClient
      .put(`/admin/products/${productId}/variants/${variantId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  // DELETE /api/admin/products/{product_id}/variants/{variant_id}
  deleteVariant: (productId: number, variantId: number): Promise<any> => {
    return apiClient
      .delete(`/admin/products/${productId}/variants/${variantId}`)
      .then((response) => response.data);
  },
};