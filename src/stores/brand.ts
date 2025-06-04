import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { brandService } from "@/services/admin/brandService";
import { handleApiError } from "@/services/api";
import type {
  Brand,
  BrandListResponse,
  BrandListParams,
  BrandFormData,
  BulkDeleteRequest,
} from "@/types/admin/brand";

export const useBrandStore = defineStore("brand", () => {
  // State
  const brands = ref<Brand[]>([]);
  const paginationData = ref<BrandListResponse["data"] | null>(null);
  const selectedBrand = ref<Brand | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const lastFetchTime = ref<number>(0);

  // Cache settings
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Getters
  const hasBrands = computed(() => brands.value.length > 0);
  const totalBrands = computed(() => paginationData.value?.total || 0);
  const currentPage = computed(() => paginationData.value?.current_page || 1);
  const lastPage = computed(() => paginationData.value?.last_page || 1);
  const perPage = computed(() => paginationData.value?.per_page || 10);
  const isCacheValid = computed(() => {
    return Date.now() - lastFetchTime.value < CACHE_DURATION;
  });

  // Helper methods
  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage;
  };

  const clearError = () => {
    error.value = null;
  };

  const updateLastFetchTime = () => {
    lastFetchTime.value = Date.now();
  };

  const clearCache = () => {
    lastFetchTime.value = 0;
  };

  // API Actions
  const fetchBrands = async (
    params?: BrandListParams,
    forceRefresh = false
  ) => {
    // Check cache validity
    if (!forceRefresh && isCacheValid.value && brands.value.length > 0) {
      return { data: paginationData.value };
    }

    setLoading(true);
    clearError();

    try {
      const response = await brandService.getBrands(params);
      brands.value = response.data.data;
      paginationData.value = response.data;
      updateLastFetchTime();
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi tải danh sách thương hiệu";
      setError(errorMessage);
      handleApiError(err);
      console.error("Fetch brands error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchBrand = async (id: number) => {
    setLoading(true);
    clearError();

    try {
      const response = await brandService.getBrand(id);
      selectedBrand.value = response.data;
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi tải thông tin thương hiệu";
      setError(errorMessage);
      handleApiError(err);
      console.error("Fetch brand error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createBrand = async (data: BrandFormData) => {
    setLoading(true);
    clearError();

    try {
      const response = await brandService.createBrand(data);

      // Add new brand to the beginning of the list
      brands.value.unshift(response.data);

      // Update pagination data
      if (paginationData.value) {
        paginationData.value.total += 1;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi tạo thương hiệu";
      setError(errorMessage);
      handleApiError(err);
      console.error("Create brand error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBrand = async (id: number, data: BrandFormData) => {
    setLoading(true);
    clearError();

    try {
      const response = await brandService.updateBrand(id, data);

      // Update brand in the list
      const index = brands.value.findIndex((brand) => brand.id === id);
      if (index !== -1) {
        brands.value[index] = response.data;
      }

      // Update selected brand if it's the same
      if (selectedBrand.value?.id === id) {
        selectedBrand.value = response.data;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi cập nhật thương hiệu";
      setError(errorMessage);
      handleApiError(err);
      console.error("Update brand error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBrand = async (id: number) => {
    setLoading(true);
    clearError();

    try {
      const response = await brandService.deleteBrand(id);

      // Remove brand from the list
      brands.value = brands.value.filter((brand) => brand.id !== id);

      // Update pagination data
      if (paginationData.value) {
        paginationData.value.total -= 1;
      }

      // Clear selected brand if it's the deleted one
      if (selectedBrand.value?.id === id) {
        selectedBrand.value = null;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi xóa thương hiệu";
      setError(errorMessage);
      handleApiError(err);
      console.error("Delete brand error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bulkDeleteBrands = async (ids: number[]) => {
    setLoading(true);
    clearError();

    try {
      const data: BulkDeleteRequest = { ids };
      const response = await brandService.bulkDeleteBrands(data);

      // Remove brands from the list
      brands.value = brands.value.filter((brand) => !ids.includes(brand.id));

      // Update pagination data
      if (paginationData.value) {
        paginationData.value.total -= ids.length;
      }

      // Clear selected brand if it's one of the deleted ones
      if (selectedBrand.value && ids.includes(selectedBrand.value.id)) {
        selectedBrand.value = null;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi xóa các thương hiệu đã chọn";
      setError(errorMessage);
      handleApiError(err);
      console.error("Bulk delete brands error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search and filter methods
  const searchBrands = async (query: string, params?: BrandListParams) => {
    const searchParams: BrandListParams = {
      ...params,
      search: query.trim(),
      page: 1, // Reset to first page for new search
    };

    return await fetchBrands(searchParams, true); // Force refresh for search
  };

  const sortBrands = async (
    sortBy: string,
    sortOrder: "asc" | "desc" = "asc",
    params?: BrandListParams
  ) => {
    const sortParams: BrandListParams = {
      ...params,
      sort_by: sortBy,
      sort_order: sortOrder,
      page: 1, // Reset to first page for new sort
    };

    return await fetchBrands(sortParams, true); // Force refresh for sort
  };

  // Utility methods
  const getBrandById = (id: number): Brand | undefined => {
    return brands.value.find((brand) => brand.id === id);
  };

  const getBrandByName = (name: string): Brand | undefined => {
    return brands.value.find(
      (brand) => brand.name.toLowerCase() === name.toLowerCase()
    );
  };

  const resetState = () => {
    brands.value = [];
    paginationData.value = null;
    selectedBrand.value = null;
    isLoading.value = false;
    error.value = null;
    lastFetchTime.value = 0;
  };

  const setSelectedBrand = (brand: Brand | null) => {
    selectedBrand.value = brand;
  };

  // Pagination helpers
  const hasNextPage = computed(() => {
    return paginationData.value?.next_page_url !== null;
  });

  const hasPrevPage = computed(() => {
    return paginationData.value?.prev_page_url !== null;
  });

  const getPageInfo = computed(() => {
    if (!paginationData.value) return null;

    return {
      current: paginationData.value.current_page,
      last: paginationData.value.last_page,
      from: paginationData.value.from,
      to: paginationData.value.to,
      total: paginationData.value.total,
      perPage: paginationData.value.per_page,
    };
  });

  return {
    // State
    brands,
    paginationData,
    selectedBrand,
    isLoading,
    error,
    lastFetchTime,

    // Getters
    hasBrands,
    totalBrands,
    currentPage,
    lastPage,
    perPage,
    isCacheValid,
    hasNextPage,
    hasPrevPage,
    getPageInfo,

    // Actions
    fetchBrands,
    fetchBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    bulkDeleteBrands,
    searchBrands,
    sortBrands,

    // Utility methods
    getBrandById,
    getBrandByName,
    setSelectedBrand,
    resetState,
    clearError,
    clearCache,
    setLoading,
    setError,
  };
});

export default useBrandStore;
