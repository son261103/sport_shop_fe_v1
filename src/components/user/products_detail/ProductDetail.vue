<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Main Product Section -->
    <section class="py-4 lg:py-6">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <!-- Left Column - Product Images -->
            <div class="space-y-3">
              <!-- Main Image -->
              <div class="card relative overflow-hidden group">
                <img
                  :src="mainImage"
                  :alt="product.name"
                  class="w-full h-[350px] lg:h-[420px] object-cover transition-all duration-500 group-hover:scale-105"
                />
                <!-- Image Navigation Overlay -->
                <div
                  v-if="product.images && product.images.length > 1"
                  class="absolute inset-0 flex"
                >
                  <!-- Left Navigation -->
                  <div
                    @click="previousImage"
                    class="w-1/2 h-full cursor-pointer flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-all duration-300"
                  >
                    <div
                      class="bg-black/70 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-black/80 transition-all duration-200 hover:scale-110"
                    >
                      <i class="fas fa-chevron-left text-sm"></i>
                    </div>
                  </div>
                  <!-- Right Navigation -->
                  <div
                    @click="nextImage"
                    class="w-1/2 h-full cursor-pointer flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-all duration-300"
                  >
                    <div
                      class="bg-black/70 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-black/80 transition-all duration-200 hover:scale-110"
                    >
                      <i class="fas fa-chevron-right text-sm"></i>
                    </div>
                  </div>
                </div>

                <!-- Image Counter -->
                <div
                  v-if="product.images && product.images.length > 1"
                  class="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ currentImageIndex + 1 }} / {{ product.images.length }}
                </div>
              </div>

              <!-- Thumbnail Images -->
              <div
                v-if="product.images && product.images.length > 1"
                class="flex gap-2 overflow-x-auto pb-1"
              >
                <button
                  v-for="(image, index) in product.images"
                  :key="index"
                  @click="setMainImage(image)"
                  class="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105"
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

            <!-- Right Column - Product Info -->
            <div class="flex flex-col space-y-4">
              <!-- Product Header -->
              <div class="space-y-3">
                <div>
                  <h1
                    class="text-xl lg:text-2xl font-bold mb-2 text-gradient-sport-animated leading-tight"
                  >
                    {{ product.name }}
                  </h1>

                  <!-- Product Meta Info -->
                  <div class="flex flex-wrap items-center gap-2 mb-3">
                    <div
                      class="flex items-center gap-1.5 px-2.5 py-1 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-full border border-light-border-primary dark:border-dark-border-primary"
                    >
                      <i
                        class="fas fa-tag text-light-accent-sport dark:text-dark-accent-sport text-xs"
                      ></i>
                      <span
                        class="text-xs text-light-text-secondary dark:text-dark-text-secondary"
                        >Mã:</span
                      >
                      <span
                        class="text-xs font-semibold text-light-accent-sport dark:text-dark-accent-sport"
                        >{{ product.sku || "N/A" }}</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-700"
                    >
                      <i
                        class="fas fa-check-circle text-green-600 dark:text-green-400 text-xs"
                      ></i>
                      <span
                        class="text-xs font-semibold text-green-600 dark:text-green-400"
                        >Còn hàng</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Price Section -->
                <div
                  class="bg-gradient-to-br from-light-bg-secondary to-light-bg-primary dark:from-dark-bg-secondary dark:to-dark-bg-primary border border-light-border-secondary dark:border-dark-border-secondary rounded-xl p-3"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <i
                      class="fas fa-money-bill-wave text-light-accent-sport dark:text-dark-accent-sport text-sm"
                    ></i>
                    <span
                      class="text-light-text-secondary dark:text-dark-text-secondary font-medium text-sm"
                      >Giá bán:</span
                    >
                  </div>
                  <div class="flex items-baseline gap-2">
                    <span
                      class="text-2xl lg:text-3xl font-bold text-gradient-sport"
                      >{{ formatPrice(product.price || 325000) }}</span
                    >
                    <span
                      v-if="product.originalPrice"
                      class="text-sm text-light-text-muted dark:text-dark-text-muted line-through opacity-75"
                      >{{ formatPrice(product.originalPrice) }}</span
                    >
                    <span
                      v-if="product.originalPrice"
                      class="badge badge-danger text-xs font-bold px-1.5 py-0.5"
                    >
                      -{{
                        Math.round(
                          ((product.originalPrice - (product.price || 0)) /
                            product.originalPrice) *
                            100
                        )
                      }}%
                    </span>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="card space-y-2">
                  <div class="flex items-center gap-2 p-3 pb-1">
                    <i
                      class="fas fa-info-circle text-light-accent-sport dark:text-dark-accent-sport text-sm"
                    ></i>
                    <h3 class="text-sm font-semibold text-gradient-sport">
                      Thông tin sản phẩm
                    </h3>
                  </div>

                  <div class="px-3 pb-3 space-y-3">
                    <!-- Product Description -->
                    <div v-if="product.description" class="space-y-1">
                      <h4
                        class="flex items-center gap-1.5 text-xs font-medium text-light-text-primary dark:text-dark-text-primary"
                      >
                        <i
                          class="fas fa-align-left text-light-accent-sport dark:text-dark-accent-sport text-xs"
                        ></i>
                        Mô tả
                      </h4>
                      <p
                        class="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed bg-light-bg-secondary dark:bg-dark-bg-secondary p-2 rounded-lg border border-light-border-primary dark:border-dark-border-primary"
                      >
                        {{ product.description }}
                      </p>
                    </div>

                    <!-- Product Features -->
                    <div
                      v-if="product.features && product.features.length > 0"
                      class="space-y-1"
                    >
                      <h4
                        class="flex items-center gap-1.5 text-xs font-medium text-light-text-primary dark:text-dark-text-primary"
                      >
                        <i
                          class="fas fa-star text-light-accent-sport dark:text-dark-accent-sport text-xs"
                        ></i>
                        Đặc điểm nổi bật
                      </h4>
                      <div class="space-y-1">
                        <div
                          v-for="feature in product.features"
                          :key="feature"
                          class="flex items-center gap-1.5 p-2 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg border border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport transition-all duration-200"
                        >
                          <i
                            class="fas fa-check-circle text-light-accent-sport dark:text-dark-accent-sport text-xs"
                          ></i>
                          <span
                            class="text-xs text-light-text-primary dark:text-dark-text-primary"
                            >{{ feature }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <!-- Product Specifications -->
                    <div v-if="product.specifications" class="space-y-1">
                      <h4
                        class="flex items-center gap-1.5 text-xs font-medium text-light-text-primary dark:text-dark-text-primary"
                      >
                        <i
                          class="fas fa-cogs text-light-accent-sport dark:text-dark-accent-sport text-xs"
                        ></i>
                        Thông số kỹ thuật
                      </h4>
                      <div class="space-y-1">
                        <div
                          v-for="(spec, key) in product.specifications"
                          :key="key"
                          class="flex justify-between items-center p-2 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg border border-light-border-primary dark:border-dark-border-primary hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary transition-all duration-200"
                        >
                          <span
                            class="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary"
                            >{{ key }}:</span
                          >
                          <span
                            class="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary"
                            >{{ spec }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Product Options -->
                <div class="space-y-3">
                  <!-- Size Selection -->
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <i
                        class="fas fa-ruler text-light-accent-sport dark:text-dark-accent-sport text-sm"
                      ></i>
                      <span
                        class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                        >Kích thước:</span
                      >
                      <span
                        v-if="selectedSize"
                        class="text-sm font-bold text-light-accent-sport dark:text-dark-accent-sport"
                        >{{ selectedSize }}</span
                      >
                    </div>
                    <div class="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
                      <button
                        v-for="size in product.sizes || [
                          'M',
                          'L',
                          'XL',
                          '2XL',
                          '3XL',
                        ]"
                        :key="size"
                        @click="selectedSize = size"
                        class="px-2 py-1.5 border-2 rounded-lg text-xs font-semibold transition-all duration-300 text-center hover:scale-105"
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
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <i
                        class="fas fa-palette text-light-accent-sport dark:text-dark-accent-sport text-sm"
                      ></i>
                      <span
                        class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                        >Màu sắc:</span
                      >
                      <span
                        v-if="selectedColor"
                        class="text-sm font-bold text-light-accent-sport dark:text-dark-accent-sport"
                        >{{ selectedColor.name }}</span
                      >
                    </div>
                    <div class="flex gap-1.5 flex-wrap">
                      <button
                        v-for="color in product.colors || [
                          { name: 'Trắng', value: 'white', hex: '#FFFFFF' },
                        ]"
                        :key="color.name"
                        @click="selectedColor = color"
                        class="relative w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110"
                        :class="
                          selectedColor?.name === color.name
                            ? 'border-light-accent-sport dark:border-dark-accent-sport ring-2 ring-light-accent-sport/30 dark:ring-dark-accent-sport/30 shadow-sport'
                            : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport'
                        "
                        :style="{
                          backgroundColor:
                            color.hex || getColorValue(color.name),
                        }"
                        :title="color.name"
                      >
                        <i
                          v-if="selectedColor?.name === color.name"
                          class="fas fa-check absolute inset-0 flex items-center justify-center text-white text-xs drop-shadow-lg"
                        ></i>
                      </button>
                    </div>
                  </div>

                  <!-- Quantity Selection -->
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <i
                        class="fas fa-shopping-cart text-light-accent-sport dark:text-dark-accent-sport text-sm"
                      ></i>
                      <span
                        class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                        >Số lượng:</span
                      >
                    </div>
                    <div class="flex items-center gap-3">
                      <div
                        class="flex items-center border-2 border-light-border-primary dark:border-dark-border-primary rounded-lg overflow-hidden bg-light-bg-secondary dark:bg-dark-bg-secondary hover:border-light-accent-sport dark:hover:border-dark-accent-sport transition-all duration-300"
                      >
                        <button
                          @click="decreaseQuantity"
                          class="px-2 py-1.5 hover:bg-light-accent-sport dark:hover:bg-dark-accent-sport hover:text-white transition-all duration-200 font-bold flex items-center justify-center w-8 h-8 text-light-text-primary dark:text-dark-text-primary"
                        >
                          <i class="fas fa-minus text-xs"></i>
                        </button>
                        <div
                          class="px-3 py-1.5 border-x-2 border-light-border-primary dark:border-dark-border-primary min-w-[50px] text-center font-bold bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary text-sm"
                        >
                          {{ quantity }}
                        </div>
                        <button
                          @click="increaseQuantity"
                          class="px-2 py-1.5 hover:bg-light-accent-sport dark:hover:bg-dark-accent-sport hover:text-white transition-all duration-200 font-bold flex items-center justify-center w-8 h-8 text-light-text-primary dark:text-dark-text-primary"
                        >
                          <i class="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                      <div
                        class="text-xs text-light-text-muted dark:text-dark-text-muted"
                      >
                        <span v-if="product.stock"
                          >Còn {{ product.stock }} sản phẩm</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      @click="addToCart"
                      class="btn-outline group relative overflow-hidden py-2.5 px-3 text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-sport flex items-center justify-center gap-2"
                    >
                      <i
                        class="fas fa-shopping-cart transition-transform duration-300 group-hover:scale-110 text-sm"
                      ></i>
                      <span>THÊM VÀO GIỎ</span>
                    </button>
                    <button
                      @click="buyNow"
                      class="btn-primary-animated group relative overflow-hidden py-2.5 px-3 text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-sport-lg flex items-center justify-center gap-2"
                    >
                      <i
                        class="fas fa-bolt transition-transform duration-300 group-hover:scale-110 text-sm"
                      ></i>
                      <span>MUA NGAY</span>
                    </button>
                  </div>

                  <!-- Additional Actions -->
                  <div class="flex items-center justify-center gap-3 pt-1">
                    <button
                      class="flex items-center gap-1 text-xs text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-all duration-200 hover:scale-105"
                    >
                      <i class="fas fa-heart text-xs"></i>
                      <span>Yêu thích</span>
                    </button>
                    <button
                      class="flex items-center gap-1 text-xs text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-all duration-200 hover:scale-105"
                    >
                      <i class="fas fa-share-alt text-xs"></i>
                      <span>Chia sẻ</span>
                    </button>
                    <button
                      class="flex items-center gap-1 text-xs text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-all duration-200 hover:scale-105"
                    >
                      <i class="fas fa-balance-scale text-xs"></i>
                      <span>So sánh</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

import type { Product } from "@/types/sport";

// Extended Product interface for detail view
interface ProductDetail extends Product {
  images?: string[];
  sizes?: string[];
  colors?: Array<{ name: string; value: string; hex?: string }>;
  reviewCount?: number;
  features?: string[];
  stock?: number;
  isNew?: boolean;
  specifications?: Record<string, string>;
  discount?: number;
  sku?: string;
}

interface Props {
  product: ProductDetail;
}

const props = defineProps<Props>();

// Router
const route = useRoute();

// Reactive data
const selectedImage = ref(
  props.product.images?.[0] || props.product.image || ""
);
const selectedSize = ref("");
const selectedColor = ref<{ name: string; value: string; hex?: string } | null>(
  null
);
const quantity = ref(1);
const currentImageIndex = ref(0);
const imageRotationInterval = ref<number | null>(null);

// Computed
const productId = computed(() => route.params.id as string);

const mainImage = computed(() => {
  return (
    selectedImage.value ||
    props.product.images?.[0] ||
    props.product.image ||
    ""
  );
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
  const index = props.product.images?.indexOf(image) || 0;
  currentImageIndex.value = index;
};

const nextImage = () => {
  if (props.product.images && props.product.images.length > 1) {
    const nextIndex =
      (currentImageIndex.value + 1) % props.product.images.length;
    setMainImage(props.product.images[nextIndex]);
  }
};

const previousImage = () => {
  if (props.product.images && props.product.images.length > 1) {
    const prevIndex =
      currentImageIndex.value === 0
        ? props.product.images.length - 1
        : currentImageIndex.value - 1;
    setMainImage(props.product.images[prevIndex]);
  }
};

const increaseQuantity = () => {
  if (!props.product.stock || quantity.value < props.product.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
const addToCart = () => {
  console.log("Adding to cart:", {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
  });
};

const buyNow = () => {
  console.log("Buy now:", {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
  });
};
// Lifecycle
onMounted(() => {
  // Initialize selected options
  if (props.product.sizes?.length) {
    selectedSize.value = props.product.sizes[0];
  } else {
    selectedSize.value = "M"; // Default size
  }

  if (props.product.colors?.length) {
    selectedColor.value = props.product.colors[0];
  } else {
    selectedColor.value = { name: "Trắng", value: "white", hex: "#FFFFFF" }; // Default color
  }

  // Update selected image when product changes
  selectedImage.value = props.product.images?.[0] || props.product.image || "";
  currentImageIndex.value = 0;

  console.log("Product ID from route:", productId.value);
  console.log("Product data:", props.product);
});

// Cleanup on unmount
onUnmounted(() => {
  if (imageRotationInterval.value) {
    clearInterval(imageRotationInterval.value);
  }
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
