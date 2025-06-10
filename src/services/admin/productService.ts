import { api } from "../api";
import type {
  ProductFormData,
  ProductListResponse,
  ProductResponse,
  ProductListParams,
  BulkDeleteRequest,
} from "../../types/admin/product";

export const productService = {
  // Get all products with pagination and filters
  getProducts: (params?: ProductListParams): Promise<ProductListResponse> => {
    return api.products.getAll(params);
  },

  // Get a specific product by ID
  getProduct: (id: number): Promise<ProductResponse> => {
    return api.products.getById(id);
  },

  // Create a new product
  createProduct: (data: ProductFormData): Promise<ProductResponse> => {
    return api.products.create(data);
  },

  // Update an existing product
  updateProduct: (
    id: number,
    data: ProductFormData
  ): Promise<ProductResponse> => {
    return api.products.update(id, data);
  },

  // Delete a product
  deleteProduct: (
    id: number
  ): Promise<{ status: boolean; message: string }> => {
    return api.products.delete(id);
  },

  // Bulk delete products
  bulkDeleteProducts: (
    data: BulkDeleteRequest
  ): Promise<{ status: boolean; message: string }> => {
    return api.products.bulkDelete(data);
  },

  // Toggle product active status
  toggleProductStatus: (id: number): Promise<ProductResponse> => {
    return api.products.toggleStatus(id);
  },
};

export default productService;
