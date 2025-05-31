<template>
  <Card variant="shadow" :hoverable="true" class="stat-card">
    <div class="flex items-center justify-between">
      <!-- Content -->
      <div class="flex-1">
        <p :class="titleClasses">{{ title }}</p>
        <p :class="valueClasses">{{ value }}</p>
        
        <!-- Change Indicator -->
        <div v-if="change" class="flex items-center space-x-1 mt-2">
          <n-icon :class="changeIconClasses">
            <component :is="trendIcon" />
          </n-icon>
          <span :class="changeTextClasses">{{ change }}</span>
          <span :class="periodClasses">from last period</span>
        </div>
      </div>

      <!-- Icon -->
      <div :class="iconContainerClasses">
        <n-icon class="w-6 h-6">
          <component :is="icon" />
        </n-icon>
      </div>
    </div>

    <!-- Progress Bar (optional) -->
    <div v-if="progress !== undefined" class="mt-4">
      <div class="flex items-center justify-between mb-1">
        <span :class="progressLabelClasses">Progress</span>
        <span :class="progressValueClasses">{{ progress }}%</span>
      </div>
      <div class="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-full h-2">
        <div
          :class="progressBarClasses"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Additional Info -->
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-light-border-secondary dark:border-dark-border-secondary">
      <slot name="footer" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { TrendingUpOutline, TrendingDownOutline, RemoveOutline } from '@vicons/ionicons5'
import { Card } from '@/components/ui'
import { useThemeClasses } from '@/composables/useTheme'

interface Props {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: any
  color?: 'sport' | 'danger' | 'warning' | 'info' | 'success'
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  trend: 'neutral',
  color: 'sport'
})

const { getTextClass } = useThemeClasses()

// Computed
const titleClasses = computed(() => [
  getTextClass('secondary'),
  'text-sm font-medium uppercase tracking-wide'
].join(' '))

const valueClasses = computed(() => [
  getTextClass('primary'),
  'text-2xl font-bold mt-1'
].join(' '))

const changeIconClasses = computed(() => {
  const baseClass = 'w-4 h-4'
  const colorClasses = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: getTextClass('muted')
  }
  
  return `${baseClass} ${colorClasses[props.trend]}`
})

const changeTextClasses = computed(() => {
  const baseClass = 'text-sm font-medium'
  const colorClasses = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: getTextClass('muted')
  }
  
  return `${baseClass} ${colorClasses[props.trend]}`
})

const periodClasses = computed(() => [
  getTextClass('muted'),
  'text-xs'
].join(' '))

const iconContainerClasses = computed(() => {
  const baseClass = 'flex items-center justify-center w-12 h-12 rounded-lg'
  const colorClasses = {
    sport: 'bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 text-light-accent-sport dark:text-dark-accent-sport',
    danger: 'bg-light-accent-danger/10 dark:bg-dark-accent-danger/10 text-light-accent-danger dark:text-dark-accent-danger',
    warning: 'bg-light-accent-warning/10 dark:bg-dark-accent-warning/10 text-light-accent-warning dark:text-dark-accent-warning',
    info: 'bg-light-accent-info/10 dark:bg-dark-accent-info/10 text-light-accent-info dark:text-dark-accent-info',
    success: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
  }
  
  return `${baseClass} ${colorClasses[props.color]}`
})

const progressLabelClasses = computed(() => [
  getTextClass('secondary'),
  'text-xs'
].join(' '))

const progressValueClasses = computed(() => [
  getTextClass('primary'),
  'text-xs font-medium'
].join(' '))

const progressBarClasses = computed(() => {
  const colorClasses = {
    sport: 'bg-light-accent-sport dark:bg-dark-accent-sport',
    danger: 'bg-light-accent-danger dark:bg-dark-accent-danger',
    warning: 'bg-light-accent-warning dark:bg-dark-accent-warning',
    info: 'bg-light-accent-info dark:bg-dark-accent-info',
    success: 'bg-green-500'
  }
  
  return `h-2 rounded-full transition-all duration-300 ${colorClasses[props.color]}`
})

const trendIcon = computed(() => {
  const icons = {
    up: TrendingUpOutline,
    down: TrendingDownOutline,
    neutral: RemoveOutline
  }
  
  return icons[props.trend]
})
</script>

<style scoped>
.stat-card {
  @apply transition-all duration-200;
}

.stat-card:hover {
  @apply transform -translate-y-1;
}
</style>
