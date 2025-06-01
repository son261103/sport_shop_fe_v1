// Admin Layout Components
export { default as AdminHeader } from './AdminHeader.vue'
export { default as AdminSidebar } from './AdminSidebar.vue'
export { default as AdminBreadcrumb } from './AdminBreadcrumb.vue'

// Export component types for TypeScript
export type AdminComponentType =
  | 'header'
  | 'sidebar'
  | 'breadcrumb'

export const ADMIN_COMPONENTS = {
  header: 'AdminHeader',
  sidebar: 'AdminSidebar',
  breadcrumb: 'AdminBreadcrumb',
} as const