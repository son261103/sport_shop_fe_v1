<template>
  <div id="style" class="min-h-screen bg-gradient-page">
    <!-- Main Product Section -->
    <section class="section-padding">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Product Images (2/3 width) -->
            <div class="lg:col-span-2 space-y-4">
              <!-- Main Image -->
              <div class="card relative bg-light-bg-secondary dark:bg-dark-bg-secondary overflow-hidden">
                <img
                  :src="allImages[currentImageIndex] || mainImage"
                  :alt="product.name"
                  class="w-full h-96 lg:h-[600px] object-cover"
                />
              </div>

              <!-- Thumbnail Images -->
              <div
                v-if="allImages && allImages.length > 1"
                class="flex gap-3 overflow-x-auto"
              >
                <button
                  v-for="(image, index) in allImages"
                  :key="index"
                  @click="setMainImageByIndex(index)"
                  class="card flex-shrink-0 w-16 h-16 overflow-hidden transition-all duration-200 hover:shadow-lg"
                  :class="
                    currentImageIndex === index
                      ? 'ring-2 ring-light-accent-sport dark:ring-dark-accent-sport'
                      : 'hover:ring-2 hover:ring-light-border-primary dark:hover:ring-dark-border-primary'
                  "
                >
                  <img
                    :src="image"
                    :alt="`${product.name} ${index + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>


            </div>

            <!-- Right Column - Product Info (1/3 width) -->
            <div class="lg:col-span-1 flex flex-col space-y-4">
              <!-- Product Header -->
              <div class="space-y-3">
                <div class="flex justify-between items-start">
                  <h1 class="text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    {{ product.name }}
                  </h1>
                  <div class="flex items-center gap-2">
                    <button class="header-icon">
                      <svg class="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                      </svg>
                    </button>
                    <button class="header-icon">
                      <svg class="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                  
                <!-- Color Selection -->
                <div class="space-y-2">
                  <div class="flex gap-3">
                    <button
                      v-for="color in [
                        { name: 'Xám', value: 'gray', hex: '#CCCCCC' },
                        { name: 'Đen', value: 'black', hex: '#000000' },
                        { name: 'Nâu', value: 'brown', hex: '#8B4513' },
                        { name: 'Xanh navy', value: 'navy', hex: '#000080' }
                      ]"
                      :key="color.value"
                      @click="selectedColor = color"
                      class="w-8 h-8 rounded-full border-2 transition-all duration-200 hover:shadow-lg"
                      :class="
                        selectedColor?.value === color.value
                          ? 'border-light-accent-sport dark:border-dark-accent-sport scale-110 ring-2 ring-light-accent-sport dark:ring-dark-accent-sport ring-opacity-50'
                          : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport'
                      "
                      :style="{ backgroundColor: color.hex }"
                    ></button>
                  </div>
                  <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Màu sắc: <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ selectedColor?.name || '03 GRAY' }}</span>
                  </div>
                </div>

                <!-- Size Selection -->
                <div class="space-y-2">
                  <div class="flex gap-2 flex-wrap">
                    <button
                      v-for="size in ['XS', 'S', 'M', 'L', 'XL', 'XXL']"
                      :key="size"
                      @click="selectedSize = size"
                      class="px-4 py-2 border text-sm font-medium transition-all duration-200 rounded-lg hover:shadow-md"
                      :class="
                        selectedSize === size
                          ? 'bg-light-accent-sport dark:bg-dark-accent-sport text-white border-light-accent-sport dark:border-dark-accent-sport'
                          : 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport'
                      "
                    >
                      {{ size }}
                    </button>
                  </div>
                  <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <span>Kích cỡ: <span class="font-medium text-light-text-primary dark:text-dark-text-primary">UNISEX S</span></span>
                  </div>
                </div>
                
                <!-- Product Information Expandable -->
                <div class="space-y-2">
                  <button 
                    @click="showProductInfo = !showProductInfo"
                    class="flex items-center gap-2 text-sm text-light-accent-sport dark:text-dark-accent-sport hover:underline transition-colors"
                  >
                    <span>📋 Thông tin sản phẩm</span>
                    <svg 
                      class="w-4 h-4 transition-transform duration-200" 
                      :class="showProductInfo ? 'rotate-180' : ''"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <div v-if="showProductInfo" class="text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1 animate-fade-in">
                    <p>• Chất liệu: Da tổng hợp cao cấp</p>
                    <p>• Đế giày: Cao su chống trượt</p>
                    <p>• Phù hợp: Thể thao, đi bộ hàng ngày</p>
                    <p>• Bảo hành: 6 tháng</p>
                  </div>
                </div>

                <!-- Rating and Total Price -->
                <div class="space-y-3 p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg border border-light-border-primary dark:border-dark-border-primary">
                  <!-- Rating Section -->
                  <div class="flex items-center gap-3">
                    <div class="flex text-yellow-400">
                      <span v-for="i in 5" :key="i" class="text-xl">★</span>
                    </div>
                    <span class="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">4.8</span>
                    <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">(104 đánh giá)</span>
                  </div>
                  <!-- Total Price -->
                  <div class="text-2xl lg:text-3xl font-bold text-gradient-sport-animated">
                    Tổng tiền: {{ formatPrice(totalPrice) }}
                  </div>
                </div>

                <!-- Quantity and Add to Cart -->
                <div class="space-y-3">
                  <!-- Quantity Selector -->
                  <div class="flex items-center gap-4">
                    <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Còn ít hàng</span>
                    <div class="flex items-center border border-light-border-primary dark:border-dark-border-primary rounded-lg overflow-hidden">
                      <button
                        @click="decreaseQuantity"
                        class="px-3 py-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors text-light-text-primary dark:text-dark-text-primary"
                      >
                        -
                      </button>
                      <span class="px-4 py-2 border-x border-light-border-primary dark:border-dark-border-primary bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary">{{ quantity }}</span>
                      <button
                        @click="increaseQuantity"
                        class="px-3 py-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors text-light-text-primary dark:text-dark-text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <!-- Add to Cart Button -->
                  <button
                    @click="addToCartWithTotal"
                    class="btn-primary-animated w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                    THÊM VÀO GIỎ HÀNG
                  </button>
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
  reviews?: number;
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
const showProductInfo = ref(false);
const imageRotationInterval = ref<number | null>(null);

// Variant images data
const variantImages = ref([
  {
    id: 1,
    name: "Màu Đen",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Màu Trắng",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Màu Xanh",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Màu Đỏ",
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=300&h=300&fit=crop"
  }
]);

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

const allImages = computed(() => {
  const productImages = props.product.images || [props.product.image || ""];
  const variantImageUrls = variantImages.value.map(v => v.image);
  return [...productImages, ...variantImageUrls].filter(Boolean);
});

const totalPrice = computed(() => {
  return (props.product.price || 489000) * quantity.value;
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

const setMainImageByIndex = (index: number) => {
  currentImageIndex.value = index;
  selectedImage.value = allImages.value[index];
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

const selectVariant = (variant: any) => {
  selectedImage.value = variant.image;
  console.log("Selected variant:", variant);
};



const addToCart = () => {
  console.log("Adding to cart:", {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    totalPrice: totalPrice.value,
  });
};

// Update addToCart method to include totalPrice
const addToCartWithTotal = () => {
  const cartItem = {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    totalPrice: totalPrice.value,
  };
  
  console.log("Adding to cart:", cartItem);
  
  // Show success message
  alert(`Đã thêm ${quantity.value} sản phẩm vào giỏ hàng. Tổng tiền: ${formatPrice(totalPrice.value)}`);
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

/* Thêm style cho trang chi tiết sản phẩm */
#style {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.btn-primary-animated {
  background-color: #222;
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-primary-animated:hover {
  background-color: #000;
  transform: translateY(-2px);
}

/* Style cho color selector */
.color-selector button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
  position: relative;
}

.color-selector button.active {
  border: 2px solid #000;
}

/* Style cho size selector */
.size-selector button {
  min-width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.size-selector button.active {
  border-color: #000;
  background-color: #000;
  color: white;
}
</style>
