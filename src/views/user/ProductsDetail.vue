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
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Không thể tải sản phẩm
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
        <button 
          @click="initializePage" 
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>

    <!-- Page Content -->
    <div v-else-if="product" class="section-padding">
      <!-- Product Detail Section -->
      <div data-aos="fade-up" class="pb-8 border-b border-gray-200">
        <ProductDetail :product="product" />
      </div>

      <!-- Product Watch Section (Recently Viewed) -->
      <div data-aos="fade-up" data-aos-delay="200" class="mt-8 mb-16 pb-8 border-b border-gray-200">
        <ProductWatch :relatedProducts="relatedProducts" />
      </div>

      <!-- Product Reviews Section with Tabs -->
      <div data-aos="fade-up" data-aos-delay="400" class="mb-16">
        <ProductReviews :productId="productId.toString()" :comments="comments" />
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-gray-400 text-6xl mb-4">📦</div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Không tìm thấy sản phẩm
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import AOS from "aos";
import {
  ProductDetail,
  ProductWatch,
  ProductReviews,
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
    category: 'fitness' as SportCategory, // Default category
    brand: apiProduct.brand?.name || '',
    sizes: [], // Will be loaded from API
    colors: [], // Will be loaded from API
    rating: 0, // Will be loaded from API
    reviewCount: 0,
    inStock: apiProduct.stock_quantity > 0,
    features: [], // Will be loaded from API
    stock: apiProduct.stock_quantity,
    discount: originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0,
    sku: `SP${apiProduct.id.toString().padStart(6, '0')}`,
    specifications: {
      'Thương hiệu': apiProduct.brand?.name || 'Không xác định',
      'Danh mục': apiProduct.category?.name || 'Không xác định',
      'Tình trạng': apiProduct.is_active ? 'Còn hàng' : 'Hết hàng',
      'Số lượng': apiProduct.stock_quantity.toString()
    }
  };
});

// Related products (transform from API format)
const relatedProducts = computed(() => {
  return products.value.slice(0, 7).map(apiProduct => {
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
      rating: 0,
      reviews: 0,
      inStock: apiProduct.stock_quantity > 0
    } as Product;
  });
});

// Comments - will be loaded from API in future
const comments = ref([] as Array<{
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}>);

// Fetch product data from API
const fetchProductData = async () => {
  try {
    if (productId.value) {
      await fetchProduct(productId.value);
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

// Fetch related products from API
const fetchRelatedProducts = async () => {
  try {
    // Fetch some products for related products section
    await fetchProducts({ per_page: 8 });
  } catch (error) {
    console.error('Error fetching related products:', error);
  }
};

// Fetch comments from API
const fetchComments = async () => {
  try {
    // TODO: Implement API call to fetch product reviews/comments
    // For now, comments will be empty until API is implemented
    comments.value = [];
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

// Initialize page data and AOS
const initializePage = async () => {
  try {
    // Fetch all data concurrently
    await Promise.all([
      fetchProductData(),
      fetchRelatedProducts(),
      fetchComments()
    ]);
    
    // Initialize AOS animations
    AOS.refresh();
  } catch (error) {
    console.error('Error initializing page:', error);
  }
};

// Watch for route changes to refetch product data
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await initializePage();
    }
  },
  { immediate: false }
);

// Initialize when component is mounted
onMounted(() => {
  initializePage();
});
</script>