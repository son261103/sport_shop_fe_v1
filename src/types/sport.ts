// 🏃‍♂️ Sport-related Types for Sport Shop

import type { BadgeVariant } from './ui'

export type SportCategory = 
  | 'football' 
  | 'basketball' 
  | 'tennis' 
  | 'running' 
  | 'gym'
  | 'swimming'
  | 'cycling'
  | 'fitness'

export interface CategoryConfig {
  name: string
  icon: string
  color: string
  bgColor: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: SportCategory
  image: string
  badges?: BadgeVariant[]
  inStock: boolean
  rating?: number
  reviews?: number
}
