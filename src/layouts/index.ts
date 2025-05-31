// 🏗️ Layout Exports for Sport Shop

export { default as DefaultLayout } from './DefaultLayout.vue'

// Export layout types for TypeScript
export type LayoutType = 'default'

export const LAYOUTS = {
  default: 'DefaultLayout',
} as const
