<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();

onMounted(async () => {
  // Initialize cart if user is authenticated
  if (authStore.isAuthenticated) {
    try {
      await cartStore.initializeCart();
    } catch (error) {
      console.error('Failed to initialize cart:', error);
      // Don't throw error, just log it
    }
  } else {
    console.log('User not authenticated, skipping cart initialization');
  }
});
</script>
