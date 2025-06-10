<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
        Danh mục sản phẩm
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Tìm kiếm sản phẩm theo danh mục yêu thích của bạn.
      </p>
    </div>

    <!-- Category Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Category cards -->
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
        @click="navigateToCategory(category.slug)"
      >
        <div class="aspect-video bg-gradient-to-br from-light-accent-sport/20 to-light-accent-sport/40 dark:from-dark-accent-sport/20 dark:to-dark-accent-sport/40 flex items-center justify-center">
          <div class="text-4xl">{{ category.icon }}</div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2 group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors">
            {{ category.name }}
          </h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4">
            {{ category.description }}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {{ category.productCount }} sản phẩm
            </span>
            <div class="text-light-accent-sport dark:text-dark-accent-sport group-hover:translate-x-1 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Sample categories data - in a real app, this would come from an API
const categories = ref([
  {
    id: 1,
    name: 'Giày thể thao',
    slug: 'giay-the-thao',
    description: 'Giày chạy bộ, giày bóng đá, giày tennis và nhiều loại giày thể thao khác',
    icon: '👟',
    productCount: 156
  },
  {
    id: 2,
    name: 'Quần áo thể thao',
    slug: 'quan-ao-the-thao',
    description: 'Áo thun, quần short, áo khoác và trang phục thể thao cho mọi hoạt động',
    icon: '👕',
    productCount: 243
  },
  {
    id: 3,
    name: 'Phụ kiện thể thao',
    slug: 'phu-kien-the-thao',
    description: 'Túi xách, mũ, găng tay và các phụ kiện thể thao cần thiết',
    icon: '🎒',
    productCount: 89
  },
  {
    id: 4,
    name: 'Dụng cụ tập gym',
    slug: 'dung-cu-tap-gym',
    description: 'Tạ, máy tập, thảm yoga và các dụng cụ tập luyện tại nhà',
    icon: '🏋️',
    productCount: 67
  },
  {
    id: 5,
    name: 'Đồ bơi',
    slug: 'do-boi',
    description: 'Đồ bơi, kính bơi, mũ bơi và phụ kiện bơi lội',
    icon: '🏊',
    productCount: 34
  },
  {
    id: 6,
    name: 'Thể thao ngoài trời',
    slug: 'the-thao-ngoai-troi',
    description: 'Dụng cụ cắm trại, leo núi, đi bộ đường dài và các hoạt động ngoài trời',
    icon: '🏕️',
    productCount: 78
  }
]);

const navigateToCategory = (slug: string) => {
  // Navigate to products page with category filter
  router.push(`/products?category=${slug}`);
};
</script>