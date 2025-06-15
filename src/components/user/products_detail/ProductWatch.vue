<template>
  <section class="section-padding" style="background-color: white;">
    <div class="container-custom">
      <!-- Header -->
      <div data-aos="fade-up" class="text-center mb-12">
        <h2 class="text-gradient-sport-animated text-3xl lg:text-4xl font-bold mb-4">
          Sản phẩm vừa xem
        </h2>
        <div class="w-24 h-1 bg-gradient-sport mx-auto mb-6 rounded-full"></div>
        <p class="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto text-lg">
          Khám phá những sản phẩm thể thao chất lượng cao 
        </p>
      </div>

      <!-- Products Grid -->
      <div class="flex justify-center px-8">
        <div class="w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <div
              v-for="(product, index) in props.relatedProducts.slice(0, 5)"
              :key="product.id"
              :data-aos="'fade-up'"
              :data-aos-delay="100 + index * 100"
              class="flex justify-center"
            >
              <div class="w-full min-w-[260px] max-w-[280px] mx-2 transform transition-all duration-300 hover:scale-105">
                <ProductCard
                  :product="product"
                  @click="navigateToProduct(product)"
                  @add-to-cart="addToCart"
                  @toggle-favorite="toggleWishlist"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ProductCard } from "@/components/examples";
import type { Product } from "@/types/sport";

// Props
interface Props {
  relatedProducts: Product[];
}

const props = withDefaults(defineProps<Props>(), {
  relatedProducts: () => []
});

// Router
const router = useRouter();

// Wishlist state
const wishlist = ref<string[]>([]);

// Methods
const navigateToProduct = (product: Product) => {
  router.push(`/products/${product.id}`);
};

const toggleWishlist = (product: Product) => {
  const index = wishlist.value.indexOf(product.id);
  if (index > -1) {
    wishlist.value.splice(index, 1);
  } else {
    wishlist.value.push(product.id);
  }
  
  // Here you would typically sync with your API
  console.log('Wishlist updated:', wishlist.value);
};

const addToCart = (product: Product) => {
  if (!product.inStock) {
    alert('Sản phẩm hiện đang hết hàng');
    return;
  }
  
  // Here you would typically add to cart via your store/API
  console.log('Adding to cart:', product);
  alert(`Đã thêm "${product.name}" vào giỏ hàng`);
};
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