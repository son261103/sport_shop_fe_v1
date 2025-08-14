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
              <ProductCard
                :product="product"
                @click="navigateToProduct"
                @add-to-cart="addToCart"
                @toggle-favorite="toggleWishlist"
              />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductCard from '@/components/examples/ProductCard.vue';
import type { Product as CardProduct } from "@/components/examples";

// Router
const router = useRouter();

// Wishlist state
const wishlist = ref<string[]>([]);

// Related products state
const relatedProducts = ref<CardProduct[]>([]);

// Generate sample products for recently viewed
const generateRecentlyViewedProducts = (): CardProduct[] => {
  const products = [
    {
      id: '1',
      name: 'Nike Air Max 270',
      price: 120,
      originalPrice: 150,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      category: 'Running',
      brand: 'Nike',
      rating: 4.5,
      reviews: 39,
      inStock: true,
      isFavorite: false,
      description: 'Comfortable running shoes with excellent cushioning'
    },
    {
      id: '2',
      name: 'Adidas Ultraboost 22',
      price: 180,
      originalPrice: 220,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      category: 'Running',
      brand: 'Adidas',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      isFavorite: false,
      description: 'Revolutionary running shoes with boost technology'
    },
    {
      id: '3',
      name: 'Nike Pro Training T-Shirt',
      price: 35,
      originalPrice: 45,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      category: 'Training',
      brand: 'Nike',
      rating: 4.5,
      reviews: 71,
      inStock: true,
      isFavorite: true,
      description: 'Premium training t-shirt with moisture-wicking technology'
    },
    {
      id: '4',
      name: 'Puma Football Jersey',
      price: 45,
      originalPrice: 60,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
      category: 'Football',
      brand: 'Puma',
      rating: 4.2,
      reviews: 89,
      inStock: true,
      isFavorite: false,
      description: 'Official team jersey with moisture-wicking fabric'
    }
  ];
  
  return products;
};

onMounted(() => {
  relatedProducts.value = generateRecentlyViewedProducts();
});

// Methods
const navigateToProduct = (product: CardProduct) => {
  router.push(`/products/${product.id}`);
};

const toggleWishlist = (product: CardProduct) => {
  const index = wishlist.value.indexOf(product.id);
  if (index > -1) {
    wishlist.value.splice(index, 1);
  } else {
    wishlist.value.push(product.id);
  }
  
  // Here you would typically sync with your API
  console.log('Wishlist updated:', wishlist.value);
};

const addToCart = (product: CardProduct) => {
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