<template>
  <span :class="badgeClasses">
    <n-icon v-if="icon" class="mr-1">
      <component :is="icon" />
    </n-icon>
    <slot />
    <button
      v-if="closable"
      type="button"
      class="ml-1 hover:opacity-70 transition-opacity"
      @click="handleClose"
    >
      <n-icon class="w-3 h-3">
        <CloseOutline />
      </n-icon>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { CloseOutline } from '@vicons/ionicons5'

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  rounded?: boolean
  closable?: boolean
  icon?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  rounded: false,
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const badgeClasses = computed(() => {
  const baseClasses = [
    'inline-flex items-center font-medium transition-all duration-200'
  ]

  // Size classes
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  }

  // Variant classes
  const variantClasses = {
    primary: 'bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 text-light-accent-sport dark:text-dark-accent-sport',
    secondary: 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-secondary dark:text-dark-text-secondary border border-light-border-primary dark:border-dark-border-primary',
    success: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
    warning: 'bg-light-accent-warning/10 dark:bg-dark-accent-warning/10 text-light-accent-warning dark:text-dark-accent-warning',
    danger: 'bg-light-accent-danger/10 dark:bg-dark-accent-danger/10 text-light-accent-danger dark:text-dark-accent-danger',
    info: 'bg-light-accent-info/10 dark:bg-dark-accent-info/10 text-light-accent-info dark:text-dark-accent-info'
  }

  // Border radius
  const radiusClasses = props.rounded ? 'rounded-full' : 'rounded-md'

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    radiusClasses
  ].join(' ')
})

const handleClose = () => {
  emit('close')
}
</script>
