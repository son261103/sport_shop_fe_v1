<template>
  <div class="space-y-2">
    <!-- Label -->
    <label v-if="label" :for="inputId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-light-accent-danger dark:text-dark-accent-danger ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Prefix Icon -->
      <div v-if="prefixIcon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <n-icon :class="iconClasses">
          <component :is="prefixIcon" />
        </n-icon>
      </div>

      <!-- Input Element -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />

      <!-- Suffix Icon -->
      <div v-if="suffixIcon || clearable" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          v-if="clearable && modelValue"
          type="button"
          class="text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary"
          @click="handleClear"
        >
          <n-icon>
            <CloseOutline />
          </n-icon>
        </button>
        <n-icon v-else-if="suffixIcon" :class="iconClasses">
          <component :is="suffixIcon" />
        </n-icon>
      </div>
    </div>

    <!-- Helper Text -->
    <p v-if="helperText" :class="helperClasses">
      {{ helperText }}
    </p>

    <!-- Error Message -->
    <p v-if="error" class="text-sm text-light-accent-danger dark:text-dark-accent-danger">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { CloseOutline } from '@vicons/ionicons5'
import { useThemeClasses } from '@/composables/useTheme'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  prefixIcon?: any
  suffixIcon?: any
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  clear: []
}>()

const { getTextClass, getBgClass, getBorderClass } = useThemeClasses()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const labelClasses = computed(() => [
  getTextClass('primary'),
  'block text-sm font-medium'
].join(' '))

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full transition-all duration-200',
    getBgClass('primary'),
    getTextClass('primary'),
    'placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted',
    'focus:outline-none focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:border-transparent'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-3 py-2 text-sm rounded-lg',
    lg: 'px-4 py-3 text-base rounded-lg'
  }

  // State classes
  const stateClasses = []
  
  if (props.error) {
    stateClasses.push('border-light-accent-danger dark:border-dark-accent-danger')
  } else if (isFocused.value) {
    stateClasses.push('border-light-accent-sport dark:border-dark-accent-sport')
  } else {
    stateClasses.push(`border ${getBorderClass('primary')}`)
  }

  if (props.disabled) {
    stateClasses.push('opacity-50 cursor-not-allowed')
  }

  // Padding adjustments for icons
  const paddingClasses = []
  if (props.prefixIcon) {
    paddingClasses.push('pl-10')
  }
  if (props.suffixIcon || props.clearable) {
    paddingClasses.push('pr-10')
  }

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...stateClasses,
    ...paddingClasses
  ].join(' ')
})

const iconClasses = computed(() => [
  getTextClass('muted'),
  'w-5 h-5'
].join(' '))

const helperClasses = computed(() => [
  getTextClass('muted'),
  'text-sm'
].join(' '))

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
