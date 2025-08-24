<template>
  <svg
    :width="size"
    :height="size"
    :class="className"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <component :is="iconPath" />
  </svg>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'

interface Props {
  name: string
  size?: number | string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  className: ''
})

const iconPath = computed(() => {
  const icons: Record<string, () => any> = {
    search: () => [
      h('circle', { cx: '11', cy: '11', r: '8' }),
      h('path', { d: 'm21 21-4.35-4.35' })
    ],
    x: () => [
      h('path', { d: 'M18 6 6 18' }),
      h('path', { d: 'm6 6 12 12' })
    ],
    'alert-circle': () => [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
      h('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' })
    ],
    'alert-triangle': () => [
      h('path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' }),
      h('path', { d: 'M12 9v4' }),
      h('path', { d: 'm12 17 .01 0' })
    ],
    eye: () => [
      h('path', { d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' }),
      h('circle', { cx: '12', cy: '12', r: '3' })
    ],
    'trash-2': () => [
      h('path', { d: 'm3 6 3 0' }),
      h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
      h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
      h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
      h('line', { x1: '14', y1: '11', x2: '14', y2: '17' })
    ],
    'shopping-cart': () => [
      h('circle', { cx: '8', cy: '21', r: '1' }),
      h('circle', { cx: '19', cy: '21', r: '1' }),
      h('path', { d: 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' })
    ],
    package: () => [
      h('line', { x1: '16.5', y1: '9.4', x2: '7.5', y2: '4.21' }),
      h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }),
      h('polyline', { points: '3.27,6.96 12,12.01 20.73,6.96' }),
      h('line', { x1: '12', y1: '22.08', x2: '12', y2: '12' })
    ],
    users: () => [
      h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '9', cy: '7', r: '4' }),
      h('path', { d: 'm22 21-3.3-3.3a4.8 4.8 0 0 0-1.4-1.4L22 21' }),
      h('circle', { cx: '16', cy: '8', r: '3' })
    ],
    'bar-chart': () => [
      h('line', { x1: '12', y1: '20', x2: '12', y2: '10' }),
      h('line', { x1: '18', y1: '20', x2: '18', y2: '4' }),
      h('line', { x1: '6', y1: '20', x2: '6', y2: '16' })
    ],
    settings: () => [
      h('circle', { cx: '12', cy: '12', r: '3' }),
      h('path', { d: 'm12 1 1.09 3.26L16 5l-1.74 2.74L17 9l-3.26 1.09L12 13l-1.74-2.91L7 9l1.74-2.26L7 5l3.26-.74L12 1Z' })
    ],
    home: () => [
      h('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      h('polyline', { points: '9,22 9,12 15,12 15,22' })
    ],
    'file-text': () => [
      h('path', { d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' }),
      h('path', { d: 'M14 2v4a2 2 0 0 0 2 2h4' }),
      h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
      h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
      h('line', { x1: '10', y1: '9', x2: '8', y2: '9' })
    ],
    tag: () => [
      h('path', { d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42L12.586 2.586Z' }),
      h('circle', { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor' })
    ],
    store: () => [
      h('path', { d: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7' }),
      h('path', { d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' }),
      h('path', { d: 'M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4' }),
      h('path', { d: 'M2 7h20' }),
      h('path', { d: 'M22 7v3a2 2 0 0 1-2 2v0a2.18 2.18 0 0 1-2-2v0a2.18 2.18 0 0 0-2-2v0a2.18 2.18 0 0 0-2 2v0a2.18 2.18 0 0 1-2 2v0a2.18 2.18 0 0 1-2-2v0a2.18 2.18 0 0 0-2-2v0a2.18 2.18 0 0 0-2 2v0a2.18 2.18 0 0 1-2 2v0a2 2 0 0 1-2-2V7' })
    ]
  }

  const iconName = props.name.toLowerCase()
  return icons[iconName] || (() => [h('circle', { cx: '12', cy: '12', r: '10' })])
})
</script>