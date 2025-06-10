import { ref, computed } from "vue";
import { categoryService } from "@/services/admin/categoryService";
import { handleApiError } from "@/services/api";
import type {
  Category,
  CategoryListResponse,
  CategoryListParams,
  CategoryFormData,
  BulkDeleteRequest,
} from "@/types/admin/category";

/**
 * Custom hook for category management
 * Provides reactive state and methods for category operations
 */
export function useCategory() {
  // State
  const categories = ref<Category[]>([]);
  const paginationData = ref<CategoryListResponse["data"] | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const selectedCategory = ref<Category | null>(null);
  const selectedIds = ref<number[]>([]);

  // Search and filters
  const searchQuery = ref("");
  const sortBy = ref("");
  const sortOrder = ref<"asc" | "desc">("asc");
  const currentPage = ref(1);
  const perPage = ref(10);

  // Computed
  const hasCategories = computed(() => categories.value.length > 0);
  const totalCategories = computed(() => paginationData.value?.total || 0);
  const hasSelection = computed(() => selectedIds.value.length > 0);
  const isAllSelected = computed(() => {
    return (
      categories.value.length > 0 &&
      categories.value.every((category) =>
        selectedIds.value.includes(category.id)
      )
    );
  });

  // Helper functions
  const clearError = () => {
    error.value = null;
  };

  const setError = (message: string) => {
    error.value = message;
  };

  const resetFilters = () => {
    searchQuery.value = "";
    sortBy.value = "";
    sortOrder.value = "asc";
    currentPage.value = 1;
    perPage.value = 10;
  };

  const clearSelection = () => {
    selectedIds.value = [];
  };

  // API Methods
  const loadCategories = async (params?: Partial<CategoryListParams>) => {
    isLoading.value = true;
    clearError();

    try {
      const requestParams: CategoryListParams = {
        page: currentPage.value,
        per_page: perPage.value,
        ...params,
      };

      if (searchQuery.value.trim()) {
        requestParams.search = searchQuery.value.trim();
      }

      if (sortBy.value) {
        requestParams.sort_by = sortBy.value;
        requestParams.sort_order = sortOrder.value;
      }

      const response = await categoryService.getCategories(requestParams);
      categories.value = response.data.data;
      paginationData.value = response.data;
      clearSelection();
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi tải danh sách danh mục");
      console.error("Load categories error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const getCategory = async (id: number) => {
    isLoading.value = true;
    clearError();

    try {
      const response = await categoryService.getCategory(id);
      selectedCategory.value = response.data;
      return response.data;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi tải thông tin danh mục");
      console.error("Get category error:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createCategory = async (data: CategoryFormData) => {
    isLoading.value = true;
    clearError();

    try {
      const response = await categoryService.createCategory(data);
      await loadCategories(); // Refresh list
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi tạo danh mục");
      console.error("Create category error:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCategory = async (id: number, data: CategoryFormData) => {
    isLoading.value = true;
    clearError();

    try {
      const response = await categoryService.updateCategory(id, data);
      await loadCategories(); // Refresh list
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi cập nhật danh mục");
      console.error("Update category error:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCategory = async (id: number) => {
    isLoading.value = true;
    clearError();

    try {
      const response = await categoryService.deleteCategory(id);
      await loadCategories(); // Refresh list
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi xóa danh mục");
      console.error("Delete category error:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const bulkDeleteCategories = async (ids: number[]) => {
    isLoading.value = true;
    clearError();

    try {
      const data: BulkDeleteRequest = { ids };
      const response = await categoryService.bulkDeleteCategories(data);
      await loadCategories(); // Refresh list
      clearSelection();
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi xóa các danh mục đã chọn");
      console.error("Bulk delete categories error:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Selection methods
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      clearSelection();
    } else {
      selectedIds.value = categories.value.map((category) => category.id);
    }
  };

  const toggleSelection = (id: number) => {
    const index = selectedIds.value.indexOf(id);
    if (index > -1) {
      selectedIds.value.splice(index, 1);
    } else {
      selectedIds.value.push(id);
    }
  };

  // Pagination methods
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    loadCategories();
  };

  const handlePerPageChange = (newPerPage: number) => {
    perPage.value = newPerPage;
    currentPage.value = 1;
    loadCategories();
  };

  // Search methods
  let searchTimeout: number;
  const debouncedSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentPage.value = 1;
      loadCategories();
    }, 500);
  };

  const handleSortChange = () => {
    currentPage.value = 1;
    loadCategories();
  };

  return {
    // State
    categories,
    paginationData,
    isLoading,
    error,
    selectedCategory,
    selectedIds,
    searchQuery,
    sortBy,
    sortOrder,
    currentPage,
    perPage,

    // Computed
    hasCategories,
    totalCategories,
    hasSelection,
    isAllSelected,

    // Methods
    clearError,
    setError,
    resetFilters,
    clearSelection,
    loadCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    bulkDeleteCategories,
    toggleSelectAll,
    toggleSelection,
    handlePageChange,
    handlePerPageChange,
    debouncedSearch,
    handleSortChange,
  };
}

export default useCategory;
