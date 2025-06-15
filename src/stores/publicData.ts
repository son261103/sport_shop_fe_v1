import { defineStore } from "pinia";
import { ref, computed, readonly } from "vue";
import { categoryService } from "@/services/categoryService";
import { brandService } from "@/services/brandService";
import type {
  Category,
  Brand,
  CategoriesParams,
  BrandsParams,
} from "@/types/public";

export const usePublicDataStore = defineStore('publicData', () => {
  // State
  const categories = ref<Category[]>([]);
  const brands = ref<Brand[]>([]);
  const isLoadingCategories = ref(false);
  const isLoadingBrands = ref(false);
  const categoriesError = ref<string | null>(null);
  const brandsError = ref<string | null>(null);
  const lastCategoriesFetchTime = ref<number>(0);
  const lastBrandsFetchTime = ref<number>(0);

  // Cache settings
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  // Getters
  const hasCategories = computed(() => categories.value.length > 0);
  const hasBrands = computed(() => brands.value.length > 0);
  const isCategoriesCacheValid = computed(() => {
    return Date.now() - lastCategoriesFetchTime.value < CACHE_DURATION;
  });
  const isBrandsCacheValid = computed(() => {
    return Date.now() - lastBrandsFetchTime.value < CACHE_DURATION;
  });

  // Actions
  const fetchCategories = async (params?: CategoriesParams, forceRefresh = false) => {
    // Check cache validity
    if (!forceRefresh && hasCategories.value && isCategoriesCacheValid.value) {
      return categories.value;
    }

    isLoadingCategories.value = true;
    categoriesError.value = null;

    try {
      const response = await categoryService.getCategories(params);
      if (response.status) {
        categories.value = response.data;
        lastCategoriesFetchTime.value = Date.now();
      } else {
        throw new Error(response.message || 'Failed to fetch categories');
      }
      return categories.value;
    } catch (error: any) {
      categoriesError.value = error.message || 'Failed to fetch categories';
      console.error('Error fetching categories:', error);
      throw error;
    } finally {
      isLoadingCategories.value = false;
    }
  };

  const fetchBrands = async (params?: BrandsParams, forceRefresh = false) => {
    // Check cache validity
    if (!forceRefresh && hasBrands.value && isBrandsCacheValid.value) {
      return brands.value;
    }

    isLoadingBrands.value = true;
    brandsError.value = null;

    try {
      const response = await brandService.getBrands(params);
      if (response.status) {
        brands.value = response.data;
        lastBrandsFetchTime.value = Date.now();
      } else {
        throw new Error(response.message || 'Failed to fetch brands');
      }
      return brands.value;
    } catch (error: any) {
      brandsError.value = error.message || 'Failed to fetch brands';
      console.error('Error fetching brands:', error);
      throw error;
    } finally {
      isLoadingBrands.value = false;
    }
  };

  const clearCategoriesCache = () => {
    categories.value = [];
    lastCategoriesFetchTime.value = 0;
    categoriesError.value = null;
  };

  const clearBrandsCache = () => {
    brands.value = [];
    lastBrandsFetchTime.value = 0;
    brandsError.value = null;
  };

  const clearAllCache = () => {
    clearCategoriesCache();
    clearBrandsCache();
  };

  return {
    // State
    categories: readonly(categories),
    brands: readonly(brands),
    isLoadingCategories: readonly(isLoadingCategories),
    isLoadingBrands: readonly(isLoadingBrands),
    categoriesError: readonly(categoriesError),
    brandsError: readonly(brandsError),

    // Getters
    hasCategories,
    hasBrands,
    isCategoriesCacheValid,
    isBrandsCacheValid,

    // Actions
    fetchCategories,
    fetchBrands,
    clearCategoriesCache,
    clearBrandsCache,
    clearAllCache,
  };
});