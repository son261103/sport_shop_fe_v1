<template>
  <div class="bg-gradient-page animate-fade-in">
    <!-- Recently Viewed Products Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-8 animate-slide-up">
            <div class="flex items-center justify-center gap-3 mb-4">
              <div class="bg-gradient-to-r from-light-accent-sport/20 to-light-accent-info/20 dark:from-dark-accent-sport/30 dark:to-dark-accent-info/30 p-3 rounded-full shadow-sport">
                <i class="fas fa-eye text-light-accent-sport dark:text-dark-accent-sport text-xl animate-bounce-gentle"></i>
              </div>
              <h2 class="text-2xl lg:text-3xl font-bold text-gradient-sport-animated animate-gradient-x">
                Sản phẩm đã xem
              </h2>
            </div>
            <p class="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Những sản phẩm bạn đã xem gần đây
            </p>
          </div>

          <!-- Products Grid -->
          <div v-if="relatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(product, index) in relatedProducts.slice(0, 8)"
              :key="product.id"
              class="animate-slide-up"
              :style="{ 'animation-delay': `${index * 0.1}s` }"
            >
              <div class="card group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 glow-sport bg-light-bg-secondary/90 dark:bg-dark-bg-secondary/90 backdrop-blur-xl border-2 border-light-border-secondary dark:border-dark-border-secondary hover:border-light-accent-sport dark:hover:border-dark-accent-sport"
                   @click="navigateToProduct(product)">
                <!-- Product Image -->
                <div class="relative overflow-hidden">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <!-- Discount Badge -->
                  <div
                    v-if="product.originalPrice && product.price"
                    class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse"
                  >
                    -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
                  </div>
                  <!-- Stock Status -->
                  <div
                    v-if="!product.inStock"
                    class="absolute top-3 right-3 bg-gray-900/80 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                  >
                    Hết hàng
                  </div>
                </div>

                <!-- Product Info -->
                <div class="p-4 space-y-3">
                  <!-- Product Name -->
                  <h3 class="font-semibold text-light-text-primary dark:text-dark-text-primary line-clamp-2 group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-300">
                    {{ product.name }}
                  </h3>

                  <!-- Brand -->
                  <p v-if="product.brand" class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {{ product.brand }}
                  </p>

                  <!-- Rating -->
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                      <i v-for="star in 5" :key="star" 
                         :class="star <= Math.floor(product.rating || 0) ? 'fas fa-star text-yellow-500' : star <= (product.rating || 0) ? 'fas fa-star-half-alt text-yellow-500' : 'far fa-star text-gray-300'"
                         class="text-sm"></i>
                    </div>
                    <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      ({{ product.reviews || 0 }})
                    </span>
                  </div>

                  <!-- Price -->
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-bold text-gradient-sport-animated animate-gradient-x">
                          {{ formatPrice(product.price) }}
                        </span>
                        <span
                          v-if="product.originalPrice"
                          class="text-sm text-light-text-muted dark:text-dark-text-muted line-through"
                        >
                          {{ formatPrice(product.originalPrice) }}
                        </span>
                      </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex items-center gap-2">
                      <button
                        @click.stop="toggleWishlist(product)"
                        class="p-2 rounded-full bg-light-bg-primary dark:bg-dark-bg-primary border border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-sport"
                        :class="isInWishlist(product.id) ? 'text-red-500' : 'text-light-text-secondary dark:text-dark-text-secondary'"
                      >
                        <i :class="isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'" class="text-sm"></i>
                      </button>
                      <button
                        @click.stop="addToCart(product)"
                        :disabled="!product.inStock"
                        class="p-2 rounded-full bg-gradient-to-r from-light-accent-sport to-light-accent-info dark:from-dark-accent-sport dark:to-dark-accent-info text-white hover:shadow-sport transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-sport"
                      >
                        <i class="fas fa-shopping-cart text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="bg-gradient-to-r from-light-bg-primary/80 to-light-bg-secondary/80 dark:from-dark-bg-primary/80 dark:to-dark-bg-secondary/80 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i class="fas fa-eye-slash text-light-accent-sport dark:text-dark-accent-sport text-2xl animate-bounce-gentle"></i>
            </div>
            <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Chưa có sản phẩm nào</h4>
            <p class="text-light-text-secondary dark:text-dark-text-secondary">Bạn chưa xem sản phẩm nào gần đây</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from "@/types/sport";

// Props
interface Props {
  relatedProducts: Product[];
}

const props = withDefaults(defineProps<Props>(), {
  relatedProducts: () => []
});

// Router
const router = useRouter();

// Wishlist state
const wishlist = ref<string[]>([]);

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const navigateToProduct = (product: Product) => {
  router.push(`/products/${product.id}`);
};

const isInWishlist = (productId: string) => {
  return wishlist.value.includes(productId);
};

const toggleWishlist = (product: Product) => {
  const index = wishlist.value.indexOf(product.id);
  if (index > -1) {
    wishlist.value.splice(index, 1);
  } else {
    wishlist.value.push(product.id);
  }
  
  // Here you would typically sync with your API
  console.log('Wishlist updated:', wishlist.value);
};

const addToCart = (product: Product) => {
  if (!product.inStock) {
    alert('Sản phẩm hiện đang hết hàng');
    return;
  }
  
  // Here you would typically add to cart via your store/API
  console.log('Adding to cart:', product);
  alert(`Đã thêm "${product.name}" vào giỏ hàng`);
};
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>