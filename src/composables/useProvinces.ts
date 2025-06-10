import { ref, computed } from 'vue'

// Types for Province API
interface Province {
  name: string
  code: number
  division_type: string
  phone_code: number
  codename: string
  districts?: District[]
}

interface District {
  name: string
  code: number
  codename: string
  division_type: string
  province_code: number
  wards?: Ward[]
}

interface Ward {
  name: string
  code: number
  codename: string
  division_type: string
  district_code: number
}

export function useProvinces() {
  const provinces = ref<Province[]>([])
  const districts = ref<District[]>([])
  const wards = ref<Ward[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all provinces
  const fetchProvinces = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch('https://provinces.open-api.vn/api/')
      if (!response.ok) {
        throw new Error('Failed to fetch provinces')
      }
      
      const data = await response.json()
      provinces.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching provinces:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch districts by province code
  const fetchDistricts = async (provinceCode: number) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      if (!response.ok) {
        throw new Error('Failed to fetch districts')
      }
      
      const data = await response.json()
      districts.value = data.districts || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching districts:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch wards by district code
  const fetchWards = async (districtCode: number) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      if (!response.ok) {
        throw new Error('Failed to fetch wards')
      }
      
      const data = await response.json()
      wards.value = data.wards || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching wards:', err)
    } finally {
      loading.value = false
    }
  }

  // Search provinces by name
  const searchProvinces = async (query: string) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(`https://provinces.open-api.vn/api/p/search/?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Failed to search provinces')
      }
      
      const data = await response.json()
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error searching provinces:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Search districts by name
  const searchDistricts = async (query: string) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(`https://provinces.open-api.vn/api/d/search/?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Failed to search districts')
      }
      
      const data = await response.json()
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error searching districts:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Get province by code
  const getProvinceByCode = (code: number) => {
    return provinces.value.find(p => p.code === code)
  }

  // Get district by code
  const getDistrictByCode = (code: number) => {
    return districts.value.find(d => d.code === code)
  }

  // Get ward by code
  const getWardByCode = (code: number) => {
    return wards.value.find(w => w.code === code)
  }

  // Computed properties for formatted data
  const provincesForSelect = computed(() => 
    provinces.value.map(p => ({
      value: p.code.toString(),
      label: p.name,
      code: p.code,
      name: p.name
    }))
  )

  const districtsForSelect = computed(() => 
    districts.value.map(d => ({
      value: d.code.toString(),
      label: d.name,
      code: d.code,
      name: d.name
    }))
  )

  const wardsForSelect = computed(() => 
    wards.value.map(w => ({
      value: w.code.toString(),
      label: w.name,
      code: w.code,
      name: w.name
    }))
  )

  // Clear districts when province changes
  const clearDistricts = () => {
    districts.value = []
  }

  // Clear wards when district changes
  const clearWards = () => {
    wards.value = []
  }

  return {
    // State
    provinces,
    districts,
    wards,
    loading,
    error,
    
    // Computed
    provincesForSelect,
    districtsForSelect,
    wardsForSelect,
    
    // Methods
    fetchProvinces,
    fetchDistricts,
    fetchWards,
    searchProvinces,
    searchDistricts,
    getProvinceByCode,
    getDistrictByCode,
    getWardByCode,
    clearDistricts,
    clearWards
  }
}