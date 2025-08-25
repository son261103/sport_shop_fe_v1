<template>
  <div class="flex h-screen w-64 flex-col bg-light-bg-secondary p-4 dark:bg-dark-bg-secondary">
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="rounded-lg bg-gradient-sport p-2 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.75 12.002c0 5.01-3.978 9.07-8.89 9.07-1.833 0-3.53-.563-4.995-1.545l-4.15 1.472 1.47-4.152c-.98-1.467-1.543-3.164-1.543-4.995C3.642 6.93 7.62 2.86 12.53 2.86c4.912 0 8.89 4.07 8.89 9.072h.33zM7.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
        </div>
        <h1 class="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">Sport Shop AI</h1>
      </div>
    </div>

    <nav class="flex-1 space-y-2">
      <a href="#" class="flex items-center gap-3 rounded-lg bg-light-bg-tertiary px-3 py-2 text-sm font-medium text-light-text-primary dark:bg-dark-bg-tertiary dark:text-dark-text-primary">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.95-1.95A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        <span>Trò chuyện</span>
      </a>
      <a @click="goHome" href="#" class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-light-text-secondary hover:bg-light-bg-tertiary dark:text-dark-text-secondary dark:hover:bg-dark-bg-tertiary">
         <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-7-4h4m-4 4h4" /></svg>
        <span>Về trang chủ</span>
      </a>
    </nav>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>
