import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { productService } from "@/services/admin/productService";
import { handleApiError } from "@/services/api";
import type {
  Product,
  ProductListParams,
  ProductFormData,
  ProductPaginationData,
  BulkDeleteRequest,
} from "@/types/admin/product";

export const useProductStore = defineStore("product", () => {
  // State
  const products = ref<Product[]>([]);
  const paginationData = ref<ProductPaginationData | null>(null);
  const selectedProduct = ref<Product | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const lastFetchTime = ref<number>(0);

  // Cache settings
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Getters
  const hasProducts = computed(() => products.value?.length > 0);
  const totalProducts = computed(() => paginationData.value?.total || 0);
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
  const fetchProducts = async (
    params?: ProductListParams,
    forceRefresh = false
  ) => {
    // Check cache validity
    if (!forceRefresh && isCacheValid.value && products.value.length > 0) {
      return { data: paginationData.value };
    }

    setLoading(true);
    clearError();

    try {
      const response = await productService.getProducts(params);

      // Handle the API response structure
      if (response.data && Array.isArray(response.data)) {
        // New API structure with separate data and pagination
        products.value = response.data;
        if (response.pagination) {
          paginationData.value = {
            current_page: response.pagination.current_page,
            data: response.data,
            first_page_url: '',
            from: (response.pagination.current_page - 1) * response.pagination.per_page + 1,
            last_page: response.pagination.last_page,
            last_page_url: '',
            links: [],
            next_page_url: null,
            path: '',
            per_page: response.pagination.per_page,
            prev_page_url: null,
            to: Math.min(response.pagination.current_page * response.pagination.per_page, response.pagination.total),
            total: response.pagination.total,
            sort_by: response.sort?.by || 'created_at',
            sort_order: response.sort?.order || 'desc'
          };
        } else {
          paginationData.value = null;
        }
      } else {
        // Fallback for unexpected response structure
        products.value = [];
        paginationData.value = null;
      }

      updateLastFetchTime();
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi tải danh sách sản phẩm";
      setError(errorMessage);
      // Reset products to empty array on error to prevent undefined prop warnings
      products.value = [];
      paginationData.value = null;
      handleApiError(err);
      console.error("Fetch products error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = async (id: number) => {
    setLoading(true);
    clearError();

    try {
      const response = await productService.getProduct(id);
      selectedProduct.value = response.data;
      return response.data;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi tải thông tin sản phẩm";
      setError(errorMessage);
      handleApiError(err);
      console.error("Fetch product error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (data: ProductFormData) => {
    setLoading(true);
    clearError();

    try {
      const response = await productService.createProduct(data);

      // Add new product to the beginning of the list
      products.value.unshift(response.data);

      // Update pagination data
      if (paginationData.value) {
        paginationData.value.total += 1;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi tạo sản phẩm";
      setError(errorMessage);
      handleApiError(err);
      console.error("Create product error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, data: ProductFormData) => {
    setLoading(true);
    clearError();

    try {
      const response = await productService.updateProduct(id, data);

      // Update product in the list
      const index = products.value.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.value[index] = response.data;
      }

      // Update selected product if it's the same
      if (selectedProduct.value?.id === id) {
        selectedProduct.value = response.data;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi cập nhật sản phẩm";
      setError(errorMessage);
      handleApiError(err);
      console.error("Update product error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    clearError();

    try {
      const response = await productService.deleteProduct(id);

      // Remove product from the list
      const index = products.value.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.value.splice(index, 1);
      }

      // Update pagination data
      if (paginationData.value) {
        paginationData.value.total -= 1;
      }

      // Clear selected product if it's the deleted one
      if (selectedProduct.value?.id === id) {
        selectedProduct.value = null;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi xóa sản phẩm";
      setError(errorMessage);
      handleApiError(err);
      console.error("Delete product error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bulkDeleteProducts = async (ids: number[]) => {
    setLoading(true);
    clearError();

    try {
      const data: BulkDeleteRequest = { ids };
      const response = await productService.bulkDeleteProducts(data);

      // Remove products from the list
      products.value = products.value.filter(
        (product) => !ids.includes(product.id)
      );

      // Update pagination data
      if (paginationData.value) {
        paginationData.value.total -= ids.length;
      }

      // Clear selected product if it's among the deleted ones
      if (selectedProduct.value && ids.includes(selectedProduct.value.id)) {
        selectedProduct.value = null;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi xóa sản phẩm";
      setError(errorMessage);
      handleApiError(err);
      console.error("Bulk delete products error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleProductStatus = async (id: number) => {
    setLoading(true);
    clearError();

    try {
      const response = await productService.toggleProductStatus(id);

      // Update product in the list
      const index = products.value.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.value[index] = response.data;
      }

      // Update selected product if it's the same
      if (selectedProduct.value?.id === id) {
        selectedProduct.value = response.data;
      }

      clearCache(); // Clear cache to ensure fresh data on next fetch
      return response;
    } catch (err: any) {
      const errorMessage = "Có lỗi xảy ra khi thay đổi trạng thái sản phẩm";
      setError(errorMessage);
      handleApiError(err);
      console.error("Toggle product status error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Utility methods
  const getProductById = (id: number): Product | undefined => {
    return products.value.find((product) => product.id === id);
  };

  const clearSelectedProduct = () => {
    selectedProduct.value = null;
  };

  const clearProducts = () => {
    products.value = [];
    paginationData.value = null;
    selectedProduct.value = null;
    clearCache();
  };

  const refreshProducts = async (params?: ProductListParams) => {
    return await fetchProducts(params, true);
  };

  // Search and filter helpers
  const searchProducts = async (
    searchTerm: string,
    params?: ProductListParams
  ) => {
    const searchParams = {
      ...params,
      search: searchTerm,
      page: 1, // Reset to first page when searching
    };
    return await fetchProducts(searchParams, true);
  };

  const filterProductsByCategory = async (
    categoryId: number,
    params?: ProductListParams
  ) => {
    const filterParams = {
      ...params,
      category_id: categoryId,
      page: 1, // Reset to first page when filtering
    };
    return await fetchProducts(filterParams, true);
  };

  const filterProductsByBrand = async (
    brandId: number,
    params?: ProductListParams
  ) => {
    const filterParams = {
      ...params,
      brand_id: brandId,
      page: 1, // Reset to first page when filtering
    };
    return await fetchProducts(filterParams, true);
  };

  const filterProductsByStatus = async (
    isActive: boolean,
    params?: ProductListParams
  ) => {
    const filterParams = {
      ...params,
      is_active: isActive,
      page: 1, // Reset to first page when filtering
    };
    return await fetchProducts(filterParams, true);
  };

  return {
    // State
    products,
    paginationData,
    selectedProduct,
    isLoading,
    error,

    // Getters
    hasProducts,
    totalProducts,
    currentPage,
    lastPage,
    perPage,
    isCacheValid,

    // Actions
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    toggleProductStatus,

    // Utility methods
    getProductById,
    clearSelectedProduct,
    clearProducts,
    refreshProducts,
    clearError,
    clearCache,

    // Search and filter methods
    searchProducts,
    filterProductsByCategory,
    filterProductsByBrand,
    filterProductsByStatus,
  };
});
