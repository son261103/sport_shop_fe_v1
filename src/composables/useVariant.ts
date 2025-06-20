import { computed } from 'vue';
import { useVariantStore } from '@/stores/variant';
import type { VariantFormData } from '@/types/admin/variant';

export function useVariant() {
  const store = useVariantStore();

  const variants = computed(() => store.variants);
  const currentProductId = computed(() => store.currentProductId);
  const isLoading = computed(() => store.isLoading);
  const error = computed(() => store.error);

  const loadVariants = async (productId: number) => {
    return await store.loadVariants(productId);
  };

  const createVariant = async (productId: number, data: VariantFormData) => {
    return await store.createVariant(productId, data);
  };

  const updateVariant = async (productId: number, variantId: number, data: Partial<VariantFormData>) => {
    return await store.updateVariant(productId, variantId, data);
  };

  const deleteVariant = async (productId: number, variantId: number) => {
    return await store.deleteVariant(productId, variantId);
  };

  const clearError = () => {
    store.clearError();
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
}