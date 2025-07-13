<template>
  <aside class="lg:w-80 flex-shrink-0">
    <div class="sticky top-4">
      <!-- Filter Sidebar Card -->
      <div class="card overflow-hidden">
        <!-- Header với Gradient -->
        <div class="card-header bg-gradient-to-r from-light-accent-sport to-light-accent-info dark:from-dark-accent-sport dark:to-dark-accent-info text-white rounded-t-2xl">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold">🎯 Bộ lọc sản phẩm</h3>
          </div>
        </div>

        <!-- Body -->
        <div class="card-body space-y-8">
          <!-- Price Range -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
              <svg class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              💰 Khoảng giá
            </div>
            <div class="space-y-3">
              <label class="flex items-center p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary cursor-pointer transition-all duration-200 hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 hover:border-light-accent-sport dark:hover:border-dark-accent-sport group">
                <input type="radio" v-model="priceRange" value="all" class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 cursor-pointer">
                <span class="ml-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200">Tất cả</span>
              </label>
              <label class="flex items-center p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary cursor-pointer transition-all duration-200 hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 hover:border-light-accent-sport dark:hover:border-dark-accent-sport group">
                <input type="radio" v-model="priceRange" value="0-500" class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 cursor-pointer">
                <span class="ml-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200">Dưới 500.000đ</span>
              </label>
              <label class="flex items-center p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary cursor-pointer transition-all duration-200 hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 hover:border-light-accent-sport dark:hover:border-dark-accent-sport group">
                <input type="radio" v-model="priceRange" value="500-1000" class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 cursor-pointer">
                <span class="ml-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200">500.000đ - 1.000.000đ</span>
              </label>
              <label class="flex items-center p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary cursor-pointer transition-all duration-200 hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 hover:border-light-accent-sport dark:hover:border-dark-accent-sport group">
                <input type="radio" v-model="priceRange" value="1000-2000" class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 cursor-pointer">
                <span class="ml-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200">1.000.000đ - 2.000.000đ</span>
              </label>
              <label class="flex items-center p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary cursor-pointer transition-all duration-200 hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 hover:border-light-accent-sport dark:hover:border-dark-accent-sport group">
                <input type="radio" v-model="priceRange" value="2000+" class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 cursor-pointer">
                <span class="ml-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200">Trên 2.000.000đ</span>
              </label>
            </div>
          </div>

          <!-- Categories -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
              <svg class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              📂 Danh mục
              <span v-if="isLoadingCategories" class="text-xs text-light-accent-sport dark:text-dark-accent-sport font-normal ml-1">(Đang tải...)</span>
            </div>
            <div v-if="categoriesError" class="text-light-accent-danger dark:text-dark-accent-danger text-xs p-3 bg-light-accent-danger/10 dark:bg-dark-accent-danger/10 rounded-xl border border-light-accent-danger/20 dark:border-dark-accent-danger/20">
              {{ categoriesError }}
            </div>
            <div class="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
              <div v-if="isLoadingCategories" class="flex justify-center py-8">
                <div class="loading-spinner"></div>
              </div>
              <template v-else>
                <label v-for="category in categories" :key="category.id" class="flex items-center justify-between p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary cursor-pointer transition-all duration-200 hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 hover:border-light-accent-sport dark:hover:border-dark-accent-sport hover:shadow-sm group">
                  <div class="flex items-center flex-1 min-w-0">
                    <input 
                      type="checkbox" 
                      v-model="selectedCategories" 
                      :value="category.id.toString()" 
                      class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary rounded focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 cursor-pointer"
                    >
                    <span class="ml-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200 truncate">{{ category.name }}</span>
                  </div>
                  <span class="badge text-xs text-light-text-muted dark:text-dark-text-muted bg-light-bg-primary dark:bg-dark-bg-primary px-2 py-1 rounded-full group-hover:bg-light-accent-sport/20 dark:group-hover:bg-dark-accent-sport/20 group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-all duration-200">{{ category.products_count }}</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Brands -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
              <svg class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              🏷️ Thương hiệu
              <span v-if="isLoadingBrands" class="text-xs text-light-accent-sport dark:text-dark-accent-sport font-normal ml-1">(Đang tải...)</span>
            </div>
            <div v-if="brandsError" class="text-light-accent-danger dark:text-dark-accent-danger text-xs p-3 bg-light-accent-danger/10 dark:bg-dark-accent-danger/10 rounded-xl border border-light-accent-danger/20 dark:border-dark-accent-danger/20">
              {{ brandsError }}
            </div>
            <div class="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
              <div v-if="isLoadingBrands" class="flex justify-center py-8">
                <div class="loading-spinner"></div>
              </div>
              <template v-else>
                <label v-for="brand in brands" :key="brand.id" class="flex items-center justify-between p-3 rounded-xl bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border-primary dark:border-dark-border-primary cursor-pointer transition-all duration-200 hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 hover:border-light-accent-sport dark:hover:border-dark-accent-sport hover:shadow-sm group">
                  <div class="flex items-center flex-1 min-w-0">
                    <input 
                      type="checkbox" 
                      v-model="selectedBrands" 
                      :value="brand.id.toString()" 
                      class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary rounded focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport focus:ring-2 cursor-pointer"
                    >
                    <span class="ml-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200 truncate">{{ brand.name }}</span>
                  </div>
                  <span class="badge text-xs text-light-text-muted dark:text-dark-text-muted bg-light-bg-primary dark:bg-dark-bg-primary px-2 py-1 rounded-full group-hover:bg-light-accent-sport/20 dark:group-hover:bg-dark-accent-sport/20 group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-all duration-200">{{ brand.products_count }}</span>
                </label>
              </template>
            </div>
          </div>

          <!-- Reset Button -->
          <button 
            @click="resetFilters"
            class="btn-primary-animated w-full flex items-center justify-center gap-2 group"
          >
            <svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            🗑️ Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePublicData } from "@/composables/usePublicData";

// Props
interface Props {
  priceRange: string;
  selectedCategories: string[];
  selectedBrands: string[];
}

const props = defineProps<Props>();

// Emits
interface Emits {
  'update:priceRange': [value: string];
  'update:selectedCategories': [value: string[]];
  'update:selectedBrands': [value: string[]];
  'reset-filters': [];
}

const emit = defineEmits<Emits>();

// Use public data composable
const {
  categories,
  brands,
  isLoadingCategories,
  isLoadingBrands,
  categoriesError,
  brandsError,
  loadAll,
} = usePublicData();

// Computed properties for v-model
const priceRange = computed({
  get: () => props.priceRange,
  set: (value: string) => emit('update:priceRange', value)
});

const selectedCategories = computed({
  get: () => props.selectedCategories,
  set: (value: string[]) => emit('update:selectedCategories', value)
});

const selectedBrands = computed({
  get: () => props.selectedBrands,
  set: (value: string[]) => emit('update:selectedBrands', value)
});

const resetFilters = () => {
  emit('reset-filters');
};

// Load data on component mount
onMounted(async () => {
  try {
    await loadAll();
  } catch (error) {
    console.error('Error loading filter data:', error);
  }
});
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgb(243 244 246);
  border-radius: 3px;
}

.dark .custom-scrollbar::-webkit-scrollbar-track {
  background: rgb(55 65 81);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgb(156 163 175);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgb(107 114 128);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgb(75 85 99);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgb(107 114 128);
}
</style>