<template>
  <nav v-if="breadcrumbItems.length > 1" class="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
    <div class="container-custom py-3">
      <n-breadcrumb>
        <n-breadcrumb-item
          v-for="(item, index) in breadcrumbItems"
          :key="item.path"
          :clickable="index < breadcrumbItems.length - 1"
          @click="handleBreadcrumbClick(item.path, index)"
        >
          <div class="flex items-center">
            <n-icon v-if="item.icon" class="mr-1">
              <component :is="item.icon" />
            </n-icon>
            {{ item.label }}
          </div>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NBreadcrumb, NBreadcrumbItem, NIcon } from 'naive-ui'
import { HomeOutline } from '@vicons/ionicons5'

interface BreadcrumbItem {
  label: string
  path: string
  icon?: any
}

interface Props {
  currentPath?: string
  customItems?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  currentPath: '/',
  customItems: () => []
})

const breadcrumbItems = computed(() => {
  if (props.customItems.length > 0) {
    return props.customItems
  }

  // Auto-generate breadcrumbs based on current path
  const pathSegments = props.currentPath.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = [
    { label: 'Home', path: '/', icon: HomeOutline }
  ]

  let currentPath = ''
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`
    items.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: currentPath
    })
  })

  return items
})

const handleBreadcrumbClick = (path: string, index: number) => {
  if (index < breadcrumbItems.value.length - 1) {
    // Here you would typically use Vue Router
    console.log(`Navigating to: ${path}`)
  }
}
</script>
