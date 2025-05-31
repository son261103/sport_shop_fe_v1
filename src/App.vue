<script setup lang="ts">
import { onMounted } from 'vue'
import { ThemeProvider } from './providers'
import { DefaultLayout } from './layouts'

import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
  themeStore.setupSystemThemeListener()
})
</script>

<template>
  <ThemeProvider>
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </ThemeProvider>
</template>
