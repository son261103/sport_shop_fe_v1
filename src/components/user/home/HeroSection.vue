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
      <!-- Large floating circles -->
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-light-accent-sport/15 dark:bg-dark-accent-sport/15 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-light-accent-sport/8 dark:bg-dark-accent-sport/8 rounded-full blur-2xl animate-pulse"
        style="animation-delay: 1s"
      ></div>

      <!-- Additional decorative elements -->
      <div
        class="absolute top-20 left-20 w-32 h-32 bg-light-accent-sport/20 dark:bg-dark-accent-sport/20 rounded-full blur-xl animate-pulse"
        style="animation-delay: 0.5s"
      ></div>
      <div
        class="absolute bottom-32 right-32 w-48 h-48 bg-light-accent-sport/12 dark:bg-dark-accent-sport/12 rounded-full blur-2xl animate-pulse"
        style="animation-delay: 1.5s"
      ></div>

      <!-- Floating geometric shapes -->
      <div
        class="absolute top-1/4 left-1/4 w-4 h-4 bg-light-accent-sport/30 dark:bg-dark-accent-sport/30 rotate-45 animate-spin"
        style="animation-duration: 8s"
      ></div>
      <div
        class="absolute top-3/4 right-1/4 w-6 h-6 bg-light-accent-sport/25 dark:bg-dark-accent-sport/25 rounded-full animate-bounce"
        style="animation-delay: 2s; animation-duration: 3s"
      ></div>
      <div
        class="absolute top-1/2 right-1/3 w-3 h-3 bg-light-accent-sport/35 dark:bg-dark-accent-sport/35 rotate-45 animate-pulse"
        style="animation-delay: 1s"
      ></div>

      <!-- Grid pattern overlay -->
      <div
        class="absolute inset-0 opacity-5 dark:opacity-10"
        style="
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(34, 197, 94, 0.3) 1px,
            transparent 0
          );
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <!-- Main content -->
    <div class="container-custom relative z-10 text-center px-4">
      <!-- Badge/Tag -->
      <div data-aos="fade-down" data-aos-duration="800">
        <div
          class="inline-flex items-center gap-2 bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 backdrop-blur-sm border border-light-accent-sport/20 dark:border-dark-accent-sport/20 rounded-full px-6 py-2 mb-6"
        >
          <svg
            class="w-3 h-3 text-light-accent-sport dark:text-dark-accent-sport animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span
            class="text-sm font-medium text-light-accent-sport dark:text-dark-accent-sport"
            >Chất Lượng Hàng Đầu</span
          >
        </div>
      </div>

      <!-- Main heading with enhanced styling -->
      <div data-aos="fade-up" data-aos-duration="1000">
        <h1
          class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-light-accent-sport dark:text-dark-accent-sport leading-tight relative"
        >
          <span class="relative inline-block">
            SportShop
            <!-- Decorative underline -->
            <div
              class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-light-accent-sport to-transparent dark:via-dark-accent-sport rounded-full"
            ></div>
          </span>
        </h1>
      </div>

      <!-- Enhanced subtitle with icons -->
      <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
        <p
          class="text-xl md:text-2xl lg:text-3xl text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          Khám phá bộ sưu tập thiết bị thể thao cao cấp và trang phục thể thao
          được thiết kế dành cho những nhà vô địch
        </p>

        <!-- Feature highlights -->
        <div class="flex flex-wrap justify-center gap-6 mt-6 mb-8">
          <div
            class="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary"
          >
            <svg
              class="w-5 h-5 text-light-accent-sport dark:text-dark-accent-sport"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="text-sm md:text-base">Miễn phí vận chuyển</span>
          </div>
          <div
            class="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary"
          >
            <svg
              class="w-5 h-5 text-light-accent-sport dark:text-dark-accent-sport"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="text-sm md:text-base">Bảo hành chính hãng</span>
          </div>
          <div
            class="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary"
          >
            <svg
              class="w-5 h-5 text-light-accent-sport dark:text-dark-accent-sport"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="text-sm md:text-base">Đổi trả 30 ngày</span>
          </div>
        </div>
      </div>

      <!-- Enhanced CTA Buttons -->
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="1000"
        class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
      >
        <button
          class="group btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
        >
          <span class="relative z-10 flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
            Mua sắm ngay
            <svg
              class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
          <!-- Animated background -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-light-accent-sport/20 to-light-accent-sport/40 dark:from-dark-accent-sport/20 dark:to-dark-accent-sport/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          ></div>
        </button>
        <button
          class="group btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
        >
          <span class="relative z-10 flex items-center gap-2">
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
            Xem danh mục
          </span>
          <!-- Hover effect -->
          <div
            class="absolute inset-0 bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          ></div>
        </button>
      </div>

      <!-- Enhanced Stats -->
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        data-aos-duration="1000"
        class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <div
          class="group text-center p-6 rounded-2xl bg-light-bg-primary/30 dark:bg-dark-bg-primary/30 backdrop-blur-sm border border-light-accent-sport/10 dark:border-dark-accent-sport/10 hover:border-light-accent-sport/30 dark:hover:border-dark-accent-sport/30 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div class="flex justify-center mb-4">
            <div
              class="p-3 rounded-full bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 group-hover:bg-light-accent-sport/20 dark:group-hover:bg-dark-accent-sport/20 transition-colors duration-300"
            >
              <svg
                class="w-8 h-8 text-light-accent-sport dark:text-dark-accent-sport"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            class="text-3xl md:text-4xl font-bold text-light-accent-sport dark:text-dark-accent-sport mb-2 group-hover:scale-110 transition-transform duration-300"
          >
            1000+
          </div>
          <div
            class="text-light-text-secondary dark:text-dark-text-secondary font-medium"
          >
            Sản phẩm chất lượng
          </div>
        </div>

        <div
          class="group text-center p-6 rounded-2xl bg-light-bg-primary/30 dark:bg-dark-bg-primary/30 backdrop-blur-sm border border-light-accent-sport/10 dark:border-dark-accent-sport/10 hover:border-light-accent-sport/30 dark:hover:border-dark-accent-sport/30 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div class="flex justify-center mb-4">
            <div
              class="p-3 rounded-full bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 group-hover:bg-light-accent-sport/20 dark:group-hover:bg-dark-accent-sport/20 transition-colors duration-300"
            >
              <svg
                class="w-8 h-8 text-light-accent-sport dark:text-dark-accent-sport"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div
            class="text-3xl md:text-4xl font-bold text-light-accent-sport dark:text-dark-accent-sport mb-2 group-hover:scale-110 transition-transform duration-300"
          >
            50+
          </div>
          <div
            class="text-light-text-secondary dark:text-dark-text-secondary font-medium"
          >
            Thương hiệu nổi tiếng
          </div>
        </div>

        <div
          class="group text-center p-6 rounded-2xl bg-light-bg-primary/30 dark:bg-dark-bg-primary/30 backdrop-blur-sm border border-light-accent-sport/10 dark:border-dark-accent-sport/10 hover:border-light-accent-sport/30 dark:hover:border-dark-accent-sport/30 transition-all duration-300 hover:transform hover:scale-105"
        >
          <div class="flex justify-center mb-4">
            <div
              class="p-3 rounded-full bg-light-accent-sport/10 dark:bg-dark-accent-sport/10 group-hover:bg-light-accent-sport/20 dark:group-hover:bg-dark-accent-sport/20 transition-colors duration-300"
            >
              <svg
                class="w-8 h-8 text-light-accent-sport dark:text-dark-accent-sport"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div
            class="text-3xl md:text-4xl font-bold text-light-accent-sport dark:text-dark-accent-sport mb-2 group-hover:scale-110 transition-transform duration-300"
          >
            24/7
          </div>
          <div
            class="text-light-text-secondary dark:text-dark-text-secondary font-medium"
          >
            Hỗ trợ khách hàng
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      data-aos="fade-in"
      data-aos-delay="100"
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
