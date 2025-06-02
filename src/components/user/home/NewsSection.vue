<template>
  <section
    class="relative py-16 px-4 bg-gradient-to-b from-light-bg-secondary/80 via-light-bg-primary/30 to-transparent dark:from-dark-bg-secondary/80 dark:via-dark-bg-primary/30 dark:to-transparent overflow-hidden"
  >
    <!-- Seamless transition overlay from previous section -->
    <div
      class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-light-bg-secondary/70 via-light-bg-primary/30 to-transparent dark:from-dark-bg-secondary/70 dark:via-dark-bg-primary/30 dark:to-transparent backdrop-blur-sm"
    ></div>

    <!-- Subtle decorative background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Soft floating geometric shapes -->
      <div
        class="absolute top-32 right-16 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl animate-pulse"
      ></div>
      <div
        class="absolute top-48 left-24 w-20 h-20 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-xl animate-bounce"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute bottom-48 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-lg animate-pulse"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute bottom-32 left-1/3 w-22 h-22 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-xl animate-bounce"
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
          Tin Tức Thể Thao
        </h2>
        <p
          class="text-lg text-light-text-secondary/70 dark:text-dark-text-secondary/70 max-w-2xl mx-auto font-light"
        >
          Cập nhật những tin tức mới nhất về thể thao và xu hướng thời trang thể thao
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- News Article 1 -->
        <article
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
              class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <!-- News Image -->
            <div class="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center"
                alt="Xu hướng giày chạy bộ 2024"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Xu Hướng
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div class="card-body p-6 relative z-10">
              <!-- Date -->
              <div class="flex items-center text-sm text-light-text-secondary/60 dark:text-dark-text-secondary/60 mb-3">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                15 Tháng 12, 2024
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                Xu Hướng Giày Chạy Bộ 2024: Công Nghệ Mới Và Thiết Kế Đột Phá
              </h3>

              <!-- Excerpt -->
              <p class="text-light-text-secondary/70 dark:text-dark-text-secondary/70 mb-4 line-clamp-3">
                Khám phá những xu hướng mới nhất trong thiết kế giày chạy bộ với công nghệ đệm tiên tiến và chất liệu bền vững...
              </p>

              <!-- Read More -->
              <div class="flex items-center text-emerald-600 dark:text-emerald-400 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                <span class="mr-2">Đọc thêm</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </article>

        <!-- News Article 2 -->
        <article
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
              class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <!-- News Image -->
            <div class="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=250&fit=crop&crop=center"
                alt="Tập luyện thể hình hiệu quả"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Tập Luyện
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div class="card-body p-6 relative z-10">
              <!-- Date -->
              <div class="flex items-center text-sm text-light-text-secondary/60 dark:text-dark-text-secondary/60 mb-3">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                12 Tháng 12, 2024
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                5 Bài Tập Thể Hình Hiệu Quả Cho Người Mới Bắt Đầu
              </h3>

              <!-- Excerpt -->
              <p class="text-light-text-secondary/70 dark:text-dark-text-secondary/70 mb-4 line-clamp-3">
                Hướng dẫn chi tiết các bài tập cơ bản giúp xây dựng nền tảng thể lực vững chắc và phát triển cơ bắp hiệu quả...
              </p>

              <!-- Read More -->
              <div class="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                <span class="mr-2">Đọc thêm</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </article>

        <!-- News Article 3 -->
        <article
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
              class="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <!-- News Image -->
            <div class="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center"
                alt="Dinh dưỡng thể thao"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Dinh Dưỡng
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div class="card-body p-6 relative z-10">
              <!-- Date -->
              <div class="flex items-center text-sm text-light-text-secondary/60 dark:text-dark-text-secondary/60 mb-3">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                10 Tháng 12, 2024
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                Chế Độ Dinh Dưỡng Tối Ưu Cho Vận Động Viên
              </h3>

              <!-- Excerpt -->
              <p class="text-light-text-secondary/70 dark:text-dark-text-secondary/70 mb-4 line-clamp-3">
                Khám phá những nguyên tắc dinh dưỡng cần thiết để tối ưu hóa hiệu suất tập luyện và phục hồi cơ thể...
              </p>

              <!-- Read More -->
              <div class="flex items-center text-orange-600 dark:text-orange-400 font-medium group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300">
                <span class="mr-2">Đọc thêm</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- View All News Button -->
      <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
        <button class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          <span class="mr-2">Xem Tất Cả Tin Tức</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Seamless transition overlay to next section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-light-bg-primary/10 to-light-bg-primary/30 dark:from-transparent dark:via-dark-bg-primary/10 dark:to-dark-bg-primary/30 backdrop-blur-sm"
    ></div>
    <div
      class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-light-bg-primary/70 dark:from-transparent dark:to-dark-bg-primary/70 backdrop-blur-md"
    ></div>

    <!-- Final smooth blend layer -->
    <div
      class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-light-bg-primary dark:from-transparent dark:to-dark-bg-primary"
    ></div>
  </section>
</template>

<script setup lang="ts">
// News section component with enhanced visual effects and responsive design
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-grid-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
  background-size: 20px 20px;
}

.card {
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.card-body {
  position: relative;
}

@media (prefers-reduced-motion: reduce) {
  .group:hover .group-hover\:scale-110 {
    transform: none;
  }
  
  .group:hover .group-hover\:-translate-y-3 {
    transform: none;
  }
}
</style>