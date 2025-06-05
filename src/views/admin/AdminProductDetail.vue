<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-light-accent-sport dark:border-dark-accent-sport mx-auto mb-4"
        ></div>
        <span
          class="text-lg text-light-text-secondary dark:text-dark-text-secondary"
        >
          Đang tải thông tin sản phẩm...
        </span>
      </div>
    </div>

    <!-- Product Detail Content -->
    <div v-else-if="product" class="space-y-6">
      <!-- Header with Back Button -->
      <div class="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
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
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Quay lại
            </button>
            <div>
              <h1
                class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1"
              >
                {{ product.name }}
              </h1>
              <div class="flex items-center space-x-3">
                <p
                  class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
                >
                  ID: #{{ product.id }}
                </p>
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    product.is_active
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                  ]"
                >
                  {{ product.is_active ? "Hoạt động" : "Không hoạt động" }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex space-x-2">
            <button
              @click="openEditModal"
              class="flex items-center px-4 py-2 bg-gradient-sport hover:bg-gradient-sport-hover text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Chỉnh sửa
            </button>
            <button
              @click="toggleStatus"
              :class="[
                'flex items-center px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
                product.is_active
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white',
              ]"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="product.is_active"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {{ product.is_active ? "Vô hiệu hóa" : "Kích hoạt" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Product Information Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Product Image -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
          >
            <h3
              class="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center"
            >
              <svg
                class="w-4 h-4 mr-2 text-light-accent-sport dark:text-dark-accent-sport"
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
              Hình ảnh
            </h3>
            <div
              class="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden shadow-inner border-2 border-dashed border-gray-200 dark:border-gray-600"
            >
              <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div
                v-else
                class="w-full h-full flex flex-col items-center justify-center text-gray-400"
              >
                <svg
                  class="w-16 h-16 mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-xs font-medium">Chưa có hình ảnh</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Basic Information -->
        <div class="lg:col-span-3">
          <div
            class="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
          >
            <h3
              class="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center"
            >
              <svg
                class="w-4 h-4 mr-2 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Thông tin cơ bản
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <label
                  class="block text-xs font-bold text-light-text-secondary dark:text-dark-text-secondary mb-1 uppercase tracking-wide"
                >
                  Tên sản phẩm
                </label>
                <p
                  class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary"
                >
                  {{ product.name }}
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <label
                  class="block text-xs font-bold text-light-text-secondary dark:text-dark-text-secondary mb-1 uppercase tracking-wide"
                >
                  Giá bán
                </label>
                <div class="flex items-center space-x-2">
                  <p
                    class="text-lg font-bold text-light-accent-sport dark:text-dark-accent-sport"
                  >
                    {{
                      formatCurrency(product.discount_price || product.price)
                    }}
                  </p>
                  <p
                    v-if="product.discount_price"
                    class="text-sm text-gray-500 line-through"
                  >
                    {{ formatCurrency(product.price) }}
                  </p>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <label
                  class="block text-xs font-bold text-light-text-secondary dark:text-dark-text-secondary mb-1 uppercase tracking-wide"
                >
                  Tồn kho
                </label>
                <div class="flex items-center space-x-2">
                  <p
                    class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary"
                  >
                    {{ product.stock_quantity }}
                  </p>
                  <span class="text-xs text-gray-500">sản phẩm</span>
                  <div
                    :class="[
                      'w-2 h-2 rounded-full',
                      product.stock_quantity > 10
                        ? 'bg-green-500'
                        : product.stock_quantity > 0
                        ? 'bg-yellow-500'
                        : 'bg-red-500',
                    ]"
                  ></div>
                </div>
              </div>

              <div
                v-if="product.category"
                class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
              >
                <label
                  class="block text-xs font-bold text-light-text-secondary dark:text-dark-text-secondary mb-1 uppercase tracking-wide"
                >
                  Danh mục
                </label>
                <div class="flex items-center space-x-2">
                  <span
                    class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ product.category.name }}
                  </span>
                </div>
              </div>

              <div
                v-if="product.brand"
                class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
              >
                <label
                  class="block text-xs font-bold text-light-text-secondary dark:text-dark-text-secondary mb-1 uppercase tracking-wide"
                >
                  Thương hiệu
                </label>
                <div class="flex items-center space-x-2">
                  <span
                    class="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ product.brand.name }}
                  </span>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <label
                  class="block text-xs font-bold text-light-text-secondary dark:text-dark-text-secondary mb-1 uppercase tracking-wide"
                >
                  Ngày tạo
                </label>
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-3 h-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p
                    class="text-xs font-medium text-light-text-primary dark:text-dark-text-primary"
                  >
                    {{ formatDate(product.created_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div
        v-if="product.description"
        class="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700"
      >
        <h3
          class="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center"
        >
          <svg
            class="w-4 h-4 mr-2 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
          Mô tả sản phẩm
        </h3>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div
            class="prose dark:prose-invert max-w-none text-light-text-primary dark:text-dark-text-primary leading-relaxed text-sm"
            v-html="product.description"
          ></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600 dark:text-red-400 mb-4">
        <svg
          class="w-16 h-16 mx-auto mb-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-lg font-semibold">Không thể tải thông tin sản phẩm</p>
        <p class="text-sm">{{ error }}</p>
      </div>
      <button
        @click="loadProduct"
        class="px-4 py-2 bg-gradient-sport hover:bg-gradient-sport-hover text-white rounded-md transition-colors"
      >
        Thử lại
      </button>
    </div>

    <!-- Product Modal -->
    <ProductModal
      :is-open="isModalOpen"
      :product="product"
      :categories="categories"
      :brands="brands"
      @success="handleModalSuccess"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProduct } from "@/composables/useProduct";
import { useCategory } from "@/composables/useCategory";
import { useBrand } from "@/composables/useBrand";
import { useNotification } from "@/composables/useNotification";
import type { Product } from "@/types/admin/product";
import ProductModal from "@/components/admin/products/ProductModal.vue";

const route = useRoute();
const router = useRouter();
const notification = useNotification();
const { fetchProduct, toggleProductStatus } = useProduct();
const { categories, loadCategories } = useCategory();
const { brands, loadBrands } = useBrand();

// State
const product = ref<Product | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const isModalOpen = ref(false);

// Computed
const productId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? id[0] : id;
});

// Methods
const loadProduct = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const result = await fetchProduct(Number(productId.value));
    product.value = result;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Có lỗi xảy ra";
    notification.showError("Không thể tải thông tin sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/admin/products");
};

const openEditModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleModalSuccess = () => {
  loadProduct();
  closeModal();
  notification.showSuccess("Cập nhật sản phẩm thành công!");
};

const toggleStatus = async () => {
  if (!product.value) return;

  try {
    await toggleProductStatus(product.value.id);
    product.value.is_active = !product.value.is_active;
    notification.showSuccess(
      `Sản phẩm đã được ${
        product.value.is_active ? "kích hoạt" : "vô hiệu hóa"
      } thành công`
    );
  } catch (err) {
    notification.showError("Không thể thay đổi trạng thái sản phẩm");
  }
};

const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Initialize
onMounted(() => {
  loadProduct();
  loadCategories();
  loadBrands();
});
</script>
