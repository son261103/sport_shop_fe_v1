import axios, { AxiosError } from "axios";
import qs from "qs";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Extend the Axios request config to include our custom _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
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
import type {
  CartResponse,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartItemRequest,
  UpdateCartItemResponse,
  RemoveFromCartResponse,
  CartCountResponse,
  ClearCartResponse
} from "../types/cart";
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

// Track retry attempts to prevent infinite loops
const retryAttempts = new Map<string, number>();
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Hide loading on successful response
    const { hideLoading } = useLoading();
    setTimeout(() => hideLoading(), 100);
    // Clear retry attempts on success
    if (response.config.url) {
      retryAttempts.delete(response.config.url);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Hide loading on error
    const { hideLoading } = useLoading();
    hideLoading();

    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    const requestKey = `${originalRequest?.method}-${originalRequest?.url}`;
    const currentRetries = retryAttempts.get(requestKey) || 0;

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

    // Handle authentication errors (401) - only retry for 401, not 500
    if (error.response?.status === 401 && 
        originalRequest && 
        !originalRequest.url?.includes('/refresh') && 
        !originalRequest._retry &&
        currentRetries < 1) {
      
      // Mark this request as retried to prevent infinite loops
      originalRequest._retry = true;
      
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient.request(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      
      isRefreshing = true;
      
      try {
        // Increment retry count
        retryAttempts.set(requestKey, currentRetries + 1);
        
        // Try to refresh token
        const refreshResponse = await api.auth.refresh();
        if (refreshResponse.status && refreshResponse.data.token) {
          const newToken = refreshResponse.data.token;
          localStorage.setItem(AUTH_TOKEN_KEY, newToken);
          
          // Process all queued requests
          failedQueue.forEach(({ resolve }) => resolve(newToken));
          failedQueue = [];
          
          // Update the authorization header for the retry
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Clear retry attempts before retrying
          retryAttempts.delete(requestKey);
          
          // Retry the original request
          return apiClient.request(originalRequest);
        } else {
          // Refresh response doesn't have valid token
          throw new Error('Invalid refresh response');
        }
      } catch (refreshError: any) {
        console.error("Token refresh failed:", refreshError);
        
        // Reject all queued requests
        failedQueue.forEach(({ reject }) => reject(refreshError));
        failedQueue = [];
        
        // Clear retry attempts and auth data
        retryAttempts.delete(requestKey);
        
        // Clear auth data for any refresh error
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem("user_data");

        // Log appropriate error message
        if (refreshError.response?.status === 404) {
          console.warn("Refresh token endpoint not available (404). Clearing authentication.");
        } else {
          console.error("Authentication error - token refresh failed. Please login again.");
        }
        
        throw {
          type: "unauthorized",
          message: "Authentication required",
        };
      } finally {
        isRefreshing = false;
      }
    }

    // Clear retry attempts if we're not retrying
    retryAttempts.delete(requestKey);

    if (error.response?.status === 401) {
      // If we reach here, token refresh failed or wasn't attempted
      localStorage.removeItem(AUTH_TOKEN_KEY);
      console.error("401 Unauthorized error:", error.response?.data || error.message);
      throw {
        type: "unauthorized",
        message: "Authentication required",
      };
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
      return apiClient
        .post("/register", data)
        .then((response: AxiosResponse) => response.data);
    },

    // Login user
    login: (data: LoginRequest): Promise<AuthResponse> => {
      return apiClient
        .post("/login", data)
        .then((response: AxiosResponse) => response.data);
    },

    // Logout user
    logout: (): Promise<{ status: boolean; message: string }> => {
      return apiClient
        .post("/logout")
        .then((response: AxiosResponse) => response.data);
    },

    // Get current user
    me: (): Promise<User> => {
      return apiClient
        .get("/me")
        .then((response: AxiosResponse) => response.data);
    },

    // Refresh token
    refresh: (): Promise<AuthResponse> => {
      return apiClient
        .post("/refresh")
        .then((response: AxiosResponse) => response.data);
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
      // Validate data before sending
      if (!data.ids || data.ids.length === 0) {
        throw new Error("Không có ID sản phẩm để xóa");
      }

      return apiClient
        .delete<{ status: boolean; message: string }>("/admin/products/bulk-delete", {
          data,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response: AxiosResponse) => {
          console.log("🗑️ API: Bulk delete success response:", response.data);
          return response.data;
        })
        .catch((error) => {
          console.error("🗑️ API: Bulk delete error details:");
          console.error("🗑️ API: Error status:", error.response?.status);
          console.error("🗑️ API: Error data:", error.response?.data);
          console.error("🗑️ API: Error headers:", error.response?.headers);
          console.error("🗑️ API: Request config:", error.config);

          // Enhanced error handling
          if (error.response?.status === 404) {
            if (error.response?.data?.message === "Product not found") {
              throw new Error("Một hoặc nhiều sản phẩm không tồn tại trong hệ thống");
            } else {
              throw new Error("Endpoint xóa hàng loạt không tồn tại trên server");
            }
          } else if (error.response?.status === 401) {
            throw new Error("Phiên đăng nhập đã hết hạn");
          } else if (error.response?.status === 403) {
            throw new Error("Không có quyền thực hiện thao tác này");
          }

          throw error;
        });
    },

    // Toggle product active status
    toggleStatus: (id: number): Promise<ProductResponse> => {
      return api.put<ProductResponse>(`/admin/products/${id}/toggle-status`);
    },
  },

  // Cart operations
  cart: {
    // Get user's cart
    getCart: (): Promise<CartResponse> => {
      return api.get<CartResponse>("/cart");
    },

    // Add item to cart
    addToCart: (request: AddToCartRequest): Promise<AddToCartResponse> => {
      return api.post<AddToCartResponse>("/cart/add", request);
    },

    // Update cart item quantity
    updateCartItem: (itemId: number, request: UpdateCartItemRequest): Promise<UpdateCartItemResponse> => {
      return api.put<UpdateCartItemResponse>(`/cart/update/${itemId}`, request);
    },

    // Remove item from cart
    removeFromCart: (itemId: number): Promise<RemoveFromCartResponse> => {
      return api.delete<RemoveFromCartResponse>(`/cart/remove/${itemId}`);
    },

    // Clear all items from cart
    clearCart: (): Promise<ClearCartResponse> => {
      return api.delete<ClearCartResponse>("/cart/clear");
    },

    // Get cart items count
    getCartCount: (): Promise<CartCountResponse> => {
      return api.get<CartCountResponse>("/cart/count");
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
