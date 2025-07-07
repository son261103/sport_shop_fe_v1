<template>
  <div class="bg-gradient-page animate-fade-in">
    <!-- Product Reviews Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- Reviews Tab Content -->
          <div class="card card-body space-y-6 backdrop-blur-xl bg-light-bg-secondary/90 dark:bg-dark-bg-secondary/90 border-2 border-light-border-secondary dark:border-dark-border-secondary hover:border-light-accent-sport dark:hover:border-dark-accent-sport transition-all duration-300 shadow-xl hover:shadow-2xl">
            <!-- Reviews Header -->
            <div class="flex items-center justify-between border-b border-light-border-secondary dark:border-dark-border-secondary pb-4">
              <div class="flex items-center gap-3">
                <div class="bg-gradient-to-r from-light-accent-sport/20 to-light-accent-info/20 dark:from-dark-accent-sport/30 dark:to-dark-accent-info/30 p-3 rounded-full shadow-sport">
                  <i class="fas fa-star text-light-accent-sport dark:text-dark-accent-sport text-xl animate-bounce-gentle"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gradient-sport-animated animate-gradient-x">Đánh giá sản phẩm</h3>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ comments.length }} đánh giá từ khách hàng</p>
                </div>
              </div>
              <button class="btn-primary px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-all duration-300 shadow-sport">
                <i class="fas fa-plus mr-2"></i>
                Viết đánh giá
              </button>
            </div>

            <!-- Rating Summary -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Overall Rating -->
              <div class="bg-gradient-to-br from-light-bg-primary/80 to-light-bg-secondary/80 dark:from-dark-bg-primary/80 dark:to-dark-bg-secondary/80 rounded-2xl p-6 border border-light-border-primary dark:border-dark-border-primary shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="text-center">
                  <div class="text-5xl font-bold text-gradient-sport-animated animate-gradient-x mb-2">{{ product?.rating || 4.5 }}</div>
                  <div class="flex items-center justify-center gap-1 mb-2">
                    <i v-for="star in 5" :key="star" 
                       :class="star <= Math.floor(product?.rating || 4.5) ? 'fas fa-star text-yellow-500' : star <= (product?.rating || 4.5) ? 'fas fa-star-half-alt text-yellow-500' : 'far fa-star text-gray-300'"
                       class="text-lg animate-pulse"></i>
                  </div>
                  <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">Dựa trên {{ product?.reviews || 0 }} đánh giá</p>
                </div>
              </div>

              <!-- Rating Breakdown -->
              <div class="space-y-3">
                <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-3">
                  <span class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary w-8">{{ rating }}</span>
                  <i class="fas fa-star text-yellow-500 text-sm"></i>
                  <div class="flex-1 bg-light-border-primary dark:bg-dark-border-primary rounded-full h-2 overflow-hidden">
                    <div class="bg-gradient-to-r from-light-accent-sport to-light-accent-info dark:from-dark-accent-sport dark:to-dark-accent-info h-full rounded-full transition-all duration-500" 
                         :style="{ width: getStarPercentage(rating) + '%' }"></div>
                  </div>
                  <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary w-12">{{ getStarPercentage(rating) }}%</span>
                </div>
              </div>
            </div>

            <!-- Comments List -->
            <div class="space-y-4">
              <div v-if="comments.length === 0" class="text-center py-12">
                <div class="bg-gradient-to-r from-light-bg-primary/80 to-light-bg-secondary/80 dark:from-dark-bg-primary/80 dark:to-dark-bg-secondary/80 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i class="fas fa-comments text-light-accent-sport dark:text-dark-accent-sport text-2xl animate-bounce-gentle"></i>
                </div>
                <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Chưa có đánh giá nào</h4>
                <p class="text-light-text-secondary dark:text-dark-text-secondary">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
              </div>

              <div v-else class="space-y-4">
                <div v-for="comment in comments" :key="comment.id" 
                     class="bg-gradient-to-br from-light-bg-primary/80 to-light-bg-secondary/80 dark:from-dark-bg-primary/80 dark:to-dark-bg-secondary/80 rounded-2xl p-6 border border-light-border-primary dark:border-dark-border-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-light-accent-sport to-light-accent-info dark:from-dark-accent-sport dark:to-dark-accent-info rounded-full flex items-center justify-center text-white font-bold shadow-sport">
                      {{ comment.user.charAt(0).toUpperCase() }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-2">
                        <div>
                          <h5 class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ comment.user }}</h5>
                          <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                              <i v-for="star in 5" :key="star" 
                                 :class="star <= comment.rating ? 'fas fa-star text-yellow-500' : 'far fa-star text-gray-300'"
                                 class="text-sm"></i>
                            </div>
                            <span v-if="comment.verified" class="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full font-medium">
                              <i class="fas fa-check-circle mr-1"></i>
                              Đã mua hàng
                            </span>
                          </div>
                        </div>
                        <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary">{{ comment.date }}</span>
                      </div>
                      <p class="text-light-text-primary dark:text-dark-text-primary mb-3 leading-relaxed">{{ comment.comment }}</p>
                      <div class="flex items-center gap-4">
                        <button class="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors duration-200">
                          <i class="fas fa-thumbs-up"></i>
                          <span>Hữu ích ({{ comment.helpful }})</span>
                        </button>
                        <button class="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors duration-200">
                          Trả lời
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Load More Button -->
            <div v-if="comments.length > 0" class="text-center pt-4">
              <button class="btn-secondary px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-sport">
                Xem thêm đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/sport";

// Comment interface
interface Comment {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

// Props
interface Props {
  product?: Product;
  comments?: Comment[];
}

const props = withDefaults(defineProps<Props>(), {
  comments: () => []
});

// Methods
const getStarPercentage = (rating: number) => {
  // Mock data for rating breakdown
  const breakdown: { [key: number]: number } = {
    5: 60,
    4: 25,
    3: 10,
    2: 3,
    1: 2
  };
  return breakdown[rating] || 0;
};
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