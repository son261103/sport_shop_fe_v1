// 🎨 UI Components Exports for Sport Shop

export { default as Button } from './Button.vue'
export { default as Card } from './Card.vue'
export { default as Input } from './Input.vue'
export { default as Modal } from './Modal.vue'
export { default as Badge } from './Badge.vue'
export { default as Table } from './Table.vue'
export { default as Loading } from './Loading.vue'
export { default as ComponentSection } from './ComponentSection.vue'
export { default as Icon } from './Icon.vue'

// Export component types for TypeScript
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'ghost' | 'outline'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type CardVariant = 'default' | 'bordered' | 'shadow' | 'elevated'
export type CardSize = 'sm' | 'md' | 'lg'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
export type InputSize = 'sm' | 'md' | 'lg'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

export type LoadingType = 'spinner' | 'dots'
export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl'
export type LoadingColor = 'sport' | 'primary' | 'secondary' | 'white'

export interface TableColumn {
  key: string
  title: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
}

export type TableSize = 'sm' | 'md' | 'lg'

// Component constants
export const UI_COMPONENTS = {
  button: 'Button',
  card: 'Card',
  input: 'Input',
  modal: 'Modal',
  badge: 'Badge',
  table: 'Table',
  loading: 'Loading',
} as const

export const BUTTON_VARIANTS = ['primary', 'secondary', 'danger', 'warning', 'info', 'ghost', 'outline'] as const
export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const CARD_VARIANTS = ['default', 'bordered', 'shadow', 'elevated'] as const
export const CARD_SIZES = ['sm', 'md', 'lg'] as const

export const INPUT_TYPES = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const
export const INPUT_SIZES = ['sm', 'md', 'lg'] as const

export const MODAL_SIZES = ['sm', 'md', 'lg', 'xl', 'full'] as const

export const BADGE_VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
export const BADGE_SIZES = ['xs', 'sm', 'md', 'lg'] as const

export const TABLE_SIZES = ['sm', 'md', 'lg'] as const

export const LOADING_TYPES = ['spinner', 'dots'] as const
export const LOADING_SIZES = ['sm', 'md', 'lg', 'xl'] as const
export const LOADING_COLORS = ['sport', 'primary', 'secondary', 'white'] as const
