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
          title="Thêm danh mục"
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
                class="rounded border-gray-300 text-light-accent-sport focus:ring-light-accent-sport dark:text-dark-accent-sport dark:focus:ring-dark-accent-sport"
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
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="
                  category.products_count > 0
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                "
              >
                {{ category.products_count }} sản phẩm
              </span>
            </td>
            <td
              class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {{ formatDate(category.created_at) }}
            </td>
            <td class="px-4 py-4 text-sm">
              <button
                @click="$emit('edit', category)"
                class="p-2 text-light-accent-sport hover:text-light-accent-sport-hover dark:text-dark-accent-sport dark:hover:text-dark-accent-sport-hover hover:bg-light-bg-secondary dark:hover:bg-dark-bg-primary rounded-md transition-colors"
                title="Sửa danh mục"
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDialog } from "naive-ui";
import { useCategory } from "@/composables/useCategory";
import { useNotification } from "@/composables/useNotification";
import type { Category } from "@/types/admin/category";

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

// Use category composable for bulk operations
const { bulkDeleteCategories } = useCategory();
const { showSuccess, showError } = useNotification();
const dialog = useDialog();

// Selection state
const selectedIds = ref<number[]>([]);
const isDeleting = ref(false);

// Computed
const isAllSelected = computed(() => {
  return (
    props.categories.length > 0 &&
    props.categories.every((category) =>
      selectedIds.value.includes(category.id)
    )
  );
});

// Selection methods
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = props.categories.map((category) => category.id);
  }
};

// Bulk delete handler
const handleBulkDelete = async () => {
  if (selectedIds.value.length === 0) return;

  dialog.warning({
    title: "Xác nhận xóa",
    content: `Bạn có chắc chắn muốn xóa ${selectedIds.value.length} danh mục đã chọn? Hành động này không thể hoàn tác.`,
    positiveText: "Xóa",
    negativeText: "Hủy",
    class: "custom-dialog",
    style: {
      "--n-color": "var(--bg-secondary)",
      "--n-text-color": "var(--text-primary)",
      "--n-title-text-color": "var(--text-primary)",
      "--n-content-text-color": "var(--text-secondary)",
      "--n-action-color": "var(--bg-primary)",
      "--n-border-color": "var(--border-primary)",
      "--n-border-radius": "16px",
      "--n-box-shadow": "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
    onPositiveClick: async () => {
      isDeleting.value = true;

      try {
        const deleteCount = selectedIds.value.length;
        await bulkDeleteCategories(selectedIds.value);
        selectedIds.value = [];
        emit("refresh");
        showSuccess(`Xóa thành công ${deleteCount} danh mục đã chọn`);
      } catch (error: any) {
        console.error("Bulk delete error:", error);
        showError(error.message || "Có lỗi xảy ra khi xóa danh mục");
      } finally {
        isDeleting.value = false;
      }
    },
  });
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

<style scoped>
/* Custom Dialog Styles for Dark Mode Support */
:deep(.custom-dialog) {
  background: var(--bg-secondary) !important;
  color: var(--text-primary) !important;
  border: 1px solid var(--border-primary) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(10px) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
}

:deep(.custom-dialog .n-dialog__title) {
  color: var(--text-primary) !important;
  font-weight: 600 !important;
}

:deep(.custom-dialog .n-dialog__content) {
  color: var(--text-secondary) !important;
}

:deep(.custom-dialog .n-dialog__action) {
  background: var(--bg-primary) !important;
  border-top: 1px solid var(--border-primary) !important;
}

:deep(.custom-dialog .n-button--primary-type) {
  background: var(--accent-danger) !important;
  border-color: var(--accent-danger) !important;
  color: white !important;
}

:deep(.custom-dialog .n-button--primary-type:hover) {
  background: var(--accent-danger) !important;
  opacity: 0.9 !important;
}

:deep(.custom-dialog .n-button--default-type) {
  background: var(--bg-secondary) !important;
  border-color: var(--border-primary) !important;
  color: var(--text-primary) !important;
}

:deep(.custom-dialog .n-button--default-type:hover) {
  background: var(--border-primary) !important;
}
</style>
