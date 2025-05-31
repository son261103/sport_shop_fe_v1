<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <n-icon v-if="loading" class="animate-spin mr-2">
      <RefreshOutline />
    </n-icon>
    <n-icon v-else-if="icon && iconPosition === 'left'" class="mr-2">
      <component :is="icon" />
    </n-icon>
    
    <slot />
    
    <n-icon v-if="icon && iconPosition === 'right'" class="ml-2">
      <component :is="icon" />
    </n-icon>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { RefreshOutline } from '@vicons/ionicons5'
import { useThemeClasses } from '@/composables/useTheme'

interface Props {
  variant?: 'primary' | 'primary-animated' | 'secondary' | 'danger' | 'warning' | 'info' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  icon?: any
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  rounded?: boolean
  gradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  iconPosition: 'left',
  fullWidth: false,
  rounded: false,
  gradient: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { getTextClass, getBgClass } = useThemeClasses()

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-opacity-50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transform hover:scale-105 active:scale-95'
  ]

  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl'
  }

  // Variant classes with gradient support
  const variantClasses = {
    primary: props.gradient
      ? 'bg-gradient-sport dark:bg-gradient-sport-dark text-white hover:bg-gradient-sport-hover dark:hover:bg-gradient-sport-dark-hover focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport shadow-sport hover:shadow-sport-lg'
      : 'bg-light-accent-sport dark:bg-dark-accent-sport text-white hover:opacity-90 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport shadow-sport hover:shadow-sport-lg',
    'primary-animated': 'bg-gradient-sport-animated dark:bg-gradient-sport-animated-dark text-white animate-gradient-x focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport shadow-sport hover:shadow-sport-lg',
    secondary: `${getBgClass('secondary')} ${getTextClass('primary')} border border-light-border-primary dark:border-dark-border-primary hover:bg-light-border-primary dark:hover:bg-dark-border-primary`,
    danger: 'bg-gradient-danger dark:bg-gradient-danger-dark text-white hover:opacity-90 focus:ring-light-accent-danger dark:focus:ring-dark-accent-danger shadow-danger',
    warning: 'bg-light-accent-warning dark:bg-dark-accent-warning text-white hover:opacity-90 focus:ring-light-accent-warning dark:focus:ring-dark-accent-warning',
    info: 'bg-light-accent-info dark:bg-dark-accent-info text-white hover:opacity-90 focus:ring-light-accent-info dark:focus:ring-dark-accent-info',
    ghost: `bg-transparent ${getTextClass('primary')} hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary`,
    outline: `bg-transparent ${getTextClass('primary')} border border-light-border-primary dark:border-dark-border-primary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary`
  }

  const classes = [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ]

  if (props.fullWidth) {
    classes.push('w-full')
  }

  if (props.rounded) {
    classes.push('rounded-full')
  }

  // Add animated gradient background size for animated variants
  if (props.variant === 'primary-animated') {
    classes.push('bg-[length:200%_200%]')
  }

  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
