<template>
  <div class="product-list">
    <!-- Search and Filters -->
    <div class="mb-6 space-y-4">
      <!-- Search Bar -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="absolute right-2 top-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tìm kiếm
        </button>
      </div>

      <!-- Filters Row -->
      <div class="flex flex-wrap gap-4">
        <!-- Category Filter -->
        <select
          v-model="categoryFilter"
          @change="handleCategoryFilter"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option :value="undefined">Tất cả danh mục</option>
          <!-- Add category options here -->
        </select>

        <!-- Brand Filter -->
        <select
          v-model="brandFilter"
          @change="handleBrandFilter"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option :value="undefined">Tất cả thương hiệu</option>
          <!-- Add brand options here -->
        </select>

        <!-- Price Range -->
        <div class="flex gap-2 items-center">
          <input
            v-model.number="minPrice"
            type="number"
            placeholder="Giá từ"
            class="w-24 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <span>-</span>
          <input
            v-model.number="maxPrice"
            type="number"
            placeholder="Giá đến"
            class="w-24 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="handlePriceFilter"
            class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Lọc
          </button>
        </div>

        <!-- Sort Options -->
        <select
          v-model="sortBy"
          @change="handleSort"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="created_at">Mới nhất</option>
          <option value="name">Tên A-Z</option>
          <option value="price">Giá thấp đến cao</option>
        </select>

        <select
          v-model="sortOrder"
          @change="handleSort"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>

        <!-- Reset Filters -->
        <button
          @click="handleResetFilters"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Đặt lại
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 text-lg">{{ error }}</p>
      <button
        @click="loadProducts"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thử lại
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else-if="hasProducts" class="space-y-6">
      <!-- Products Count -->
      <div class="flex justify-between items-center">
        <p class="text-gray-600">
          Hiển thị {{ paginationData?.from || 0 }} - {{ paginationData?.to || 0 }} 
          trong tổng số {{ totalProducts }} sản phẩm
        </p>
        <div class="flex items-center gap-2">
          <label>Hiển thị:</label>
          <select
            v-model="perPage"
            @change="handlePerPageChange"
            class="px-2 py-1 border border-gray-300 rounded"
          >
            <option :value="12">12</option>
            <option :value="24">24</option>
            <option :value="48">48</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="transformProductForCard(product)"
          @click="viewProduct(product.id)"
          @add-to-cart="handleAddToCart"
          @toggle-favorite="handleToggleFavorite"
        />
      </div>

      <!-- Pagination -->
      <div v-if="lastPage > 1" class="flex justify-center items-center gap-2 mt-8">
        <button
          @click="prevPage"
          :disabled="!hasPrevPage"
          class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        
        <div class="flex gap-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-2 border rounded',
              page === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
        </div>
        
        <button
          @click="nextPage"
          :disabled="!hasNextPage"
          class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
      <button
        @click="handleResetFilters"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Xem tất cả sản phẩm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePublicProducts } from '@/composables/usePublicProducts';
import { ProductCard } from '@/components/examples';
import type { Product } from '@/components/examples';

// Router
const router = useRouter();

// Composable
const {
  products,
  isLoading,
  error,
  paginationData,
  searchQuery,
  currentPage,
  perPage,
  categoryFilter,
  brandFilter,
  minPrice,
  maxPrice,
  sortBy,
  sortOrder,
  hasProducts,
  totalProducts,
  lastPage,
  hasNextPage,
  hasPrevPage,
  fetchProducts,
  searchProducts,
  filterByCategory,
  filterByBrand,
  filterByPriceRange,
  sortProducts,
  goToPage,
  nextPage,
  prevPage,
  resetFilters,
} = usePublicProducts();

// Local reactive data
const localSearchQuery = ref('');

// Computed
const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(lastPage.value, currentPage.value + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

// Methods
const loadProducts = async () => {
  await fetchProducts();
};

const handleSearch = async () => {
  await searchProducts(localSearchQuery.value);
};

const handleCategoryFilter = async () => {
  await filterByCategory(categoryFilter.value);
};

const handleBrandFilter = async () => {
  await filterByBrand(brandFilter.value);
};

const handlePriceFilter = async () => {
  await filterByPriceRange(minPrice.value, maxPrice.value);
};

const handleSort = async () => {
  await sortProducts(sortBy.value, sortOrder.value);
};

const handleResetFilters = async () => {
  localSearchQuery.value = '';
  await resetFilters();
};

const handlePerPageChange = async () => {
  await fetchProducts();
};

const viewProduct = (productId: number) => {
  router.push(`/products/${productId}`);
};

// Transform PublicProduct to Product format for ProductCard
const transformProductForCard = (product: any): Product => {
  
  // Hiển thị đúng giá từ database
  // price = giá gốc, discount_price = giá giảm
  const currentPrice = product.discount_price ? parseFloat(product.discount_price) : parseFloat(product.price);
  const originalPrice = product.discount_price ? parseFloat(product.price) : undefined;
  
  const transformedProduct = {
    id: product.id.toString(),
    name: product.name,
    price: currentPrice,
    originalPrice: originalPrice,
    image: product.image || '/placeholder.svg',
    category: product.category?.name || 'Chưa phân loại',
    brand: product.brand?.name || 'Chưa có thương hiệu',
    rating: 4.5, // Default rating since API doesn't provide this
    reviews: Math.floor(Math.random() * 100), // Random reviews for demo
    inStock: product.stock_quantity > 0,
    isFavorite: false, // Default to false, can be managed by wishlist store
    description: product.description || '',
  };
  
  // Debug: Log transformed product data
  console.log('Transformed product for ProductCard:', transformedProduct);
  
  return transformedProduct;
};

// Handle add to cart
const handleAddToCart = (product: Product) => {
  // Find original product data
  const originalProduct = products.value.find(p => p.id.toString() === product.id);
  if (originalProduct && originalProduct.stock_quantity > 0) {
    // Add to cart logic here
    console.log('Adding to cart:', originalProduct);
    // You can emit an event or use a cart composable here
  }
};

// Handle toggle favorite
const handleToggleFavorite = (product: Product) => {
  // Toggle favorite logic here
  console.log('Toggling favorite:', product);
  // You can use wishlist store here
};

// Watch for search query changes
watch(searchQuery, (newValue) => {
  localSearchQuery.value = newValue;
});

// Load products on mount
onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>