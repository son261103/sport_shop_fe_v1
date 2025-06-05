import { ref, computed, watch } from "vue";
import { useBrandStore } from "@/stores/brand";
import { useNotification } from "@/composables/useNotification";
import { debounce } from "lodash-es";
import type { BrandFormData, BrandListParams } from "@/types/admin/brand";

/**
 * Custom hook for brand management
 * Provides reactive state and methods for brand operations using Pinia store
 */
export function useBrand() {
  // Store
  const brandStore = useBrandStore();

  // Local state
  const selectedIds = ref<number[]>([]);
  const searchQuery = ref("");
  const sortBy = ref("name");
  const sortOrder = ref<"asc" | "desc">("asc");
  const currentPage = ref(1);
  const perPage = ref(10);

  // Notification
  const { showSuccess, showValidationErrors } = useNotification();

  // Computed properties from store
  const brands = computed(() => brandStore.brands);
  const isLoading = computed(() => brandStore.isLoading);
  const error = computed(() => brandStore.error);
  const paginationData = computed(() => brandStore.paginationData);
  const totalBrands = computed(() => brandStore.totalBrands);
  const lastPage = computed(() => brandStore.lastPage);

  // Local computed
  const hasBrands = computed(() => brands.value.length > 0);
  const hasSelection = computed(() => selectedIds.value.length > 0);
  const isAllSelected = computed(() => {
    return (
      (brands.value || []).length > 0 &&
      (brands.value || []).every((brand) =>
        selectedIds.value.includes(brand.id)
      )
    );
  });
  const isIndeterminate = computed(() => {
    return (
      selectedIds.value.length > 0 &&
      selectedIds.value.length < (brands.value || []).length
    );
  });

  // Helper functions
  const clearError = () => {
    brandStore.clearError();
  };

  const setError = (message: string) => {
    brandStore.setError(message);
  };

  // Load brands
  const loadBrands = async (params?: BrandListParams) => {
    try {
      const requestParams: BrandListParams = {
        page: currentPage.value,
        per_page: perPage.value,
        search: searchQuery.value || undefined,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        ...params,
      };

      await brandStore.fetchBrands(requestParams);

      // Update local pagination state
      if (brandStore.paginationData) {
        currentPage.value = brandStore.paginationData.current_page;
        perPage.value = brandStore.paginationData.per_page;
      }
    } catch (err: any) {
      console.error("Load brands error:", err);
    }
  };

  // Get brand by ID
  const getBrand = async (id: number) => {
    try {
      await brandStore.fetchBrand(id);
      return brandStore.selectedBrand;
    } catch (err: any) {
      console.error("Get brand error:", err);
      throw err;
    }
  };

  // Create brand
  const createBrand = async (data: BrandFormData) => {
    try {
      const response = await brandStore.createBrand(data);
      showSuccess("Thương hiệu đã được tạo thành công");
      return response.data;
    } catch (err: any) {
      if (err.response?.data?.errors) {
        showValidationErrors(err.response.data.errors);
      }
      console.error("Create brand error:", err);
      throw err;
    }
  };

  // Update brand
  const updateBrand = async (id: number, data: BrandFormData) => {
    try {
      const response = await brandStore.updateBrand(id, data);
      showSuccess("Thương hiệu đã được cập nhật thành công");
      return response.data;
    } catch (err: any) {
      if (err.response?.data?.errors) {
        showValidationErrors(err.response.data.errors);
      }
      console.error("Update brand error:", err);
      throw err;
    }
  };

  // Delete brand
  const deleteBrand = async (id: number) => {
    try {
      await brandStore.deleteBrand(id);
      showSuccess("Thương hiệu đã được xóa thành công");
      // Remove from selected if it was selected
      selectedIds.value = selectedIds.value.filter((brandId) => brandId !== id);
    } catch (err: any) {
      console.error("Delete brand error:", err);
      throw err;
    }
  };

  // Bulk delete brands
  const bulkDeleteBrands = async (ids: number[]) => {
    try {
      await brandStore.bulkDeleteBrands(ids);
      showSuccess(`Đã xóa ${ids.length} thương hiệu thành công`);
      selectedIds.value = []; // Clear selection
    } catch (err: any) {
      console.error("Bulk delete brands error:", err);
      throw err;
    }
  };

  // Selection management
  const toggleSelection = (id: number) => {
    const index = selectedIds.value.indexOf(id);
    if (index > -1) {
      selectedIds.value.splice(index, 1);
    } else {
      selectedIds.value.push(id);
    }
  };

  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedIds.value = [];
    } else {
      selectedIds.value = brands.value.map((brand) => brand.id);
    }
  };

  const clearSelection = () => {
    selectedIds.value = [];
  };

  // Pagination
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    loadBrands();
  };

  const handlePerPageChange = (newPerPage: number) => {
    perPage.value = newPerPage;
    currentPage.value = 1; // Reset to first page
    loadBrands();
  };

  // Search
  const debouncedSearch = debounce((query: string) => {
    searchQuery.value = query;
    currentPage.value = 1; // Reset to first page
    loadBrands();
  }, 300);

  // Sorting
  const handleSortChange = (field: string, order: "asc" | "desc") => {
    sortBy.value = field;
    sortOrder.value = order;
    currentPage.value = 1; // Reset to first page
    loadBrands();
  };

  // Watch for reactive changes
  watch(
    [currentPage, perPage, sortBy, sortOrder],
    () => {
      // Auto-load when pagination or sorting changes
    },
    { deep: true }
  );

  return {
    // State from store
    brands,
    isLoading,
    error,
    paginationData,
    totalBrands,
    lastPage,

    // Local state
    selectedIds,
    searchQuery,
    sortBy,
    sortOrder,
    currentPage,
    perPage,

    // Computed
    hasBrands,
    hasSelection,
    isAllSelected,
    isIndeterminate,

    // Methods
    loadBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    bulkDeleteBrands,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    handlePageChange,
    handlePerPageChange,
    handleSortChange,
    debouncedSearch,
    clearError,
    setError,

    // Store methods
    resetState: brandStore.resetState,
  };
}

export default useBrand;
