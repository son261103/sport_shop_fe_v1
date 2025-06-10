<template>
  <section class="relative py-24 px-4 bg-gradient-to-b from-transparent via-light-bg-primary/30 to-light-bg-secondary/80 dark:from-transparent dark:via-dark-bg-primary/30 dark:to-dark-bg-secondary/80 overflow-hidden">
    <!-- Background effects giống WhyChooseUs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-32 left-16 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
      <div class="absolute top-48 right-24 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-full blur-xl animate-bounce"></div>
      <div class="absolute bottom-48 left-1/4 w-16 h-16 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full blur-lg animate-pulse"></div>
    </div>

    <div class="container-custom relative z-10">
      <!-- Title section với text style giống WhyChooseUs -->
      <div data-aos="fade-up" data-aos-duration="1000" class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
          Tin tức thể thao
        </h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p class="text-lg text-light-text-secondary/70 dark:text-dark-text-secondary/70 max-w-2xl mx-auto font-light">
          Cập nhật tin tức và sự kiện thể thao mới nhất từ trong nước đến quốc tế
        </p>
      </div>

      <!-- Grid content với max-width lớn hơn -->
      <div class="max-w-[1920px] mx-auto px-6">
        <div class="grid grid-cols-12 gap-10">
          <!-- Tin tức chính - layout rộng hơn -->
          <div data-aos="fade-up" data-aos-delay="100" class="col-span-12 lg:col-span-7">
            <div class="bg-white p-8 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div class="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3" 
                  class="w-full h-[400px] object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  alt="Tin tức chính"
                />
              </div>
              <h2 class="text-xl font-semibold mt-4 text-gray-800 group-hover:text-primary transition-colors duration-200">
                Trung ương ban hành quy định mới về thi hành Điều lệ Đảng
              </h2>
              <div class="mt-3 text-gray-600 text-sm space-y-2">
                <p>• Hà Nội nóng gần 40 độ C, mặt đường xuất hiện ảo ảnh</p>
                <p>• Nam sinh được tuyển thẳng vào trường công</p>
              </div>
            </div>
          </div>

          <!-- Danh sách tin - layout rộng hơn -->
          <div data-aos="fade-up" data-aos-delay="200" class="col-span-12 lg:col-span-5">
            <div class="bg-white rounded-xl shadow-lg p-2">
              <div v-for="(news, index) in tinTuc" 
                   :key="index" 
                   class="group flex gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer">
                <div class="overflow-hidden rounded">
                  <img
                    :src="news.image"
                    :alt="news.title"
                    class="w-24 h-16 object-cover rounded transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {{ news.title }}
                  </h3>
                  <span class="text-gray-400 text-xs mt-1 block">{{ news.luotXem }} lượt xem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom gradient transition -->
    <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent via-light-bg-secondary/30 to-light-bg-primary/70 dark:from-transparent dark:via-dark-bg-secondary/30 dark:to-dark-bg-primary/70 backdrop-blur-sm"></div>
    <div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-light-bg-primary/90 dark:from-transparent dark:to-dark-bg-primary/90 backdrop-blur-md"></div>
  </section>
</template>

<script setup lang="ts">
const tinTuc = [
  {
    title: 'Những thành tựu nổi bật của ngành thể thao Việt Nam',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3',
    luotXem: 156
  },
  {
    title: 'Giải vô địch bóng đá quốc gia 2023 khởi tranh',
    image: 'https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?ixlib=rb-4.0.3',
    luotXem: 203
  },
  {
    title: 'Đội tuyển Việt Nam chuẩn bị cho AFF Cup',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3',
    luotXem: 189
  },
  {
    title: 'Khai mạc giải Marathon quốc tế Hà Nội',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3',
    luotXem: 145
  },
  {
    title: 'Điểm nhấn vòng 10 V.League 2023: HAGL thoát đáy bảng, Nam Định tiếp tục bay cao',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3',
    luotXem: 167
  },
  {
    title: 'Thể thao Việt Nam hoàn thành xuất sắc chỉ tiêu tại SEA Games 32',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3',
    luotXem: 234
  }
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>