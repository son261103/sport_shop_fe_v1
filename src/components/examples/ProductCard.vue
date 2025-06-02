<template>
  <div
    class="product-card group cursor-pointer overflow-hidden bg-light-bg-primary dark:bg-dark-bg-primary border border-light-border-secondary dark:border-dark-border-secondary rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    @click="handleClick"
  >
    <!-- Product Image - Full width, no padding -->
    <div class="relative h-48 w-full overflow-hidden">
      <img
        :src="product.image || '/placeholder.svg'"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
      />

      <!-- Overlay gradient for better text readability -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <!-- Sale Badge -->
      <div
        v-if="product.originalPrice && product.originalPrice > product.price"
        class="absolute top-3 right-3 bg-light-accent-danger dark:bg-dark-accent-danger text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg"
      >
        SALE
      </div>

      <!-- Quick Actions - Show on hover -->
      <div
        class="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0"
      >
        <button
          class="w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors duration-200 overflow-hidden"
          @click.stop="handleToggleFavorite"
        >
          <n-icon
            class="w-4 h-4 text-light-accent-danger dark:text-dark-accent-danger"
          >
            <Heart v-if="product.isFavorite === true" />
            <HeartOutline v-else />
          </n-icon>
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Category Badge -->
      <div class="mb-2">
        <span :class="categoryBadgeClasses">{{ product.category }}</span>
      </div>

      <!-- Product Name -->
      <h3 :class="nameClasses">{{ product.name }}</h3>

      <!-- Rating -->
      <div class="flex items-center gap-1 mt-2">
        <div class="flex items-center">
          <n-icon class="w-4 h-4 fill-current text-yellow-400">
            <Star />
          </n-icon>
          <span :class="ratingClasses">{{ product.rating }}</span>
        </div>
        <span :class="reviewsClasses"
          >({{ product.reviews || 0 }} đánh giá)</span
        >
      </div>

      <!-- Price -->
      <div class="mt-3">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 flex-1">
            <span
              v-if="
                product.originalPrice && product.originalPrice > product.price
              "
              :class="originalPriceClasses"
            >
              {{ formatPrice(product.originalPrice) }}
            </span>
            <span :class="priceClasses">{{ formatPrice(product.price) }}</span>
          </div>
          <span
            v-if="
              product.originalPrice && product.originalPrice > product.price
            "
            class="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"
          >
            -{{ discountPercentage }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-4 pt-0">
      <Button
        :variant="product.inStock ? 'primary' : 'secondary'"
        class="w-full font-medium"
        :disabled="!product.inStock"
        @click.stop="handleAddToCart"
      >
        <n-icon class="w-4 h-4 mr-2">
          <CartOutline />
        </n-icon>
        {{ product.inStock ? "Thêm vào giỏ" : "Hết hàng" }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NIcon } from "naive-ui";
import { Star, Heart, HeartOutline, CartOutline } from "@vicons/ionicons5";
import { Button } from "@/components/ui";
import { useThemeClasses } from "@/composables/useTheme";
import type { Product } from "./index";

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [product: Product];
  addToCart: [product: Product];
  toggleFavorite: [product: Product];
}>();

const { getTextClass } = useThemeClasses();

// Computed
const categoryBadgeClasses = computed(() =>
  [
    "inline-block px-2 py-1 text-xs font-medium rounded-md",
    "bg-light-accent-sport/10 dark:bg-dark-accent-sport/10",
    "text-light-accent-sport dark:text-dark-accent-sport",
  ].join(" ")
);

const nameClasses = computed(() =>
  [
    getTextClass("primary"),
    "font-semibold text-lg leading-tight line-clamp-2",
  ].join(" ")
);

const ratingClasses = computed(() =>
  [getTextClass("primary"), "ml-1 text-sm font-medium"].join(" ")
);

const reviewsClasses = computed(() =>
  [getTextClass("muted"), "text-xs"].join(" ")
);

const priceClasses = computed(() =>
  [
    "text-light-accent-sport dark:text-dark-accent-sport",
    "font-bold text-xl",
  ].join(" ")
);

const originalPriceClasses = computed(() =>
  [getTextClass("muted"), "text-sm line-through"].join(" ")
);

const discountPercentage = computed(() => {
  if (!props.product.originalPrice) return 0;
  return Math.round(
    ((props.product.originalPrice - props.product.price) /
      props.product.originalPrice) *
      100
  );
});

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price * 1000); // Assuming price is in thousands
};

const handleClick = () => {
  emit("click", props.product);
};

const handleAddToCart = () => {
  emit("addToCart", props.product);
};

const handleToggleFavorite = () => {
  emit("toggleFavorite", props.product);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  // Use a solid color background with the first letter as fallback
  target.src = `data:image/svg+xml;base64,${btoa(`
    <svg width="300" height="192" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="192" fill="#00C897"/>
      <text x="150" y="110" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">
        ${props.product.name.charAt(0)}
      </text>
    </svg>
  `)}`;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
