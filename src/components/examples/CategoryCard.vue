<template>
  <div 
    class="group relative overflow-hidden rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary hover:border-sport-primary dark:hover:border-sport-accent transition-all duration-300 cursor-pointer"
    @click="handleClick"
  >
    <!-- Background Image -->
    <div class="aspect-[4/3] overflow-hidden">
      <img
        :src="category.image"
        :alt="category.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
    </div>

    <!-- Content Overlay -->
    <div class="absolute inset-0 flex flex-col justify-end p-6">
      <div class="text-white">
        <h3 class="text-xl font-bold mb-2 group-hover:text-sport-accent transition-colors">
          {{ category.name }}
        </h3>
        <p class="text-sm opacity-90 mb-3">
          {{ category.description }}
        </p>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">
            {{ category.productCount }} products
          </span>
          <div class="flex items-center space-x-1 text-sport-accent">
            <span class="text-sm font-medium">Shop Now</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Badge -->
    <div v-if="category.isNew" class="absolute top-4 left-4">
      <span class="bg-sport-primary text-white text-xs font-bold px-2 py-1 rounded-full">
        NEW
      </span>
    </div>

    <!-- Sale Badge -->
    <div v-if="category.salePercentage" class="absolute top-4 right-4">
      <span class="bg-sport-danger text-white text-xs font-bold px-2 py-1 rounded-full">
        -{{ category.salePercentage }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  isNew?: boolean
  salePercentage?: number
}

interface Props {
  category: Category
}

interface Emits {
  (e: 'click', category: Category): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click', props.category)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  // Use a solid color background with the category name as fallback
  target.src = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#00C897"/>
      <text x="200" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">
        ${props.category.name}
      </text>
    </svg>
  `)}`
}
</script>
