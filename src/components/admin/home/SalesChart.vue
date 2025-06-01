<template>
  <div class="bg-white dark:bg-dark-bg-secondary rounded-xl p-6 border border-light-border-primary dark:border-dark-border-primary">
    <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
      {{ title }}
    </h3>
    <div class="h-64 flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary">
      <!-- Placeholder for chart -->
      <div class="text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-light-text-tertiary dark:text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <p>{{ placeholder }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Sales Overview',
  placeholder: 'Sales Chart Placeholder'
})
</script>