<template>
  <nav class="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
    <router-link 
      to="/admin" 
      class="hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
    >
      Admin
    </router-link>
    
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <svg class="w-3.5 h-3.5 text-light-text-tertiary dark:text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      
      <router-link 
        v-if="crumb.path && index < breadcrumbs.length - 1"
        :to="crumb.path"
        class="hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
      >
        {{ crumb.label }}
      </router-link>
      
      <span 
        v-else
        class="text-light-text-primary dark:text-dark-text-primary font-medium"
      >
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPath: string
}

const props = defineProps<Props>()

const breadcrumbs = computed(() => {
  const path = props.currentPath
  const segments = path.split('/').filter(Boolean)
  
  const crumbs = []
  let currentPath = ''
  
  for (let i = 1; i < segments.length; i++) {
    currentPath += '/' + segments[i]
    const label = segments[i].charAt(0).toUpperCase() + segments[i].slice(1)
    
    crumbs.push({
      label,
      path: currentPath
    })
  }
  
  return crumbs
})
</script>