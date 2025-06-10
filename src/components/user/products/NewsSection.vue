<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
          Tin tức thể thao
        </h2>
        <p class="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
          Cập nhật những tin tức mới nhất về thể thao và xu hướng thời trang thể thao
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(article, index) in newsArticles"
          :key="article.id"
          :data-aos="'fade-up'"
          :data-aos-delay="100 + index * 100"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            >
            <div class="absolute top-4 left-4">
              <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ article.category }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{{ article.date }}</span>
              <span class="mx-2">•</span>
              <span>{{ article.readTime }} phút đọc</span>
            </div>
            
            <h3 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3 line-clamp-2">
              {{ article.title }}
            </h3>
            
            <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-3">
              {{ article.excerpt }}
            </p>
            
            <button class="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors">
              Đọc thêm →
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
}

// Props
interface Props {
  newsArticles: NewsArticle[];
}

defineProps<Props>();
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>