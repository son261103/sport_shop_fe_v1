// Location types for Vietnamese provinces, districts, and wards

export interface Province {
  code: number;
  name: string;
  name_en?: string;
  full_name?: string;
  full_name_en?: string;
  code_name?: string;
  administrative_unit_id?: number;
  administrative_region_id?: number;
  districts?: District[];
}

export interface District {
  code: number;
  name: string;
  name_en?: string;
  full_name?: string;
  full_name_en?: string;
  code_name?: string;
  province_code?: number;
  administrative_unit_id?: number;
  wards?: Ward[];
}

export interface Ward {
  code: number;
  name: string;
  name_en?: string;
  full_name?: string;
  full_name_en?: string;
  code_name?: string;
  district_code?: number;
  administrative_unit_id?: number;
}

// Select option types for form components
export interface LocationSelectOption {
  value: string;
  label: string;
  code: number;
  name: string;
}

// API response types
export interface ProvinceApiResponse {
  code: number;
  name: string;
  districts?: District[];
}

export interface DistrictApiResponse {
  code: number;
  name: string;
  wards?: Ward[];
}