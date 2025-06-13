import { ref, computed } from 'vue'
import type { Province, District, Ward } from '@/types'
import { ENV } from '@/constants'

// Environment variables
const PROVINCES_API_URL = ENV.API.PROVINCES_URL

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
      
      const response = await fetch(`${PROVINCES_API_URL}/`)
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
      
      const response = await fetch(`${PROVINCES_API_URL}/p/${provinceCode}?depth=2`)
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
      
      const response = await fetch(`${PROVINCES_API_URL}/d/${districtCode}?depth=2`)
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
      
      const response = await fetch(`${PROVINCES_API_URL}/p/search/?q=${encodeURIComponent(query)}`)
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
      
      const response = await fetch(`${PROVINCES_API_URL}/d/search/?q=${encodeURIComponent(query)}`)
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
    return provinces.value.find((p: Province) => p.code === code)
  }

  // Get district by code
  const getDistrictByCode = (code: number) => {
    return districts.value.find((d: District) => d.code === code)
  }

  // Get ward by code
  const getWardByCode = (code: number) => {
    return wards.value.find((w: Ward) => w.code === code)
  }

  // Computed properties for formatted data
  const provincesForSelect = computed(() => 
    provinces.value.map((p: Province) => ({
      value: p.code.toString(),
      label: p.name,
      code: p.code,
      name: p.name
    }))
  )

  const districtsForSelect = computed(() => 
    districts.value.map((d: District) => ({
      value: d.code.toString(),
      label: d.name,
      code: d.code,
      name: d.name
    }))
  )

  const wardsForSelect = computed(() => 
    wards.value.map((w: Ward) => ({
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