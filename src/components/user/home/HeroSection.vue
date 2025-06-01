<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 pt-16"
  >
    <!-- Background with gradient and pattern -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-light-bg-primary/95 via-light-accent-sport/20 to-light-accent-sport/10 dark:from-dark-bg-primary/95 dark:via-dark-accent-sport/20 dark:to-dark-accent-sport/10"
    ></div>

    <!-- Smooth transition overlay from header -->
    <div
      class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-light-bg-primary/90 via-light-bg-primary/50 to-transparent dark:from-dark-bg-primary/90 dark:via-dark-bg-primary/50 dark:to-transparent"
    ></div>

    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 bg-light-accent-sport/5 dark:bg-dark-accent-sport/5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-light-accent-sport/5 dark:bg-dark-accent-sport/5 rounded-full blur-2xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
    </div>

    <!-- Main content -->
    <div class="container-custom relative z-10 text-center px-4">
      <!-- Main heading -->
      <div data-aos="fade-up" data-aos-duration="1000">
        <h1
          class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-sport-animated leading-tight"
        >
          SportShop
        </h1>
      </div>

      <!-- Subtitle -->
      <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
        <p
          class="text-xl md:text-2xl lg:text-3xl text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          Khám phá bộ sưu tập thiết bị thể thao cao cấp và trang phục thể thao
          được thiết kế dành cho những nhà vô địch
        </p>
      </div>

      <!-- CTA Buttons -->
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="1000"
        class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
      >
        <button
          class="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
        >
          <span class="flex items-center gap-2">
            Mua sắm ngay
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </span>
        </button>
        <button
          class="btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
        >
          Xem danh mục
        </button>
      </div>

      <!-- Stats -->
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        data-aos-duration="1000"
        class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <div class="text-center">
          <div
            class="text-3xl md:text-4xl font-bold text-light-accent-sport dark:text-dark-accent-sport mb-2"
          >
            1000+
          </div>
          <div class="text-light-text-secondary dark:text-dark-text-secondary">
            Sản phẩm chất lượng
          </div>
        </div>
        <div class="text-center">
          <div
            class="text-3xl md:text-4xl font-bold text-light-accent-sport dark:text-dark-accent-sport mb-2"
          >
            50+
          </div>
          <div class="text-light-text-secondary dark:text-dark-text-secondary">
            Thương hiệu nổi tiếng
          </div>
        </div>
        <div class="text-center">
          <div
            class="text-3xl md:text-4xl font-bold text-light-accent-sport dark:text-dark-accent-sport mb-2"
          >
            24/7
          </div>
          <div class="text-light-text-secondary dark:text-dark-text-secondary">
            Hỗ trợ khách hàng
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      data-aos="fade-in"
      data-aos-delay="800"
      data-aos-duration="1000"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <div
        class="w-6 h-10 border-2 border-light-text-secondary dark:border-dark-text-secondary rounded-full flex justify-center"
      >
        <div
          class="w-1 h-3 bg-light-text-secondary dark:bg-dark-text-secondary rounded-full mt-2 animate-pulse"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero section component - no additional logic needed
</script>
