import { apiClient } from "./api";
import type { AxiosResponse } from "axios";
import type { BrandsResponse, BrandsParams } from "@/types/public";

export const brandService = {
  // Get all brands
  getBrands: (params?: BrandsParams): Promise<BrandsResponse> => {
    return apiClient
      .get<BrandsResponse>("/brands", { params })
      .then((response: AxiosResponse<BrandsResponse>) => response.data);
  },
};

export default brandService;
