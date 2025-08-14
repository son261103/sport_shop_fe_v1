<template>
  <div id="style" class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
    <!-- Main Product Section -->
    <section class="pt-8 pb-0">
      <div class="w-full px-6 py-8">
        <div class="w-3/4 mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <!-- Left Column - Product Images -->
             <div class="space-y-4">
              <!-- Main Image -->
              <div class="relative bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl overflow-hidden aspect-[3/2]">
                <img
                  :src="allImages[currentImageIndex] || mainImage"
                  :alt="product.name"
                  class="w-full h-full object-cover cursor-pointer"
                  @click="nextImage"
                />
                <!-- Share and Wishlist buttons -->
                <div class="absolute top-4 left-4 flex gap-2">
                  <button class="w-8 h-8 bg-light-bg-primary dark:bg-dark-bg-primary rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                    <svg class="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                  </button>
                </div>
                <div class="absolute top-4 right-4">
                  <button class="w-8 h-8 bg-light-bg-primary dark:bg-dark-bg-primary rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                    <svg class="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Thumbnail Images -->
              <div class="flex gap-2 justify-center">
                <button
                  v-for="(image, index) in allImages.slice(0, 3)"
                  :key="index"
                  @click="currentImageIndex = index"
                  class="w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200"
                  :class="[
                    currentImageIndex === index
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <img
                    :src="image"
                    :alt="`Thumbnail ${index + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
                <!-- Additional thumbnails if less than 3 images -->
                <button
                  v-for="n in Math.max(0, 3 - allImages.length)"
                  :key="'placeholder-' + n"
                  class="w-20 h-20 rounded-lg overflow-hidden border-2 border-light-border-secondary dark:border-dark-border-secondary bg-light-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center"
                >
                  <svg class="w-6 h-6 text-light-text-muted dark:text-dark-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>


            </div>

            <!-- Right Column - Product Info -->
             <div class="space-y-6">

              
              <!-- Product Header -->
              <div class="space-y-4">
                <h1 class="text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">
                  {{ product.name }}
                </h1>
                
                <!-- Rating and Reviews -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1">
                    <div class="flex text-yellow-400">
                      <span v-for="i in 5" :key="i" class="text-lg">★</span>
                    </div>
                    <span class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">4.8</span>
                    <span class="text-sm text-light-text-muted dark:text-dark-text-muted">(150 đánh giá)</span>
                  </div>
                  <span class="text-sm text-green-600 font-medium">Còn hàng</span>
                </div>
                
                <!-- Price -->
                <div class="space-y-2">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl font-bold text-green-600">{{ formatPrice(product.price) }}</span>
                    <span class="text-lg text-light-text-muted dark:text-dark-text-muted line-through">2.999.000 ₫</span>
                    <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">-17%</span>
                  </div>
                </div>
                  
                <!-- Variant Preview (Color Grid) -->
                <div v-if="availableColors.length > 0" class="space-y-2">
                  <div class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Màu Sắc</div>
                  <div class="grid grid-cols-8 gap-1">
                    <button
                      v-for="color in availableColors.slice(0, 16)"
                      :key="color.value"
                      @click="selectColor(color)"
                      class="flex flex-col items-center gap-1 py-1 px-1 border rounded-md transition-all duration-200 hover:shadow-sm text-xs"
                      :class="[
                        selectedColor?.value === color.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-light-border-secondary dark:border-dark-border-secondary hover:border-light-border-primary dark:hover:border-dark-border-primary'
                      ]"
                    >
                      <div class="w-3 h-3 rounded overflow-hidden flex-shrink-0">
                        <img
                          v-if="getVariantByColor(color.value)?.image"
                          :src="getVariantByColor(color.value)?.image || ''"
                          :alt="color.name"
                          class="w-full h-full object-cover"
                        />
                        <div
                          v-else
                          class="w-full h-full border border-gray-300"
                          :style="{ backgroundColor: color.hex || getColorHex(color.value) }"
                        ></div>
                      </div>
                      <span class="text-gray-700 truncate text-xs leading-tight">{{ color.name }}</span>
                    </button>
                  </div>
                </div>



                <!-- Size Selection -->
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-700">Kích thước (VN/US):</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedSize || 'Chưa chọn' }}</span>
                  </div>
                  <div class="grid grid-cols-8 gap-1">
                    <button
                      v-for="size in availableSizes"
                      :key="size"
                      @click="selectSize(size)"
                      :class="[
                        'py-1 px-1 text-xs font-medium rounded border transition-all duration-200',
                        selectedSize === size
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                      ]"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>



                <!-- Stock Status -->
                <div class="text-sm text-gray-700">
                  Số lượng:
                </div>
                
                <!-- Quantity Selector -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center border border-gray-300 rounded">
                    <button
                      @click="decreaseQuantity"
                      :disabled="isOutOfStock"
                      class="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span class="px-4 py-2 border-x border-gray-300 bg-white text-gray-900 min-w-[50px] text-center">{{ quantity }}</span>
                    <button
                      @click="increaseQuantity"
                      :disabled="isOutOfStock || quantity >= stockQuantity"
                      class="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <span class="text-sm text-gray-500">Còn lại 50 sản phẩm</span>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                  <!-- Add to Cart Button -->
                  <button
                    @click="addToCartWithTotal"
                    :disabled="isOutOfStock"
                    class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                    Thêm vào giỏ hàng
                  </button>
                  
                  <!-- Buy Now Button -->
                  <button class="w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded font-medium transition-colors">
                    Mua ngay
                  </button>
                </div>
                
                <!-- Additional Info -->
                <div class="space-y-3 pt-4 border-t border-gray-200">
                  <div class="flex items-center gap-3 text-sm text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    <span>Miễn phí vận chuyển</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <span>Đổi trả miễn phí trong 30 ngày</span>
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
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useCartAnimation } from "@/composables/useCartAnimation";

import type { Product } from "@/types/sport";
import type { ProductVariant } from "@/types/admin/variant";

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
  variants?: ProductVariant[];
}

interface Props {
  product: ProductDetail;
}

const props = defineProps<Props>();

// Router
const route = useRoute();

// Store
const cartStore = useCartStore();

// Composables
const { animateToCart } = useCartAnimation();

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

// Get product variants from API only
const productVariants = computed(() => {
  return props.product.variants || [];
});

// Group variants by color
const variantsByColor = computed(() => {
  const colorGroups: Record<string, typeof productVariants.value> = {};
  
  console.log("Đang nhóm các biến thể theo màu sắc, tổng số biến thể:", productVariants.value.length);
  
  productVariants.value.forEach((variant: ProductVariant) => {
    // Chuẩn hóa màu sắc bằng cách loại bỏ dấu backtick và khoảng trắng
    const originalColor = variant.color || '';
    // Sử dụng toLowerCase() để đảm bảo tất cả các màu được nhóm theo cùng một key
    const normalizedColor = originalColor.replace(/[\s`]/g, '').toLowerCase().trim();
    
    console.log("Xử lý biến thể:", variant.id, "Màu gốc:", originalColor, "Màu chuẩn hóa:", normalizedColor, "Kích thước:", variant.size);
    
    // Sử dụng màu đã chuẩn hóa làm key để nhóm các biến thể
    if (!colorGroups[normalizedColor]) {
      colorGroups[normalizedColor] = [];
    }
    colorGroups[normalizedColor].push(variant);
  });
  
  console.log("Đã nhóm các biến thể theo màu sắc:", Object.keys(colorGroups));
  return colorGroups;
});

// Get unique colors from variants
const availableColors = computed(() => {
  // Extract unique colors from variants
  const colors = [...new Set(productVariants.value.map((v: ProductVariant) => v.color))];
  
  // Map colors to objects with name, value, and hex properties
  const result = colors.map((color: string) => {
    // Sử dụng màu gốc từ API để hiển thị tên màu thân thiện với người dùng
    // nhưng vẫn đảm bảo chuẩn hóa để tìm kiếm mã hex
    const originalColor = color || '';
    const cleanedColor = originalColor.replace(/[\s`]/g, '').trim();
    
    // Lấy mã hex từ hàm getColorValue đã cải tiến
    const hexColor = getColorValue(originalColor);
    
    console.log("Màu từ API:", originalColor, "-> Màu đã làm sạch:", cleanedColor, "-> Mã hex:", hexColor);
    
    // Tên hiển thị sẽ là tên màu đã làm sạch, hoặc nếu là 'black' thì hiển thị 'Black'
    let displayName = cleanedColor;
    if (cleanedColor.toLowerCase() === 'black') {
      displayName = 'Black';
    }
    
    return {
      name: displayName,
      value: cleanedColor.toLowerCase(),
      hex: hexColor
    };
  });
  
  console.log("Computed availableColors:", result);
  return result;
});

// Get available sizes for the selected color
const availableSizes = computed(() => {
  if (!selectedColor.value) {
    console.log("Chưa chọn màu, trả về mảng kích thước rỗng");
    return [];
  }
  
  // Sử dụng giá trị đã chuẩn hóa (lowercase) để tìm kiếm trong variantsByColor
  const normalizedColorValue = selectedColor.value.value; // Đã được chuẩn hóa và lowercase trong availableColors
  
  console.log("Tìm kích thước cho màu:", selectedColor.value.name, "(giá trị chuẩn hóa:", normalizedColorValue, ")");
  console.log("Các biến thể theo màu:", Object.keys(variantsByColor.value));
  
  // Tìm các biến thể cho màu đã chọn sử dụng giá trị đã chuẩn hóa
  const colorVariants = variantsByColor.value[normalizedColorValue] || [];
  console.log("Các biến thể cho màu đã chọn:", colorVariants.length, "biến thể");
  
  // Lấy các kích thước duy nhất từ các biến thể
  const sizes = [...new Set(colorVariants.map((v: ProductVariant) => v.size))];
  console.log("Các kích thước có sẵn cho màu", selectedColor.value.name, ":", sizes);
  
  return sizes;
});

// Get current selected variant
const selectedVariant = computed(() => {
  // Nếu không có màu sắc được chọn, sử dụng màu đen mặc định
  if (!selectedColor.value) {
    console.log("Chưa chọn màu, sử dụng màu đen mặc định");
    selectedColor.value = { name: "Black", value: "black", hex: "#000000" };
  }
  
  // Nếu không có kích thước được chọn, không set giá trị mặc định
  if (!selectedSize.value) {
    console.log("Chưa chọn kích thước");
  }
  
  // Sử dụng giá trị đã chuẩn hóa (lowercase) để tìm kiếm biến thể
  const normalizedColorValue = selectedColor.value.value; // Đã được chuẩn hóa và lowercase trong availableColors
  
  console.log("Tìm biến thể với màu:", selectedColor.value.name, "(giá trị chuẩn hóa:", normalizedColorValue, ") và kích thước:", selectedSize.value);
  
  // Tìm biến thể phù hợp trong danh sách sản phẩm
  const variant = productVariants.value.find((v: ProductVariant) => {
    // Chuẩn hóa màu từ biến thể để khớp với giá trị đã chuẩn hóa của selectedColor
    const normalizedVariantColor = (v.color || '').replace(/[\s`]/g, '').toLowerCase().trim();
    console.log("So sánh màu biến thể:", v.color, "(chuẩn hóa thành:", normalizedVariantColor, ") với màu đã chọn:", normalizedColorValue);
    return normalizedVariantColor === normalizedColorValue && v.size === selectedSize.value;
  });
  
  // Nếu tìm thấy biến thể phù hợp, trả về nó
  if (variant) {
    console.log("Đã tìm thấy biến thể phù hợp:", variant);
    return variant;
  }
  
  // Nếu không tìm thấy biến thể phù hợp, tạo một biến thể mặc định
  console.log("Không tìm thấy biến thể phù hợp, tạo biến thể mặc định");
  
  // Sử dụng biến thể đầu tiên làm cơ sở nếu có
  const defaultVariant: Partial<ProductVariant> = productVariants.value.length > 0 ? { ...productVariants.value[0] } : {};
  
  // Tạo biến thể mặc định với màu đen và size M
  return {
    id: defaultVariant.id || 0,
    product_id: props.product.id,
    color: selectedColor.value.name,
    size: selectedSize.value,
    stock_quantity: defaultVariant.stock_quantity || 10,
    image: props.product.image || (defaultVariant.image || ''),
    price: props.product.price
  };
});

// Get variant images
const variantImages = computed(() => {
  return productVariants.value.map((variant: ProductVariant) => ({
    id: variant.id,
    name: `${variant.color} - ${variant.size}`,
    image: variant.image || ''
  }));
});

// Computed
const productId = computed(() => route.params.id as string);

const mainImage = computed(() => {
  // If a variant is selected, use its image
  if (selectedVariant.value) {
    return selectedVariant.value.image;
  }
  
  return (
    selectedImage.value ||
    props.product.images?.[0] ||
    props.product.image ||
    ""
  );
});

const allImages = computed(() => {
  const productImages = props.product.images || [props.product.image || ""];
  const variantImageUrls = variantImages.value.map((v: { id: number; name: string; image: string }) => v.image);
  
  // Kết hợp ảnh sản phẩm và ảnh variant
  const allImagesList = [...productImages, ...variantImageUrls].filter(Boolean);
  
  // Loại bỏ ảnh trùng lặp
  const uniqueImages = [...new Set(allImagesList)];
  return uniqueImages;
});

const totalPrice = computed(() => {
  return (props.product.price || 489000) * quantity.value;
});

const stockQuantity = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.stock_quantity;
  }
  return props.product.stock || 0;
});

const isOutOfStock = computed(() => {
  return stockQuantity.value <= 0;
});

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const getColorValue = (colorName: string) => {
  // Đơn giản hóa việc xử lý màu sắc
  // Loại bỏ tất cả khoảng trắng, dấu backtick và chuyển về chữ thường
  const normalizedColor = (colorName || '').replace(/[\s`]/g, '').toLowerCase().trim();
  
  console.log('Xử lý màu:', colorName, '-> Chuẩn hóa thành:', normalizedColor);
  
  // Bảng màu đơn giản với key là tên màu đã chuẩn hóa
  const colorMap: Record<string, string> = {
    // Tiếng Anh
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#00FF00',
    'yellow': '#FFFF00',
    'pink': '#FFC0CB',
    'purple': '#800080',
    'orange': '#FFA500',
    'gray': '#808080',
    'brown': '#A52A2A',
    'navy': '#000080',
    
    // Tiếng Việt
    'đen': '#000000',
    'trắng': '#FFFFFF',
    'đỏ': '#FF0000',
    'xanhdương': '#0000FF',
    'xanh': '#0000FF', // Mặc định xanh là xanh dương
    'xanhlá': '#00FF00',
    'vàng': '#FFFF00',
    'hồng': '#FFC0CB',
    'tím': '#800080',
    'cam': '#FFA500',
    'xám': '#808080',
    'nâu': '#A52A2A',
    'xanhnavy': '#000080',
  };
  
  // Tìm màu trong bảng màu
  const hexColor = colorMap[normalizedColor];
  
  if (hexColor) {
    console.log('Đã tìm thấy mã màu cho', normalizedColor, ':', hexColor);
    return hexColor;
  }
  
  // Xử lý các trường hợp đặc biệt
  if (normalizedColor.includes('black') || normalizedColor.includes('đen')) {
    console.log('Màu chứa từ khóa black/đen, trả về màu đen');
    return '#000000';
  }
  
  console.log('Không tìm thấy màu', normalizedColor, ', sử dụng màu mặc định #CCCCCC');
  return '#CCCCCC'; // Màu mặc định nếu không tìm thấy
};

// Function for template usage
const getColorHex = (colorName: string) => {
  return getColorValue(colorName);
};



const setMainImageByIndex = (index: number) => {
  currentImageIndex.value = index;
  selectedImage.value = allImages.value[index];
};

const nextImage = () => {
  if (allImages.value && allImages.value.length > 1) {
    const nextIndex =
      (currentImageIndex.value + 1) % allImages.value.length;
    setMainImageByIndex(nextIndex);
  }
};



const increaseQuantity = () => {
  if (quantity.value < stockQuantity.value) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};





// Function to get variant by color
const getVariantByColor = (colorValue: string) => {
  return productVariants.value.find((variant: ProductVariant) => {
    const normalizedVariantColor = (variant.color || '').replace(/[\s`]/g, '').toLowerCase().trim();
    const normalizedColorValue = (colorValue || '').replace(/[\s`]/g, '').toLowerCase().trim();
    return normalizedVariantColor === normalizedColorValue || 
           normalizedVariantColor === normalizedColorValue.replace('đen', 'black').replace('black', 'đen');
  });
};

const selectColor = (color: typeof selectedColor.value) => {
  console.log("Selecting color", color);
  console.log("Previous color was", selectedColor.value);
  selectedColor.value = color;
  
  // After setting color, wait for computed properties to update
  setTimeout(() => {
    // Reset size if the current size is not available for this color
    const sizesForColor = availableSizes.value;
    console.log("Available sizes for color", color?.name, ":", sizesForColor);
    
    if (sizesForColor.length > 0) {
      if (!sizesForColor.includes(selectedSize.value)) {
        console.log("Current size", selectedSize.value, "not available for this color, resetting to", sizesForColor[0]);
        selectedSize.value = sizesForColor[0];
      } else {
        console.log("Current size", selectedSize.value, "is available for this color, keeping it");
      }
    } else {
      console.log("No sizes available for this color, clearing size selection");
      selectedSize.value = "";
    }
    
    // Cập nhật biến thể đã chọn và hình ảnh
    // Sử dụng giá trị đã chuẩn hóa (lowercase) để tìm kiếm biến thể
    const normalizedColorValue = color?.value; // Đã được chuẩn hóa và lowercase trong availableColors
    
    const variant = productVariants.value.find((v: ProductVariant) => {
      // Chuẩn hóa màu từ biến thể để khớp với giá trị đã chuẩn hóa của color
      const normalizedVariantColor = (v.color || '').replace(/[\s`]/g, '').toLowerCase().trim();
      console.log("So sánh màu biến thể:", v.color, "(chuẩn hóa thành:", normalizedVariantColor, ") với màu đã chọn:", normalizedColorValue);
      return normalizedVariantColor === normalizedColorValue && v.size === selectedSize.value;
    });
    
    if (variant) {
      console.log("Updating image to match selected variant", variant.image);
      selectedImage.value = variant.image || '';
    } else {
      console.log("No variant selected after color change");
    }
    
    console.log("Selected size after color change:", selectedSize.value);
    console.log("Selected variant after color change:", selectedVariant.value ? selectedVariant.value.id : 'none');
  }, 0);
};

const selectSize = (size: string) => {
  console.log("Selecting size", size);
  console.log("Previous size was", selectedSize.value);
  console.log("Current color is", selectedColor.value?.name);
  
  selectedSize.value = size;
  
  // After setting size, wait for computed properties to update
  setTimeout(() => {
    // Update selected variant
    if (selectedColor.value) {
      // Sử dụng giá trị đã chuẩn hóa (lowercase) để tìm kiếm biến thể
      const normalizedColorValue = selectedColor.value.value; // Đã được chuẩn hóa và lowercase trong availableColors
      
      const variant = productVariants.value.find((v: ProductVariant) => {
        // Chuẩn hóa màu từ biến thể để khớp với giá trị đã chuẩn hóa của selectedColor
        const normalizedVariantColor = (v.color || '').replace(/[\s`]/g, '').toLowerCase().trim();
        console.log("So sánh màu biến thể:", v.color, "(chuẩn hóa thành:", normalizedVariantColor, ") với màu đã chọn:", normalizedColorValue);
        return normalizedVariantColor === normalizedColorValue && v.size === size;
      });
      
      console.log("Found variant for color", selectedColor.value?.name, "and size", size, ":", variant);
      
      if (variant) {
        console.log("Updating image to match selected variant", variant.image);
        selectedImage.value = variant.image || '';
      } else {
        console.log("No variant found for selected color and size");
      }
    }
    
    console.log("Selected size:", size);
    console.log("Selected color when size changed:", selectedColor.value?.name);
    console.log("Selected variant after size change:", selectedVariant.value ? selectedVariant.value.id : 'none');
  }, 0);
};



// Update addToCart method to include totalPrice and variant
const addToCartWithTotal = async (event?: Event) => {
  if (isOutOfStock.value) {
    alert('Sản phẩm đã hết hàng!');
    return;
  }
  
  // Trigger animation nếu có event
  if (event) {
    const buttonElement = event.currentTarget as HTMLElement;
    if (buttonElement) {
      animateToCart(buttonElement);
    }
  }
  
  // Nếu không có màu sắc hoặc kích thước được chọn, sử dụng giá trị mặc định
  if (!selectedColor.value) {
    console.log("Không có màu sắc được chọn, sử dụng màu đen mặc định");
    selectedColor.value = { name: "Black", value: "black", hex: "#000000" };
  }
  
  if (!selectedSize.value) {
    console.log("Không có kích thước được chọn");
  }
  
  const cartItem = {
    product: props.product,
    variant: selectedVariant.value,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    totalPrice: totalPrice.value,
  };
  
  console.log("Adding to cart:", cartItem);
  
  try {
    // Gọi API để thêm sản phẩm vào giỏ hàng
    const request = {
      product_id: parseInt(props.product.id),
      quantity: quantity.value,
      variant_id: selectedVariant.value?.id || undefined
    };
    
    console.log("Sending request to add to cart:", request);
    const response = await cartStore.addToCart(request);
    console.log("Add to cart response:", response);
    
    // Show success message
    alert(`Đã thêm ${quantity.value} sản phẩm vào giỏ hàng. Tổng tiền: ${formatPrice(totalPrice.value)}`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.");
  }
};

// Watch for changes in productVariants to update UI when new variants are added
watch(
  () => productVariants.value,
  (newVariants, oldVariants) => {
    console.log("Product variants changed:", {
      old: oldVariants?.length || 0,
      new: newVariants?.length || 0,
      variants: newVariants
    });
    
    // Force reactivity update for availableColors
    if (newVariants && newVariants.length > 0) {
      console.log("New variants detected, updating available colors:", availableColors.value);
    }
  },
  { deep: true, immediate: false }
);

// Lifecycle
onMounted(() => {
  console.log("Initializing product with variants:", productVariants.value);
  console.log("Available colors:", availableColors.value);
  
  // Tìm và chọn màu đen và size M nếu có sẵn, nếu không thì sử dụng giá trị mặc định
  if (productVariants.value.length > 0) {
    console.log("Đang tìm màu đen và size M trong các biến thể sản phẩm...");
    
    // Tìm màu đen trong danh sách màu có sẵn
    const blackColor = availableColors.value.find(color => {
      const normalizedColorName = color.value.toLowerCase();
      return normalizedColorName === 'black' || normalizedColorName === 'đen';
    });
    
    // Nếu tìm thấy màu đen, chọn nó
    if (blackColor) {
      console.log("Đã tìm thấy màu đen:", blackColor);
      selectedColor.value = blackColor;
    } else {
      // Nếu không tìm thấy màu đen, chọn màu đầu tiên
      console.log("Không tìm thấy màu đen, chọn màu đầu tiên:", availableColors.value[0]);
      selectedColor.value = availableColors.value[0];
    }
    
    // Sau khi chọn màu, đợi để availableSizes được cập nhật
    setTimeout(() => {
      console.log("Các kích thước có sẵn sau khi chọn màu:", availableSizes.value);
      
      // Không tự động chọn kích thước, để người dùng tự chọn
      console.log("Các kích thước có sẵn:", availableSizes.value);
      selectedSize.value = "";
      
      // Cập nhật hình ảnh từ biến thể đã chọn
      if (selectedVariant.value) {
        selectedImage.value = selectedVariant.value.image || '';
        console.log("Cập nhật hình ảnh từ biến thể:", selectedImage.value);
      }
    }, 0);
  } else {
    // Fallback to product defaults if no variants
    console.log("Không có biến thể sản phẩm, sử dụng giá trị mặc định");
    
    // Không tự động chọn kích thước, để người dùng tự chọn
    selectedSize.value = "";
    console.log("Không đặt kích thước mặc định");
    
    // Mặc định chọn màu đen
    selectedColor.value = { name: "Black", value: "black", hex: "#000000" };
    console.log("Đặt màu mặc định là đen");
    
    // Update selected image when product changes
    selectedImage.value = props.product.images?.[0] || props.product.image || "";
  }
  
  currentImageIndex.value = 0;

  console.log("Product ID from route:", productId.value);
  console.log("Product data:", props.product);
  console.log("Initial state:", {
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
    selectedVariant: selectedVariant.value,
    availableSizes: availableSizes.value
  });
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

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Color selection transitions */
.color-fade-enter-active,
.color-fade-leave-active {
  transition: all 0.3s ease;
}

.color-fade-enter-from,
.color-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.color-fade-move {
  transition: transform 0.3s ease;
}

/* Size selection transitions */
.size-fade-enter-active,
.size-fade-leave-active {
  transition: all 0.3s ease;
}

.size-fade-enter-from,
.size-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.size-fade-move {
  transition: transform 0.3s ease;
}
</style>
