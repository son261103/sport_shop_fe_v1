<template>
  <aside class="lg:w-80 flex-shrink-0 overflow-x-hidden">
    <div class="filter-sidebar sticky top-4 overflow-x-hidden">
      <div class="filter-sidebar-body overflow-x-hidden">
        <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
          Bộ lọc sản phẩm
        </h3>
        
        <!-- Sort Options -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Sắp xếp theo
          </label>
          <select v-model="sortBy" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary">
            <option value="default">Mặc định</option>
            <option value="price-low">Giá: Thấp đến cao</option>
            <option value="price-high">Giá: Cao đến thấp</option>
            <option value="name">Tên A-Z</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>

        <!-- Price Range -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Khoảng giá
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="radio" v-model="priceRange" value="all" class="mr-2">
              <span class="text-sm">Tất cả</span>
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="priceRange" value="0-500" class="mr-2">
              <span class="text-sm">Dưới 500.000đ</span>
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="priceRange" value="500-1000" class="mr-2">
              <span class="text-sm">500.000đ - 1.000.000đ</span>
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="priceRange" value="1000-2000" class="mr-2">
              <span class="text-sm">1.000.000đ - 2.000.000đ</span>
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="priceRange" value="2000+" class="mr-2">
              <span class="text-sm">Trên 2.000.000đ</span>
            </label>
          </div>
        </div>

        <!-- Categories -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Danh mục
            <span v-if="isLoadingCategories" class="text-xs text-gray-500 ml-2">(Đang tải...)</span>
          </label>
          <div v-if="categoriesError" class="text-red-500 text-xs mb-2">
            {{ categoriesError }}
          </div>
          <div class="space-y-2 max-h-48 overflow-y-auto overflow-x-hidden">
            <div v-if="isLoadingCategories" class="text-center py-4">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
            <template v-else>
              <label v-for="category in categories" :key="category.id" class="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded transition-colors">
                <div class="flex items-center min-w-0 flex-1">
                  <input 
                    type="checkbox" 
                    v-model="selectedCategories" 
                    :value="category.id.toString()" 
                    class="mr-2 flex-shrink-0"
                  >
                  <span class="text-sm truncate">{{ category.name }}</span>
                </div>
                <span class="text-xs text-gray-500 flex-shrink-0 ml-2">({{ category.products_count }})</span>
              </label>
            </template>
          </div>
        </div>

        <!-- Brands -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Thương hiệu
            <span v-if="isLoadingBrands" class="text-xs text-gray-500 ml-2">(Đang tải...)</span>
          </label>
          <div v-if="brandsError" class="text-red-500 text-xs mb-2">
            {{ brandsError }}
          </div>
          <div class="space-y-2 max-h-48 overflow-y-auto overflow-x-hidden">
            <div v-if="isLoadingBrands" class="text-center py-4">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
            <template v-else>
              <label v-for="brand in brands" :key="brand.id" class="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded transition-colors">
                <div class="flex items-center min-w-0 flex-1">
                  <input 
                    type="checkbox" 
                    v-model="selectedBrands" 
                    :value="brand.id.toString()" 
                    class="mr-2 flex-shrink-0"
                  >
                  <span class="text-sm truncate">{{ brand.name }}</span>
                </div>
                <span class="text-xs text-gray-500 flex-shrink-0 ml-2">({{ brand.products_count }})</span>
              </label>
            </template>
          </div>
        </div>

        <!-- Reset Filters -->
        <Button variant="outline" size="sm" class="w-full" @click="resetFilters">
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Button } from "@/components/ui";
import { usePublicData } from "@/composables/usePublicData";

// Props
interface Props {
  sortBy: string;
  priceRange: string;
  selectedCategories: string[];
  selectedBrands: string[];
}

const props = defineProps<Props>();

// Emits
interface Emits {
  'update:sortBy': [value: string];
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
const sortBy = computed({
  get: () => props.sortBy,
  set: (value: string) => emit('update:sortBy', value)
});

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
    console.error('Failed to load filter data:', error);
  }
});
</script>