import { ref, computed,  readonly } from 'vue';
import { api } from '@/services/api';
import { useNotification } from '@/composables/useNotification';

// Types for public products API
export interface PublicProductsParams {
  page?: number;
  per_page?: number;
  search?: string;
  category_id?: number;
  brand_id?: number;
  min_price?: number;
  max_price?: number;
  sort_by?: 'name' | 'price' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export interface PublicProduct {
  id: number;
  name: string;
  price: string;
  discount_price?: string;
  description?: string;
  image?: string;
  stock_quantity: number;
  is_active: boolean;
  category_id?: number;
  brand_id?: number;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
    description?: string;
  };
  brand?: {
    id: number;
    name: string;
    description?: string;
  };
}

export interface PublicProductsResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: PublicProduct[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface PublicProductResponse {
  status: boolean;
  message: string;
  data: PublicProduct;
}

/**
 * Composable for public products API
 * Used by frontend users to browse products without authentication
 */
export function usePublicProducts() {
  // Reactive state
  const products = ref<PublicProduct[]>([]);
  const selectedProduct = ref<PublicProduct | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const paginationData = ref<PublicProductsResponse['data'] | null>(null);

  // Search and filter state
  const searchQuery = ref('');
  const currentPage = ref(1);
  const perPage = ref(12); // Default to 12 for better grid layout
  const categoryFilter = ref<number | undefined>(undefined);
  const brandFilter = ref<number | undefined>(undefined);
  const minPrice = ref<number | undefined>(undefined);
  const maxPrice = ref<number | undefined>(undefined);
  const sortBy = ref<'name' | 'price' | 'created_at'>('created_at');
  const sortOrder = ref<'asc' | 'desc'>('desc');

  // Notification
  const { showError } = useNotification();

  // Computed properties
  const hasProducts = computed(() => products.value.length > 0);
  const totalProducts = computed(() => paginationData.value?.total || 0);
  const lastPage = computed(() => paginationData.value?.last_page || 1);
  const hasNextPage = computed(() => paginationData.value?.next_page_url !== null);
  const hasPrevPage = computed(() => paginationData.value?.prev_page_url !== null);

  // Build query parameters
  const buildQueryParams = (): PublicProductsParams => {
    const params: PublicProductsParams = {
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

    if (minPrice.value !== undefined) {
      params.min_price = minPrice.value;
    }

    if (maxPrice.value !== undefined) {
      params.max_price = maxPrice.value;
    }

    return params;
  };

  // API methods
  const fetchProducts = async (params?: PublicProductsParams) => {
    isLoading.value = true;
    error.value = null;

    try {
      const queryParams = params || buildQueryParams();
      console.log('Fetching products with params:', queryParams);
      
      const response = await api.publicProducts.getAll(queryParams);
      console.log('API Response:', response);
      
      // Handle the response structure correctly
      if (response.data && response.data.data) {
        products.value = response.data.data;
        paginationData.value = response.data;
        console.log('Products loaded:', products.value);
        console.log('Pagination data:', paginationData.value);
      } else {
        console.error('Unexpected response structure:', response);
        products.value = [];
        paginationData.value = null;
      }
      
      return response;
    } catch (err: any) {
      console.error('Fetch products error:', err);
      error.value = err.message || 'Failed to fetch products';
      showError('Không thể tải danh sách sản phẩm');
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProduct = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await api.publicProducts.getById(id);
      selectedProduct.value = response.data;
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch product';
      showError('Không thể tải thông tin sản phẩm');
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Search and filter methods
  const searchProducts = async (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1; // Reset to first page
    await fetchProducts();
  };

  const filterByCategory = async (categoryId?: number) => {
    categoryFilter.value = categoryId;
    currentPage.value = 1;
    await fetchProducts();
  };

  const filterByBrand = async (brandId?: number) => {
    brandFilter.value = brandId;
    currentPage.value = 1;
    await fetchProducts();
  };

  const filterByPriceRange = async (min?: number, max?: number) => {
    minPrice.value = min;
    maxPrice.value = max;
    currentPage.value = 1;
    await fetchProducts();
  };

  const sortProducts = async (field: 'name' | 'price' | 'created_at', order: 'asc' | 'desc' = 'asc') => {
    sortBy.value = field;
    sortOrder.value = order;
    currentPage.value = 1;
    await fetchProducts();
  };

  // Pagination methods
  const goToPage = async (page: number) => {
    if (page >= 1 && page <= lastPage.value) {
      currentPage.value = page;
      await fetchProducts();
    }
  };

  const nextPage = async () => {
    if (hasNextPage.value) {
      await goToPage(currentPage.value + 1);
    }
  };

  const prevPage = async () => {
    if (hasPrevPage.value) {
      await goToPage(currentPage.value - 1);
    }
  };

  // Reset filters
  const resetFilters = async () => {
    searchQuery.value = '';
    categoryFilter.value = undefined;
    brandFilter.value = undefined;
    minPrice.value = undefined;
    maxPrice.value = undefined;
    sortBy.value = 'created_at';
    sortOrder.value = 'desc';
    currentPage.value = 1;
    await fetchProducts();
  };

  // Clear selected product
  const clearSelectedProduct = () => {
    selectedProduct.value = null;
  };

  return {
    // State
    products: readonly(products),
    selectedProduct: readonly(selectedProduct),
    isLoading: readonly(isLoading),
    error: readonly(error),
    paginationData: readonly(paginationData),
    
    // Filter state
    searchQuery,
    currentPage: readonly(currentPage),
    perPage,
    categoryFilter,
    brandFilter,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    
    // Computed
    hasProducts,
    totalProducts,
    lastPage,
    hasNextPage,
    hasPrevPage,
    
    // Methods
    fetchProducts,
    fetchProduct,
    searchProducts,
    filterByCategory,
    filterByBrand,
    filterByPriceRange,
    sortProducts,
    goToPage,
    nextPage,
    prevPage,
    resetFilters,
    clearSelectedProduct,
  };
}