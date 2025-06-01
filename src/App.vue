<script setup lang="ts">
import { onMounted } from 'vue'
import { ThemeProvider } from './providers'

import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
  themeStore.setupSystemThemeListener()
})
</script>

<template>
  <ThemeProvider>
    <router-view />
  </ThemeProvider>
</template>
