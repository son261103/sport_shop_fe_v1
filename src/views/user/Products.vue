<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Loading State -->
    <div
      v-if="apiLoading"
      class="flex items-center justify-center min-h-screen"
    >
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
import {
  ProductHeroBanner,
  ProductFilterSidebar,
  ProductSection,
  AllProductsSection,
} from "@/components/user/products";
import { usePublicProducts } from "@/composables";
import type { Product } from "@/components/examples";

// Router
const router = useRouter();

// Use the public products composable
const {
  products,
  isLoading: apiLoading,
  searchQuery,
  sortBy,
  fetchProducts,
  filterByCategory,
  filterByBrand,
  filterByPriceRange,
  resetFilters: resetApiFilters,
} = usePublicProducts();

// Local loading state for page initialization
const isLoading = ref(false);

// Filter and sort states
const priceRange = ref("all");
const selectedCategories = ref<string[]>([]);
const selectedBrands = ref<string[]>([]);

// Pagination states
const currentPage = ref(1);
const itemsPerPage = 50;

// Reset filters function
const resetFilters = () => {
  sortBy.value = "name";
  priceRange.value = "all";
  selectedCategories.value = [];
  selectedBrands.value = [];
  currentPage.value = 1;
  searchQuery.value = "";
  resetApiFilters();
  fetchProducts();
};

// Adapter function to convert PublicProduct to Product
const adaptPublicProductToProduct = (publicProduct: any): Product => {
  return {
    id: publicProduct.id.toString(),
    name: publicProduct.name,
    price: publicProduct.discount_price ? parseFloat(publicProduct.discount_price) : parseFloat(publicProduct.price),
    originalPrice: publicProduct.discount_price
      ? parseFloat(publicProduct.price)
      : undefined,
    image:
      publicProduct.image ||
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: publicProduct.category?.name || "Unknown",
    brand: publicProduct.brand?.name || "Unknown",
    rating: 4.5, // Default rating since API doesn't provide this
    reviews: Math.floor(Math.random() * 100) + 10, // Random reviews count
    inStock: publicProduct.stock_quantity > 0,
    isFavorite: false, // Default to false since API doesn't provide this
    description: publicProduct.description || "",
  };
};

// Computed properties for product sections
const bestSellers = computed(() => {
  // Get first 5 products as best sellers and adapt them
  if (products.value && products.value.length > 0) {
    return products.value.slice(0, 5).map(adaptPublicProductToProduct);
  }
  return [];
});

const saleItems = computed(() => {
  // Get products with discount as sale items
  if (products.value && products.value.length > 0) {
    const discountedProducts = products.value.filter(
      (p) =>
        p.discount_price && parseFloat(p.discount_price) < parseFloat(p.price)
    );
    return discountedProducts.slice(0, 5).map(adaptPublicProductToProduct);
  }
  return [];
});

// Premium products removed since not used in components

// Methods
const handleProductClick = (product: Product) => {
  console.log("Product clicked:", product);
  // Navigate to product detail page
  router.push({ name: "ProductsDetail", params: { id: product.id } });
};

const handleAddToCart = (product: Product) => {
  console.log("Add to cart:", product);
  // Add product to cart logic
};

const handleToggleFavorite = (product: Product) => {
  console.log("Toggle favorite:", product);
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
const allProducts = computed(() => {
  // Use API products
  if (products.value && products.value.length > 0) {
    return products.value.map(adaptPublicProductToProduct);
  }
  return [];
});

// Watch for filter changes
watch([selectedCategories, selectedBrands, priceRange], () => {
  // Apply category filter
  if (selectedCategories.value.length > 0) {
    filterByCategory(parseInt(selectedCategories.value[0]));
  } else {
    filterByCategory(undefined);
  }

  // Apply brand filter
  if (selectedBrands.value.length > 0) {
    filterByBrand(parseInt(selectedBrands.value[0]));
  } else {
    filterByBrand(undefined);
  }

  // Apply price range filter
  if (priceRange.value !== "all") {
    const [min, max] = priceRange.value.split("-").map(Number);
    filterByPriceRange(min, max);
  } else {
    filterByPriceRange(undefined, undefined);
  }

  // Fetch products with new filters
  fetchProducts();
});

// Scroll to All Products section
const scrollToAllProducts = () => {
  const allProductsSection = document.getElementById("all-products");
  if (allProductsSection) {
    allProductsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Initialize when component is mounted
onMounted(async () => {
  try {
    // Load products from API
    await fetchProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
    // Fallback to sample data if API fails
  }
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
