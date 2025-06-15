import { apiClient } from "./api";
import type { AxiosResponse } from "axios";
import type { CategoriesResponse, CategoriesParams } from "@/types/public";

export const categoryService = {
  // Get all categories
  getCategories: (params?: CategoriesParams): Promise<CategoriesResponse> => {
    return apiClient
      .get<CategoriesResponse>("/categories", { params })
      .then((response: AxiosResponse<CategoriesResponse>) => response.data);
  },
};

export default categoryService;
