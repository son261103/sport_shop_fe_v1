<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
        Khuyến mãi
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Khám phá các sản phẩm đang được giảm giá đặc biệt.
      </p>
    </div>

    <!-- Sale Banner -->
    <div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 mb-8 text-white">
      <h2 class="text-2xl font-bold mb-2">Giảm giá lên đến 50%</h2>
      <p class="text-lg opacity-90">Cơ hội tuyệt vời để sở hữu những sản phẩm thể thao chất lượng cao với giá ưu đãi!</p>
    </div>

    <!-- Sale Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Sale product cards -->
      <div 
        v-for="i in 12" 
        :key="i"
        class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
      >
        <!-- Sale badge -->
        <div class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold z-10">
          -{{ Math.floor(Math.random() * 50) + 10 }}%
        </div>
        
        <div class="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span class="text-gray-500 dark:text-gray-400">Hình ảnh sản phẩm</span>
        </div>
        
        <div class="p-4">
          <h3 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Sản phẩm khuyến mãi {{ i }}
          </h3>
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-lg font-bold text-red-500">{{ (Math.random() * 500000 + 100000).toLocaleString('vi-VN') }}đ</span>
            <span class="text-sm text-gray-500 line-through">{{ (Math.random() * 200000 + 600000).toLocaleString('vi-VN') }}đ</span>
          </div>
          <button class="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded transition-colors">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Sale page logic will be implemented here
</script>