<template>
  <div :class="cardClasses">
    <!-- Header -->
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <div class="flex items-center justify-between">
          <h3 v-if="title" :class="titleClasses">{{ title }}</h3>
          <div v-if="$slots.actions" class="flex items-center space-x-2">
            <slot name="actions" />
          </div>
        </div>
      </slot>
    </div>

    <!-- Body -->
    <div :class="bodyClasses">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeClasses } from '@/composables/useTheme'

interface Props {
  title?: string
  variant?: 'default' | 'bordered' | 'shadow' | 'elevated'
  size?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  hoverable: false,
  loading: false
})

const { getBgClass, getTextClass, getBorderClass } = useThemeClasses()

const cardClasses = computed(() => {
  const baseClasses = [
    getBgClass('secondary'),
    'rounded-xl overflow-hidden transition-all duration-200'
  ]

  // Variant classes
  const variantClasses = {
    default: '',
    bordered: `border ${getBorderClass('secondary')}`,
    shadow: 'shadow-md',
    elevated: 'shadow-lg hover:shadow-xl'
  }

  // Size classes
  const sizeClasses = {
    sm: '',
    md: '',
    lg: ''
  }

  const classes = [
    ...baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size]
  ]

  if (props.hoverable) {
    classes.push('hover:shadow-lg transform hover:-translate-y-1 cursor-pointer')
  }

  if (props.loading) {
    classes.push('animate-pulse')
  }

  return classes.join(' ')
})

const titleClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return [
    getTextClass('primary'),
    'font-semibold',
    sizeClasses[props.size]
  ].join(' ')
})

const bodyClasses = computed(() => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return sizeClasses[props.size]
})
</script>

<style scoped>
.card-header {
  @apply p-6 border-b border-light-border-secondary dark:border-dark-border-secondary;
}

.card-footer {
  @apply p-6 border-t border-light-border-secondary dark:border-dark-border-secondary;
}
</style>
