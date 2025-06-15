<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Main Product Section -->
    <section class="pt-4 pb-8">
      <div class="container-custom">
        <div class="max-w-full mx-auto px-8 ml-28">
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            <!-- Left Column - Product Images -->
            <div class="space-y-1 xl:pr-4">
              <!-- Main Image -->
              <div class="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <img 
                  :src="mainImage" 
                  :alt="product.name"
                  class="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <!-- Left/Right Click Areas for Navigation -->
                <div v-if="product.images && product.images.length > 1" class="absolute inset-0 flex">
                  <!-- Left half - Previous image -->
                  <div 
                    @click="previousImage"
                    class="w-1/2 h-full cursor-pointer flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div class="bg-black/50 text-white p-2 rounded-full">
                      <i class="fas fa-chevron-left"></i>
                    </div>
                  </div>
                  <!-- Right half - Next image -->
                  <div 
                    @click="nextImage"
                    class="w-1/2 h-full cursor-pointer flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div class="bg-black/50 text-white p-2 rounded-full">
                      <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Thumbnail Images -->
              <div v-if="product.images && product.images.length > 1" class="flex gap-3 overflow-x-auto">
                <button 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  @click="setMainImage(image)"
                  class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200"
                  :class="selectedImage === image ? 'border-light-accent-sport dark:border-dark-accent-sport' : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport'"
                >
                  <img 
                    :src="image" 
                    :alt="`${product.name} ${index + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>
              
              <!-- Product Code -->
              <div class="text-center">
                <span class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">{{ product.sku }}</span>
              </div>
            </div>

            <!-- Right Column - Product Info -->
            <div class="flex flex-col space-y-3 xl:pl-4 lg:ml-6 xl:ml-8">
              <!-- Product Title -->
              <div>
                <h1 class="text-2xl lg:text-3xl font-bold mb-2 text-light-text-primary dark:text-dark-text-primary">{{ product.name }}</h1>
                
                <!-- Product Code and Status -->
                <div class="flex items-center gap-6 mb-2 text-sm">
                  <div class="flex items-center gap-2">
                    <span class="text-light-text-secondary dark:text-dark-text-secondary">Mã sản phẩm:</span>
                    <span class="font-medium text-light-accent-sport dark:text-dark-accent-sport">{{ product.sku || '88658ATWH' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-light-text-secondary dark:text-dark-text-secondary">Tình trạng:</span>
                    <span class="text-green-600 font-medium">Còn hàng</span>
                  </div>
                </div>

                <!-- Price Section -->
                <div class="mb-3">
                  <div class="flex items-center gap-4 mb-2">
                    <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm">Giá:</span>
                    <span class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">{{ formatPrice(product.price || 325000) }}</span>
                    <span v-if="product.originalPrice" class="text-xl text-light-text-muted dark:text-dark-text-muted line-through">{{ formatPrice(product.originalPrice) }}</span>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="space-y-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">Chi tiết sản phẩm:</span>
                  </div>
                  <div class="bg-white p-3">
                    <ul class="list-disc list-inside space-y-1 ml-4 text-xs">
                      <li>Chất liệu cotton 100% thoáng mát</li>
                      <li>Form dáng regular fit thoải mái</li>
                      <li>Đường may chắc chắn, bền đẹp</li>
                      <li>Dễ dàng phối đồ với nhiều trang phục khác</li>
                      <li>Có thể giặt máy, không phai màu</li>
                    </ul>
                  </div>
                </div>

                <!-- Size Selection -->
                <div class="space-y-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">Kích thước:</span>
                  </div>
                  <div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button 
                      v-for="size in (product.sizes || ['M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'])" 
                      :key="size"
                      @click="selectedSize = size"
                      class="px-2 py-1.5 border rounded-lg text-xs font-medium transition-all duration-200 text-center hover:scale-105"
                      :class="selectedSize === size ? 'border-light-accent-sport dark:border-dark-accent-sport bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 text-light-accent-sport dark:text-dark-accent-sport' : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport text-light-text-primary dark:text-dark-text-primary'"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <!-- Color Selection -->
                <div class="space-y-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">Màu sắc:</span>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      v-for="color in (product.colors || [{ name: 'Trắng', value: 'white', hex: '#FFFFFF' }])" 
                      :key="color.name"
                      @click="selectedColor = color"
                      class="w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110"
                      :class="selectedColor?.name === color.name ? 'border-light-accent-sport dark:border-dark-accent-sport ring-2 ring-light-accent-sport/30 dark:ring-dark-accent-sport/30' : 'border-light-border-primary dark:border-dark-border-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport'"
                      :style="{ backgroundColor: color.hex || getColorValue(color.name) }"
                      :title="color.name"
                    >
                    </button>
                  </div>
                </div>

                <!-- Quantity Selection -->
                <div class="space-y-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">Số lượng:</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center border border-light-border-primary dark:border-dark-border-primary rounded-lg overflow-hidden bg-light-bg-primary dark:bg-dark-bg-primary">
                      <button 
                        @click="decreaseQuantity"
                        class="px-4 py-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors duration-200 text-lg font-bold flex items-center justify-center w-10 h-10 text-light-text-primary dark:text-dark-text-primary"
                      >
                        −
                      </button>
                      <span class="px-4 py-2 border-x border-light-border-primary dark:border-dark-border-primary min-w-[60px] text-center text-sm font-semibold bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary">{{ quantity }}</span>
                      <button 
                        @click="increaseQuantity"
                        class="px-4 py-2 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors duration-200 text-lg font-bold flex items-center justify-center w-10 h-10 text-light-text-primary dark:text-dark-text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4 justify-start">
                  <button 
                    @click="addToCart"
                    class="py-2.5 px-5 border-2 border-light-accent-sport dark:border-dark-accent-sport text-light-accent-sport dark:text-dark-accent-sport rounded-lg font-semibold hover:bg-light-accent-sport dark:hover:bg-dark-accent-sport hover:text-white transition-all duration-200 hover:scale-105 text-sm w-[150px]"
                  >
                    THÊM VÀO GIỎ
                  </button>
                  <button 
                    @click="buyNow"
                    class="py-2.5 px-5 bg-light-accent-sport dark:bg-dark-accent-sport text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:scale-105 shadow-lg text-sm w-[150px]"
                  >
                    MUA NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Specifications Section -->
          <div class="mt-16 max-w-full">
            <!-- Product Specifications -->
            <div v-if="product.specifications" class="card p-8">
              <h3 class="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">Thông số sản phẩm</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(spec, key) in product.specifications" :key="key" class="flex justify-between text-sm py-2 border-b border-light-border-secondary dark:border-dark-border-secondary last:border-b-0">
                  <span class="text-light-text-secondary dark:text-dark-text-secondary">{{ key }}:</span>
                  <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ spec }}</span>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import type { Product } from '@/types/sport';

// Extended Product interface for detail view
interface ProductDetail extends Product {
  images?: string[];
  sizes?: string[];
  colors?: Array<{ name: string; value: string; hex?: string; }>;
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
const selectedImage = ref(props.product.images?.[0] || props.product.image || '');
const selectedSize = ref('');
const selectedColor = ref<{ name: string; value: string; hex?: string } | null>(null);
const quantity = ref(1);
const currentImageIndex = ref(0);
const imageRotationInterval = ref<number | null>(null);



// Computed
const productId = computed(() => route.params.id as string);

const mainImage = computed(() => {
  return selectedImage.value || props.product.images?.[0] || props.product.image || '';
});



// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const getColorValue = (colorName: string) => {
  const colorMap: { [key: string]: string } = {
    'Đen': '#000000',
    'Trắng': '#FFFFFF',
    'Đỏ': '#FF0000',
    'Xanh dương': '#0000FF',
    'Xanh lá': '#00FF00',
    'Vàng': '#FFFF00',
    'Hồng': '#FFC0CB',
    'Tím': '#800080',
    'Cam': '#FFA500',
    'Xám': '#808080',
    'Nâu': '#A52A2A',
    'Xanh navy': '#000080'
  };
  return colorMap[colorName] || '#CCCCCC';
};

const setMainImage = (image: string) => {
  selectedImage.value = image;
  const index = props.product.images?.indexOf(image) || 0;
  currentImageIndex.value = index;
};

const nextImage = () => {
  if (props.product.images && props.product.images.length > 1) {
    const nextIndex = (currentImageIndex.value + 1) % props.product.images.length;
    setMainImage(props.product.images[nextIndex]);
  }
};

const previousImage = () => {
  if (props.product.images && props.product.images.length > 1) {
    const prevIndex = currentImageIndex.value === 0 
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
  console.log('Adding to cart:', {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value
  });
};

const buyNow = () => {
  console.log('Buy now:', {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value
  });
};
// Lifecycle
onMounted(() => {
  // Initialize selected options
  if (props.product.sizes?.length) {
    selectedSize.value = props.product.sizes[0];
  } else {
    selectedSize.value = 'M'; // Default size
  }
  
  if (props.product.colors?.length) {
    selectedColor.value = props.product.colors[0];
  } else {
    selectedColor.value = { name: 'Trắng', value: 'white', hex: '#FFFFFF' }; // Default color
  }
  
  // Update selected image when product changes
  selectedImage.value = props.product.images?.[0] || props.product.image || '';
  currentImageIndex.value = 0;
  
  console.log('Product ID from route:', productId.value);
  console.log('Product data:', props.product);
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