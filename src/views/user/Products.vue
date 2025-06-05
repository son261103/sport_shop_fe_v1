<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
        Sản phẩm
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Khám phá bộ sưu tập sản phẩm thể thao chất lượng cao của chúng tôi.
      </p>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Product cards will be implemented here -->
      <div 
        v-for="i in 8" 
        :key="i"
        class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span class="text-gray-500 dark:text-gray-400">Sản phẩm {{ i }}</span>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Tên sản phẩm {{ i }}
          </h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3">
            Mô tả ngắn về sản phẩm
          </p>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-light-accent-sport dark:text-dark-accent-sport">
              {{ (Math.random() * 1000000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}đ
            </span>
            <button class="bg-light-accent-sport hover:bg-light-accent-sport/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-12 flex justify-center">
      <div class="flex items-center space-x-2">
        <button class="px-3 py-2 rounded-md bg-light-bg-secondary dark:bg-dark-bg-primary text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-secondary transition-colors">
          Trước
        </button>
        <button class="px-3 py-2 rounded-md bg-light-accent-sport text-white">
          1
        </button>
        <button class="px-3 py-2 rounded-md bg-light-bg-secondary dark:bg-dark-bg-primary text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-secondary transition-colors">
          2
        </button>
        <button class="px-3 py-2 rounded-md bg-light-bg-secondary dark:bg-dark-bg-primary text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-secondary transition-colors">
          3
        </button>
        <button class="px-3 py-2 rounded-md bg-light-bg-secondary dark:bg-dark-bg-primary text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-secondary transition-colors">
          Sau
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is a placeholder component for the public-facing products page
// In a real application, you would fetch products from an API and display them here
</script>