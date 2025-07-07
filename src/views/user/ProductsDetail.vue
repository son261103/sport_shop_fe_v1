<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <Loading size="lg" color="sport" text="Đang tải chi tiết sản phẩm..." />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
          Không thể tải sản phẩm
        </h2>
        <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4">{{ error }}</p>
        <button 
          @click="initializePage" 
          class="btn-primary"
        >
          Thử lại
        </button>
      </div>
    </div>

    <!-- Page Content -->
    <div v-else-if="product" class="container-custom section-padding">
      <!-- Breadcrumb -->
      <nav class="mb-8" data-aos="fade-up">
        <div class="flex items-center space-x-2 text-sm">
          <router-link 
            to="/" 
            class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
          >
            Trang chủ
          </router-link>
          <i class="fas fa-chevron-right text-light-text-muted dark:text-dark-text-muted text-xs"></i>
          <router-link 
            to="/products" 
            class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
          >
            Sản phẩm
          </router-link>
          <i class="fas fa-chevron-right text-light-text-muted dark:text-dark-text-muted text-xs"></i>
          <span class="text-light-text-primary dark:text-dark-text-primary font-medium">{{ product.name }}</span>
        </div>
      </nav>

      <!-- Product Detail Component -->
      <ProductDetail :product="product" />

      <!-- Product Reviews and Comments -->
      <Comment :productId="product.id" :comments="mockComments" />

      <!-- Recently Viewed Products -->
      <ProductWatch :relatedProducts="relatedProducts" />
    </div>

    <!-- Product Not Found -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-gray-400 text-6xl mb-4">📦</div>
        <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
          Không tìm thấy sản phẩm
        </h2>
        <p class="text-light-text-secondary dark:text-dark-text-secondary">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import AOS from "aos";
import {
  ProductDetail,
  ProductWatch,
  Comment
} from "@/components/user/products_detail";
import { Loading } from "@/components/ui";
import { usePublicProducts } from "@/composables/usePublicProducts";
import type { Product, SportCategory } from "@/types/sport";

// Route and product ID
const route = useRoute();
const productId = computed(() => parseInt(route.params.id as string));

// Use public products composable
const { 
  selectedProduct, 
  isLoading, 
  error, 
  fetchProduct,
  products,
  fetchProducts 
} = usePublicProducts();

// Transform API product to component format
const product = computed(() => {
  if (!selectedProduct.value) return null;
  
  const apiProduct = selectedProduct.value;
  const originalPrice = apiProduct.discount_price ? parseFloat(apiProduct.price) : undefined;
  const currentPrice = apiProduct.discount_price ? parseFloat(apiProduct.discount_price) : parseFloat(apiProduct.price);
  
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    price: currentPrice,
    originalPrice: originalPrice,
    image: apiProduct.image || '',
    images: apiProduct.image ? [apiProduct.image] : [],
    description: apiProduct.description || '',
    category: 'fitness' as SportCategory,
    brand: apiProduct.brand?.name || '',
    rating: 4.5,
    reviews: 128,
    inStock: apiProduct.stock_quantity > 0,
    stock: apiProduct.stock_quantity,
    discount: originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0,
    sku: `SP${apiProduct.id.toString().padStart(6, '0')}`
  };
});

// Related products (transform from API format)
const relatedProducts = computed(() => {
  return products.value.slice(0, 8).map(apiProduct => {
    const originalPrice = apiProduct.discount_price ? parseFloat(apiProduct.price) : undefined;
    const currentPrice = apiProduct.discount_price ? parseFloat(apiProduct.discount_price) : parseFloat(apiProduct.price);
    
    return {
      id: apiProduct.id.toString(),
      name: apiProduct.name,
      description: apiProduct.description || '',
      price: currentPrice,
      originalPrice: originalPrice,
      category: 'fitness' as SportCategory,
      image: apiProduct.image || '',
      brand: apiProduct.brand?.name || '',
      rating: 4.5,
      reviews: Math.floor(Math.random() * 100) + 10,
      inStock: apiProduct.stock_quantity > 0
    } as Product;
  });
});

// Mock comments data
const mockComments = [
  {
    id: '1',
    user: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Sản phẩm rất tốt, chất lượng vượt mong đợi. Giao hàng nhanh, đóng gói cẩn thận.',
    date: '2024-01-15',
    helpful: 12
  },
  {
    id: '2',
    user: 'Trần Thị B',
    rating: 4,
    comment: 'Giày đẹp, đi êm chân. Tuy nhiên màu sắc hơi khác so với hình ảnh một chút.',
    date: '2024-01-10',
    helpful: 8
  },
  {
    id: '3',
    user: 'Lê Minh C',
    rating: 5,
    comment: 'Chất lượng tuyệt vời! Đã mua lần thứ 2 rồi. Shop phục vụ rất tốt.',
    date: '2024-01-08',
    helpful: 15
  },
  {
    id: '4',
    user: 'Phạm Thị D',
    rating: 4,
    comment: 'Sản phẩm ổn, giá cả hợp lý. Sẽ giới thiệu cho bạn bè.',
    date: '2024-01-05',
    helpful: 6
  }
];

const initializePage = async () => {
  try {
    await fetchProduct(productId.value);
    await fetchProducts();
  } catch (err) {
    console.error('Error initializing page:', err);
  }
};

// Initialize page on mount
onMounted(() => {
  initializePage();
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });
});

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    initializePage();
  }
});
</script>
