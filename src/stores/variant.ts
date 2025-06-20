import { defineStore } from 'pinia';
import { ref } from 'vue';
import { variantService } from '@/services/admin/variantService';
import type { ProductVariant, VariantFormData } from '@/types/admin/variant';

export const useVariantStore = defineStore('variant', () => {
  const variants = ref<ProductVariant[]>([]);
  const currentProductId = ref<number | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadVariants = async (productId: number) => {
    isLoading.value = true;
    error.value = null;
    currentProductId.value = productId;
    
    try {
      const response = await variantService.getVariants(productId);
      variants.value = response.data;
      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra khi tải biến thể sản phẩm';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createVariant = async (productId: number, data: VariantFormData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await variantService.createVariant(productId, data);
      await loadVariants(productId);
      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra khi tạo biến thể sản phẩm';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateVariant = async (productId: number, variantId: number, data: Partial<VariantFormData>) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await variantService.updateVariant(productId, variantId, data);
      await loadVariants(productId);
      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật biến thể sản phẩm';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteVariant = async (productId: number, variantId: number) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await variantService.deleteVariant(productId, variantId);
      await loadVariants(productId);
      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra khi xóa biến thể sản phẩm';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    variants,
    currentProductId,
    isLoading,
    error,
    loadVariants,
    createVariant,
    updateVariant,
    deleteVariant,
    clearError
  };
});