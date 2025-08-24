<template>
  <div class="w-full overflow-hidden rounded-lg border border-light-border-secondary bg-light-bg-secondary shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-dark-border-secondary dark:bg-dark-bg-secondary">
    <router-link :to="`/products/${product.id}`" class="block">
      <img :src="product.image_url" :alt="product.name" class="h-48 w-full object-cover" />
      <div class="p-4">
        <h3 class="truncate text-base font-bold text-light-text-primary dark:text-dark-text-primary" :title="product.name">
          {{ product.name }}
        </h3>
        <p class="mt-2 text-lg font-semibold text-primary-500">{{ product.formatted_price }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

interface Product {
  id: number;
  name: string;
  formatted_price: string;
  image_url: string;
}

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>
