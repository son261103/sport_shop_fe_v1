import { api } from "../api";
import type {
  BrandFormData,
  BrandListResponse,
  BrandResponse,
  BrandListParams,
  BulkDeleteRequest,
} from "../../types/admin/brand";

export const brandService = {
  // Get all brands with pagination and filters
  getBrands: (params?: BrandListParams): Promise<BrandListResponse> => {
    return api.brands.getAll(params);
  },

  // Get a specific brand by ID
  getBrand: (id: number): Promise<BrandResponse> => {
    return api.brands.getById(id);
  },

  // Create a new brand
  createBrand: (data: BrandFormData): Promise<BrandResponse> => {
    return api.brands.create(data);
  },

  // Update an existing brand
  updateBrand: (id: number, data: BrandFormData): Promise<BrandResponse> => {
    return api.brands.update(id, data);
  },

  // Delete a brand
  deleteBrand: (id: number): Promise<{ status: boolean; message: string }> => {
    return api.brands.delete(id);
  },

  // Bulk delete brands
  bulkDeleteBrands: (
    data: BulkDeleteRequest
  ): Promise<{ status: boolean; message: string }> => {
    return api.brands.bulkDelete(data);
  },
};

export default brandService;
