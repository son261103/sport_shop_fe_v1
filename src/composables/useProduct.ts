import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { useNotification } from "@/composables/useNotification";
import { debounce } from "lodash-es";
import type {
  Product,
  ProductFormData,
  ProductListParams,
} from "@/types/admin/product";

/**
 * Custom hook for product management
 * Provides reactive state and methods for product operations using Pinia store
 */
export function useProduct() {
  // Store
  const productStore = useProductStore();

  // Local state
  const selectedIds = ref<number[]>([]);
  const searchQuery = ref("");
  const sortBy = ref("name");
  const sortOrder = ref<"asc" | "desc">("asc");
  const currentPage = ref(1);
  const perPage = ref(10);
  const categoryFilter = ref<number | undefined>(undefined);
  const brandFilter = ref<number | undefined>(undefined);
  const statusFilter = ref<boolean | undefined>(undefined);

  // Notification
  const { showSuccess, showValidationErrors } = useNotification();

  // Computed properties from store
  const products = computed(() => productStore.products);
  const isLoading = computed(() => productStore.isLoading);
  const error = computed(() => productStore.error);
  const paginationData = computed(() => productStore.paginationData);
  const totalProducts = computed(() => productStore.totalProducts);
  const lastPage = computed(() => productStore.lastPage);
  const selectedProduct = computed(() => productStore.selectedProduct);

  // Local computed
  const hasProducts = computed(() => products.value.length > 0);
  const hasSelection = computed(() => selectedIds.value.length > 0);
  const isAllSelected = computed(() => {
    return (
      products.value.length > 0 &&
      products.value.every((product) => selectedIds.value.includes(product.id))
    );
  });
  const isIndeterminate = computed(() => {
    return (
      selectedIds.value.length > 0 &&
      selectedIds.value.length < products.value.length
    );
  });

  // Helper functions
  const clearSelection = () => {
    selectedIds.value = [];
  };

  const selectAll = () => {
    if (isAllSelected.value) {
      clearSelection();
    } else {
      selectedIds.value = products.value.map((product) => product.id);
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

  const isSelected = (id: number) => {
    return selectedIds.value.includes(id);
  };

  // Build query parameters
  const buildQueryParams = (): ProductListParams => {
    const params: ProductListParams = {
      page: currentPage.value,
      per_page: perPage.value,
      sort_by: sortBy.value,
      sort_order: sortOrder.value,
    };

    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }

    if (categoryFilter.value) {
      params.category_id = categoryFilter.value;
    }

    if (brandFilter.value) {
      params.brand_id = brandFilter.value;
    }

    if (statusFilter.value !== undefined) {
      params.is_active = statusFilter.value;
    }

    return params;
  };

  // API methods
  const loadProducts = async (forceRefresh = false) => {
    try {
      const params = buildQueryParams();
      await productStore.fetchProducts(params, forceRefresh);
    } catch (error: any) {
      console.error("Failed to load products:", error);
    }
  };

  const loadProduct = async (id: number) => {
    try {
      await productStore.fetchProduct(id);
    } catch (error: any) {
      console.error("Failed to load product:", error);
    }
  };

  const fetchProduct = async (id: number): Promise<Product> => {
    try {
      const response = await productStore.fetchProduct(id);
      return response;
    } catch (error: any) {
      console.error("Failed to fetch product:", error);
      throw error;
    }
  };

  const createProduct = async (data: ProductFormData) => {
    try {
      const response = await productStore.createProduct(data);
      showSuccess("Tạo sản phẩm thành công!");
      clearSelection();
      return response;
    } catch (error: any) {
      if (error.type === "validation") {
        showValidationErrors(error.errors);
      }
      throw error;
    }
  };

  const updateProduct = async (id: number, data: ProductFormData) => {
    try {
      const response = await productStore.updateProduct(id, data);
      showSuccess("Cập nhật sản phẩm thành công!");
      return response;
    } catch (error: any) {
      if (error.type === "validation") {
        showValidationErrors(error.errors);
      }
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await productStore.deleteProduct(id);
      showSuccess("Xóa sản phẩm thành công!");
      clearSelection();
      return response;
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  };

  const bulkDeleteProducts = async () => {
    if (selectedIds.value.length === 0) {
      return;
    }

    try {
      const response = await productStore.bulkDeleteProducts(selectedIds.value);
      showSuccess(`Đã xóa ${selectedIds.value.length} sản phẩm thành công!`);
      clearSelection();
      return response;
    } catch (error: any) {
      console.error("Failed to bulk delete products:", error);
      throw error;
    }
  };

  const toggleProductStatus = async (id: number) => {
    try {
      const response = await productStore.toggleProductStatus(id);
      const product = products.value.find((p) => p.id === id);
      const status = product?.is_active ? "kích hoạt" : "vô hiệu hóa";
      showSuccess(`Đã ${status} sản phẩm thành công!`);
      return response;
    } catch (error: any) {
      console.error("Failed to toggle product status:", error);
      throw error;
    }
  };

  // Search and filter methods
  const debouncedSearch = debounce(async (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
    await loadProducts(true);
  }, 300);

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  const handleSort = async (field: string) => {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortBy.value = field;
      sortOrder.value = "asc";
    }
    currentPage.value = 1;
    await loadProducts(true);
  };

  const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await loadProducts();
  };

  const handlePerPageChange = async (newPerPage: number) => {
    perPage.value = newPerPage;
    currentPage.value = 1;
    await loadProducts(true);
  };

  const handleCategoryFilter = async (categoryId: number | undefined) => {
    categoryFilter.value = categoryId;
    currentPage.value = 1;
    await loadProducts(true);
  };

  const handleBrandFilter = async (brandId: number | undefined) => {
    brandFilter.value = brandId;
    currentPage.value = 1;
    await loadProducts(true);
  };

  const handleStatusFilter = async (status: boolean | undefined) => {
    statusFilter.value = status;
    currentPage.value = 1;
    await loadProducts(true);
  };

  const clearFilters = async () => {
    searchQuery.value = "";
    categoryFilter.value = undefined;
    brandFilter.value = undefined;
    statusFilter.value = undefined;
    sortBy.value = "name";
    sortOrder.value = "asc";
    currentPage.value = 1;
    await loadProducts(true);
  };

  const refreshProducts = async () => {
    await loadProducts(true);
  };

  // Utility methods
  const getProductById = (id: number) => {
    return productStore.getProductById(id);
  };

  const clearSelectedProduct = () => {
    productStore.clearSelectedProduct();
  };

  const clearError = () => {
    productStore.clearError();
  };

  return {
    // State
    products,
    selectedProduct,
    isLoading,
    error,
    paginationData,
    totalProducts,
    lastPage,
    selectedIds,
    searchQuery,
    sortBy,
    sortOrder,
    currentPage,
    perPage,
    categoryFilter,
    brandFilter,
    statusFilter,

    // Computed
    hasProducts,
    hasSelection,
    isAllSelected,
    isIndeterminate,

    // Selection methods
    clearSelection,
    selectAll,
    toggleSelection,
    isSelected,

    // API methods
    loadProducts,
    loadProduct,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    toggleProductStatus,

    // Search and filter methods
    handleSearch,
    handleSort,
    handlePageChange,
    handlePerPageChange,
    handleCategoryFilter,
    handleBrandFilter,
    handleStatusFilter,
    clearFilters,
    refreshProducts,

    // Utility methods
    getProductById,
    clearSelectedProduct,
    clearError,
  };
}
