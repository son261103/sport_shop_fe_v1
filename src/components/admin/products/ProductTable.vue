<template>
  <div class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm">
    <!-- Table Header Actions -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div v-if="selectedIds.length > 0" class="flex items-center space-x-2">
          <span
            class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >Đã chọn {{ selectedIds.length }} mục</span
          >
          <button
            @click="handleBulkDelete"
            :disabled="isDeleting"
            class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50"
            title="Xóa đã chọn"
          >
            <svg
              v-if="isDeleting"
              class="w-4 h-4 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
        <div
          v-else
          class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
        >
          Tổng cộng {{ totalProducts }} sản phẩm
        </div>
        <button
          @click="$emit('add')"
          class="flex items-center px-4 py-2 text-white bg-gradient-sport hover:bg-gradient-sport-hover rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          title="Thêm sản phẩm mới"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Thêm sản phẩm
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-dark-bg-primary">
          <tr>
            <th scope="col" class="px-4 py-3 text-left">
              <input
                type="checkbox"
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="selectAll"
                class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </th>
            <th scope="col" class="px-4 py-3 text-left">
              <span
                class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Hình ảnh
              </span>
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="handleSort('name')"
            >
              <div class="flex items-center space-x-1">
                <span
                  class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Tên sản phẩm
                </span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  :class="{
                    'text-blue-500': sortBy === 'name',
                    'rotate-180': sortBy === 'name' && sortOrder === 'desc',
                  }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              </div>
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="handleSort('price')"
            >
              <div class="flex items-center space-x-1">
                <span
                  class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Giá
                </span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  :class="{
                    'text-blue-500': sortBy === 'price',
                    'rotate-180': sortBy === 'price' && sortOrder === 'desc',
                  }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              </div>
            </th>
            <th scope="col" class="px-4 py-3 text-left">
              <span
                class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Danh mục
              </span>
            </th>
            <th scope="col" class="px-4 py-3 text-left">
              <span
                class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Thương hiệu
              </span>
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="handleSort('stock_quantity')"
            >
              <div class="flex items-center space-x-1">
                <span
                  class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Tồn kho
                </span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  :class="{
                    'text-blue-500': sortBy === 'stock_quantity',
                    'rotate-180':
                      sortBy === 'stock_quantity' && sortOrder === 'desc',
                  }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              </div>
            </th>
            <th scope="col" class="px-4 py-3 text-left">
              <span
                class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Trạng thái
              </span>
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="handleSort('created_at')"
            >
              <div class="flex items-center space-x-1">
                <span
                  class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Ngày tạo
                </span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  :class="{
                    'text-blue-500': sortBy === 'created_at',
                    'rotate-180':
                      sortBy === 'created_at' && sortOrder === 'desc',
                  }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              </div>
            </th>
            <th scope="col" class="px-4 py-3 text-center">
              <span
                class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Thao tác
              </span>
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700"
        >
          <!-- Loading State -->
          <tr v-if="isLoading">
            <td colspan="10" class="px-4 py-8 text-center">
              <div class="flex items-center justify-center">
                <svg
                  class="animate-spin h-6 w-6 text-light-accent-sport dark:text-dark-accent-sport"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span
                  class="ml-2 text-light-text-secondary dark:text-dark-text-secondary"
                  >Đang tải...</span
                >
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="!hasProducts">
            <td colspan="10" class="px-4 py-8 text-center">
              <div class="flex flex-col items-center space-y-2">
                <svg
                  class="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
                <span
                  class="text-light-text-secondary dark:text-dark-text-secondary"
                >
                  Không có sản phẩm nào
                </span>
              </div>
            </td>
          </tr>

          <!-- Product Rows -->
          <tr
            v-for="product in products"
            :key="product.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <!-- Checkbox -->
            <td class="px-4 py-4">
              <input
                type="checkbox"
                :checked="isSelected(product.id)"
                @change="toggleSelection(product.id)"
                class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </td>

            <!-- Image -->
            <td class="px-4 py-4">
              <div
                class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
              >
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-gray-400"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
            </td>

            <!-- Name -->
            <td class="px-4 py-4">
              <div class="flex flex-col">
                <button
                  @click="handleViewDetail(product.id)"
                  class="text-left font-medium text-light-text-primary dark:text-dark-text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {{ product.name }}
                </button>
                <p
                  v-if="product.description"
                  class="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1 line-clamp-2"
                >
                  {{ product.description }}
                </p>
              </div>
            </td>

            <!-- Price -->
            <td class="px-4 py-4">
              <div class="flex flex-col">
                <span
                  class="font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  {{ formatPrice(product.price) }}
                </span>
                <span
                  v-if="product.discount_price"
                  class="text-sm text-green-600 dark:text-green-400"
                >
                  {{ formatPrice(product.discount_price) }}
                </span>
              </div>
            </td>

            <!-- Category -->
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {{ product.category?.name || "-" }}
            </td>

            <!-- Brand -->
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {{ product.brand?.name || "-" }}
            </td>

            <!-- Stock -->
            <td class="px-4 py-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="{
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400':
                    product.stock_quantity === 0,
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400':
                    product.stock_quantity > 0 && product.stock_quantity <= 10,
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400':
                    product.stock_quantity > 10,
                }"
              >
                {{ product.stock_quantity }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-4 py-4">
              <button
                @click="handleToggleStatus(product.id)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors"
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40':
                    product.is_active,
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40':
                    !product.is_active,
                }"
              >
                {{ product.is_active ? "Hoạt động" : "Không hoạt động" }}
              </button>
            </td>

            <!-- Created At -->
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {{ formatDate(product.created_at) }}
            </td>

            <!-- Actions -->
            <td class="px-4 py-4 text-center">
              <div class="flex items-center justify-center space-x-2">
                <!-- View Detail Button -->
                <button
                  @click="handleViewDetail(product.id)"
                  class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                  title="Xem chi tiết"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>

                <!-- Manage Variants Button -->
                <button
                  @click="handleManageVariants(product)"
                  class="p-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                  title="Quản lý biến thể"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                </button>

                <!-- Edit Button -->
                <button
                  @click="handleEdit(product)"
                  class="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  title="Chỉnh sửa"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatPrice } from "@/utils";
import type { Product } from "@/types/admin/product";

// Props
interface Props {
  products?: Product[];
  isLoading: boolean;
  selectedIds: number[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  totalProducts: number;
  isDeleting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  isDeleting: false,
});

// Emits
interface Emits {
  "toggle-selection": [id: number];
  "select-all": [];
  "bulk-delete": [];
  add: [];
  edit: [product: Product];
  "view-detail": [id: number];
  "toggle-status": [id: number];
  "manage-variants": [product: Product];
  sort: [field: string];
}

const emit = defineEmits<Emits>();

// Computed
const hasProducts = computed(() => (props.products || []).length > 0);
const isAllSelected = computed(() => {
  const productList = props.products || [];
  return (
    productList.length > 0 &&
    productList.every((product) => props.selectedIds.includes(product.id))
  );
});
const isIndeterminate = computed(() => {
  const productList = props.products || [];
  return (
    props.selectedIds.length > 0 &&
    props.selectedIds.length < productList.length
  );
});

// Methods
const toggleSelection = (id: number) => {
  emit("toggle-selection", id);
};

const selectAll = () => {
  emit("select-all");
};

const isSelected = (id: number) => {
  return props.selectedIds.includes(id);
};

const handleBulkDelete = () => {
  emit("bulk-delete");
};

const handleEdit = (product: Product) => {
  emit("edit", product);
};

const handleViewDetail = (id: number) => {
  emit("view-detail", id);
};

const handleToggleStatus = (id: number) => {
  emit("toggle-status", id);
};

const handleManageVariants = (product: Product) => {
  emit("manage-variants", product);
};

const handleSort = (field: string) => {
  emit("sort", field);
};

// Utility functions

const formatDate = (dateString: string) => {
  if (!dateString) {
    return "Chưa có thông tin";
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  }

  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
