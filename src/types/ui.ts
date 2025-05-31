// 🎯 UI Component Types for Sport Shop

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'danger' 
  | 'ghost' 
  | 'outline'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonConfig {
  variant: ButtonVariant
  size: ButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

export type BadgeVariant = 
  | 'primary' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'success'

// Animation utilities
export const ANIMATION_CLASSES = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  bounceGentle: 'animate-bounce-gentle',
  spin: 'animate-spin',
} as const

export type AnimationClass = keyof typeof ANIMATION_CLASSES
