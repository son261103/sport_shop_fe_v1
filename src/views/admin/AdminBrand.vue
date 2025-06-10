<template>
  <div class="p-2">
    <!-- Page Header -->
    <div class="mb-4">
      <h1
        class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2"
      >
        Quản lý thương hiệu
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Quản lý các thương hiệu sản phẩm trong hệ thống
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
              placeholder="Tìm kiếm thương hiệu..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary"
              @input="(event) => debouncedSearch((event.target as HTMLInputElement).value)"
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
            @change="() => loadBrands()"
            class="form-input min-w-[140px]"
          >
            <option value="">Sắp xếp theo</option>
            <option value="name">Tên</option>
            <option value="created_at">Ngày tạo</option>
            <option value="updated_at">Ngày cập nhật</option>
          </select>

          <select
            v-model="sortOrder"
            @change="() => loadBrands()"
            class="form-input min-w-[120px]"
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Brands Table -->
    <BrandTable
      :brands="brands"
      :is-loading="isLoading"
      @add="openAddModal"
      @edit="openEditModal"
      @refresh="loadBrands"
    />

    <!-- Pagination -->
    <BrandPagination
      v-if="paginationData"
      :pagination="paginationData"
      @page-change="handlePageChange"
      @per-page-change="handlePerPageChange"
    />

    <!-- Brand Modal -->
    <BrandModal
      :is-open="isModalOpen"
      :brand="selectedBrand"
      @close="closeModal"
      @success="handleBrandSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useBrand } from "@/composables/useBrand";
import type { Brand } from "@/types/admin/brand";
import BrandTable from "@/components/admin/brands/BrandTable.vue";
import BrandPagination from "@/components/admin/brands/BrandPagination.vue";
import BrandModal from "@/components/admin/brands/BrandModal.vue";

// Use brand composable
const {
  brands,
  paginationData,
  isLoading,
  error,
  searchQuery,
  sortBy,
  sortOrder,
  loadBrands,
  handlePageChange,
  handlePerPageChange,
  debouncedSearch,
  handleSortChange,
  clearError,
} = useBrand();

// Modal state
const isModalOpen = ref(false);
const selectedBrand = ref<Brand | null>(null);

// Modal handlers
const openAddModal = () => {
  selectedBrand.value = null;
  isModalOpen.value = true;
};

const openEditModal = (brand: Brand) => {
  selectedBrand.value = brand;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedBrand.value = null;
};

const handleBrandSuccess = () => {
  loadBrands();
  closeModal();
};

// Watch for sort changes
watch([sortBy, sortOrder], () => {
  if (sortBy.value) {
    handleSortChange(sortBy.value, sortOrder.value);
  }
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
  loadBrands();
});
</script>
