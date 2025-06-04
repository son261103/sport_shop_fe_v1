import axios, { AxiosError } from "axios";
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
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/auth";
import { useLoading } from "../composables/useLoading";

// Base API configuration
const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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
    const token = localStorage.getItem("auth_token");
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
      localStorage.removeItem("auth_token");
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
