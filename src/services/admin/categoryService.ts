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
    return api.categories.getAll(params);
  },

  // Get a specific category by ID
  getCategory: (id: number): Promise<CategoryResponse> => {
    return api.categories.getById(id);
  },

  // Create a new category
  createCategory: (data: CategoryFormData): Promise<CategoryResponse> => {
    return api.categories.create(data);
  },

  // Update an existing category
  updateCategory: (
    id: number,
    data: CategoryFormData
  ): Promise<CategoryResponse> => {
    return api.categories.update(id, data);
  },

  // Delete a category
  deleteCategory: (id: number): Promise<{ status: boolean; message: string }> => {
    return api.categories.delete(id);
  },

  // Bulk delete categories
  bulkDeleteCategories: (
    data: BulkDeleteRequest
  ): Promise<{ status: boolean; message: string }> => {
    return api.categories.bulkDelete(data);
  },
};

export default categoryService;
