<template>
  <div class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm">
    <!-- Table Header Actions -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- Bulk Actions -->
          <div
            v-if="selectedIds.length > 0"
            class="flex items-center space-x-2"
          >
            <span
              class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              Đã chọn {{ selectedIds.length }} mục
            </span>
            <button
              @click="handleBulkDelete"
              :disabled="isDeleting"
              class="px-3 py-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 border border-red-300 hover:border-red-400 rounded transition-colors disabled:opacity-50"
            >
              <span v-if="isDeleting">Đang xóa...</span>
              <span v-else>Xóa đã chọn</span>
            </button>
          </div>
        </div>

        <!-- Add New Button -->
        <button
          @click="$emit('add')"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          Thêm danh mục
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="w-12 px-4 py-3">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleSelectAll"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Tên danh mục
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Số sản phẩm
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Ngày tạo
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr v-if="isLoading">
            <td colspan="6" class="px-4 py-8 text-center">
              <div class="flex items-center justify-center">
                <svg
                  class="animate-spin h-6 w-6 text-blue-600"
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
          <tr v-else-if="categories.length === 0">
            <td
              colspan="6"
              class="px-4 py-8 text-center text-light-text-secondary dark:text-dark-text-secondary"
            >
              Không có danh mục nào
            </td>
          </tr>
          <tr
            v-else
            v-for="category in categories"
            :key="category.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <td class="px-4 py-4">
              <input
                type="checkbox"
                :value="category.id"
                v-model="selectedIds"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </td>
            <td
              class="px-4 py-4 text-sm text-light-text-primary dark:text-dark-text-primary"
            >
              {{ category.id }}
            </td>
            <td
              class="px-4 py-4 text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
            >
              {{ category.name }}
            </td>
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {{ category.products_count }}
            </td>
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {{ formatDate(category.created_at) }}
            </td>
            <td class="px-4 py-4 text-sm">
              <div class="flex items-center space-x-2">
                <button
                  @click="$emit('edit', category)"
                  class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Sửa
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
import { ref, computed } from "vue";
import type { Category } from "../../../types/admin/category";
import { categoryService } from "../../../services/admin/categoryService";
import { handleApiError } from "../../../services/api";

interface Props {
  categories: Category[];
  isLoading: boolean;
}

interface Emits {
  add: [];
  edit: [category: Category];
  refresh: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedIds = ref<number[]>([]);
const isDeleting = ref(false);

const isAllSelected = computed(() => {
  return (
    props.categories.length > 0 &&
    selectedIds.value.length === props.categories.length
  );
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = props.categories.map((category) => category.id);
  }
};

const handleBulkDelete = async () => {
  if (selectedIds.value.length === 0) return;

  if (
    !confirm(
      `Bạn có chắc chắn muốn xóa ${selectedIds.value.length} danh mục đã chọn?`
    )
  ) {
    return;
  }

  isDeleting.value = true;

  try {
    await categoryService.bulkDeleteCategories({ ids: selectedIds.value });
    selectedIds.value = [];
    emit("refresh");
  } catch (error: any) {
    handleApiError(error);
    alert("Có lỗi xảy ra khi xóa danh mục");
  } finally {
    isDeleting.value = false;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
