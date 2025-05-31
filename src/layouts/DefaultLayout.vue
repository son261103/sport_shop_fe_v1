<template>
  <div class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container-custom section-padding">
      <!-- Breadcrumb -->
      <AppBreadcrumb :current-path="currentPath" />

      <!-- Page Content -->
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AppHeader, AppFooter, AppBreadcrumb } from '@/components/common'

interface Props {
  currentPath?: string
  showBreadcrumb?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentPath: '/',
  showBreadcrumb: true
})

// In a real app, this would come from Vue Router
const currentPath = ref(props.currentPath)
</script>
