<template>
  <div class="dashboard-container space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 :class="titleClasses">Dashboard</h1>
        <p :class="subtitleClasses">Welcome back! Here's what's happening with your store.</p>
      </div>
      
      <div class="flex items-center space-x-4">
        <Button variant="outline" :icon="DownloadOutline">
          Export
        </Button>
        <Button variant="primary" :icon="AddOutline">
          Add Product
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        v-for="stat in stats"
        :key="stat.id"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :trend="stat.trend"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sales Chart -->
      <Card title="Sales Overview" size="lg">
        <template #actions>
          <n-select
            v-model:value="salesPeriod"
            :options="periodOptions"
            size="small"
            class="w-32"
          />
        </template>
        
        <div class="h-80 flex items-center justify-center">
          <div :class="chartPlaceholderClasses">
            <n-icon class="w-16 h-16 mb-4">
              <BarChartOutline />
            </n-icon>
            <p>Sales Chart Placeholder</p>
            <p class="text-sm mt-2">Integrate with Chart.js or similar</p>
          </div>
        </div>
      </Card>

      <!-- Top Products -->
      <Card title="Top Products" size="lg">
        <template #actions>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </template>

        <div class="space-y-4">
          <div
            v-for="product in topProducts"
            :key="product.id"
            class="flex items-center space-x-4 p-3 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-12 h-12 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h4 :class="productNameClasses">{{ product.name }}</h4>
              <p :class="productCategoryClasses">{{ product.category }}</p>
            </div>
            <div class="text-right">
              <p :class="productSalesClasses">{{ product.sales }} sold</p>
              <p :class="productRevenueClasses">${{ product.revenue }}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Recent Orders & Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Orders -->
      <div class="lg:col-span-2">
        <Card title="Recent Orders" size="lg">
          <template #actions>
            <Button variant="ghost" size="sm">
              View All Orders
            </Button>
          </template>

          <Table
            :columns="orderColumns"
            :data="recentOrders"
            :hoverable="true"
            size="sm"
          >
            <template #cell-status="{ value }">
              <Badge :variant="getOrderStatusVariant(value)" size="sm">
                {{ value }}
              </Badge>
            </template>
            
            <template #cell-total="{ value }">
              <span class="font-semibold">${{ value }}</span>
            </template>
          </Table>
        </Card>
      </div>

      <!-- Activity Feed -->
      <Card title="Recent Activity" size="lg">
        <div class="space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-start space-x-3"
          >
            <div :class="getActivityIconClasses(activity.type)">
              <n-icon>
                <component :is="getActivityIcon(activity.type)" />
              </n-icon>
            </div>
            <div class="flex-1">
              <p :class="activityTextClasses">{{ activity.message }}</p>
              <p :class="activityTimeClasses">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Quick Actions -->
    <Card title="Quick Actions" size="lg">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="action in quickActions"
          :key="action.id"
          :class="quickActionClasses"
          @click="handleQuickAction(action)"
        >
          <n-icon class="w-8 h-8 mb-2">
            <component :is="action.icon" />
          </n-icon>
          <span class="font-medium">{{ action.title }}</span>
          <span :class="actionDescClasses">{{ action.description }}</span>
        </button>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NIcon, NSelect } from 'naive-ui'
import {
  DownloadOutline,
  AddOutline,
  BarChartOutline,
  CartOutline,
  PersonOutline,
  SettingsOutline,
  StatsChartOutline,
  NotificationsOutline,

} from '@vicons/ionicons5'
import { Card, Button, Badge, Table } from '@/components/ui'
import StatCard from './StatCard.vue'
import { useThemeClasses } from '@/composables/useTheme'

const { getTextClass } = useThemeClasses()

// State
const salesPeriod = ref('7d')

// Computed
const titleClasses = computed(() => [
  getTextClass('primary'),
  'text-3xl font-bold'
].join(' '))

const subtitleClasses = computed(() => [
  getTextClass('secondary'),
  'text-lg'
].join(' '))

const chartPlaceholderClasses = computed(() => [
  getTextClass('muted'),
  'text-center'
].join(' '))

const productNameClasses = computed(() => [
  getTextClass('primary'),
  'font-medium'
].join(' '))

const productCategoryClasses = computed(() => [
  getTextClass('muted'),
  'text-sm'
].join(' '))

const productSalesClasses = computed(() => [
  getTextClass('primary'),
  'font-medium text-sm'
].join(' '))

const productRevenueClasses = computed(() => [
  'text-light-accent-sport dark:text-dark-accent-sport',
  'font-semibold text-sm'
].join(' '))

const activityTextClasses = computed(() => [
  getTextClass('primary'),
  'text-sm'
].join(' '))

const activityTimeClasses = computed(() => [
  getTextClass('muted'),
  'text-xs'
].join(' '))

const quickActionClasses = computed(() => [
  'flex flex-col items-center p-4 rounded-lg transition-all duration-200',
  'bg-light-bg-secondary dark:bg-dark-bg-secondary',
  'hover:bg-light-border-primary dark:hover:bg-dark-border-primary',
  'border border-transparent hover:border-light-accent-sport dark:hover:border-dark-accent-sport',
  getTextClass('primary')
].join(' '))

const actionDescClasses = computed(() => [
  getTextClass('muted'),
  'text-xs mt-1'
].join(' '))

// Data
const periodOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last year', value: '1y' }
]

const stats = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    trend: 'up' as const,
    icon: StatsChartOutline,
    color: 'sport' as const
  },
  {
    id: 2,
    title: 'Orders',
    value: '2,345',
    change: '+15.3%',
    trend: 'up' as const,
    icon: CartOutline,
    color: 'info' as const
  },
  {
    id: 3,
    title: 'Customers',
    value: '1,234',
    change: '+8.2%',
    trend: 'up' as const,
    icon: PersonOutline,
    color: 'warning' as const
  },
  {
    id: 4,
    title: 'Products',
    value: '567',
    change: '+2.5%',
    trend: 'up' as const,
    icon: SettingsOutline,
    color: 'success' as const
  }
]

const topProducts = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    category: 'Running',
    sales: 145,
    revenue: 14500,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=48&h=48&fit=crop'
  },
  {
    id: 2,
    name: 'Adidas Ultraboost',
    category: 'Running',
    sales: 132,
    revenue: 13200,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=48&h=48&fit=crop'
  },
  {
    id: 3,
    name: 'Puma Football Boots',
    category: 'Football',
    sales: 98,
    revenue: 9800,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=48&h=48&fit=crop'
  }
]

const orderColumns = [
  { key: 'id', title: 'Order ID', sortable: true },
  { key: 'customer', title: 'Customer', sortable: true },
  { key: 'status', title: 'Status' },
  { key: 'total', title: 'Total', sortable: true }
]

const recentOrders = [
  { id: '#12345', customer: 'John Doe', status: 'Completed', total: 299 },
  { id: '#12346', customer: 'Jane Smith', status: 'Processing', total: 199 },
  { id: '#12347', customer: 'Bob Johnson', status: 'Pending', total: 399 },
  { id: '#12348', customer: 'Alice Brown', status: 'Cancelled', total: 159 }
]

const recentActivity = [
  {
    id: 1,
    type: 'order',
    message: 'New order #12349 received',
    time: '2 minutes ago'
  },
  {
    id: 2,
    type: 'user',
    message: 'New customer registered',
    time: '5 minutes ago'
  },
  {
    id: 3,
    type: 'product',
    message: 'Product "Nike Air Max" updated',
    time: '10 minutes ago'
  }
]

const quickActions = [
  {
    id: 1,
    title: 'Add Product',
    description: 'Create new product',
    icon: AddOutline,
    action: 'add-product'
  },
  {
    id: 2,
    title: 'View Orders',
    description: 'Manage orders',
    icon: CartOutline,
    action: 'view-orders'
  },
  {
    id: 3,
    title: 'Customers',
    description: 'Manage customers',
    icon: PersonOutline,
    action: 'view-customers'
  },
  {
    id: 4,
    title: 'Settings',
    description: 'Store settings',
    icon: SettingsOutline,
    action: 'settings'
  }
]

// Methods
const getOrderStatusVariant = (status: string) => {
  const variants: Record<string, any> = {
    'Completed': 'success',
    'Processing': 'warning',
    'Pending': 'info',
    'Cancelled': 'danger'
  }
  return variants[status] || 'secondary'
}

const getActivityIcon = (type: string) => {
  const icons: Record<string, any> = {
    'order': CartOutline,
    'user': PersonOutline,
    'product': SettingsOutline
  }
  return icons[type] || NotificationsOutline
}

const getActivityIconClasses = (type: string) => {
  const baseClass = 'flex items-center justify-center w-8 h-8 rounded-full'
  const typeClasses: Record<string, string> = {
    'order': 'bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 text-light-accent-sport dark:text-dark-accent-sport',
    'user': 'bg-light-accent-info/10 dark:bg-dark-accent-info/10 text-light-accent-info dark:text-dark-accent-info',
    'product': 'bg-light-accent-warning/10 dark:bg-dark-accent-warning/10 text-light-accent-warning dark:text-dark-accent-warning'
  }
  
  return `${baseClass} ${typeClasses[type] || 'bg-light-bg-secondary dark:bg-dark-bg-secondary'}`
}

const handleQuickAction = (action: any) => {
  console.log('Quick action:', action.action)
  // Handle quick action logic here
}
</script>
