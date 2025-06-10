<template>
  <div class="w-full overflow-hidden">
    <div class="relative h-screen">
      <!-- Single Hero Image -->
      <div class="relative w-full h-full">
        <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
             alt="Fitness Equipment" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-br from-green-900/60 via-emerald-800/50 to-teal-700/60 flex items-center justify-center">
          <div class="text-center text-white animate-fadeInUp">
            <h1 class="text-6xl font-bold mb-4 text-gradient-sport-animated animate-pulse">💪 SPORT SHOP</h1>
            <p class="text-xl mb-8 animate-slideContentIn">Thời trang thể thao được yêu thích nhất!</p>
            <button class="bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-sport hover:shadow-sport-lg transform hover:scale-105">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for this static banner
</script>