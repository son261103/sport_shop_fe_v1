<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-container" @click.stop>
          <!-- Header -->
          <div v-if="$slots.header || title" class="modal-header">
            <slot name="header">
              <div class="flex items-center justify-between">
                <h3 v-if="title" :class="titleClasses">{{ title }}</h3>
                <button
                  v-if="closable"
                  type="button"
                  :class="closeButtonClasses"
                  @click="handleClose"
                >
                  <n-icon>
                    <CloseOutline />
                  </n-icon>
                </button>
              </div>
            </slot>
          </div>

          <!-- Body -->
          <div :class="bodyClasses">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { NIcon } from 'naive-ui'
import { CloseOutline } from '@vicons/ionicons5'
import { useThemeClasses } from '@/composables/useTheme'

interface Props {
  show: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  maskClosable?: boolean
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  maskClosable: true,
  persistent: false
})

const emit = defineEmits<{
  'update:show': [value: boolean]
  close: []
}>()

const { getBgClass, getTextClass, getBorderClass } = useThemeClasses()

const titleClasses = computed(() => [
  getTextClass('primary'),
  'text-xl font-semibold'
].join(' '))

const closeButtonClasses = computed(() => [
  getTextClass('muted'),
  'hover:text-light-text-primary dark:hover:text-dark-text-primary',
  'p-1 rounded-md transition-colors duration-200',
  'hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary'
].join(' '))

const bodyClasses = computed(() => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
    full: 'p-6'
  }

  return [
    getTextClass('primary'),
    sizeClasses[props.size]
  ].join(' ')
})

const handleClose = () => {
  if (!props.persistent) {
    emit('update:show', false)
    emit('close')
  }
}

const handleOverlayClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.show && props.closable) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  if (props.show) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center p-4;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-container {
  @apply bg-light-bg-primary dark:bg-dark-bg-primary rounded-xl shadow-2xl;
  @apply border border-light-border-secondary dark:border-dark-border-secondary;
  @apply max-h-[90vh] overflow-y-auto;
  width: 100%;
  max-width: v-bind(modalWidth);
}

.modal-header {
  @apply p-6 border-b border-light-border-secondary dark:border-dark-border-secondary;
}

.modal-footer {
  @apply p-6 border-t border-light-border-secondary dark:border-dark-border-secondary;
}

/* Transition styles */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>

<script lang="ts">
export default {
  computed: {
    modalWidth() {
      const sizeMap = {
        sm: '28rem',
        md: '32rem',
        lg: '48rem',
        xl: '64rem',
        full: '95vw'
      }
      return sizeMap[this.size as keyof typeof sizeMap]
    }
  }
}
</script>
