import axios, { AxiosError } from "axios";
import qs from "qs";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { ValidationError } from "../types/api";
import type {
  CategoryFormData,
  CategoryListResponse,
  CategoryResponse,
  CategoryListParams,
  BulkDeleteRequest,
} from "../types/admin/category";
import type {
  BrandFormData,
  BrandListResponse,
  BrandResponse,
  BrandListParams,
  BulkDeleteRequest as BrandBulkDeleteRequest,
} from "../types/admin/brand";
import type {
  ProductFormData,
  ProductListResponse,
  ProductResponse,
  ProductListParams,
  BulkDeleteRequest as ProductBulkDeleteRequest,
} from "../types/admin/product";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/auth";
import { useLoading } from "../composables/useLoading";
import { ENV } from "@/constants";

// Base API configuration
const API_BASE_URL = ENV.API.BASE_URL;
const API_TIMEOUT = ENV.API.TIMEOUT;
const AUTH_TOKEN_KEY = ENV.AUTH.TOKEN_KEY;

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer: {
    serialize: (params) => {
      console.log("Original params:", params);
      // Check if params is wrapped in a 'params' object
      const actualParams = params.params || params;
      const serialized = qs.stringify(actualParams, {
        arrayFormat: "brackets",
        skipNulls: true,
        encode: false,
      });
      console.log("Serialized params:", serialized);
      return serialized;
    },
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Show loading for API requests (except for specific endpoints)
    const { showLoading } = useLoading();
    if (!config.url?.includes("/auth/check")) {
      showLoading("Đang xử lý...");
    }

    // Add auth token if available
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    const { hideLoading } = useLoading();
    hideLoading();
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Hide loading on successful response
    const { hideLoading } = useLoading();
    setTimeout(() => hideLoading(), 100);
    return response;
  },
  (error: AxiosError) => {
    // Hide loading on error
    const { hideLoading } = useLoading();
    hideLoading();
    // Handle validation errors
    if (error.response?.status === 422 || error.response?.status === 400) {
      const responseData = error.response.data as any;
      const validationErrors: ValidationError[] = responseData?.errors || [];
      throw {
        type: "validation",
        errors: validationErrors,
        message: responseData?.message || "Validation failed",
      };
    }

    // Handle other HTTP errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      throw {
        type: "forbidden",
        message: "Access denied",
      };
    }

    if (error.response && error.response.status >= 500) {
      throw {
        type: "server",
        message: "Server error occurred",
      };
    }

    // Network or other errors
    throw {
      type: "network",
      message: error.message || "Network error occurred",
    };
  }
);

// API methods
export const api = {
  // GET request
  get: <T>(url: string, params?: any): Promise<T> => {
    return apiClient
      .get(url, { params })
      .then((response: AxiosResponse) => response.data);
  },

  // POST request
  post: <T>(url: string, data?: any): Promise<T> => {
    return apiClient
      .post(url, data)
      .then((response: AxiosResponse) => response.data);
  },

  // PUT request
  put: <T>(url: string, data?: any): Promise<T> => {
    return apiClient
      .put(url, data)
      .then((response: AxiosResponse) => response.data);
  },

  // PATCH request
  patch: <T>(url: string, data?: any): Promise<T> => {
    return apiClient
      .patch(url, data)
      .then((response: AxiosResponse) => response.data);
  },

  // DELETE request
  delete: <T>(url: string, config?: any): Promise<T> => {
    return apiClient
      .delete(url, config)
      .then((response: AxiosResponse) => response.data);
  },

  // Auth operations
  auth: {
    // Register a new user
    register: (data: RegisterRequest): Promise<AuthResponse> => {
      return api.post<AuthResponse>("/register", data);
    },

    // Login user
    login: (data: LoginRequest): Promise<AuthResponse> => {
      return api.post<AuthResponse>("/login", data);
    },

    // Logout user
    logout: (): Promise<{ status: boolean; message: string }> => {
      return api.post<{ status: boolean; message: string }>("/logout");
    },

    // Get current user
    me: (): Promise<User> => {
      return api.get<User>("/me");
    },

    // Refresh token
    refresh: (): Promise<AuthResponse> => {
      return api.post<AuthResponse>("/refresh");
    },
  },

  // Category CRUD operations
  categories: {
    // Get all categories with pagination and filters
    getAll: (params?: CategoryListParams): Promise<CategoryListResponse> => {
      return api.get<CategoryListResponse>("/admin/categories", { params });
    },

    // Get a specific category by ID
    getById: (id: number): Promise<CategoryResponse> => {
      return api.get<CategoryResponse>(`/admin/categories/${id}`);
    },

    // Create a new category
    create: (data: CategoryFormData): Promise<CategoryResponse> => {
      return api.post<CategoryResponse>("/admin/categories", data);
    },

    // Update an existing category
    update: (id: number, data: CategoryFormData): Promise<CategoryResponse> => {
      return api.put<CategoryResponse>(`/admin/categories/${id}`, data);
    },

    // Delete a category
    delete: (id: number): Promise<{ status: boolean; message: string }> => {
      return api.delete<{ status: boolean; message: string }>(
        `/admin/categories/${id}`
      );
    },

    // Bulk delete categories
    bulkDelete: (
      data: BulkDeleteRequest
    ): Promise<{ status: boolean; message: string }> => {
      return api.delete<{ status: boolean; message: string }>(
        "/admin/categories/bulk-delete",
        { data }
      );
    },
  },

  // Brand CRUD operations
  brands: {
    // Get all brands with pagination and filters
    getAll: (params?: BrandListParams): Promise<BrandListResponse> => {
      return api.get<BrandListResponse>("/admin/brands", { params });
    },

    // Get a specific brand by ID
    getById: (id: number): Promise<BrandResponse> => {
      return api.get<BrandResponse>(`/admin/brands/${id}`);
    },

    // Create a new brand
    create: (data: BrandFormData): Promise<BrandResponse> => {
      return api.post<BrandResponse>("/admin/brands", data);
    },

    // Update an existing brand
    update: (id: number, data: BrandFormData): Promise<BrandResponse> => {
      return api.put<BrandResponse>(`/admin/brands/${id}`, data);
    },

    // Delete a brand
    delete: (id: number): Promise<{ status: boolean; message: string }> => {
      return api.delete<{ status: boolean; message: string }>(
        `/admin/brands/${id}`
      );
    },

    // Bulk delete brands
    bulkDelete: (
      data: BrandBulkDeleteRequest
    ): Promise<{ status: boolean; message: string }> => {
      return api.delete<{ status: boolean; message: string }>(
        "/admin/brands/bulk-delete",
        { data }
      );
    },
  },

  // Public Products API (for frontend users)
  publicProducts: {
    // Get all active products with pagination, search and filters (Public)
    getAll: (params?: {
      page?: number;
      per_page?: number;
      search?: string;
      category_id?: number;
      brand_id?: number;
      min_price?: number;
      max_price?: number;
      sort_by?: 'name' | 'price' | 'created_at';
      sort_order?: 'asc' | 'desc';
    }): Promise<{
      status: boolean;
      message: string;
      data: {
        current_page: number;
        data: Array<{
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
        }>;
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
    }> => {
      return api.get("/products", params);
    },

    // Get a specific product by ID (Public)
    getById: (id: number): Promise<{
      status: boolean;
      message: string;
      data: {
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
      };
    }> => {
      return api.get(`/products/${id}`);
    },
  },

  // Product CRUD operations (Admin)
  products: {
    // Get all products with pagination and filters
    getAll: (params?: ProductListParams): Promise<ProductListResponse> => {
      return api.get<ProductListResponse>("/admin/products", { params });
    },

    // Get a specific product by ID
    getById: (id: number): Promise<ProductResponse> => {
      return api.get<ProductResponse>(`/admin/products/${id}`);
    },

    // Create a new product
    create: (data: ProductFormData): Promise<ProductResponse> => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      if (data.discount_price)
        formData.append("discount_price", data.discount_price.toString());
      if (data.description) formData.append("description", data.description);
      if (data.stock_quantity !== undefined)
        formData.append("stock_quantity", data.stock_quantity.toString());
      if (data.is_active !== undefined)
        formData.append("is_active", data.is_active.toString());
      if (data.category_id)
        formData.append("category_id", data.category_id.toString());
      if (data.brand_id) formData.append("brand_id", data.brand_id.toString());
      if (data.image) formData.append("image", data.image);

      return apiClient
        .post<ProductResponse>("/admin/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: AxiosResponse) => response.data);
    },

    // Update an existing product
    update: (id: number, data: ProductFormData): Promise<ProductResponse> => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      if (data.discount_price)
        formData.append("discount_price", data.discount_price.toString());
      if (data.description) formData.append("description", data.description);
      if (data.stock_quantity !== undefined)
        formData.append("stock_quantity", data.stock_quantity.toString());
      if (data.is_active !== undefined)
        formData.append("is_active", data.is_active.toString());
      if (data.category_id)
        formData.append("category_id", data.category_id.toString());
      if (data.brand_id) formData.append("brand_id", data.brand_id.toString());
      if (data.image) formData.append("image", data.image);
      formData.append("_method", "PUT");

      return apiClient
        .post<ProductResponse>(`/admin/products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: AxiosResponse) => response.data);
    },

    // Delete a product
    delete: (id: number): Promise<{ status: boolean; message: string }> => {
      return api.delete<{ status: boolean; message: string }>(
        `/admin/products/${id}`
      );
    },

    // Bulk delete products
    bulkDelete: (
      data: ProductBulkDeleteRequest
    ): Promise<{ status: boolean; message: string }> => {
      return api.delete<{ status: boolean; message: string }>(
        "/admin/products/bulk-delete",
        { data }
      );
    },

    // Toggle product active status
    toggleStatus: (id: number): Promise<ProductResponse> => {
      return api.put<ProductResponse>(`/admin/products/${id}/toggle-status`);
    },
  },
};

// Export the axios instance for advanced usage
export { apiClient };

// Export base URL for reference
export { API_BASE_URL };

// Helper function to handle API errors
export const handleApiError = (error: any) => {
  if (error.type === "validation") {
    // Handle validation errors
    console.error("Validation errors:", error.errors);
    return error.errors;
  }

  console.error("API Error:", error.message);
  throw error;
};
