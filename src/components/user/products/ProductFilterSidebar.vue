<template>
  <aside class="lg:w-80 flex-shrink-0">
    <div class="filter-sidebar sticky top-4">
      <div class="filter-sidebar-body">
        <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
          <!-- Filter title can be added here -->
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
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedCategories" value="shoes" class="mr-2">
              <span class="text-sm">Giày thể thao</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedCategories" value="clothing" class="mr-2">
              <span class="text-sm">Quần áo</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedCategories" value="accessories" class="mr-2">
              <span class="text-sm">Phụ kiện</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedCategories" value="equipment" class="mr-2">
              <span class="text-sm">Dụng cụ</span>
            </label>
          </div>
        </div>

        <!-- Brands -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Thương hiệu
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedBrands" value="nike" class="mr-2">
              <span class="text-sm">Nike</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedBrands" value="adidas" class="mr-2">
              <span class="text-sm">Adidas</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedBrands" value="puma" class="mr-2">
              <span class="text-sm">Puma</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="selectedBrands" value="jordan" class="mr-2">
              <span class="text-sm">Jordan</span>
            </label>
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
import { computed } from "vue";
import { Button } from "@/components/ui";

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
</script>