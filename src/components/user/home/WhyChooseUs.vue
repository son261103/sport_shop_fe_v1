<template>
  <section
    class="relative py-6 px-4 bg-gradient-to-b from-transparent via-light-bg-primary/30 to-light-bg-secondary/80 dark:from-transparent dark:via-dark-bg-primary/30 dark:to-dark-bg-secondary/80 overflow-hidden"
  >
    <!-- Seamless transition overlay from previous section -->
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
        class="text-center mb-12"
      >
        <h2
          class="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4"
        >
          Tại sao chọn chúng tôi?
        </h2>
        <p
          class="text-lg text-light-text-secondary/70 dark:text-dark-text-secondary/70 max-w-2xl mx-auto font-light"
        >
          Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất cho
          khách hàng
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Feature 1 -->
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
                  class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
                >
                  <svg
                    class="w-10 h-10 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
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

              <h3
                class="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3"
              >
                Miễn phí vận chuyển
              </h3>
              <p
                class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
              >
                Giao hàng miễn phí cho đơn hàng trên 500.000đ
              </p>
            </div>
          </div>
        </div>

        <!-- Feature 2 -->
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
                  class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
                >
                  <svg
                    class="w-10 h-10 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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

              <h3
                class="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 mb-3"
              >
                Giá cả cạnh tranh
              </h3>
              <p
                class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
              >
                Cam kết giá tốt nhất thị trường với chất lượng đảm bảo
              </p>
            </div>
          </div>
        </div>

        <!-- Feature 3 -->
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
                  class="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
                >
                  <svg
                    class="w-10 h-10 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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

              <h3
                class="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3"
              >
                Bảo hành uy tín
              </h3>
              <p
                class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
              >
                Chế độ bảo hành và đổi trả linh hoạt trong 30 ngày
              </p>
            </div>
          </div>
        </div>

        <!-- Feature 4 -->
        <div
          data-aos="fade-up"
          data-aos-delay="400"
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

            <div class="card-body text-center relative z-10 p-6">
              <!-- Enhanced icon container -->
              <div class="relative mb-6">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
                >
                  <svg
                    class="w-10 h-10 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <!-- Floating particles -->
                <div
                  class="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-60 group-hover:animate-bounce"
                ></div>
                <div
                  class="absolute -bottom-1 -left-1 w-3 h-3 bg-red-400 rounded-full opacity-40 group-hover:animate-pulse"
                ></div>
              </div>

              <h3
                class="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400 mb-3"
              >
                Hỗ trợ 24/7
              </h3>
              <p
                class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
              >
                Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seamless transition overlay to next section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent via-light-bg-secondary/30 to-light-bg-primary/70 dark:from-transparent dark:via-dark-bg-secondary/30 dark:to-dark-bg-primary/70 backdrop-blur-sm"
    ></div>
    <div
      class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-light-bg-primary/90 dark:from-transparent dark:to-dark-bg-primary/90 backdrop-blur-md"
    ></div>

    <!-- Final smooth blend layer -->
    <div
      class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-light-bg-primary dark:from-transparent dark:to-dark-bg-primary"
    ></div>
  </section>
</template>

<script setup lang="ts">
// Why choose us component with enhanced visual effects
</script>
