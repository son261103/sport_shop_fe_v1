<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-6">
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
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary"
              @input="debouncedSearch"
            />
            <svg
              class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
          <select
            v-model="sortBy"
            @change="loadCategories"
            class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sắp xếp theo</option>
            <option value="name">Tên</option>
            <option value="created_at">Ngày tạo</option>
            <option value="products_count">Số sản phẩm</option>
          </select>

          <select
            v-model="sortOrder"
            @change="loadCategories"
            class="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
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
import { ref, onMounted } from "vue";
import type {
  Category,
  CategoryListResponse,
  CategoryListParams,
} from "../../types/admin/category";
import { categoryService } from "../../services/admin/categoryService";
import { handleApiError } from "../../services/api";
import CategoryTable from "../../components/admin/categories/CategoryTable.vue";
import CategoryPagination from "../../components/admin/categories/CategoryPagination.vue";
import CategoryModal from "../../components/admin/categories/CategoryModal.vue";

// State
const categories = ref<Category[]>([]);
const paginationData = ref<CategoryListResponse["data"] | null>(null);
const isLoading = ref(false);
const isModalOpen = ref(false);
const selectedCategory = ref<Category | null>(null);

// Search and filters
const searchQuery = ref("");
const sortBy = ref("");
const sortOrder = ref<"asc" | "desc">("asc");
const currentPage = ref(1);
const perPage = ref(10);

// Debounced search
let searchTimeout: number;
const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadCategories();
  }, 500);
};

// Load categories
const loadCategories = async () => {
  isLoading.value = true;

  try {
    const params: CategoryListParams = {
      page: currentPage.value,
      per_page: perPage.value,
    };

    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }

    if (sortBy.value) {
      params.sort_by = sortBy.value;
      params.sort_order = sortOrder.value;
    }

    const response = await categoryService.getCategories(params);
    categories.value = response.data.data;
    paginationData.value = response.data;
  } catch (error: any) {
    handleApiError(error);
    alert("Có lỗi xảy ra khi tải danh sách danh mục");
  } finally {
    isLoading.value = false;
  }
};

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
};

// Pagination handlers
const handlePageChange = (page: number) => {
  currentPage.value = page;
  loadCategories();
};

const handlePerPageChange = (newPerPage: number) => {
  perPage.value = newPerPage;
  currentPage.value = 1;
  loadCategories();
};

// Initialize
onMounted(() => {
  loadCategories();
});
</script>
