<template>
  <button
    @click="goToChat"
    class="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-sport text-white shadow-sport-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-sport-xl dark:bg-gradient-sport-dark"
    aria-label="Open AI Chat"
  >
    <!-- Modern Chat Icon -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.75 12.002c0 5.01-3.978 9.07-8.89 9.07-1.833 0-3.53-.563-4.995-1.545l-4.15 1.472 1.47-4.152c-.98-1.467-1.543-3.164-1.543-4.995C3.642 6.93 7.62 2.86 12.53 2.86c4.912 0 8.89 4.07 8.89 9.072h.33zM7.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToChat = () => {
  router.push('/chat');
};
</script>

<style scoped>
/* Add any additional scoped styles here */
</style>
