<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative bg-white dark:bg-dark-bg-secondary rounded-lg shadow-xl max-w-md w-full"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h3
            class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary"
          >
            {{ isEdit ? "Sửa danh mục" : "Thêm danh mục mới" }}
          </h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6">
          <div class="mb-4">
            <label
              for="categoryName"
              class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2"
            >
              Tên danh mục
            </label>
            <input
              id="categoryName"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary"
              placeholder="Nhập tên danh mục"
            />
          </div>

          <!-- Validation Errors -->
          <div v-if="errors.length > 0" class="mb-4">
            <div
              v-for="error in errors"
              :key="error.field"
              class="text-red-600 dark:text-red-400 text-sm"
            >
              {{ error.message }}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Đang xử lý...
              </span>
              <span v-else>
                {{ isEdit ? "Cập nhật" : "Thêm mới" }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { Category, CategoryFormData } from "../../../types/admin/category";
import type { ValidationError } from "../../../types/api";
import { categoryService } from "../../../services/admin/categoryService";
import { handleApiError } from "../../../services/api";

interface Props {
  isOpen: boolean;
  category?: Category | null;
}

interface Emits {
  close: [];
  success: [category: Category];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formData = ref<CategoryFormData>({
  name: "",
});

const isLoading = ref(false);
const errors = ref<ValidationError[]>([]);

const isEdit = computed(() => !!props.category);

// Watch for category changes to populate form
watch(
  () => props.category,
  (newCategory) => {
    if (newCategory) {
      formData.value = {
        name: newCategory.name,
      };
    } else {
      formData.value = {
        name: "",
      };
    }
    errors.value = [];
  },
  { immediate: true }
);

// Watch for modal open/close to reset form
watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      formData.value = { name: "" };
      errors.value = [];
    }
  }
);

const closeModal = () => {
  emit("close");
};

const handleSubmit = async () => {
  isLoading.value = true;
  errors.value = [];

  try {
    let response;

    if (isEdit.value && props.category) {
      response = await categoryService.updateCategory(
        props.category.id,
        formData.value
      );
    } else {
      response = await categoryService.createCategory(formData.value);
    }

    emit("success", response.data);
    closeModal();
  } catch (error: any) {
    const validationErrors = handleApiError(error);
    if (Array.isArray(validationErrors)) {
      errors.value = validationErrors;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
