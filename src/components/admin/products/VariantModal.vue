<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="$emit('close')"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white dark:bg-dark-bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
      >
        <!-- Header -->
        <div
          class="bg-white dark:bg-dark-bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3
                class="text-lg leading-6 font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Quản lý biến thể sản phẩm
              </h3>
              <p
                class="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary"
              >
                {{ product?.name || "Sản phẩm" }}
              </p>
            </div>
            <button
              @click="$emit('close')"
              class="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-4 pb-4 sm:px-6">
          <!-- Add Variant Form -->
          <div class="mb-6 p-4 bg-gray-50 dark:bg-dark-bg-primary rounded-lg">
            <h4
              class="text-md font-medium text-light-text-primary dark:text-dark-text-primary mb-4"
            >
              {{ editingVariant ? "Chỉnh sửa biến thể" : "Thêm biến thể mới" }}
            </h4>
            <form
              @submit.prevent="handleSubmit"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <!-- Size -->
              <div>
                <label
                  class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"
                >
                  Kích thước *
                </label>
                <input
                  v-model="formData.size"
                  type="text"
                  required
                  placeholder="VD: S, M, L, XL"
                  class="form-input w-full"
                />
              </div>

              <!-- Color -->
              <div>
                <label
                  class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"
                >
                  Màu sắc *
                </label>
                <input
                  v-model="formData.color"
                  type="text"
                  required
                  placeholder="VD: Đen, Trắng, Xanh"
                  class="form-input w-full"
                />
              </div>

              <!-- Stock Quantity -->
              <div>
                <label
                  class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"
                >
                  Số lượng tồn kho *
                </label>
                <input
                  v-model.number="formData.stock_quantity"
                  type="number"
                  min="0"
                  required
                  @input="validateStockQuantity"
                  class="form-input w-full"
                  :class="{ 'border-red-500 focus:border-red-500': stockError }"
                />
                <div v-if="stockError" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ stockError }}
                </div>
                <div v-if="props.product" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Tổng số lượng sản phẩm: {{ props.product.stock_quantity }}
                </div>
              </div>

              <!-- Image -->
              <div>
                <label
                  class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2"
                >
                  Hình ảnh
                </label>

                <!-- Image Preview with Controls -->
                <div v-if="imagePreview" class="space-y-3">
                  <div class="flex items-start space-x-4">
                    <!-- Image Preview -->
                    <div class="relative">
                      <img
                        :src="imagePreview"
                        alt="Preview"
                        class="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                      />
                    </div>

                    <!-- Image Controls -->
                    <div class="flex flex-col space-y-2 pt-2">
                      <button
                        type="button"
                        @click="triggerFileInput"
                        class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          ></path>
                        </svg>
                      </button>

                      <button
                        type="button"
                        @click="removeImage"
                        class="inline-flex items-center px-3 py-2 border border-red-300 dark:border-red-600 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Upload Area (when no image) -->
                <div
                  v-else
                  @click="triggerFileInput"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleDrop"
                  class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                  :class="{
                    'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20':
                      isDragging,
                  }"
                >
                  <div class="flex flex-col items-center space-y-2">
                    <svg
                      class="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      <span class="font-medium text-blue-600 dark:text-blue-400"
                        >Nhấp để chọn</span
                      >
                      hoặc kéo thả ảnh vào đây
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-500">
                      PNG, JPG, GIF tối đa 10MB
                    </div>
                  </div>
                </div>

                <input
                  ref="imageInput"
                  type="file"
                  accept="image/*"
                  @change="handleImageChange"
                  class="hidden"
                />
              </div>

              <!-- Active Status -->
              <div class="flex items-center">
                <input
                  v-model="formData.is_active"
                  type="checkbox"
                  id="is_active"
                  class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <label
                  for="is_active"
                  class="ml-2 text-sm text-light-text-primary dark:text-dark-text-primary"
                >
                  Kích hoạt
                </label>
              </div>

              <!-- Submit Button -->
              <div class="flex space-x-2">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex-1 bg-gradient-sport hover:bg-gradient-sport-hover text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  <span v-if="isSubmitting">Đang xử lý...</span>
                  <span v-else>{{
                    editingVariant ? "Cập nhật" : "Thêm mới"
                  }}</span>
                </button>
                <button
                  v-if="editingVariant"
                  type="button"
                  @click="cancelEdit"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-light-text-primary dark:text-dark-text-primary rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>

          <!-- Variants List -->
          <div
            class="bg-white dark:bg-dark-bg-secondary rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div
              class="px-4 py-3 border-b border-gray-200 dark:border-gray-700"
            >
              <h4
                class="text-md font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Danh sách biến thể ({{ variants.length }})
              </h4>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="p-8 text-center">
              <div class="flex items-center justify-center">
                <svg
                  class="animate-spin h-6 w-6 text-blue-500"
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
            </div>

            <!-- Empty State -->
            <div v-else-if="variants.length === 0" class="p-8 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3
                class="mt-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Chưa có biến thể
              </h3>
              <p
                class="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary"
              >
                Thêm biến thể đầu tiên cho sản phẩm này.
              </p>
            </div>

            <!-- Variants Table -->
            <div v-else class="overflow-x-auto">
              <table
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
              >
                <thead class="bg-gray-50 dark:bg-dark-bg-primary">
                  <tr>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Hình ảnh
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Kích thước
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Màu sắc
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Tồn kho
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <tr
                    v-for="variant in variants"
                    :key="variant.id"
                    class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <!-- Image -->
                    <td class="px-4 py-4">
                      <div
                        class="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
                      >
                        <img
                          v-if="variant.image"
                          :src="variant.image"
                          :alt="`${variant.size} - ${variant.color}`"
                          class="w-full h-full object-cover"
                        />
                        <div
                          v-else
                          class="w-full h-full flex items-center justify-center text-gray-400"
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>

                    <!-- Size -->
                    <td
                      class="px-4 py-4 text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      {{ variant.size }}
                    </td>

                    <!-- Color -->
                    <td
                      class="px-4 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                    >
                      {{ variant.color }}
                    </td>

                    <!-- Stock -->
                    <td class="px-4 py-4">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400':
                            variant.stock_quantity === 0,
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400':
                            variant.stock_quantity > 0 &&
                            variant.stock_quantity <= 10,
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400':
                            variant.stock_quantity > 10,
                        }"
                      >
                        {{ variant.stock_quantity }}
                      </span>
                    </td>

                    <!-- Status -->
                    <td class="px-4 py-4">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400':
                            variant.is_active,
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400':
                            !variant.is_active,
                        }"
                      >
                        {{
                          variant.is_active ? "Hoạt động" : "Không hoạt động"
                        }}
                      </span>
                    </td>

                    <!-- Actions -->
                    <td class="px-4 py-4 text-right">
                      <div class="flex items-center justify-end space-x-2">
                        <!-- Edit Button -->
                        <button
                          @click="editVariant(variant)"
                          class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
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
                            />
                          </svg>
                        </button>

                        <!-- Delete Button -->
                        <button
                          @click="confirmDelete(variant)"
                          class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                          title="Xóa"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="bg-gray-50 dark:bg-dark-bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
        >
          <button
            @click="$emit('close')"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-secondary text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useVariant } from "@/composables/useVariant";
import { useNotification } from "@/composables/useNotification";
import type { Product } from "@/types/admin/product";
import type { ProductVariant, VariantFormData } from "@/types/admin/variant";

// Props
interface Props {
  isOpen: boolean;
  product: Product | null;
}

const props = defineProps<Props>();

// Emits
interface Emits {
  close: [];
  success: [];
}

const emit = defineEmits<Emits>();

// Composables
const {
  variants,
  isLoading,
  loadVariants,
  createVariant,
  updateVariant,
  deleteVariant,
} = useVariant();
const toast = useNotification();

// Form state
const formData = reactive<VariantFormData>({
  size: "",
  color: "",
  stock_quantity: 0,
  is_active: true,
  image: undefined,
});

// Validation state
const stockError = ref<string | null>(null);

// Image preview state
const imagePreview = ref<string | null>(null);
const isDragging = ref(false);
const imageInput = ref<HTMLInputElement | null>(null);

const editingVariant = ref<ProductVariant | null>(null);
const isSubmitting = ref(false);

// Methods
const resetForm = () => {
  formData.size = "";
  formData.color = "";
  formData.stock_quantity = 0;
  formData.is_active = true;
  formData.image = undefined;
  imagePreview.value = null;
  stockError.value = null;
  editingVariant.value = null;
  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    formData.image = file;
    createImagePreview(file);
  }
};

const createImagePreview = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const triggerFileInput = () => {
  imageInput.value?.click();
};

const removeImage = () => {
  formData.image = undefined;
  imagePreview.value = null;
  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    const file = files[0];
    if (file.type.startsWith("image/")) {
      formData.image = file;
      createImagePreview(file);
    }
  }
};

// Validation methods
const validateStockQuantity = () => {
  if (!props.product) return true;
  
  // Calculate current total stock of all variants
  const currentTotalStock = variants.value.reduce((total, variant) => {
    // If editing, exclude the current variant from calculation
    if (editingVariant.value && variant.id === editingVariant.value.id) {
      return total;
    }
    return total + variant.stock_quantity;
  }, 0);
  
  const newTotalStock = currentTotalStock + formData.stock_quantity;
  
  if (newTotalStock > props.product.stock_quantity) {
    stockError.value = `Tổng số lượng tồn kho của các biến thể không được vượt quá số lượng sản phẩm (${props.product.stock_quantity}). Hiện tại: ${currentTotalStock}, thêm: ${formData.stock_quantity}, tổng: ${newTotalStock}`;
    return false;
  }
  
  stockError.value = null;
  return true;
};

const handleSubmit = async () => {
  if (!props.product) return;
  
  // Validate stock quantity before submitting
  if (!validateStockQuantity()) {
    return;
  }

  isSubmitting.value = true;
  try {
    if (editingVariant.value) {
      // Update variant
      const updateData: Partial<VariantFormData> = {
        size: formData.size,
        color: formData.color,
        stock_quantity: formData.stock_quantity,
        is_active: formData.is_active,
      };

      await updateVariant(
        props.product.id,
        editingVariant.value.id,
        updateData
      );
      toast.showSuccess("Cập nhật biến thể thành công!");
    } else {
      // Create new variant
      await createVariant(props.product.id, formData);
      toast.showSuccess("Thêm biến thể thành công!");
    }

    resetForm();
    emit("success");
  } catch (error: any) {
    toast.showError(error.response?.data?.message || "Có lỗi xảy ra!");
  } finally {
    isSubmitting.value = false;
  }
};

const editVariant = (variant: ProductVariant) => {
  editingVariant.value = variant;
  formData.size = variant.size;
  formData.color = variant.color;
  formData.stock_quantity = variant.stock_quantity;
  formData.is_active = variant.is_active;
  formData.image = undefined;

  // Set image preview if variant has an image
  if (variant.image) {
    imagePreview.value = variant.image;
  } else {
    imagePreview.value = null;
  }

  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const cancelEdit = () => {
  resetForm();
};

const confirmDelete = async (variant: ProductVariant) => {
  if (!props.product) return;

  if (
    confirm(
      `Bạn có chắc chắn muốn xóa biến thể "${variant.size} - ${variant.color}"?`
    )
  ) {
    try {
      await deleteVariant(props.product.id, variant.id);
      toast.showSuccess("Xóa biến thể thành công!");
      emit("success");
    } catch (error: any) {
      toast.showError(
        error.response?.data?.message || "Có lỗi xảy ra khi xóa biến thể!"
      );
    }
  }
};

// Watch for modal open/close
watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen && props.product) {
      await loadVariants(props.product.id);
      resetForm();
    }
  }
);
</script>
