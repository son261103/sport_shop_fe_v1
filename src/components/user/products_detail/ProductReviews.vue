<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm">
    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <!-- Left Column: Rating Overview -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Overall Rating -->
        <div class="text-left">
          <div class="text-5xl font-bold text-gray-900 mb-1">
            0.0
          </div>
          <div class="flex items-center space-x-1 mb-1">
            <div class="flex space-x-0.5">
              <i v-for="star in 5" :key="star"
                 class="far fa-star text-gray-300 text-base"></i>
            </div>
          </div>
          <p class="text-xs text-gray-500">
            trên 5
          </p>
        </div>

        <!-- Rating Breakdown -->
        <div class="space-y-2">
          <div v-for="rating in [5,4,3,2,1]" :key="rating" 
               class="flex items-center space-x-2">
            <div class="flex items-center space-x-1">
              <span class="text-xs font-medium text-gray-700">
                {{ rating }}
              </span>
              <i class="fas fa-star text-yellow-400 text-xs"></i>
            </div>
            <div class="flex-1 bg-gray-200 rounded-full h-1.5">
              <div class="bg-gray-200 h-1.5 rounded-full" 
                   style="width: 0%"></div>
            </div>
            <span class="text-xs text-gray-500 w-6">
              0%
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column: Filters and Empty State -->
      <div class="lg:col-span-7 space-y-4">
        <!-- Header -->
        <h3 class="text-base font-semibold text-gray-900 text-center">
          Đánh giá thương hiệu
        </h3>
        
        <!-- Filter Buttons -->
        <div class="space-y-2">
          <div class="flex flex-wrap gap-2">
            <button class="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium">
              Toàn bộ
            </button>
            <button class="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs flex items-center space-x-1">
              <span>Thời gian</span>
              <i class="fas fa-chevron-down text-xs"></i>
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="star in [5,4,3,2,1]" :key="star" 
                    class="bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-full text-xs flex items-center space-x-1">
              <span>{{ star }}</span>
              <i class="fas fa-star text-yellow-400 text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div class="text-center py-6">
          <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <i class="fas fa-star text-gray-400 text-xl"></i>
          </div>
          <p class="text-gray-500 text-xs">
            Hãy là người đầu tiên đánh giá sản phẩm này
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Props
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