<template>
  <section class="mb-20">
    <!-- Section Banner -->
    <div class="w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
      <div class="relative h-32">
        <img :src="bannerImage" 
             :alt="title" class="w-full h-full object-cover">
        <div class="absolute inset-0" :class="gradientClass"></div>
        <div class="absolute top-4 left-4 z-10">
          <h2 class="text-3xl font-bold text-white">
            {{ title }}
          </h2>
        </div>
        <div v-if="showNextButton" class="absolute top-4 right-4 z-10">
          <button @click="$emit('next-clicked')" class="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition-all duration-300">
            →
          </button>
        </div>
      </div>
    </div>
    
    <!-- Product Grid -->
    <div class="flex justify-center px-8">
      <div class="w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          <div
            v-for="(product, index) in products"
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
  </section>
</template>

<script setup lang="ts">
import { ProductCard } from "@/components/examples";
import type { Product } from "@/components/examples";

// Props
interface Props {
  title: string;
  bannerImage: string;
  gradientClass: string;
  products: Product[];
  showNextButton?: boolean;
}

defineProps<Props>();

// Emits
interface Emits {
  'product-click': [product: Product];
  'add-to-cart': [product: Product];
  'toggle-favorite': [product: Product];
  'next-clicked': [];
}

defineEmits<Emits>();
</script>