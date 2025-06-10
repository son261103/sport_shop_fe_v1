<template>
  <section class="pt-8 pb-16" style="background-color: #e9ecef;">
    <div class="container-custom">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Product Images -->
          <div data-aos="fade-right" class="space-y-6">
            <!-- Main Image -->
            <div class="relative overflow-hidden rounded-3xl bg-gradient-page transition-all duration-500"
                 @mouseenter="startImageRotation"
                 @mouseleave="stopImageRotation">
              <img :src="selectedImage" 
                   :alt="product.name"
                   class="w-full h-[500px] object-cover transition-all duration-700"
                   :class="{ 'scale-105': isHovering }">
              
              <!-- Discount Badge -->
              <div v-if="product.discount" 
                   class="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                -{{ product.discount }}%
              </div>
            </div>
            
            <!-- Thumbnail Images -->
            <div class="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              <div v-for="(image, index) in product.images" 
                   :key="index"
                   @click="selectedImage = image"
                   :class="selectedImage === image ? 'ring-3 ring-primary shadow-lg' : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-primary/50'"
                   class="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-gradient-page">
                <img :src="image" 
                     :alt="`${product.name} ${index + 1}`"
                     class="w-full h-full object-cover">
              </div>
            </div>
          </div>
          
          <!-- Product Info -->
          <div data-aos="fade-left" data-aos-delay="200" class="space-y-2">
            <!-- Product Title & Brand -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3 mb-1">
                <span v-if="product.isNew" class="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 text-sm">
                  <i class="fas fa-sparkles mr-1"></i>
                  Mới
                </span>
              </div>
              
              <h1 class="text-gradient-sport-animated text-2xl lg:text-3xl font-bold leading-tight mb-2">
                {{ product.name }}
              </h1>
              
              <!-- Rating -->
              <div class="flex items-center space-x-2 mb-2">
                <div class="flex space-x-1">
                  <i v-for="star in 5" :key="star"
                     :class="star <= product.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                     class="text-sm"></i>
                </div>
              </div>
            </div>
            
            <!-- Price -->
            <div class="mb-4">
              <div class="flex items-center space-x-2 mb-1">
                <span class="text-3xl font-bold text-gradient-sport">
                  {{ formatPrice(totalPrice) }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span v-if="product.originalPrice" 
                      class="text-sm text-light-text-muted dark:text-dark-text-muted line-through">
                  {{ formatPrice(product.originalPrice * quantity) }}
                </span>
                <span v-if="product.discount" 
                      class="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-2 py-1 text-xs font-bold">
                  <i class="fas fa-tag mr-1"></i>
                  Giảm {{ product.discount }}%
                </span>
              </div>
            </div>
            
            <!-- Size, Color & Quantity Selection -->
            <div class="bg-gradient-page p-4 rounded-2xl">
              <!-- Size Selection -->
              <div v-if="product.sizes && product.sizes.length" class="mb-3">
                <label class="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1 block">Kích thước:</label>
                <div class="flex flex-wrap gap-1">
                  <button v-for="size in product.sizes" :key="size"
                          @click="selectedSize = size"
                          :class="selectedSize === size ? 'btn-primary' : 'btn-outline'"
                          class="px-2 py-1 rounded text-xs font-medium transition-all duration-300">
                    {{ size }}
                  </button>
                </div>
              </div>
              
              <!-- Color Selection -->
              <div v-if="product.colors && product.colors.length" class="mb-3">
                <label class="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1 block">Màu sắc:</label>
                <div class="flex flex-wrap gap-1 items-center">
                  <button v-for="color in product.colors" :key="color.name"
                          @click="selectedColor = color"
                          :class="selectedColor.name === color.name ? 'ring-2 ring-primary ring-offset-1' : ''"
                          class="w-6 h-6 rounded border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-110"
                          :style="{ backgroundColor: getColorValue(color.name) }"
                          :title="color.name">
                  </button>
                  <span class="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-1">{{ selectedColor.name }}</span>
                </div>
              </div>
              
              <!-- Quantity Selection -->
              <div class="mb-4">
                <label class="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1 block">Số lượng:</label>
                <div class="flex items-center justify-between">
                  <div class="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <button @click="decreaseQuantity" 
                            :disabled="quantity <= 1"
                            class="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm">
                      −
                    </button>
                    <span class="px-4 py-1 font-bold text-sm text-light-text-primary dark:text-dark-text-primary min-w-[40px] text-center bg-white dark:bg-gray-800">{{ quantity }}</span>
                    <button @click="increaseQuantity" 
                            :disabled="Boolean(product.stock && quantity >= product.stock)"
                            class="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm">
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <p v-if="product.stock" class="font-medium text-xs text-green-600 dark:text-green-400">{{ product.stock }} in stock</p>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="grid grid-cols-2 gap-2">
                <button @click="addToCart" 
                        class="bg-light-accent-sport dark:bg-dark-accent-sport hover:opacity-90 text-white px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition-all duration-300">
                  <i class="fas fa-shopping-cart text-xs"></i>
                  <span>Thêm vào giỏ</span>
                </button>
                <button @click="buyNow" 
                        class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1 transition-all duration-300">
                  <i class="fas fa-bolt text-xs"></i>
                  <span>Mua ngay</span>
                </button>
              </div>
            </div>
            
            <!-- Description -->
            <div class="bg-gradient-page p-3 rounded-2xl">
              <h3 class="text-sm font-bold text-light-text-primary dark:text-dark-text-primary mb-2 flex items-center">
                <i class="fas fa-info-circle mr-1 text-primary text-xs"></i>
                Mô tả sản phẩm
              </h3>
              <p class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed text-sm">
                {{ product.description }}
              </p>
            </div>
            
            <!-- Shipping Info -->
            <div class="bg-gradient-page p-3 rounded-2xl">
              <h3 class="text-sm font-bold text-light-text-primary dark:text-dark-text-primary mb-3 flex items-center">
                <i class="fas fa-shipping-fast mr-1 text-primary text-xs"></i>
                Vận chuyển & bảo hành
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <i class="fas fa-truck text-green-600 dark:text-green-400 text-xs"></i>
                  <div>
                    <p class="font-medium text-green-800 dark:text-green-300 text-xs">Miễn phí ship</p>
                    <p class="text-xs text-green-600 dark:text-green-400">Trên 500k</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <i class="fas fa-clock text-blue-600 dark:text-blue-400 text-xs"></i>
                  <div>
                    <p class="font-medium text-blue-800 dark:text-blue-300 text-xs">Giao nhanh</p>
                    <p class="text-xs text-blue-600 dark:text-blue-400">2-3 ngày</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <i class="fas fa-shield-alt text-purple-600 dark:text-purple-400 text-xs"></i>
                  <div>
                    <p class="font-medium text-purple-800 dark:text-purple-300 text-xs">Bảo hành</p>
                    <p class="text-xs text-purple-600 dark:text-purple-400">12 tháng</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <i class="fas fa-undo text-orange-600 dark:text-orange-400 text-xs"></i>
                  <div>
                    <p class="font-medium text-orange-800 dark:text-orange-300 text-xs">Đổi trả</p>
                    <p class="text-xs text-orange-600 dark:text-orange-400">30 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

// Props
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  category: string;
  brand: string;
  sizes?: string[];
  colors?: Array<{ name: string; value: string; }>;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features?: string[];
  stock: number;
  isNew?: boolean;
}

interface Props {
  product: Product;
}

const props = defineProps<Props>();

// Router
const route = useRoute();

// Reactive data
const selectedImage = ref(props.product.images?.[0] || '');
const selectedSize = ref('');
const selectedColor = ref({ name: '', value: '' });
const quantity = ref(1);

const isHovering = ref(false);
const imageRotationInterval = ref<number | null>(null);
const currentImageIndex = ref(0);

// Computed
const productId = computed(() => route.params.id as string);

const totalPrice = computed(() => {
  return props.product.price * quantity.value;
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

const increaseQuantity = () => {
  quantity.value++;
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

const startImageRotation = () => {
  isHovering.value = true;
  if (props.product.images && props.product.images.length > 1) {
    imageRotationInterval.value = setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % props.product.images.length;
      selectedImage.value = props.product.images[currentImageIndex.value];
    }, 1000);
  }
};

const stopImageRotation = () => {
  isHovering.value = false;
  if (imageRotationInterval.value) {
    clearInterval(imageRotationInterval.value);
    imageRotationInterval.value = null;
  }
};

// Lifecycle
onMounted(() => {
  // Initialize selected options
  if (props.product.sizes?.length) {
    selectedSize.value = props.product.sizes[0];
  }
  if (props.product.colors?.length) {
    selectedColor.value = props.product.colors[0];
  }
  
  // Update selected image when product changes
  selectedImage.value = props.product.images?.[0] || '';
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