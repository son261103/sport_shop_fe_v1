import { computed } from "vue";
import { usePublicDataStore } from "@/stores/publicData";
import type { CategoriesParams, BrandsParams } from "@/types/public";

export const usePublicData = () => {
  const store = usePublicDataStore();

  // Computed properties
  const categories = computed(() => store.categories);
  const brands = computed(() => store.brands);
  const isLoadingCategories = computed(() => store.isLoadingCategories);
  const isLoadingBrands = computed(() => store.isLoadingBrands);
  const categoriesError = computed(() => store.categoriesError);
  const brandsError = computed(() => store.brandsError);
  const hasCategories = computed(() => store.hasCategories);
  const hasBrands = computed(() => store.hasBrands);

  // Methods
  const loadCategories = async (
    params?: CategoriesParams,
    forceRefresh = false
  ) => {
    try {
      return await store.fetchCategories(params, forceRefresh);
    } catch (error) {
      console.error("Failed to load categories:", error);
      throw error;
    }
  };

  const loadBrands = async (params?: BrandsParams, forceRefresh = false) => {
    try {
      return await store.fetchBrands(params, forceRefresh);
    } catch (error) {
      console.error("Failed to load brands:", error);
      throw error;
    }
  };

  const loadAll = async (forceRefresh = false) => {
    try {
      await Promise.all([
        loadCategories(undefined, forceRefresh),
        loadBrands(undefined, forceRefresh),
      ]);
    } catch (error) {
      console.error("Failed to load categories and brands:", error);
      throw error;
    }
  };

  const refreshCategories = () => loadCategories(undefined, true);
  const refreshBrands = () => loadBrands(undefined, true);
  const refreshAll = () => loadAll(true);

  const clearCache = () => {
    store.clearAllCache();
  };

  // Get category by ID
  const getCategoryById = (id: number) => {
    return categories.value.find((category) => category.id === id);
  };

  // Get brand by ID
  const getBrandById = (id: number) => {
    return brands.value.find((brand) => brand.id === id);
  };

  // Get categories for filter options
  const getCategoryOptions = () => {
    return categories.value.map((category) => ({
      value: category.id.toString(),
      label: category.name,
      count: category.products_count,
    }));
  };

  // Get brands for filter options
  const getBrandOptions = () => {
    return brands.value.map((brand) => ({
      value: brand.id.toString(),
      label: brand.name,
      count: brand.products_count,
    }));
  };

  return {
    // State
    categories,
    brands,
    isLoadingCategories,
    isLoadingBrands,
    categoriesError,
    brandsError,
    hasCategories,
    hasBrands,

    // Methods
    loadCategories,
    loadBrands,
    loadAll,
    refreshCategories,
    refreshBrands,
    refreshAll,
    clearCache,
    getCategoryById,
    getBrandById,
    getCategoryOptions,
    getBrandOptions,
  };
};

export default usePublicData;
