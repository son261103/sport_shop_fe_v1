<template>
  <section
    class="relative py-16 px-4 bg-gradient-to-b from-transparent via-light-bg-primary/30 to-light-bg-secondary/80 dark:from-transparent dark:via-dark-bg-primary/30 dark:to-dark-bg-secondary/80 overflow-hidden"
  >
    <!-- Seamless transition overlay from hero -->
    <div
      class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-light-bg-primary/10 to-light-bg-primary/30 dark:from-transparent dark:via-dark-bg-primary/10 dark:to-dark-bg-primary/30 backdrop-blur-sm"
    ></div>

    <!-- Subtle decorative background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Soft floating geometric shapes -->
      <div
        class="absolute top-32 left-16 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl animate-pulse"
      ></div>
      <div
        class="absolute top-48 right-24 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-full blur-xl animate-bounce"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute bottom-48 left-1/4 w-16 h-16 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full blur-lg animate-pulse"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute bottom-32 right-1/3 w-22 h-22 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-xl animate-bounce"
        style="animation-delay: 0.5s"
      ></div>

      <!-- Subtle grid pattern overlay -->
      <div
        class="absolute inset-0 bg-grid-pattern opacity-2 dark:opacity-5"
      ></div>
    </div>
    <div class="container-custom relative z-10">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        class="text-center mb-16"
      >
        <h2
          class="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4"
        >
          Danh Mục Sản Phẩm Nổi Bật
        </h2>

        <!-- Additional subtitle -->
        <p
          class="text-lg text-light-text-secondary/70 dark:text-dark-text-secondary/70 max-w-2xl mx-auto font-light"
        >
          Từ giày thể thao cao cấp đến thiết bị tập luyện chuyên nghiệp
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Category 1 - Giày thể thao -->
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          class="group cursor-pointer"
        >
          <div
            class="relative card hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-3 group-hover:scale-105 overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20"
          >
            <!-- Gradient overlay on hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="card-body text-center relative z-10 p-6">
              <!-- Enhanced icon container -->
              <div class="relative mb-6">
                <div
                  class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
                >
                  <svg
                    class="w-12 h-12 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <!-- Floating particles -->
                <div
                  class="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-60 group-hover:animate-bounce"
                ></div>
                <div
                  class="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400 rounded-full opacity-40 group-hover:animate-pulse"
                ></div>
              </div>

              <!-- Title and brand -->
              <div class="mb-4">
                <div class="flex items-center justify-center gap-3 mb-3">
                  <h3
                    class="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    Giày thể thao
                  </h3>
                </div>
                <!-- Category stats -->
                <div
                  class="flex items-center justify-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                >
                  <span class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                    4.8
                  </span>
                  <span>•</span>
                  <span>500+ sản phẩm</span>
                </div>
              </div>

              <p
                class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg"
              >
                Bộ sưu tập giày thể thao từ các thương hiệu hàng đầu thế giới
              </p>
            </div>
          </div>
        </div>
        <!-- Category 2 - Trang phục thể thao -->
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          class="group cursor-pointer"
        >
          <div
            class="relative card hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-3 group-hover:scale-105 overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20"
          >
            <!-- Gradient overlay on hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="card-body text-center relative z-10 p-6">
              <!-- Enhanced icon container -->
              <div class="relative mb-6">
                <div
                  class="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
                >
                  <svg
                    class="w-12 h-12 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <!-- Floating particles -->
                <div
                  class="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full opacity-60 group-hover:animate-bounce"
                ></div>
                <div
                  class="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-400 rounded-full opacity-40 group-hover:animate-pulse"
                ></div>
              </div>

              <!-- Title and brand -->
              <div class="mb-4">
                <div class="flex items-center justify-center gap-3 mb-3">
                  <h3
                    class="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400"
                  >
                    Trang phục thể thao
                  </h3>
                </div>
                <!-- Category stats -->
                <div
                  class="flex items-center justify-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                >
                  <span class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                    4.9
                  </span>
                  <span>•</span>
                  <span>350+ sản phẩm</span>
                </div>
              </div>

              <p
                class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg"
              >
                Quần áo thể thao thoải mái và phong cách cho mọi hoạt động
              </p>
            </div>
          </div>
        </div>
        <!-- Category 3 - Thiết bị tập luyện -->
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
          class="group cursor-pointer"
        >
          <div
            class="relative card hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-3 group-hover:scale-105 overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20"
          >
            <!-- Gradient overlay on hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="card-body text-center relative z-10 p-6">
              <!-- Enhanced icon container -->
              <div class="relative mb-6">
                <div
                  class="w-24 h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
                >
                  <svg
                    class="w-12 h-12 text-white drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                </div>
                <!-- Floating particles -->
                <div
                  class="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full opacity-60 group-hover:animate-bounce"
                ></div>
                <div
                  class="absolute -bottom-1 -left-1 w-3 h-3 bg-violet-400 rounded-full opacity-40 group-hover:animate-pulse"
                ></div>
              </div>

              <!-- Title and brand -->
              <div class="mb-4">
                <div class="flex items-center justify-center gap-3 mb-3">
                  <h3
                    class="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400"
                  >
                    Thiết bị tập luyện
                  </h3>
                </div>
                <!-- Category stats -->
                <div
                  class="flex items-center justify-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                >
                  <span class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                    4.7
                  </span>
                  <span>•</span>
                  <span>200+ sản phẩm</span>
                </div>
              </div>

              <p
                class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg"
              >
                Dụng cụ và thiết bị tập luyện chuyên nghiệp cho mọi môn thể thao
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Products Section -->
      <div class="mt-20" data-aos="fade-up" data-aos-delay="400">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4"
          >
            Sản Phẩm Nổi Bật
          </h2>
          <p
            class="text-lg text-light-text-secondary/80 dark:text-dark-text-secondary/80 max-w-2xl mx-auto"
          >
            Những sản phẩm được yêu thích nhất từ các thương hiệu hàng đầu
          </p>
        </div>

        <!-- Featured Products Grid -->
        <div class="flex justify-center px-8">
          <div class="w-full">
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
            >
              <div
                v-for="(product, index) in featuredProducts"
                :key="product.id"
                :data-aos="'fade-up'"
                :data-aos-delay="100 + index * 100"
                class="flex justify-center"
              >
                <div
                  class="w-full min-w-[260px] max-w-[280px] mx-2 transform transition-all duration-300 hover:scale-105"
                >
                  <ProductCard
                    :product="product"
                    @click="handleProductClick"
                    @add-to-cart="handleAddToCart"
                    @toggle-favorite="handleToggleFavorite"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-16"></div>
      </div>
    </div>

    <!-- Seamless transition overlay to next section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-light-bg-secondary/30 to-light-bg-primary/70 dark:from-transparent dark:via-dark-bg-secondary/30 dark:to-dark-bg-primary/70 backdrop-blur-sm"
    ></div>
    <div
      class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-light-bg-primary/90 dark:from-transparent dark:to-dark-bg-primary/90 backdrop-blur-md"
    ></div>

    <!-- Final smooth blend layer -->
    <div
      class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-light-bg-primary dark:from-transparent dark:to-dark-bg-primary"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ProductCard } from "@/components/examples";
import type { Product } from "@/components/examples";

// Featured products data
const featuredProducts = ref<Product[]>([
  {
    id: "1",
    name: "Nike Air Max 270",
    price: 3200,
    originalPrice: 3800,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    category: "Giày thể thao",
    brand: "Nike",
    rating: 4.8,
    reviews: 245,
    inStock: true,
    isFavorite: false,
    description:
      "Giày thể thao Nike Air Max 270 với công nghệ đệm khí tiên tiến",
  },
  {
    id: "2",
    name: "Adidas Ultraboost 22",
    price: 4200,
    originalPrice: 4800,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop",
    category: "Giày thể thao",
    brand: "Adidas",
    rating: 4.9,
    reviews: 189,
    inStock: true,
    isFavorite: true,
    description: "Giày chạy bộ Adidas Ultraboost với công nghệ Boost độc quyền",
  },
  {
    id: "3",
    name: "Under Armour HeatGear",
    price: 850,
    originalPrice: 1200,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    category: "Trang phục thể thao",
    brand: "Under Armour",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    isFavorite: false,
    description: "Áo thể thao Under Armour HeatGear với công nghệ thoát mồ hôi",
  },
  {
    id: "4",
    name: "Dumbbells Set 20kg",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Thiết bị tập luyện",
    brand: "PowerFit",
    rating: 4.6,
    reviews: 98,
    inStock: true,
    isFavorite: false,
    description: "Bộ tạ tay 20kg chất lượng cao cho tập luyện tại nhà",
  },
  {
    id: "5",
    name: "Puma Training Shorts",
    price: 650,
    originalPrice: 850,
    image:
      "https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=400&h=300&fit=crop",
    category: "Trang phục thể thao",
    brand: "Puma",
    rating: 4.5,
    reviews: 127,
    inStock: true,
    isFavorite: false,
    description: "Quần short tập luyện Puma với chất liệu thoáng mát",
  },
]);

// Event handlers
const handleProductClick = (product: Product) => {
  console.log("Product clicked:", product);
  // Handle product click - navigate to product detail
};

const handleAddToCart = (product: Product) => {
  console.log("Add to cart:", product);
  // Handle add to cart logic
};

const handleToggleFavorite = (product: Product) => {
  console.log("Toggle favorite:", product);
  // Handle toggle favorite logic
  const productIndex = featuredProducts.value.findIndex(
    (p) => p.id === product.id
  );
  if (productIndex !== -1) {
    featuredProducts.value[productIndex].isFavorite =
      !featuredProducts.value[productIndex].isFavorite;
  }
};
</script>
