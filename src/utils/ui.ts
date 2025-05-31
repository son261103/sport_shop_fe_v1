// 🎯 UI Utility Functions

import type { ButtonConfig, BadgeVariant, SportCategory } from '@/types'

// Utility functions
export const getCategoryClass = (category: SportCategory): string => {
  return `category-${category}`
}

export const getButtonClass = (config: ButtonConfig): string => {
  const { variant, size, disabled, loading, fullWidth } = config
  
  let classes = ['btn']
  
  // Variant classes
  switch (variant) {
    case 'primary':
      classes.push('btn-primary')
      break
    case 'secondary':
      classes.push('btn-secondary')
      break
    case 'danger':
      classes.push('btn-danger')
      break
    case 'ghost':
      classes.push('btn-ghost')
      break
    case 'outline':
      classes.push('btn-outline')
      break
  }
  
  // Size classes
  switch (size) {
    case 'sm':
      classes.push('px-3 py-1.5 text-sm')
      break
    case 'md':
      classes.push('px-4 py-2 text-base')
      break
    case 'lg':
      classes.push('px-6 py-3 text-lg')
      break
    case 'xl':
      classes.push('px-8 py-4 text-xl')
      break
  }
  
  // State classes
  if (disabled) classes.push('opacity-50 cursor-not-allowed')
  if (loading) classes.push('cursor-wait')
  if (fullWidth) classes.push('w-full')
  
  return classes.join(' ')
}

export const getBadgeClass = (variant: BadgeVariant): string => {
  switch (variant) {
    case 'primary':
      return 'badge-primary'
    case 'danger':
      return 'badge-danger'
    case 'warning':
      return 'badge-warning'
    case 'info':
      return 'badge-info'
    case 'success':
      return 'badge-success'
    default:
      return 'badge-primary'
  }
}
