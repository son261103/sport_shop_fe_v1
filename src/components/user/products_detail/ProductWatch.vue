<template>
  <section class="section-padding" style="background-color: #e9ecef;">
    <div class="container-custom">
      <!-- Header -->
      <div data-aos="fade-up" class="text-center mb-12">
        <h2 class="text-gradient-sport-animated text-3xl lg:text-4xl font-bold mb-4">
          Sản phẩm vừa xem
        </h2>
        <div class="w-24 h-1 bg-gradient-sport mx-auto mb-6 rounded-full"></div>
        <p class="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto text-lg">
          Khám phá  những sản phẩm thể thao chất lượng cao 
        </p>
      </div>

      <!-- Products Grid -->
      <div class="flex justify-center px-8">
        <div class="w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <div v-for="(product, index) in props.relatedProducts.slice(0, 5)" 
                 :key="product.id"
                 data-aos="fade-up" 
                 :data-aos-delay="100 + index * 100"
                 class="flex justify-center">
              
              <div class="w-full min-w-[260px] max-w-[280px] mx-2 transform transition-all duration-300 hover:scale-105">
                <!-- Product Card -->
                <div class="product-card group cursor-pointer overflow-hidden bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-light-border-secondary dark:border-dark-border-secondary rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:hover:bg-black"
                     @click="navigateToProduct(product.id)">
                  <!-- Product Image -->
                  <div class="relative h-36 w-full overflow-hidden">
                    <img :src="product.image" 
                         :alt="product.name"
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                         @error="handleImageError">
                
                    <!-- Overlay gradient for better text readability -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>


                
                    <!-- Quick Actions - Show on hover -->
                    <div class="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                      <button class="w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors duration-200 overflow-hidden"
                              @click.stop="toggleWishlist(product.id)">
                        <i :class="isInWishlist(product.id) ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600'" class="text-sm"></i>
                      </button>
                    </div>
                
                  </div>
              
                  <!-- Product Info -->
                  <div class="p-3">
                    <!-- Category Badge -->
                    <div class="mb-1">
                      <span class="inline-block px-2 py-1 text-xs font-medium rounded-md bg-white/90 dark:bg-black/90 backdrop-blur-sm text-light-accent-sport dark:text-dark-accent-sport hover:bg-white dark:hover:bg-black transition-colors duration-200">
                        {{ product.brand }}
                      </span>
                    </div>

                    <!-- Product Name -->
                    <h3 class="text-sm font-semibold line-clamp-2 text-light-text-primary dark:text-dark-text-primary">
                      {{ product.name }}
                    </h3>

                    <!-- Rating -->
                    <div class="flex items-center gap-1 mt-1">
                      <div class="flex items-center">
                        <i class="fas fa-star w-4 h-4 fill-current text-yellow-400"></i>
                        <span class="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-1">
                          {{ product.rating }}
                        </span>
                      </div>
                      <span class="text-xs text-light-text-muted dark:text-dark-text-muted">
                        ({{ Math.floor(Math.random() * 100) + 20 }} đánh giá)
                      </span>
                    </div>

                    <!-- Price -->
                    <div class="mt-2">
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2 flex-1">
                          <span v-if="product.originalPrice && product.originalPrice > product.price"
                                class="text-xs text-light-text-muted dark:text-dark-text-muted line-through">
                            {{ formatPrice(product.originalPrice) }}
                          </span>
                          <span class="text-sm font-bold text-light-text-primary dark:text-dark-text-primary">
                            {{ formatPrice(product.price) }}
                          </span>
                        </div>
                        <span v-if="product.originalPrice && product.originalPrice > product.price"
                              class="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                          -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="p-3 pt-0">
                    <button :disabled="!product.inStock"
                            @click.stop="addToCart(product)"
                            class="w-full font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                            :class="product.inStock ? 'bg-white/90 dark:bg-black/90 backdrop-blur-sm text-light-accent-sport dark:text-dark-accent-sport hover:bg-white dark:hover:bg-black border border-light-accent-sport dark:border-dark-accent-sport' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'">
                      <i class="fas fa-shopping-cart text-sm"></i>
                      <span>{{ product.inStock ? 'Thêm vào giỏ' : 'Hết hàng' }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Props
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  brand: string;
  rating: number;
  inStock: boolean;
}

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
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const isInWishlist = (productId: string) => {
  return wishlist.value.includes(productId);
};

const navigateToProduct = (productId: string) => {
  router.push(`/products/${productId}`);
};

const toggleWishlist = (productId: string) => {
  const index = wishlist.value.indexOf(productId);
  if (index > -1) {
    wishlist.value.splice(index, 1);
  } else {
    wishlist.value.push(productId);
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



const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder.svg';
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

.product-card {
  cursor: pointer;
  border-radius: 24px;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.product-image {
  border-radius: 20px 20px 0 0;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 200, 151, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 200, 151, 0.5);
  }
}

.product-card:hover {
  animation: pulse-glow 2s infinite;
}
</style>