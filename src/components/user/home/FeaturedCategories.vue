<template>
  <section
    class="relative py-20 px-4 bg-gradient-to-b from-light-bg-primary/80 via-light-bg-primary/90 to-light-bg-primary dark:from-dark-bg-primary/80 dark:via-dark-bg-primary/90 dark:to-dark-bg-primary"
  >
    <!-- Smooth transition overlay -->
    <div
      class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-light-bg-primary/60 via-light-bg-primary/80 to-light-bg-primary dark:from-dark-bg-primary/60 dark:via-dark-bg-primary/80 dark:to-dark-bg-primary"
    ></div>
    <div class="container-custom">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        class="text-center mb-16"
      >
        <h2
          class="text-4xl md:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4"
        >
          Danh mục nổi bật
        </h2>
        <p
          class="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
        >
          Khám phá các danh mục sản phẩm thể thao hàng đầu được yêu thích nhất
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Category 1 -->
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          class="group"
        >
          <div
            class="card hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2"
          >
            <div class="card-body text-center">
              <div
                class="w-20 h-20 bg-gradient-sport rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3
                class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3"
              >
                Giày thể thao
              </h3>
              <p
                class="text-light-text-secondary dark:text-dark-text-secondary mb-4"
              >
                Bộ sưu tập giày thể thao cao cấp từ các thương hiệu hàng đầu
              </p>
              <button class="btn-outline w-full">Khám phá ngay</button>
            </div>
          </div>
        </div>

        <!-- Category 2 -->
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          class="group"
        >
          <div
            class="card hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2"
          >
            <div class="card-body text-center">
              <div
                class="w-20 h-20 bg-gradient-sport rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <h3
                class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3"
              >
                Trang phục thể thao
              </h3>
              <p
                class="text-light-text-secondary dark:text-dark-text-secondary mb-4"
              >
                Quần áo thể thao chất lượng cao, thoải mái và phong cách
              </p>
              <button class="btn-outline w-full">Khám phá ngay</button>
            </div>
          </div>
        </div>

        <!-- Category 3 -->
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
          class="group"
        >
          <div
            class="card hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2"
          >
            <div class="card-body text-center">
              <div
                class="w-20 h-20 bg-gradient-sport rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
              </div>
              <h3
                class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3"
              >
                Thiết bị tập luyện
              </h3>
              <p
                class="text-light-text-secondary dark:text-dark-text-secondary mb-4"
              >
                Dụng cụ và thiết bị tập luyện chuyên nghiệp cho mọi môn thể thao
              </p>
              <button class="btn-outline w-full">Khám phá ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Featured categories component - no additional logic needed
</script>
