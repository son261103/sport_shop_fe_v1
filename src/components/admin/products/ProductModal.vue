<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] overflow-y-auto">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-2">
      <div
        class="relative bg-white dark:bg-dark-bg-secondary rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h3
            class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary"
          >
            {{ isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới" }}
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
        <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
          <!-- Row 1: Product Name -->
          <div>
            <label for="productName" class="form-label"> Tên sản phẩm * </label>
            <input
              id="productName"
              v-model="formData.name"
              type="text"
              required
              class="form-input"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <!-- Row 2: Price, Discount Price, Stock Quantity -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label for="price" class="form-label"> Giá * </label>
              <input
                id="price"
                v-model.number="formData.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="form-input"
                placeholder="0.00"
              />
            </div>
            <div>
              <label for="discountPrice" class="form-label">
                Giá khuyến mãi
              </label>
              <input
                id="discountPrice"
                v-model.number="formData.discount_price"
                type="number"
                step="0.01"
                min="0"
                :max="formData.price"
                class="form-input"
                placeholder="0.00"
              />
            </div>
            <div>
              <label for="stockQuantity" class="form-label">
                Số lượng tồn kho
              </label>
              <input
                id="stockQuantity"
                v-model.number="formData.stock_quantity"
                type="number"
                min="0"
                class="form-input"
                placeholder="0"
              />
            </div>
          </div>

          <!-- Row 3: Category, Brand, Status -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label for="category" class="form-label"> Danh mục </label>
              <select
                id="category"
                v-model="formData.category_id"
                class="form-input"
              >
                <option value="" disabled>Chọn danh mục</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="brand" class="form-label"> Thương hiệu </label>
              <select id="brand" v-model="formData.brand_id" class="form-input">
                <option value="" disabled>Chọn thương hiệu</option>
                <option
                  v-for="brand in brands"
                  :key="brand.id"
                  :value="brand.id"
                >
                  {{ brand.name }}
                </option>
              </select>
            </div>
            <div class="flex items-end">
              <label class="flex items-center h-10 cursor-pointer group">
                <div class="relative">
                  <input
                    v-model="formData.is_active"
                    type="checkbox"
                    class="sr-only"
                  />
                  <div
                    class="w-5 h-5 rounded-md border-2 border-light-border-primary dark:border-dark-border-primary bg-white dark:bg-dark-bg-primary transition-all duration-200 group-hover:border-light-accent-sport dark:group-hover:border-dark-accent-sport flex items-center justify-center"
                    :class="{
                      'bg-light-accent-sport dark:bg-dark-accent-sport border-light-accent-sport dark:border-dark-accent-sport':
                        formData.is_active,
                    }"
                  >
                    <svg
                      v-if="formData.is_active"
                      class="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span
                  class="ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-200"
                >
                  Kích hoạt sản phẩm
                </span>
              </label>
            </div>
          </div>

          <!-- Row 4: Description and Image Upload -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Description -->
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"
              >
                Mô tả
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="3"
                class="form-input resize-none"
                placeholder="Nhập mô tả sản phẩm"
              ></textarea>
            </div>

            <!-- Image Upload -->
            <div>
              <label for="image" class="form-label"> Hình ảnh sản phẩm </label>
              <div class="space-y-3">
                <!-- Upload Input -->
                <div class="relative">
                  <input
                    id="image"
                    ref="fileInput"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    @change="handleFileChange"
                    class="form-input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-light-accent-sport file:text-white hover:file:bg-opacity-90 file:cursor-pointer"
                  />
                  <p
                    class="text-xs text-light-text-muted dark:text-dark-text-muted mt-1"
                  >
                    JPEG, PNG, JPG, GIF, WEBP. Tối đa 2MB.
                  </p>
                </div>

                <!-- Image Preview with Remove Button -->
                <div v-if="imagePreview" class="relative inline-block">
                  <div
                    class="card p-2 bg-light-bg-primary dark:bg-dark-bg-primary"
                  >
                    <img
                      :src="imagePreview"
                      alt="Preview"
                      class="w-24 h-24 object-cover rounded-lg border-2 border-light-border-primary dark:border-dark-border-primary"
                    />
                    <button
                      type="button"
                      @click="removeImage"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-light-accent-danger dark:bg-dark-accent-danger text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-200 shadow-lg hover:scale-110"
                      title="Xóa ảnh"
                    >
                      <svg
                        class="w-3 h-3"
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
                  <p
                    class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1 text-center"
                  >
                    Ảnh mới
                  </p>
                </div>

                <!-- Existing Image with Remove Button -->
                <div
                  v-else-if="isEdit && product?.image && !imageRemoved"
                  class="relative inline-block"
                >
                  <div
                    class="card p-2 bg-light-bg-primary dark:bg-dark-bg-primary"
                  >
                    <img
                      :src="product.image"
                      alt="Current image"
                      class="w-24 h-24 object-cover rounded-lg border-2 border-light-border-primary dark:border-dark-border-primary"
                    />
                    <button
                      type="button"
                      @click="removeExistingImage"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-light-accent-danger dark:bg-dark-accent-danger text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-200 shadow-lg hover:scale-110"
                      title="Xóa ảnh hiện tại"
                    >
                      <svg
                        class="w-3 h-3"
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
                  <p
                    class="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1 text-center"
                  >
                    Ảnh hiện tại
                  </p>
                </div>

                <!-- No Image State -->
                <div
                  v-else-if="!imagePreview && (!product?.image || imageRemoved)"
                  class="text-center py-4"
                >
                  <div
                    class="w-24 h-24 mx-auto bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg border-2 border-dashed border-light-border-primary dark:border-dark-border-primary flex items-center justify-center"
                  >
                    <svg
                      class="w-8 h-8 text-light-text-muted dark:text-dark-text-muted"
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
                  <p
                    class="text-xs text-light-text-muted dark:text-dark-text-muted mt-2"
                  >
                    Chưa có ảnh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div
            class="flex justify-end space-x-3 pt-4 border-t border-light-border-secondary dark:border-dark-border-secondary"
          >
            <button type="button" @click="closeModal" class="btn-secondary">
              Hủy
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary-animated"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <div class="loading-spinner mr-2"></div>
                Đang xử lý...
              </span>
              <span v-else>{{ isEdit ? "Cập nhật" : "Tạo mới" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type { Product, ProductFormData } from "@/types/admin/product";
import type { Category } from "@/types/admin/category";
import type { Brand } from "@/types/admin/brand";

// Props
interface Props {
  isOpen: boolean;
  product?: Product | null;
  categories: Category[];
  brands: Brand[];
}

const props = withDefaults(defineProps<Props>(), {
  product: null,
});

// Emits
interface Emits {
  close: [];
  success: [response: any];
}

const emit = defineEmits<Emits>();

// Refs
const fileInput = ref<HTMLInputElement>();
const isSubmitting = ref(false);
const imagePreview = ref<string | null>(null);
const imageRemoved = ref(false);

// Form data
const formData = ref<ProductFormData>({
  name: "",
  price: 0,
  discount_price: undefined,
  description: "",
  stock_quantity: 0,
  is_active: true,
  category_id: undefined,
  brand_id: undefined,
  image: undefined,
});

// Computed
const isEdit = computed(() => !!props.product);

// Methods
const resetForm = () => {
  formData.value = {
    name: "",
    price: 0,
    discount_price: undefined,
    description: "",
    stock_quantity: 0,
    is_active: true,
    category_id: undefined,
    brand_id: undefined,
    image: undefined,
  };
  imagePreview.value = null;
  imageRemoved.value = false;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const populateForm = () => {
  if (props.product) {
    formData.value = {
      name: props.product.name,
      price: parseFloat(props.product.price),
      discount_price: props.product.discount_price
        ? parseFloat(props.product.discount_price)
        : undefined,
      description: props.product.description || "",
      stock_quantity: props.product.stock_quantity,
      is_active: props.product.is_active,
      category_id: props.product.category_id,
      brand_id: props.product.brand_id,
      image: undefined, // Don't populate file input
    };
    imageRemoved.value = false;
  }
};

const removeImage = () => {
  imagePreview.value = null;
  formData.value.image = undefined;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const removeExistingImage = () => {
  imageRemoved.value = true;
  formData.value.image = undefined;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Kích thước file không được vượt quá 2MB");
      target.value = "";
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Chỉ chấp nhận file ảnh định dạng JPEG, PNG, JPG, GIF, WEBP");
      target.value = "";
      return;
    }

    formData.value.image = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    formData.value.image = undefined;
    imagePreview.value = null;
  }
};

const closeModal = () => {
  resetForm();
  emit("close");
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  // Validate required fields
  if (!formData.value.name.trim()) {
    alert("Vui lòng nhập tên sản phẩm");
    return;
  }

  if (formData.value.price <= 0) {
    alert("Giá sản phẩm phải lớn hơn 0");
    return;
  }

  if (
    formData.value.discount_price &&
    formData.value.discount_price > formData.value.price
  ) {
    alert("Giá khuyến mãi không được lớn hơn giá gốc");
    return;
  }

  isSubmitting.value = true;

  try {
    // Prepare form data
    const submitData = { ...formData.value };

    // Convert empty strings to undefined for optional fields
    if (!submitData.description?.trim()) {
      submitData.description = undefined;
    }

    if (!submitData.category_id) {
      submitData.category_id = undefined;
    }

    if (!submitData.brand_id) {
      submitData.brand_id = undefined;
    }

    emit("success", submitData);
  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// Watchers
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        if (isEdit.value) {
          populateForm();
        } else {
          resetForm();
        }
      });
    }
  }
);

watch(
  () => props.product,
  () => {
    if (props.isOpen && isEdit.value) {
      populateForm();
    }
  }
);
</script>

<style scoped>
/* Force dark mode styles for modal forms */
.form-input,
input,
select,
textarea {
  background-color: white !important;
  color: rgb(55 65 81) !important;
  border-color: rgb(229 231 235) !important;
}

:global(.dark) .form-input,
:global(.dark) input,
:global(.dark) select,
:global(.dark) textarea {
  background-color: rgb(31 41 55) !important;
  color: rgb(248 250 252) !important;
  border-color: rgb(75 85 99) !important;
}

input::placeholder,
textarea::placeholder {
  color: rgb(156 163 175) !important;
}

:global(.dark) input::placeholder,
:global(.dark) textarea::placeholder {
  color: rgb(107 114 128) !important;
}

select option {
  background-color: white !important;
  color: rgb(55 65 81) !important;
}

:global(.dark) select option {
  background-color: rgb(31 41 55) !important;
  color: rgb(248 250 252) !important;
}
</style>
