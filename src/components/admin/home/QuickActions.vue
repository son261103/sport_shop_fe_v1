<template>
  <div class="bg-white dark:bg-dark-bg-secondary rounded-xl p-6 border border-light-border-primary dark:border-dark-border-primary">
    <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
      {{ title }}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button 
        v-for="action in actions" 
        :key="action.title"
        class="flex items-center p-4 rounded-lg border border-light-border-primary dark:border-dark-border-primary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-primary transition-colors"
        @click="$emit('action-click', action)"
      >
        <component :is="getIconComponent(action.icon)" class="w-5 h-5 text-light-accent-sport dark:text-dark-accent-sport mr-3" />
        <div class="text-left">
          <p class="font-medium text-light-text-primary dark:text-dark-text-primary">
            {{ action.title }}
          </p>
          <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {{ action.description }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

interface Action {
  title: string
  description: string
  icon: string
}

interface Props {
  title?: string
  actions: Action[]
}

withDefaults(defineProps<Props>(), {
  title: 'Quick Actions'
})

defineEmits<{
  'action-click': [action: Action]
}>()

// Icon components using h() function
const AddIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
  })
])

const DocumentIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  })
])

const SettingsIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-5 h-5'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  }),
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  })
])

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    AddIcon,
    DocumentIcon,
    SettingsIcon
  }
  return iconMap[iconName] || AddIcon
}
</script>