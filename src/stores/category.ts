import { defineStore } from "pinia";
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

export const useCategoryStore = defineStore("category", () => {
  // State
  const categories = ref<Category[]>([]);
  const paginationData = ref<CategoryListResponse["data"] | null>(null);
  const selectedCategory = ref<Category | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const lastFetchTime = ref<number>(0);

  // Cache settings
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Getters
  const hasCategories = computed(() => categories.value.length > 0);
  const totalCategories = computed(() => paginationData.value?.total || 0);
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

  // Actions
  const fetchCategories = async (
    params?: CategoryListParams,
    forceRefresh = false
  ) => {
    // Use cache if valid and not forcing refresh
    if (!forceRefresh && isCacheValid.value && hasCategories.value) {
      return;
    }

    setLoading(true);
    clearError();

    try {
      const response = await categoryService.getCategories(params);
      categories.value = response.data.data;
      paginationData.value = response.data;
      updateLastFetchTime();
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi tải danh sách danh mục");
      console.error("Fetch categories error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async (id: number) => {
    setLoading(true);
    clearError();

    try {
      const response = await categoryService.getCategory(id);
      selectedCategory.value = response.data;
      return response.data;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi tải thông tin danh mục");
      console.error("Fetch category error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data: CategoryFormData) => {
    setLoading(true);
    clearError();

    try {
      const response = await categoryService.createCategory(data);

      // Add new category to the beginning of the list
      if (response.data) {
        categories.value.unshift(response.data);
        // Update total count if pagination data exists
        if (paginationData.value) {
          paginationData.value.total += 1;
        }
      }

      updateLastFetchTime();
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi tạo danh mục");
      console.error("Create category error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: number, data: CategoryFormData) => {
    setLoading(true);
    clearError();

    try {
      const response = await categoryService.updateCategory(id, data);

      // Update category in the list
      if (response.data) {
        const index = categories.value.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          categories.value[index] = response.data;
        }

        // Update selected category if it's the same
        if (selectedCategory.value?.id === id) {
          selectedCategory.value = response.data;
        }
      }

      updateLastFetchTime();
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi cập nhật danh mục");
      console.error("Update category error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    setLoading(true);
    clearError();

    try {
      const response = await categoryService.deleteCategory(id);

      // Remove category from the list
      const index = categories.value.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        categories.value.splice(index, 1);
        // Update total count if pagination data exists
        if (paginationData.value) {
          paginationData.value.total -= 1;
        }
      }

      // Clear selected category if it's the deleted one
      if (selectedCategory.value?.id === id) {
        selectedCategory.value = null;
      }

      updateLastFetchTime();
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi xóa danh mục");
      console.error("Delete category error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bulkDeleteCategories = async (ids: number[]) => {
    setLoading(true);
    clearError();

    try {
      const data: BulkDeleteRequest = { ids };
      const response = await categoryService.bulkDeleteCategories(data);

      // Remove categories from the list
      categories.value = categories.value.filter(
        (cat) => !ids.includes(cat.id)
      );

      // Update total count if pagination data exists
      if (paginationData.value) {
        paginationData.value.total -= ids.length;
      }

      // Clear selected category if it's among deleted ones
      if (selectedCategory.value && ids.includes(selectedCategory.value.id)) {
        selectedCategory.value = null;
      }

      updateLastFetchTime();
      return response;
    } catch (err: any) {
      handleApiError(err);
      setError("Có lỗi xảy ra khi xóa các danh mục đã chọn");
      console.error("Bulk delete categories error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setSelectedCategory = (category: Category | null) => {
    selectedCategory.value = category;
  };

  const clearCategories = () => {
    categories.value = [];
    paginationData.value = null;
    selectedCategory.value = null;
    lastFetchTime.value = 0;
  };

  const refreshCategories = async (params?: CategoryListParams) => {
    await fetchCategories(params, true);
  };

  // Find category by ID in current list
  const findCategoryById = (id: number): Category | undefined => {
    return categories.value.find((cat) => cat.id === id);
  };

  // Get categories by name search
  const searchCategories = (query: string): Category[] => {
    if (!query.trim()) return categories.value;

    const searchTerm = query.toLowerCase().trim();
    return categories.value.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm)
    );
  };

  return {
    // State
    categories,
    paginationData,
    selectedCategory,
    isLoading,
    error,

    // Getters
    hasCategories,
    totalCategories,
    currentPage,
    lastPage,
    perPage,
    isCacheValid,

    // Actions
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    bulkDeleteCategories,
    setSelectedCategory,
    clearCategories,
    refreshCategories,
    findCategoryById,
    searchCategories,
    setLoading,
    setError,
    clearError,
  };
});

export default useCategoryStore;
