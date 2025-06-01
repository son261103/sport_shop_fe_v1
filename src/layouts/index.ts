// 🏗️ Layout Exports for Sport Shop

export { default as DefaultLayout } from './DefaultLayout.vue'

export { default as AdminLayout } from './AdminLayout.vue'

// Export layout types for TypeScript
export type LayoutType = 'default' | 'admin'

export const LAYOUTS = {
  default: 'DefaultLayout',
  admin: 'AdminLayout',
} as const
