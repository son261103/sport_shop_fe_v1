<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loading size="lg" color="sport" text="Đang tải dữ liệu dashboard..." />
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Welcome Section -->
      <WelcomeSection />

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sales Chart -->
        <SalesChart />

        <!-- Recent Orders -->
        <RecentOrders :orders="recentOrders" />
      </div>

      <!-- Quick Actions -->
      <QuickActions :actions="quickActions" @action-click="handleActionClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  WelcomeSection,
  StatCard,
  SalesChart,
  RecentOrders,
  QuickActions,
  type StatData,
  type OrderData,
  type ActionData,
} from "@/components/admin/home";
import { Loading } from "@/components/ui";

// Loading state
const isLoading = ref(true);

// Stats data
const stats: StatData[] = [
  {
    title: "Total Products",
    value: "1,234",
    change: 12,
    changeType: "increase",
    icon: "CubeIcon",
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Total Customers",
    value: "5,678",
    change: 8,
    changeType: "increase",
    icon: "PeopleIcon",
    iconBg: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Total Orders",
    value: "890",
    change: 15,
    changeType: "increase",
    icon: "DocumentIcon",
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: 5,
    changeType: "decrease",
    icon: "TrendingUpIcon",
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
];

// Recent orders data
const recentOrders: OrderData[] = [
  {
    id: "1001",
    customer: "John Doe",
    amount: 299.99,
    status: "completed",
  },
  {
    id: "1002",
    customer: "Jane Smith",
    amount: 159.5,
    status: "pending",
  },
  {
    id: "1003",
    customer: "Mike Johnson",
    amount: 89.99,
    status: "processing",
  },
  {
    id: "1004",
    customer: "Sarah Wilson",
    amount: 199.99,
    status: "completed",
  },
];

// Quick actions data
const quickActions: ActionData[] = [
  {
    title: "Add Product",
    description: "Add a new product to your store",
    icon: "AddIcon",
  },
  {
    title: "View Orders",
    description: "Manage customer orders",
    icon: "DocumentIcon",
  },
  {
    title: "Store Settings",
    description: "Configure your store",
    icon: "SettingsIcon",
  },
];

// Handle quick action clicks
const handleActionClick = (action: ActionData) => {
  console.log('Action clicked:', action.title)
  // TODO: Implement navigation or action handling
}

// Load dashboard data
const loadDashboardData = async () => {
  try {
    isLoading.value = true
    // Simulate API call to load dashboard data
    await new Promise(resolve => setTimeout(resolve, 1500))
    // TODO: Replace with actual API calls to load stats, orders, etc.
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

// Load data when component mounts
onMounted(() => {
  loadDashboardData()
});
</script>