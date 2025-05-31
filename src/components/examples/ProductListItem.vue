<template>
  <Card
    variant="bordered"
    :hoverable="true"
    class="product-list-item cursor-pointer"
    @click="handleClick"
  >
    <div class="flex items-center space-x-4 p-4">
      <!-- Product Image -->
      <div class="flex-shrink-0">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- Category Badge -->
            <Badge :variant="getCategoryVariant(product.category)" size="xs" class="mb-1">
              {{ product.category }}
            </Badge>

            <!-- Product Name -->
            <h3 :class="nameClasses">{{ product.name }}</h3>

            <!-- Brand -->
            <p :class="brandClasses">{{ product.brand }}</p>

            <!-- Rating -->
            <div class="flex items-center space-x-2 mt-1">
              <n-rate
                :value="product.rating"
                readonly
                size="small"
                color="#00C897"
              />
              <span :class="reviewsClasses">({{ product.reviews }} reviews)</span>
            </div>
          </div>

          <!-- Price Section -->
          <div class="text-right ml-4">
            <div class="flex items-center space-x-2">
              <span :class="priceClasses">${{ product.price }}</span>
              <span
                v-if="product.originalPrice && product.originalPrice > product.price"
                :class="originalPriceClasses"
              >
                ${{ product.originalPrice }}
              </span>
            </div>
            
            <!-- Discount Badge -->
            <Badge
              v-if="product.originalPrice && product.originalPrice > product.price"
              variant="primary"
              size="xs"
              class="mt-1"
            >
              {{ discountPercentage }}% OFF
            </Badge>
          </div>
        </div>

        <!-- Description -->
        <p :class="descriptionClasses" class="mt-2">
          {{ product.description }}
        </p>

        <!-- Actions -->
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center space-x-2">
            <!-- Stock Status -->
            <Badge
              :variant="product.inStock ? 'success' : 'danger'"
              size="sm"
            >
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </Badge>
          </div>

          <div class="flex items-center space-x-2">
            <!-- Favorite Button -->
            <button
              :class="favoriteButtonClasses"
              @click.stop="handleToggleFavorite"
            >
              <n-icon>
                <component :is="product.isFavorite ? Heart : HeartOutline" />
              </n-icon>
            </button>

            <!-- Quick Actions -->
            <button
              :class="actionButtonClasses"
              @click.stop="handleShare"
            >
              <n-icon>
                <ShareSocialOutline />
              </n-icon>
            </button>

            <button
              :class="actionButtonClasses"
              @click.stop="handleCompare"
            >
              <n-icon>
                <GitCompareOutline />
              </n-icon>
            </button>

            <!-- Add to Cart Button -->
            <Button
              variant="primary"
              size="sm"
              :disabled="!product.inStock"
              @click.stop="handleAddToCart"
            >
              <n-icon class="mr-1">
                <CartOutline />
              </n-icon>
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon, NRate } from 'naive-ui'
import {
  CartOutline,
  Heart,
  HeartOutline,
  ShareSocialOutline,
  GitCompareOutline
} from '@vicons/ionicons5'
import { Card, Button, Badge } from '@/components/ui'
import { useThemeClasses } from '@/composables/useTheme'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isFavorite: boolean
  description: string
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [product: Product]
  addToCart: [product: Product]
  toggleFavorite: [product: Product]
  share: [product: Product]
  compare: [product: Product]
}>()

const { getTextClass } = useThemeClasses()

// Computed
const nameClasses = computed(() => [
  getTextClass('primary'),
  'font-semibold text-lg'
].join(' '))

const brandClasses = computed(() => [
  getTextClass('secondary'),
  'text-sm'
].join(' '))

const priceClasses = computed(() => [
  'text-light-accent-sport dark:text-dark-accent-sport',
  'font-bold text-xl'
].join(' '))

const originalPriceClasses = computed(() => [
  getTextClass('muted'),
  'text-sm line-through'
].join(' '))

const reviewsClasses = computed(() => [
  getTextClass('muted'),
  'text-xs'
].join(' '))

const descriptionClasses = computed(() => [
  getTextClass('secondary'),
  'text-sm line-clamp-2'
].join(' '))

const favoriteButtonClasses = computed(() => {
  const baseClass = 'p-2 rounded-md transition-all duration-200'
  const favoriteClass = props.product.isFavorite
    ? 'text-light-accent-danger dark:text-dark-accent-danger bg-light-accent-danger/10 dark:bg-dark-accent-danger/10'
    : 'text-light-text-muted dark:text-dark-text-muted hover:text-light-accent-danger dark:hover:text-dark-accent-danger hover:bg-light-accent-danger/10 dark:hover:bg-dark-accent-danger/10'
  
  return `${baseClass} ${favoriteClass}`
})

const actionButtonClasses = computed(() => [
  getTextClass('muted'),
  'p-2 rounded-md transition-colors duration-200',
  'hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary',
  'hover:text-light-text-primary dark:hover:text-dark-text-primary'
].join(' '))

const discountPercentage = computed(() => {
  if (!props.product.originalPrice) return 0
  return Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100)
})

// Methods
const getCategoryVariant = (category: string) => {
  const variants: Record<string, any> = {
    'Football': 'success',
    'Basketball': 'warning',
    'Tennis': 'info',
    'Running': 'primary',
    'Gym': 'secondary'
  }
  return variants[category] || 'secondary'
}

const handleClick = () => {
  emit('click', props.product)
}

const handleAddToCart = () => {
  emit('addToCart', props.product)
}

const handleToggleFavorite = () => {
  emit('toggleFavorite', props.product)
}

const handleShare = () => {
  emit('share', props.product)
}

const handleCompare = () => {
  emit('compare', props.product)
}
</script>
