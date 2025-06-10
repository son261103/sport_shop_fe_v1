<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <Loading size="lg" color="sport" text="Đang tải sản phẩm..." />
    </div>

    <!-- Page Content -->
    <div v-else>
      <!-- Hero Banner -->
      <ProductHeroBanner />

      <!-- Main Content Layout -->
      <div class="container-custom section-padding">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filter Sidebar -->
        <ProductFilterSidebar
          v-model:sort-by="sortBy"
          v-model:price-range="priceRange"
          v-model:selected-categories="selectedCategories"
          v-model:selected-brands="selectedBrands"
          @reset-filters="resetFilters"
        />

        <!-- Products Content -->
        <main class="flex-1">

      <!-- Best Sellers Section -->
      <ProductSection
        title="Hàng Bán Chạy"
        banner-image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        gradient-class="bg-gradient-to-r from-green-900/70 to-emerald-600/50"
        :products="bestSellers"
        :show-next-button="true"
        @product-click="handleProductClick"
        @add-to-cart="handleAddToCart"
        @toggle-favorite="handleToggleFavorite"
        @next-clicked="scrollToAllProducts"
      />

      <!-- Sale Items Section -->
      <ProductSection
        title="Đang Giảm Giá"
        banner-image="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        gradient-class="bg-gradient-to-r from-red-900/70 to-pink-600/50"
        :products="saleItems"
        :show-next-button="true"
        @product-click="handleProductClick"
        @add-to-cart="handleAddToCart"
        @toggle-favorite="handleToggleFavorite"
        @next-clicked="scrollToAllProducts"
      />

      <!-- All Products Section -->
      <AllProductsSection
        :products="allProducts"
        v-model:current-page="currentPage"
        :items-per-page="itemsPerPage"
        @product-click="handleProductClick"
        @add-to-cart="handleAddToCart"
        @toggle-favorite="handleToggleFavorite"
      />



      <!-- News Section -->
      <NewsSection :news-articles="newsArticles" />
        </main>
      </div>
    </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import AOS from "aos";
import { Loading } from "@/components/ui";
import type { Product } from "@/components/examples";
import {
  ProductHeroBanner,
  ProductFilterSidebar,
  ProductSection,
  AllProductsSection,
  NewsSection
} from "@/components/user/products";

// Router
const router = useRouter();

// Loading state
const isLoading = ref(true);

// Filter and sort states
const sortBy = ref('default');
const priceRange = ref('all');
const selectedCategories = ref<string[]>([]);
const selectedBrands = ref<string[]>([]);

// Pagination states
const currentPage = ref(1);
const itemsPerPage = 50;

// Reset filters function
const resetFilters = () => {
  sortBy.value = 'default';
  priceRange.value = 'all';
  selectedCategories.value = [];
  selectedBrands.value = [];
  currentPage.value = 1;
};



// News data
const newsArticles = ref([
  {
    id: 1,
    title: 'Những thành tựu nổi bật của ngành thể thao Việt Nam',
    excerpt: 'Đội tuyển bóng đá Việt Nam đạt thành tích cao tại AFF Cup, các vận động viên xuất sắc tại SEA Games 32.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    category: 'Thể thao',
    date: '15/12/2024',
    readTime: 5
  },
  {
    id: 2,
    title: 'Giải vô địch bóng đá quốc gia 2024 khởi tranh',
    excerpt: 'Giải đấu hứa hẹn sẽ mang đến những trận cầu hấp dẫn với sự tham gia của các đội bóng hàng đầu.',
    image: 'https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    category: 'Bóng đá',
    date: '12/12/2024',
    readTime: 3
  },
  {
    id: 3,
    title: 'Đội tuyển Việt Nam chuẩn bị cho AFF Cup',
    excerpt: 'HLV Park Hang-seo đã công bố danh sách 25 cầu thủ cho chiến dịch AFF Cup sắp tới.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    category: 'Bóng đá',
    date: '10/12/2024',
    readTime: 4
  },
  {
    id: 4,
    title: 'Khai mạc giải Marathon quốc tế Hà Nội',
    excerpt: 'Hơn 10,000 vận động viên từ khắp nơi trên thế giới tham gia giải chạy marathon lớn nhất năm.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    category: 'Marathon',
    date: '08/12/2024',
    readTime: 3
  },
  {
    id: 5,
    title: 'Điểm nhấn vòng 10 V.League 2024: HAGL thoát đáy bảng',
    excerpt: 'Chiến thắng quan trọng giúp HAGL có được 3 điểm quý giá trong cuộc đua trụ hạng.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    category: 'V.League',
    date: '05/12/2024',
    readTime: 4
  },
  {
    id: 6,
    title: 'Thể thao Việt Nam hoàn thành xuất sắc chỉ tiêu tại SEA Games 32',
    excerpt: 'Đoàn thể thao Việt Nam đã vượt qua chỉ tiêu đề ra và giành được nhiều huy chương quý giá.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    category: 'SEA Games',
    date: '02/12/2024',
    readTime: 6
  }
]);

// Sample product data
const bestSellers = ref<Product[]>([
  {
    id: "bs1",
    name: "Nike Air Max 270",
    price: 2890000,
    originalPrice: 3200000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Giày chạy bộ",
    brand: "Nike",
    rating: 4.8,
    reviews: 1250,
    inStock: true,
    isFavorite: false,
    description: "Giày chạy bộ với công nghệ đệm khí tiên tiến"
  },
  {
    id: "bs2",
    name: "Adidas Ultraboost 22",
    price: 3150000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Giày chạy bộ",
    brand: "Adidas",
    rating: 4.7,
    reviews: 980,
    inStock: true,
    isFavorite: true,
    description: "Giày chạy bộ với công nghệ Boost độc quyền"
  },
  {
    id: "bs3",
    name: "Puma RS-X3",
    price: 2450000,
    originalPrice: 2800000,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Giày thể thao",
    brand: "Puma",
    rating: 4.6,
    reviews: 750,
    inStock: true,
    isFavorite: false,
    description: "Giày thể thao phong cách retro hiện đại"
  },
  {
    id: "bs4",
    name: "Under Armour HOVR",
    price: 2690000,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Giày chạy bộ",
    brand: "Under Armour",
    rating: 4.5,
    reviews: 620,
    inStock: true,
    isFavorite: false,
    description: "Giày chạy bộ với công nghệ HOVR"
  },
  {
    id: "bs5",
    name: "New Balance 990v5",
    price: 3890000,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Giày thể thao",
    brand: "New Balance",
    rating: 4.9,
    reviews: 1100,
    inStock: true,
    isFavorite: true,
    description: "Giày thể thao cao cấp Made in USA"
  }
]);

const saleItems = ref<Product[]>([
  {
    id: "sl1",
    name: "Nike Dri-FIT T-Shirt",
    price: 590000,
    originalPrice: 890000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Áo thể thao",
    brand: "Nike",
    rating: 4.4,
    reviews: 450,
    inStock: true,
    isFavorite: false,
    description: "Áo thể thao công nghệ Dri-FIT"
  },
  {
    id: "sl2",
    name: "Adidas Training Shorts",
    price: 450000,
    originalPrice: 650000,
    image: "https://images.unsplash.com/photo-1506629905607-d405b7a82b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Quần thể thao",
    brand: "Adidas",
    rating: 4.3,
    reviews: 320,
    inStock: true,
    isFavorite: false,
    description: "Quần short tập luyện thoáng mát"
  },
  {
    id: "sl3",
    name: "Puma Track Jacket",
    price: 890000,
    originalPrice: 1290000,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Áo khoác",
    brand: "Puma",
    rating: 4.5,
    reviews: 280,
    inStock: true,
    isFavorite: true,
    description: "Áo khoác thể thao phong cách"
  },
  {
    id: "sl4",
    name: "Wilson Tennis Racket",
    price: 1890000,
    originalPrice: 2490000,
    image: "https://images.unsplash.com/photo-1554735490-5974588cbc4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Vợt tennis",
    brand: "Wilson",
    rating: 4.7,
    reviews: 180,
    inStock: true,
    isFavorite: false,
    description: "Vợt tennis chuyên nghiệp"
  },
  {
    id: "sl5",
    name: "Nike Football",
    price: 690000,
    originalPrice: 990000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "Bóng đá",
    brand: "Nike",
    rating: 4.6,
    reviews: 520,
    inStock: true,
    isFavorite: false,
    description: "Bóng đá chất lượng cao"
  }
]);

// Premium products removed since not used in components

// Methods
const handleProductClick = (product: Product) => {
  console.log('Product clicked:', product);
  // Navigate to product detail page
  router.push({ name: 'ProductsDetail', params: { id: product.id } });
};

const handleAddToCart = (product: Product) => {
  console.log('Add to cart:', product);
  // Add product to cart logic
};

const handleToggleFavorite = (product: Product) => {
  console.log('Toggle favorite:', product);
  // Toggle favorite logic
};

// Initialize page
const initializePage = async () => {
  try {
    isLoading.value = true;
    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Initialize AOS animations
    AOS.refresh();
  } catch (error) {
    console.error("Error initializing page:", error);
  } finally {
    isLoading.value = false;
  }
};

// Computed properties for AllProductsSection
const allProducts = computed(() => [
  ...bestSellers.value,
  ...saleItems.value
]);

// Scroll to All Products section
const scrollToAllProducts = () => {
  const allProductsSection = document.getElementById('all-products');
  if (allProductsSection) {
    allProductsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Initialize when component is mounted
onMounted(() => {
  initializePage();
});

// Watch for page changes to refresh AOS
watch(currentPage, () => {
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  display: -moz-box;
  display: box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
}
</style>