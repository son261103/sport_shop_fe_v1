<template>
  <div class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary flex">
    <!-- Admin Sidebar -->
    <AdminSidebar :is-collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col" :class="{ 'ml-64': !isSidebarCollapsed, 'ml-16': isSidebarCollapsed }">
      <!-- Admin Header -->
      <AdminHeader @toggle-sidebar="toggleSidebar" />
      
      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <!-- Breadcrumb -->
        <AdminBreadcrumb :current-path="currentPath" v-if="showBreadcrumb" />
        
        <!-- Page Content -->
        <div class="mt-4">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdminHeader, AdminSidebar, AdminBreadcrumb } from '@/components/admin/common'

interface Props {
  currentPath?: string
  showBreadcrumb?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentPath: '/admin',
  showBreadcrumb: true
})

const isSidebarCollapsed = ref(false)
const currentPath = ref(props.currentPath)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>