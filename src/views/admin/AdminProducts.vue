<template>
  <div class="p-2">
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
    <div
      class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm p-4 mb-6"
    >
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary"
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

        <!-- Filters -->
        <div class="flex flex-col sm:flex-row gap-2">
          <!-- Category Filter -->
          <select
            v-model="categoryFilter"
            @change="() => loadProducts()"
            class="form-input min-w-[150px]"
          >
            <option value="">Tất cả danh mục</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>

          <!-- Brand Filter -->
          <select
            v-model="brandFilter"
            @change="() => loadProducts()"
            class="form-input min-w-[150px]"
          >
            <option value="">Tất cả thương hiệu</option>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="statusFilter"
            @change="() => loadProducts()"
            class="form-input min-w-[140px]"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Hoạt động</option>
            <option value="false">Không hoạt động</option>
          </select>

          <!-- Sort Options -->
          <select
            v-model="sortBy"
            @change="() => loadProducts()"
            class="form-input min-w-[140px]"
          >
            <option value="">Sắp xếp theo</option>
            <option value="name">Tên</option>
            <option value="price">Giá</option>
            <option value="stock_quantity">Tồn kho</option>
            <option value="created_at">Ngày tạo</option>
          </select>

          <select
            v-model="sortOrder"
            @change="() => loadProducts()"
            class="form-input min-w-[120px]"
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
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
import { ref, onMounted, watch } from "vue";
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
