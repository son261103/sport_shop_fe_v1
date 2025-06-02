import { api } from "../api";
import type {
  CategoryFormData,
  CategoryListResponse,
  CategoryResponse,
  CategoryListParams,
  BulkDeleteRequest,
} from "../../types/admin/category";

export const categoryService = {
  // Get all categories with pagination and filters
  getCategories: (
    params?: CategoryListParams
  ): Promise<CategoryListResponse> => {
    return api.get("/admin/categories", { params });
  },

  // Get a specific category by ID
  getCategory: (id: number): Promise<CategoryResponse> => {
    return api.get(`/admin/categories/${id}`);
  },

  // Create a new category
  createCategory: (data: CategoryFormData): Promise<CategoryResponse> => {
    return api.post("/admin/categories", data);
  },

  // Update an existing category
  updateCategory: (
    id: number,
    data: CategoryFormData
  ): Promise<CategoryResponse> => {
    return api.put(`/admin/categories/${id}`, data);
  },

  // Bulk delete categories
  bulkDeleteCategories: (
    data: BulkDeleteRequest
  ): Promise<{ status: boolean; message: string }> => {
    return api.post("/admin/categories/bulk-delete", data);
  },
};

export default categoryService;
