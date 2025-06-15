import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  brand?: string
  category?: string
}

export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const wishlistItems = ref<WishlistItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const wishlistCount = computed(() => wishlistItems.value.length)
  const hasItems = computed(() => wishlistItems.value.length > 0)
  const isInWishlist = computed(() => (productId: number) => {
    return wishlistItems.value.some(item => item.id === productId)
  })

  // Helper methods
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  // Load wishlist from localStorage
  const loadWishlist = () => {
    try {
      const stored = localStorage.getItem('wishlist')
      if (stored) {
        wishlistItems.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error)
      setError('Failed to load wishlist')
    }
  }

  // Save wishlist to localStorage
  const saveWishlist = () => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error)
      setError('Failed to save wishlist')
    }
  }

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    try {
      clearError()
      
      // Check if item already exists
      if (!isInWishlist.value(item.id)) {
        wishlistItems.value.push(item)
        saveWishlist()
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      setError('Failed to add item to wishlist')
    }
  }

  // Remove item from wishlist
  const removeFromWishlist = (productId: number) => {
    try {
      clearError()
      
      const index = wishlistItems.value.findIndex(item => item.id === productId)
      if (index > -1) {
        wishlistItems.value.splice(index, 1)
        saveWishlist()
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      setError('Failed to remove item from wishlist')
    }
  }

  // Toggle item in wishlist - accepts productId (number) for compatibility
  const toggleWishlist = (productId: number) => {
    if (isInWishlist.value(productId)) {
      removeFromWishlist(productId)
    } else {
      // For now, we'll create a basic item with just the ID
      // In a real app, you'd fetch the product details
      const basicItem: WishlistItem = {
        id: productId,
        name: `Product ${productId}`,
        price: 0,
        image: ''
      }
      addToWishlist(basicItem)
    }
  }

  // Clear entire wishlist
  const clearWishlist = () => {
    try {
      clearError()
      wishlistItems.value = []
      saveWishlist()
    } catch (error) {
      console.error('Error clearing wishlist:', error)
      setError('Failed to clear wishlist')
    }
  }

  // Initialize store
  const initialize = () => {
    loadWishlist()
  }

  return {
    // State
    wishlistItems,
    isLoading,
    error,
    
    // Getters
    wishlistCount,
    hasItems,
    isInWishlist,
    
    // Actions
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    initialize,
    setLoading,
    setError,
    clearError
  }
})