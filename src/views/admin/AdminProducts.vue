<template>
  <div class="admin-page p-2">
    <!-- Page Header -->
    <div class="mb-4">
      <h1
        class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2"
      >
        Quản lý sản phẩm
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Quản lý các sản phẩm trong hệ thống
      </p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6 backdrop-blur-sm">
      <!-- Filter Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Bộ lọc sản phẩm</h3>
            <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Sắp xếp theo</p>
          </div>
        </div>
        <button 
          @click="clearAllFilters"
          class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Xóa bộ lọc
        </button>
      </div>

      <!-- Search Section -->
      <div class="mb-6">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên, mô tả..."
            class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary placeholder:text-gray-400 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
          />
        </div>
      </div>

      <!-- Filter Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <!-- Category Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Danh mục
          </label>
          <div class="relative">
            <select
              v-model="categoryFilter"
              @change="() => loadProducts()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="">Tất cả</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Brand Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
            Thương hiệu
          </label>
          <div class="relative">
            <select
              v-model="brandFilter"
              @change="() => loadProducts()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="">Tất cả</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Status Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Trạng thái
          </label>
          <div class="relative">
            <select
              v-model="statusFilter"
              @change="() => loadProducts()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="">Tất cả</option>
              <option value="true">Hoạt động</option>
              <option value="false">Không hoạt động</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Sort By Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
            </svg>
            Sắp xếp theo
          </label>
          <div class="relative">
            <select
              v-model="sortBy"
              @change="() => loadProducts()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <option value="">Mặc định</option>
              <option value="name">Tên</option>
              <option value="price">Giá</option>
              <option value="stock_quantity">Tồn kho</option>
              <option value="created_at">Ngày tạo</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Sort Order Filter -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
            Thứ tự
          </label>
          <div class="relative">
            <select
              v-model="sortOrder"
              @change="() => loadProducts()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-light-text-primary dark:text-dark-text-primary appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
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

      <!-- Active Filters Display -->
      <div v-if="hasActiveFilters" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Bộ lọc đang áp dụng:</span>
          <div v-if="categoryFilter" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
            <span>{{ getCategoryName(categoryFilter) }}</span>
            <button @click="categoryFilter = ''; loadProducts()" class="ml-1 hover:text-blue-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div v-if="brandFilter" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
            <span>{{ getBrandName(brandFilter) }}</span>
            <button @click="brandFilter = ''; loadProducts()" class="ml-1 hover:text-purple-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div v-if="statusFilter" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
            <span>{{ statusFilter === 'true' ? 'Hoạt động' : 'Không hoạt động' }}</span>
            <button @click="statusFilter = ''; loadProducts()" class="ml-1 hover:text-green-600">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <ProductTable
      :products="products"
      :is-loading="isLoading"
      :selected-ids="selectedIds"
      :sort-by="sortBy"
      :sort-order="sortOrder"
      :total-products="totalProducts"
      @add="openAddModal"
      @edit="openEditModal"
      @view-detail="handleViewDetail"
      @toggle-status="toggleProductStatus"
      @toggle-selection="toggleSelection"
      @select-all="selectAll"
      @bulk-delete="bulkDeleteProducts"
      @manage-variants="openVariantModal"
      @sort="handleSort"
    />

    <!-- Pagination -->
    <ProductPagination
      v-if="paginationData"
      :pagination="paginationData"
      @page-change="handlePageChange"
      @per-page-change="handlePerPageChange"
    />

    <!-- Product Modal -->
    <ProductModal
      :is-open="isModalOpen"
      :product="selectedProduct"
      :categories="categories"
      :brands="brands"
      @close="closeModal"
      @success="handleProductSuccess"
    />

    <!-- Variant Modal -->
    <VariantModal
      :is-open="isVariantModalOpen"
      :product="selectedProductForVariants"
      @close="closeVariantModal"
      @success="handleVariantSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useProduct } from "@/composables/useProduct";
import { useCategory } from "@/composables/useCategory";
import { useBrand } from "@/composables/useBrand";
import { useNotification } from "@/composables/useNotification";
import type { Product } from "@/types/admin/product";
import ProductTable from "@/components/admin/products/ProductTable.vue";
import ProductPagination from "@/components/admin/products/ProductPagination.vue";
import ProductModal from "@/components/admin/products/ProductModal.vue";
import VariantModal from "@/components/admin/products/VariantModal.vue";

const router = useRouter();
const toast = useNotification();

// Use product composable
const {
  products,
  paginationData,
  isLoading,
  error,
  searchQuery,
  sortBy,
  sortOrder,
  selectedIds,
  totalProducts,
  loadProducts,
  handlePageChange,
  handlePerPageChange,
  handleSort,
  toggleSelection,
  selectAll,
  bulkDeleteProducts,
  toggleProductStatus,
  clearError,
} = useProduct();

// Use category and brand composables for filters
const { categories, loadCategories } = useCategory();
const { brands, loadBrands } = useBrand();

// Filter states
const categoryFilter = ref("");
const brandFilter = ref("");
const statusFilter = ref("");

// Computed properties for filter helpers
const hasActiveFilters = computed(() => {
  return categoryFilter.value || brandFilter.value || statusFilter.value;
});

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(c => c.id.toString() === categoryId);
  return category ? category.name : '';
};

const getBrandName = (brandId: string) => {
  const brand = brands.value.find(b => b.id.toString() === brandId);
  return brand ? brand.name : '';
};

// Clear all filters function
const clearAllFilters = () => {
  categoryFilter.value = "";
  brandFilter.value = "";
  statusFilter.value = "";
  searchQuery.value = "";
  sortBy.value = "";
  sortOrder.value = "asc";
  loadProducts();
};

// Modal state
const isModalOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

// Variant Modal state
const isVariantModalOpen = ref(false);
const selectedProductForVariants = ref<Product | null>(null);

// Modal handlers
const openEditModal = (product: Product) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProduct.value = null;
};

const handleProductSuccess = () => {
  loadProducts();
  closeModal();
  toast.showSuccess("Thao tác thành công!");
};

const openAddModal = () => {
  selectedProduct.value = null;
  isModalOpen.value = true;
};

// Variant Modal handlers
const openVariantModal = (product: Product) => {
  selectedProductForVariants.value = product;
  isVariantModalOpen.value = true;
};

const closeVariantModal = () => {
  isVariantModalOpen.value = false;
  selectedProductForVariants.value = null;
};

const handleVariantSuccess = () => {
  toast.showSuccess("Thao tác biến thể thành công!");
};

// Handle view product details
const handleViewDetail = (id: number) => {
  router.push(`/admin/products/${id}`);
};

// Watch for filter and sort changes
watch([categoryFilter, brandFilter, statusFilter], () => {
  loadProducts();
});

watch([sortBy, sortOrder], () => {
  loadProducts();
});

// Show error alerts
watch(error, (newError) => {
  if (newError) {
    toast.showError(newError);
    clearError();
  }
});

// Initialize
onMounted(async () => {
  await Promise.all([loadProducts(), loadCategories(), loadBrands()]);
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
