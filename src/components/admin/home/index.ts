// Admin Home Components Exports
export { default as WelcomeSection } from './WelcomeSection.vue'
export { default as StatCard } from './StatCard.vue'
export { default as SalesChart } from './SalesChart.vue'
export { default as RecentOrders } from './RecentOrders.vue'
export { default as QuickActions } from './QuickActions.vue'

// Types
export interface StatData {
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  icon: string
  iconBg: string
  iconColor: string
}

export interface OrderData {
  id: string
  customer: string
  amount: number
  status: string
}

export interface ActionData {
  title: string
  description: string
  icon: string
}

// Component constants
export const ADMIN_HOME_COMPONENTS = {
  welcomeSection: 'WelcomeSection',
  statCard: 'StatCard',
  salesChart: 'SalesChart',
  recentOrders: 'RecentOrders',
  quickActions: 'QuickActions'
} as const