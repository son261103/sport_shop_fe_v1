// 🎯 Example Components Exports for Sport Shop

// Product Components
export { default as ProductGrid } from './ProductGrid.vue'
export { default as ProductCard } from './ProductCard.vue'
export { default as ProductListItem } from './ProductListItem.vue'

// Dashboard Components
export { default as Dashboard } from './Dashboard.vue'
export { default as StatCard } from './StatCard.vue'

// Interactive Components
export { default as CategoryCard } from './CategoryCard.vue'
export { default as SearchBar } from './SearchBar.vue'
export { default as ShoppingCart } from './ShoppingCart.vue'

// Export component types for TypeScript
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isFavorite: boolean
  description: string
}

export interface StatData {
  id: number
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: any
  color?: 'sport' | 'danger' | 'warning' | 'info' | 'success'
  progress?: number
}

export interface OrderData {
  id: string
  customer: string
  status: string
  total: number
  date?: string
  items?: number
}

export interface ActivityData {
  id: number
  type: string
  message: string
  time: string
  user?: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  isNew?: boolean
  salePercentage?: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface SearchSuggestion {
  id: string
  title: string
  category?: string
  type?: string
}

// Component constants
export const EXAMPLE_COMPONENTS = {
  productGrid: 'ProductGrid',
  productCard: 'ProductCard',
  productListItem: 'ProductListItem',
  dashboard: 'Dashboard',
  statCard: 'StatCard',
  categoryCard: 'CategoryCard',
  searchBar: 'SearchBar',
  shoppingCart: 'ShoppingCart',
} as const

export const PRODUCT_CATEGORIES = [
  'Football',
  'Basketball', 
  'Tennis',
  'Running',
  'Gym',
  'Swimming',
  'Cycling',
  'Outdoor'
] as const

export const PRODUCT_BRANDS = [
  'Nike',
  'Adidas',
  'Puma',
  'Under Armour',
  'Reebok',
  'New Balance',
  'Asics',
  'Converse'
] as const

export const ORDER_STATUSES = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Completed',
  'Cancelled',
  'Refunded'
] as const

export const ACTIVITY_TYPES = [
  'order',
  'user',
  'product',
  'payment',
  'inventory',
  'system'
] as const

// Sample data generators
export const generateSampleProducts = (count: number = 12): Product[] => {
  const categories = ['Football', 'Basketball', 'Tennis', 'Running', 'Gym']
  const brands = ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Sample Product ${i + 1}`,
    price: Math.floor(Math.random() * 200) + 50,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 250 : undefined,
    image: `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&sig=${i}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    reviews: Math.floor(Math.random() * 500) + 10,
    inStock: Math.random() > 0.1,
    isFavorite: Math.random() > 0.7,
    description: `This is a sample description for product ${i + 1}. It includes all the important features and benefits.`
  }))
}

export const generateSampleOrders = (count: number = 10): OrderData[] => {
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Completed']
  const customers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `#${12345 + i}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    total: Math.floor(Math.random() * 500) + 50,
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: Math.floor(Math.random() * 5) + 1
  }))
}

export const generateSampleActivity = (count: number = 10): ActivityData[] => {
  const types = ['order', 'user', 'product', 'payment']
  const messages = [
    'New order received',
    'Customer registered',
    'Product updated',
    'Payment processed',
    'Inventory updated',
    'User logged in'
  ]
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    type: types[Math.floor(Math.random() * types.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    time: `${Math.floor(Math.random() * 60)} minutes ago`,
    user: Math.random() > 0.5 ? 'Admin User' : undefined
  }))
}
