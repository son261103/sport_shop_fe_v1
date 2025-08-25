<template>
  <div class="group w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800">
    <router-link :to="`/products/${product.id}`" class="block">
      <div class="relative overflow-hidden">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div class="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
          <svg class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
      <div class="p-4">
        <h3 class="truncate text-sm font-bold text-gray-800 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400" :title="product.name">
          {{ product.name }}
        </h3>
        <div class="mt-2 flex items-center justify-between">
          <p class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ product.formatted_price }}</p>
          <div class="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-blue-900/30 dark:text-blue-400">
            Xem chi tiết
          </div>
        </div>
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
