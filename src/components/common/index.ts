// 🧩 Common Layout Components Exports for Sport Shop

// Layout Components (Header, Footer, Navigation)
export { default as AppHeader } from './AppHeader.vue'
export { default as AppFooter } from './AppFooter.vue'
export { default as AppBreadcrumb } from './AppBreadcrumb.vue'

// Export component types for TypeScript
export type CommonComponentType =
  | 'header'
  | 'footer'
  | 'breadcrumb'

export const COMMON_COMPONENTS = {
  header: 'AppHeader',
  footer: 'AppFooter',
  breadcrumb: 'AppBreadcrumb',
} as const
