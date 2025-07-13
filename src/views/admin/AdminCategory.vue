<template>
  <div class="admin-page p-2">
    <!-- Page Header -->
    <div class="mb-4">
      <h1
        class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2"
      >
        Quản lý danh mục
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Quản lý các danh mục sản phẩm trong hệ thống
      </p>
    </div>

    <!-- Search and Filters -->
    <div
      class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm p-4 mb-6"
    >
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm danh mục..."
              class="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary placeholder:text-gray-400 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              @input="debouncedSearch"
            />
            <svg
              class="absolute left-4 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Sort Options -->
        <div class="flex gap-2">
          <div class="relative">
            <select
              v-model="sortBy"
              @change="() => loadCategories()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 min-w-[140px]"
            >
              <option value="">Sắp xếp theo</option>
              <option value="name">Tên</option>
              <option value="created_at">Ngày tạo</option>
              <option value="products_count">Số sản phẩm</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div class="relative">
            <select
              v-model="sortOrder"
              @change="() => loadCategories()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 min-w-[120px]"
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Table -->
    <CategoryTable
      :categories="categories"
      :is-loading="isLoading"
      @add="openAddModal"
      @edit="openEditModal"
      @refresh="loadCategories"
    />

    <!-- Pagination -->
    <CategoryPagination
      v-if="paginationData"
      :pagination="paginationData"
      @page-change="handlePageChange"
      @per-page-change="handlePerPageChange"
    />

    <!-- Category Modal -->
    <CategoryModal
      :is-open="isModalOpen"
      :category="selectedCategory"
      @close="closeModal"
      @success="handleCategorySuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useCategory } from "@/composables/useCategory";
import type { Category } from "@/types/admin/category";
import CategoryTable from "@/components/admin/categories/CategoryTable.vue";
import CategoryPagination from "@/components/admin/categories/CategoryPagination.vue";
import CategoryModal from "@/components/admin/categories/CategoryModal.vue";

// Use category composable
const {
  categories,
  paginationData,
  isLoading,
  error,
  searchQuery,
  sortBy,
  sortOrder,
  loadCategories,
  handlePageChange,
  handlePerPageChange,
  debouncedSearch,
  handleSortChange,
  clearError,
} = useCategory();

// Modal state
const isModalOpen = ref(false);
const selectedCategory = ref<Category | null>(null);

// Modal handlers
const openAddModal = () => {
  selectedCategory.value = null;
  isModalOpen.value = true;
};

const openEditModal = (category: Category) => {
  selectedCategory.value = category;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCategory.value = null;
};

const handleCategorySuccess = () => {
  loadCategories();
  closeModal();
};

// Watch for sort changes
watch([sortBy, sortOrder], () => {
  handleSortChange();
});

// Show error alerts
watch(error, (newError) => {
  if (newError) {
    alert(newError);
    clearError();
  }
});

// Initialize
onMounted(() => {
  loadCategories();
});
</script>

<style scoped>
/* Force dark mode styles for this component */
.admin-page select {
  background-color: white !important;
  color: rgb(55 65 81) !important;
  border-color: rgb(229 231 235) !important;
}

:global(.dark) .admin-page select {
  background-color: rgb(31 41 55) !important;
  color: rgb(248 250 252) !important;
  border-color: rgb(75 85 99) !important;
}

.admin-page select option {
  background-color: white !important;
  color: rgb(55 65 81) !important;
}

:global(.dark) .admin-page select option {
  background-color: rgb(31 41 55) !important;
  color: rgb(248 250 252) !important;
}

.admin-page input {
  background-color: white !important;
  color: rgb(55 65 81) !important;
  border-color: rgb(229 231 235) !important;
}

:global(.dark) .admin-page input {
  background-color: rgb(31 41 55) !important;
  color: rgb(248 250 252) !important;
  border-color: rgb(75 85 99) !important;
}

.admin-page input::placeholder {
  color: rgb(156 163 175) !important;
}

:global(.dark) .admin-page input::placeholder {
  color: rgb(107 114 128) !important;
}
</style>
