<template>
  <div class="space-y-6">
    <div>
      <h3 :class="titleClasses">{{ title }}</h3>
      <p v-if="description" :class="descriptionClasses">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeClasses } from '@/composables/useTheme'

interface Props {
  title: string
  description?: string
}

defineProps<Props>()

const { getTextClass } = useThemeClasses()

const titleClasses = computed(() => [
  getTextClass('primary'),
  'text-2xl font-bold mb-2'
].join(' '))

const descriptionClasses = computed(() => [
  getTextClass('secondary'),
  'text-sm mb-6'
].join(' '))
</script>
