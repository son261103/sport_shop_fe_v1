<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <Loading size="lg" color="sport" text="Đang tải chi tiết sản phẩm..." />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
          Không thể tải sản phẩm
        </h2>
        <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4">{{ error }}</p>
        <button 
          @click="initializePage" 
          class="btn-primary"
        >
          Thử lại
        </button>
      </div>
    </div>

    <!-- Page Content -->
    <div v-else-if="product" class="container-custom section-padding">
      <!-- Breadcrumb -->
      <nav class="mb-8" data-aos="fade-up">
        <div class="flex items-center space-x-2 text-sm">
          <router-link 
            to="/" 
            class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
          >
            Trang chủ
          </router-link>
          <i class="fas fa-chevron-right text-light-text-muted dark:text-dark-text-muted text-xs"></i>
          <router-link 
            to="/products" 
            class="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
          >
            Sản phẩm
          </router-link>
          <i class="fas fa-chevron-right text-light-text-muted dark:text-dark-text-muted text-xs"></i>
          <span class="text-light-text-primary dark:text-dark-text-primary font-medium">{{ product.name }}</span>
        </div>
      </nav>

      <!-- Main Product Section -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-16">
        <!-- Left Column - Product Images (5 columns) -->
        <div class="xl:col-span-5" data-aos="fade-right">
          <div class="sticky top-8">
            <!-- Main Image -->
            <div class="card relative overflow-hidden group mb-4">
              <img
                :src="mainImage"
                :alt="product.name"
                class="w-full h-[400px] lg:h-[500px] object-cover transition-all duration-500 group-hover:scale-105"
              />
              <!-- Image Navigation Overlay -->
              <div
                v-if="product.images && product.images.length > 1"
                class="absolute inset-0 flex"
              >
                <!-- Left Navigation -->
                <div
                  @click="previousImage"
                  class="w-1/2 h-full cursor-pointer flex items-center justify-start pl-6 opacity-0 hover:opacity-100 transition-all duration-300"
                >
                  <div
                    class="bg-black/70 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-black/80 transition-all duration-200 hover:scale-110"
                  >
                    <i class="fas fa-chevron-left"></i>
                  </div>
                </div>
                <!-- Right Navigation -->
                <div
                  @click="nextImage"
                  class="w-1/2 h-full cursor-pointer flex items-center justify-end pr-6 opacity-0 hover:opacity-100 transition-all duration-300"
                >
                  <div
                    class="bg-black/70 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-black/80 transition-all duration-200 hover:scale-110"
                  >
                    <i class="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>

              <!-- Image Counter -->
              <div
                v-if="product.images && product.images.length > 1"
                class="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ currentImageIndex + 1 }} / {{ product.images.length }}
              </div>

              <!-- Discount Badge -->
              <div
                v-if="product.discount && product.discount > 0"
                class="absolute top-4 left-4 bg-gradient-danger text-white px-3 py-1 rounded-full text-sm font-bold shadow-danger"
              >
                -{{ product.discount }}%
              </div>
            </div>

            <!-- Thumbnail Images -->
            <div
              v-if="product.images && product.images.length > 1"
              class="flex gap-3 overflow-x-auto pb-2"
            >
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="setMainImage(image)"
                class="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105"
                :class="
                  selectedImage === image
                    ? 'border-light-accent-sport dark:border-dark-accent-sport shadow-sport'
                    : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport'
                "
              >
                <img
                  :src="image"
                  :alt="`${product.name} ${index + 1}`"
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column - Product Info (7 columns) -->
        <div class="xl:col-span-7" data-aos="fade-left">
          <div class="space-y-6">
            <!-- Product Header -->
            <div class="space-y-4">
              <div>
                <h1 class="text-3xl lg:text-4xl font-bold mb-3 text-gradient-sport-animated leading-tight">
                  {{ product.name }}
                </h1>

                <!-- Product Meta Info -->
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <div class="flex items-center gap-2 px-3 py-2 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-light-border-primary dark:border-dark-border-primary">
                    <i class="fas fa-tag text-light-accent-sport dark:text-dark-accent-sport"></i>
                    <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Mã:</span>
                    <span class="text-sm font-semibold text-light-accent-sport dark:text-dark-accent-sport">{{ product.sku || "N/A" }}</span>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700">
                    <i class="fas fa-check-circle text-green-600 dark:text-green-400"></i>
                    <span class="text-sm font-semibold text-green-600 dark:text-green-400">Còn hàng</span>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border border-yellow-200 dark:border-yellow-700">
                    <i class="fas fa-star text-yellow-500"></i>
                    <span class="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{{ product.rating || 4.5 }}/5</span>
                    <span class="text-sm text-light-text-muted dark:text-dark-text-muted">({{ product.reviewCount || 0 }} đánh giá)</span>
                  </div>
                </div>
              </div>

              <!-- Price Section -->
              <div class="card p-6">
                <div class="flex items-center gap-3 mb-2">
                  <i class="fas fa-money-bill-wave text-light-accent-sport dark:text-dark-accent-sport text-lg"></i>
                  <span class="text-light-text-secondary dark:text-dark-text-secondary font-medium">Giá bán:</span>
                </div>
                <div class="flex items-baseline gap-4">
                  <span class="text-4xl lg:text-5xl font-bold text-gradient-sport">
                    {{ formatPrice(product.price || 325000) }}
                  </span>
                  <span
                    v-if="product.originalPrice"
                    class="text-lg text-light-text-muted dark:text-dark-text-muted line-through opacity-75"
                  >
                    {{ formatPrice(product.originalPrice) }}
                  </span>
                  <span
                    v-if="product.originalPrice"
                    class="badge badge-danger font-bold px-3 py-1"
                  >
                    Tiết kiệm {{ formatPrice(product.originalPrice - (product.price || 0)) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Product Options -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Size Selection -->
              <div class="card p-6">
                <div class="flex items-center gap-3 mb-4">
                  <i class="fas fa-ruler text-light-accent-sport dark:text-dark-accent-sport"></i>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Kích thước:</span>
                  <span
                    v-if="selectedSize"
                    class="font-bold text-light-accent-sport dark:text-dark-accent-sport"
                  >
                    {{ selectedSize }}
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="size in product.sizes || ['M', 'L', 'XL', '2XL', '3XL']"
                    :key="size"
                    @click="selectedSize = size"
                    class="px-4 py-3 border-2 rounded-xl font-semibold transition-all duration-300 text-center hover:scale-105"
                    :class="
                      selectedSize === size
                        ? 'border-light-accent-sport dark:border-dark-accent-sport bg-light-accent-sport dark:bg-dark-accent-sport text-white shadow-sport'
                        : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport text-light-text-primary dark:text-dark-text-primary bg-light-bg-secondary dark:bg-dark-bg-secondary'
                    "
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Color Selection -->
              <div class="card p-6">
                <div class="flex items-center gap-3 mb-4">
                  <i class="fas fa-palette text-light-accent-sport dark:text-dark-accent-sport"></i>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Màu sắc:</span>
                  <span
                    v-if="selectedColor"
                    class="font-bold text-light-accent-sport dark:text-dark-accent-sport"
                  >
                    {{ selectedColor.name }}
                  </span>
                </div>
                <div class="flex gap-3 flex-wrap">
                  <button
                    v-for="color in product.colors || [{ name: 'Trắng', value: 'white', hex: '#FFFFFF' }]"
                    :key="color.name"
                    @click="selectedColor = color"
                    class="relative w-12 h-12 rounded-xl border-2 transition-all duration-300 hover:scale-110"
                    :class="
                      selectedColor?.name === color.name
                        ? 'border-light-accent-sport dark:border-dark-accent-sport ring-4 ring-light-accent-sport/30 dark:ring-dark-accent-sport/30 shadow-sport'
                        : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport'
                    "
                    :style="{ backgroundColor: color.hex || getColorValue(color.name) }"
                    :title="color.name"
                  >
                    <i
                      v-if="selectedColor?.name === color.name"
                      class="fas fa-check absolute inset-0 flex items-center justify-center text-white drop-shadow-lg"
                    ></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quantity and Actions -->
            <div class="card p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Quantity Selection -->
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <i class="fas fa-shopping-cart text-light-accent-sport dark:text-dark-accent-sport"></i>
                    <span class="font-medium text-light-text-primary dark:text-dark-text-primary">Số lượng:</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center border-2 border-light-border-primary dark:border-dark-border-primary rounded-xl overflow-hidden bg-light-bg-secondary dark:bg-dark-bg-secondary hover:border-light-accent-sport dark:hover:border-dark-accent-sport transition-all duration-300">
                      <button
                        @click="decreaseQuantity"
                        class="px-4 py-3 hover:bg-light-accent-sport dark:hover:bg-dark-accent-sport hover:text-white transition-all duration-200 font-bold text-light-text-primary dark:text-dark-text-primary"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <div class="px-6 py-3 border-x-2 border-light-border-primary dark:border-dark-border-primary min-w-[80px] text-center font-bold bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary">
                        {{ quantity }}
                      </div>
                      <button
                        @click="increaseQuantity"
                        class="px-4 py-3 hover:bg-light-accent-sport dark:hover:bg-dark-accent-sport hover:text-white transition-all duration-200 font-bold text-light-text-primary dark:text-dark-text-primary"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="text-sm text-light-text-muted dark:text-dark-text-muted">
                      <span v-if="product.stock">Còn {{ product.stock }} sản phẩm</span>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                  <button
                    @click="addToCart"
                    class="btn-outline w-full group relative overflow-hidden py-4 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-sport flex items-center justify-center gap-3"
                  >
                    <i class="fas fa-shopping-cart transition-transform duration-300 group-hover:scale-110"></i>
                    <span>THÊM VÀO GIỎ HÀNG</span>
                  </button>
                  <button
                    @click="buyNow"
                    class="btn-primary-animated w-full group relative overflow-hidden py-4 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-sport-lg flex items-center justify-center gap-3"
                  >
                    <i class="fas fa-bolt transition-transform duration-300 group-hover:scale-110"></i>
                    <span>MUA NGAY</span>
                  </button>
                </div>
              </div>

              <!-- Additional Actions -->
              <div class="flex items-center justify-center gap-6 pt-6 border-t border-light-border-secondary dark:border-dark-border-secondary mt-6">
                <button class="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-all duration-200 hover:scale-105">
                  <i class="fas fa-heart"></i>
                  <span>Yêu thích</span>
                </button>
                <button class="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-all duration-200 hover:scale-105">
                  <i class="fas fa-share-alt"></i>
                  <span>Chia sẻ</span>
                </button>
                <button class="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-all duration-200 hover:scale-105">
                  <i class="fas fa-balance-scale"></i>
                  <span>So sánh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div class="mb-16" data-aos="fade-up">
        <div class="card">
          <!-- Tab Headers -->
          <div class="flex border-b border-light-border-secondary dark:border-dark-border-secondary">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-6 py-4 font-medium transition-all duration-300 relative"
              :class="
                activeTab === tab.id
                  ? 'text-light-accent-sport dark:text-dark-accent-sport border-b-2 border-light-accent-sport dark:border-dark-accent-sport'
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport'
              "
            >
              <i :class="tab.icon" class="mr-2"></i>
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="p-8">
            <!-- Description Tab -->
            <div v-if="activeTab === 'description'" class="space-y-6">
              <div v-if="product.description">
                <h3 class="text-xl font-bold text-gradient-sport mb-4">Mô tả sản phẩm</h3>
                <p class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg">
                  {{ product.description }}
                </p>
              </div>

              <div v-if="product.features && product.features.length > 0">
                <h3 class="text-xl font-bold text-gradient-sport mb-4">Đặc điểm nổi bật</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="feature in product.features"
                    :key="feature"
                    class="flex items-center gap-3 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport transition-all duration-200"
                  >
                    <i class="fas fa-check-circle text-light-accent-sport dark:text-dark-accent-sport"></i>
                    <span class="text-light-text-primary dark:text-dark-text-primary">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Specifications Tab -->
            <div v-if="activeTab === 'specifications'" class="space-y-4">
              <h3 class="text-xl font-bold text-gradient-sport mb-6">Thông số kỹ thuật</h3>
              <div v-if="product.specifications" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="(spec, key) in product.specifications"
                  :key="key"
                  class="flex justify-between items-center p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-light-border-primary dark:border-dark-border-primary hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary transition-all duration-200"
                >
                  <span class="font-medium text-light-text-secondary dark:text-dark-text-secondary">{{ key }}:</span>
                  <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ spec }}</span>
                </div>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'">
              <ProductReviews :productId="productId.toString()" :comments="comments" />
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products Section -->
      <div data-aos="fade-up" class="mb-16">
        <ProductWatch :relatedProducts="relatedProducts" />
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-gray-400 text-6xl mb-4">📦</div>
        <h2 class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
          Không tìm thấy sản phẩm
        </h2>
        <p class="text-light-text-secondary dark:text-dark-text-secondary">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import AOS from "aos";
import {
  ProductWatch,
  ProductReviews,
} from "@/components/user/products_detail";
import { Loading } from "@/components/ui";
import { usePublicProducts } from "@/composables/usePublicProducts";
import type { Product, SportCategory } from "@/types/sport";

// Route and product ID
const route = useRoute();
const productId = computed(() => parseInt(route.params.id as string));

// Use public products composable
const { 
  selectedProduct, 
  isLoading, 
  error, 
  fetchProduct,
  products,
  fetchProducts 
} = usePublicProducts();

// Reactive data
const selectedImage = ref("");
const selectedSize = ref("");
const selectedColor = ref<{ name: string; value: string; hex?: string } | null>(null);
const quantity = ref(1);
const currentImageIndex = ref(0);
const activeTab = ref("description");

// Tab configuration
const tabs = [
  { id: "description", label: "Mô tả", icon: "fas fa-align-left" },
  { id: "specifications", label: "Thông số", icon: "fas fa-cogs" },
  { id: "reviews", label: "Đánh giá", icon: "fas fa-star" },
];

// Transform API product to component format
const product = computed(() => {
  if (!selectedProduct.value) return null;
  
  const apiProduct = selectedProduct.value;
  const originalPrice = apiProduct.discount_price ? parseFloat(apiProduct.price) : undefined;
  const currentPrice = apiProduct.discount_price ? parseFloat(apiProduct.discount_price) : parseFloat(apiProduct.price);
  
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    price: currentPrice,
    originalPrice: originalPrice,
    image: apiProduct.image || '',
    images: apiProduct.image ? [apiProduct.image] : [],
    description: apiProduct.description || 'Sản phẩm chất lượng cao, được thiết kế đặc biệt cho các hoạt động thể thao. Chất liệu cao cấp, bền bỉ và thoải mái khi sử dụng.',
    category: 'fitness' as SportCategory,
    brand: apiProduct.brand?.name || '',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Trắng', value: 'white', hex: '#FFFFFF' },
      { name: 'Đen', value: 'black', hex: '#000000' },
      { name: 'Xanh dương', value: 'blue', hex: '#0000FF' },
      { name: 'Đỏ', value: 'red', hex: '#FF0000' },
    ],
    rating: 4.5,
    reviewCount: Math.floor(Math.random() * 100) + 10,
    inStock: apiProduct.stock_quantity > 0,
    features: [
      'Chất liệu cao cấp, thoáng khí',
      'Thiết kế ergonomic, thoải mái',
      'Độ bền cao, chống mài mòn',
      'Phù hợp cho mọi hoạt động thể thao',
      'Dễ dàng vệ sinh và bảo quản',
      'Đa dạng màu sắc và kích thước'
    ],
    stock: apiProduct.stock_quantity,
    discount: originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0,
    sku: `SP${apiProduct.id.toString().padStart(6, '0')}`,
    specifications: {
      'Thương hiệu': apiProduct.brand?.name || 'Không xác định',
      'Danh mục': apiProduct.category?.name || 'Không xác định',
      'Chất liệu': 'Polyester cao cấp',
      'Xuất xứ': 'Việt Nam',
      'Bảo hành': '12 tháng',
      'Tình trạng': apiProduct.is_active ? 'Còn hàng' : 'Hết hàng',
      'Số lượng tồn kho': apiProduct.stock_quantity.toString()
    }
  };
});

// Related products (transform from API format)
const relatedProducts = computed(() => {
  return products.value.slice(0, 8).map(apiProduct => {
    const originalPrice = apiProduct.discount_price ? parseFloat(apiProduct.price) : undefined;
    const currentPrice = apiProduct.discount_price ? parseFloat(apiProduct.discount_price) : parseFloat(apiProduct.price);
    
    return {
      id: apiProduct.id.toString(),
      name: apiProduct.name,
      description: apiProduct.description || '',
      price: currentPrice,
      originalPrice: originalPrice,
      category: 'fitness' as SportCategory,
      image: apiProduct.image || '',
      brand: apiProduct.brand?.name || '',
      rating: 4.5,
      reviews: Math.floor(Math.random() * 100) + 10,
      inStock: apiProduct.stock_quantity > 0
    } as Product;
  });
});

// Comments - will be loaded from API in future
const comments = ref([] as Array<{
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}>);

// Computed
const mainImage = computed(() => {
  return selectedImage.value || product.value?.images?.[0] || product.value?.image || '';
});

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const getColorValue = (colorName: string) => {
  const colorMap: { [key: string]: string } = {
    Đen: "#000000",
    Trắng: "#FFFFFF",
    Đỏ: "#FF0000",
    "Xanh dương": "#0000FF",
    "Xanh lá": "#00FF00",
    Vàng: "#FFFF00",
    Hồng: "#FFC0CB",
    Tím: "#800080",
    Cam: "#FFA500",
    Xám: "#808080",
    Nâu: "#A52A2A",
    "Xanh navy": "#000080",
  };
  return colorMap[colorName] || "#CCCCCC";
};

const setMainImage = (image: string) => {
  selectedImage.value = image;
  const index = product.value?.images?.indexOf(image) || 0;
  currentImageIndex.value = index;
};

const nextImage = () => {
  if (product.value?.images && product.value.images.length > 1) {
    const nextIndex = (currentImageIndex.value + 1) % product.value.images.length;
    currentImageIndex.value = nextIndex;
    selectedImage.value = product.value.images[nextIndex];
  }
};

const previousImage = () => {
  if (product.value?.images && product.value.images.length > 1) {
    const prevIndex = currentImageIndex.value === 0 
      ? product.value.images.length - 1 
      : currentImageIndex.value - 1;
    currentImageIndex.value = prevIndex;
    selectedImage.value = product.value.images[prevIndex];
  }
};

const increaseQuantity = () => {
  if (product.value?.stock && quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (!product.value) return;
  
  // TODO: Implement add to cart functionality
  console.log('Adding to cart:', {
    product: product.value,
    quantity: quantity.value,
    selectedSize: selectedSize.value,
    selectedColor: selectedColor.value
  });
};

const buyNow = () => {
  if (!product.value) return;
  
  // TODO: Implement buy now functionality
  console.log('Buy now:', {
    product: product.value,
    quantity: quantity.value,
    selectedSize: selectedSize.value,
    selectedColor: selectedColor.value
  });
};

const initializePage = async () => {
  try {
    await fetchProduct(productId.value);
    await fetchProducts();
  } catch (err) {
    console.error('Error initializing page:', err);
  }
};

// Initialize page on mount
onMounted(() => {
  initializePage();
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });
});

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    initializePage();
  }
});
</script>
