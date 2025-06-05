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
        <div v-else></div>
        <button
          @click="$emit('add')"
          class="flex items-center px-4 py-2 text-white bg-gradient-sport hover:bg-gradient-sport-hover rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          title="Thêm thương hiệu"
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
          Thêm thương hiệu
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
                class="rounded border-gray-300 text-light-accent-sport focus:ring-light-accent-sport dark:text-dark-accent-sport dark:focus:ring-dark-accent-sport"
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
              Tên thương hiệu
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
          <tr v-else-if="brands.length === 0">
            <td colspan="6" class="px-4 py-8 text-center">
              <div class="flex flex-col items-center">
                <svg
                  class="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4"
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
                <p
                  class="text-light-text-secondary dark:text-dark-text-secondary text-lg mb-2"
                >
                  Không có thương hiệu nào
                </p>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Hãy thêm thương hiệu đầu tiên của bạn
                </p>
                <button
                  @click="$emit('add')"
                  class="px-4 py-2 text-white bg-gradient-sport hover:bg-gradient-sport-hover rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Thêm thương hiệu
                </button>
              </div>
            </td>
          </tr>
          <tr
            v-else
            v-for="brand in brands"
            :key="brand.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <td class="px-4 py-4">
              <input
                type="checkbox"
                :checked="selectedIds.includes(brand.id)"
                @change="toggleSelection(brand.id)"
                class="rounded border-gray-300 text-light-accent-sport focus:ring-light-accent-sport dark:text-dark-accent-sport dark:focus:ring-dark-accent-sport"
              />
            </td>
            <td
              class="px-4 py-4 text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
            >
              {{ brand.id }}
            </td>
            <td
              class="px-4 py-4 text-sm text-light-text-primary dark:text-dark-text-primary"
            >
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-gradient-sport rounded-full flex items-center justify-center text-white text-xs font-bold mr-3"
                >
                  {{ brand.name.charAt(0).toUpperCase() }}
                </div>
                <span class="font-medium">{{ brand.name }}</span>
              </div>
            </td>
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="
                  brand.products_count > 0
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                "
              >
                {{ brand.products_count }} sản phẩm
              </span>
            </td>
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {{ formatDate(brand.created_at) }}
            </td>
            <td class="px-4 py-4 text-sm font-medium">
              <div class="flex items-center space-x-2">
                <button
                  @click="$emit('edit', brand)"
                  class="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
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
import { ref } from "vue";
import { useBrand } from "@/composables/useBrand";
import { useNotification } from "@/composables/useNotification";
import type { Brand } from "@/types/admin/brand";

// Props
interface Props {
  brands: Brand[];
  isLoading: boolean;
}

defineProps<Props>();

// Emits
const emit = defineEmits<{
  add: [];
  edit: [brand: Brand];
  refresh: [];
}>();

// Use composables
const {
  selectedIds,
  isAllSelected,
  toggleSelectAll,
  toggleSelection,
  bulkDeleteBrands,
} = useBrand();

const { showSuccess, showError, showConfirm } = useNotification();

// Local state
const isDeleting = ref(false);

// Methods
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

const handleBulkDelete = async () => {
  if (selectedIds.value.length === 0) return;

  const confirmed = await showConfirm(
    "Xác nhận xóa",
    `Bạn có chắc chắn muốn xóa ${selectedIds.value.length} thương hiệu đã chọn?`,
    "Xóa tất cả",
    "Hủy"
  );

  if (!confirmed) return;

  try {
    isDeleting.value = true;
    await bulkDeleteBrands([...selectedIds.value]);
    showSuccess(`Xóa ${selectedIds.value.length} thương hiệu thành công!`);
    // Emit refresh to parent
    emit("refresh");
  } catch (error: any) {
    showError(error.message || "Có lỗi xảy ra khi xóa các thương hiệu đã chọn");
  } finally {
    isDeleting.value = false;
  }
};
</script>
