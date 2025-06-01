<template>
  <div class="bg-gradient-sport rounded-xl p-6 text-white">
    <h1 class="text-3xl font-bold mb-2">{{ title }}</h1>
    <p class="text-white/90">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Welcome back, Admin!',
  subtitle: "Here's what's happening with your store today."
})
</script>