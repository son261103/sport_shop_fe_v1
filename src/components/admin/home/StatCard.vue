<template>
  <div class="bg-white dark:bg-dark-bg-secondary rounded-xl p-6 border border-light-border-primary dark:border-dark-border-primary">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
          {{ title }}
        </p>
        <p class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mt-1">
          {{ value }}
        </p>
      </div>
      <div class="p-3 rounded-lg" :class="iconBg">
        <component :is="getIconComponent(icon)" class="w-6 h-6" :class="iconColor" />
      </div>
    </div>
    <div class="flex items-center mt-4">
      <span 
        class="text-sm font-medium"
        :class="changeType === 'increase' ? 'text-green-600' : 'text-red-600'"
      >
        {{ changeType === 'increase' ? '+' : '-' }}{{ change }}%
      </span>
      <span class="text-light-text-tertiary dark:text-dark-text-tertiary text-sm ml-2">
        from last month
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

interface Props {
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  icon: string
  iconBg: string
  iconColor: string
}

defineProps<Props>()

// Icon components using h() function
const CubeIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  })
])

const PeopleIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
  })
])

const DocumentIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  })
])

const TrendingUpIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-6 h-6'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  })
])

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    CubeIcon,
    PeopleIcon,
    DocumentIcon,
    TrendingUpIcon
  }
  return iconMap[iconName] || CubeIcon
}
</script>