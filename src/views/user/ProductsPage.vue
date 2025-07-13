<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Page Header -->
    <div class="bg-light-bg-secondary dark:bg-dark-bg-secondary shadow-sm border-b border-light-border-primary dark:border-dark-border-primary">
      <div class="container-custom py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">🛍️ Sản phẩm</h1>
            <p class="mt-2 text-light-text-secondary dark:text-dark-text-secondary">Khám phá bộ sưu tập sản phẩm thể thao của chúng tôi</p>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex items-center gap-4">
            <button
              @click="toggleView"
              class="btn-secondary flex items-center gap-2"
            >
              <svg v-if="viewMode === 'grid'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              {{ viewMode === 'grid' ? 'Danh sách' : 'Lưới' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-custom section-padding">
      <div class="flex gap-8">
        <!-- Sidebar Filters (Optional) -->
        <div v-if="showSidebar" class="w-64 flex-shrink-0">
          <div class="card">
            <div class="card-header">
              <h3 class="text-lg font-semibold">🎯 Bộ lọc</h3>
            </div>
            <div class="card-body">
              <!-- Quick Filters -->
              <div class="space-y-4">
                <!-- Categories -->
                <div>
                  <h4 class="font-medium text-light-text-primary dark:text-dark-text-primary mb-2">📂 Danh mục</h4>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="radio" :value="undefined" v-model="selectedCategory" class="mr-2">
                      <span class="text-sm">Tất cả</span>
                    </label>
                    <!-- Add more category options here -->
                  </div>
                </div>
              </div>
              
              <!-- Brands -->
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Thương hiệu</h4>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" :value="undefined" v-model="selectedBrand" class="mr-2">
                    <span class="text-sm">Tất cả</span>
                  </label>
                  <!-- Add more brand options here -->
                </div>
              </div>
              
              <!-- Price Range -->
              <div>
                <h4 class="font-medium text-gray-900 mb-2">Khoảng giá</h4>
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <input
                      v-model.number="priceRange.min"
                      type="number"
                      placeholder="Từ"
                      class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                    <input
                      v-model.number="priceRange.max"
                      type="number"
                      placeholder="Đến"
                      class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                  </div>
                  <button
                    @click="applyPriceFilter"
                    class="w-full px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products List -->
        <div class="flex-1">
          <ProductList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ProductList } from '@/components/user/products';
import { usePublicProducts } from '@/composables/usePublicProducts';

// View mode
const viewMode = ref<'grid' | 'list'>('grid');
const showSidebar = ref(true);

// Filters
const selectedCategory = ref<number | undefined>(undefined);
const selectedBrand = ref<number | undefined>(undefined);
const priceRange = ref({
  min: undefined as number | undefined,
  max: undefined as number | undefined,
});

// Composable
const {
  filterByCategory,
  filterByBrand,
  filterByPriceRange,
} = usePublicProducts();

// Methods
const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid';
};

const applyPriceFilter = async () => {
  await filterByPriceRange(priceRange.value.min, priceRange.value.max);
};

// Watchers
watch(selectedCategory, async (newValue) => {
  await filterByCategory(newValue);
});

watch(selectedBrand, async (newValue) => {
  await filterByBrand(newValue);
});
</script>

<style scoped>
/* Add any custom styles here */
</style>