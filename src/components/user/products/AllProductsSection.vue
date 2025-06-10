<template>
  <section id="all-products" class="mb-20">
    <!-- Section Banner -->
    <div class="w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
      <div class="relative h-32">
        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
             alt="All Products" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/80"></div>
        <div class="absolute top-4 left-4 z-10">
          <h2 class="text-3xl font-bold text-white">
            Tất cả sản phẩm
          </h2>
        </div>
      </div>
    </div>
    
    <!-- Product Grid -->
    <div class="flex justify-center px-8">
      <div class="w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          <div
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            :data-aos="'fade-up'"
            :data-aos-delay="100 + index * 100"
            class="flex justify-center"
          >
            <div class="w-full min-w-[260px] max-w-[280px] mx-2 transform transition-all duration-300 hover:scale-105">
              <ProductCard
                :product="product"
                @click="$emit('product-click', product)"
                @add-to-cart="$emit('add-to-cart', product)"
                @toggle-favorite="$emit('toggle-favorite', product)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="flex justify-center mt-8">
      <div class="flex items-center space-x-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          ←
        </button>
        
        <span class="px-4 py-2 text-gray-700 dark:text-gray-300">
          {{ currentPage }} / {{ totalPages }}
        </span>
        
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ProductCard } from "@/components/examples";
import type { Product } from "@/components/examples";

// Props
interface Props {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
}

const props = defineProps<Props>();

// Emits
interface Emits {
  'product-click': [product: Product];
  'add-to-cart': [product: Product];
  'toggle-favorite': [product: Product];
  'update:currentPage': [page: number];
}

const emit = defineEmits<Emits>();

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.products.length / props.itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (props.currentPage - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return props.products.slice(start, end);
});

// Methods
const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1);
  }
};

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};
</script>