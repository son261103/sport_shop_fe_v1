<template>
  <section class="section-padding" style="background-color: #e9ecef;">
    <div class="container-custom">
      <!-- Header -->
      <div data-aos="fade-up" class="text-center mb-12">
        <h2 class="text-gradient-sport-animated text-3xl lg:text-4xl font-bold mb-4">
          Đánh giá sản phẩm
        </h2>
        <div class="w-24 h-1 bg-gradient-sport mx-auto mb-6 rounded-full"></div>
      </div>

      <!-- Review Stats -->
      <div data-aos="fade-up" data-aos-delay="100" class="max-w-4xl mx-auto mb-8">
        <div class="bg-gradient-page p-6 rounded-2xl">
          <div class="flex flex-col lg:flex-row items-center gap-6">
            <!-- Overall Rating -->
            <div class="flex items-center space-x-4">
              <div class="text-4xl font-bold text-gradient-sport">{{ overallRatingDisplay }}</div>
              <div>
                <div class="flex space-x-1 mb-1">
                  <i v-for="star in 5" :key="star"
                     :class="star <= Math.floor(overallRating) ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                     class="text-lg"></i>
                </div>
                <p class="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {{ totalReviews }} đánh giá
                </p>
              </div>
            </div>
            
            <!-- Rating Breakdown -->
            <div class="flex-1 space-y-2">
              <div v-for="(rating, index) in ratingBreakdown" :key="index" 
                   class="flex items-center space-x-2 text-sm">
                <span class="font-medium w-6">{{ 5 - index }}★</span>
                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div class="bg-gradient-sport h-1.5 rounded-full transition-all duration-500" 
                       :style="{ width: rating.percentage + '%' }"></div>
                </div>
                <span class="text-light-text-secondary dark:text-dark-text-secondary w-8">
                  {{ rating.count }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div data-aos="fade-up" data-aos-delay="200" class="max-w-4xl mx-auto mb-6">
        <div class="flex flex-wrap justify-center space-x-1 bg-gradient-page rounded-xl p-1">
          <button v-for="tab in tabs" :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="activeTab === tab.id ? 'bg-light-accent-sport dark:bg-dark-accent-sport text-white' : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport'"
                  class="px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 text-sm">
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
            <span v-if="tab.count" class="bg-white/20 text-xs px-1.5 py-0.5 rounded-full ml-1">{{ tab.count }}</span>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Reviews Tab -->
        <div v-if="activeTab === 'reviews'" data-aos="fade-up" data-aos-delay="300">
          <div class="space-y-4">
            <!-- Review Item -->
            <div v-for="comment in paginatedComments" :key="comment.id" 
                 class="bg-gradient-page p-4 rounded-xl hover:shadow-lg transition-all duration-300">
              <div class="flex space-x-4">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <img :src="comment.avatar" 
                       :alt="comment.user"
                       class="w-12 h-12 rounded-full object-cover ring-2 ring-light-border-primary dark:ring-dark-border-primary">
                </div>
                
                <!-- Review Content -->
                <div class="flex-1">
                  <!-- User Info -->
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <h4 class="font-semibold text-light-text-primary dark:text-dark-text-primary">
                        {{ comment.user }}
                      </h4>
                      <span v-if="comment.verified" 
                            class="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                        <i class="fas fa-check-circle mr-1"></i>
                        Đã mua hàng
                      </span>
                    </div>
                    <span class="text-sm text-light-text-muted dark:text-dark-text-muted">
                      {{ formatDate(comment.date) }}
                    </span>
                  </div>
                  
                  <!-- Rating -->
                  <div class="flex items-center space-x-2 mb-3">
                    <div class="flex space-x-1">
                      <i v-for="star in 5" :key="star"
                         :class="star <= comment.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                         class="text-sm"></i>
                    </div>
                    <span class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {{ comment.rating }}/5
                    </span>
                  </div>
                  
                  <!-- Comment Text -->
                  <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                    {{ comment.comment }}
                  </p>
                  
                  <!-- Actions -->
                  <div class="flex items-center space-x-4">
                    <button @click="toggleHelpful(comment.id)" 
                            :class="helpfulComments.includes(comment.id) ? 'text-primary' : 'text-light-text-muted dark:text-dark-text-muted'"
                            class="flex items-center space-x-1 text-sm hover:text-primary transition-colors">
                      <i class="fas fa-thumbs-up"></i>
                      <span>Hữu ích ({{ comment.helpful }})</span>
                    </button>
                    <button class="flex items-center space-x-1 text-sm text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-colors">
                      <i class="fas fa-reply"></i>
                      <span>Trả lời</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-8">
            <div class="flex space-x-2">
              <button @click="currentPage = Math.max(1, currentPage - 1)"
                      :disabled="currentPage === 1"
                      class="btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left"></i>
              </button>
              
              <button v-for="page in visiblePages" :key="page"
                      @click="currentPage = page"
                      :class="currentPage === page ? 'btn-primary' : 'btn-outline'"
                      class="px-4 py-2">
                {{ page }}
              </button>
              
              <button @click="currentPage = Math.min(totalPages, currentPage + 1)"
                      :disabled="currentPage === totalPages"
                      class="btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Write Review Tab -->
        <div v-if="activeTab === 'write'" data-aos="fade-up" data-aos-delay="300">
          <div class="bg-gradient-page p-6 rounded-xl">
            <h3 class="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Viết đánh giá của bạn
            </h3>
            
            <form @submit.prevent="submitReview" class="space-y-6">
              <!-- Rating Input -->
              <div>
                <label class="form-label">Đánh giá của bạn *</label>
                <div class="flex space-x-2">
                  <button v-for="star in 5" :key="star"
                          type="button"
                          @click="newReview.rating = star"
                          :class="star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'"
                          class="text-2xl hover:text-yellow-400 transition-colors">
                    <i class="fas fa-star"></i>
                  </button>
                </div>
              </div>
              
              <!-- Comment Input -->
              <div>
                <label class="form-label">Nhận xét *</label>
                <textarea v-model="newReview.comment"
                          rows="4"
                          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                          class="form-input resize-none"
                          required></textarea>
              </div>
              
              <!-- Name Input -->
              <div>
                <label class="form-label">Tên của bạn *</label>
                <input v-model="newReview.name"
                       type="text"
                       placeholder="Nhập tên của bạn"
                       class="form-input"
                       required>
              </div>
              
              <!-- Email Input -->
              <div>
                <label class="form-label">Email *</label>
                <input v-model="newReview.email"
                       type="email"
                       placeholder="Nhập email của bạn"
                       class="form-input"
                       required>
              </div>
              
              <!-- Submit Button -->
              <div class="flex justify-end">
                <button type="submit" 
                        :disabled="!isReviewValid"
                        class="bg-light-accent-sport dark:bg-dark-accent-sport text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all">
                  <i class="fas fa-paper-plane mr-2"></i>
                  Gửi đánh giá
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Q&A Tab -->
        <div v-if="activeTab === 'qa'" data-aos="fade-up" data-aos-delay="300">
          <div class="space-y-4">
            <!-- Ask Question Form -->
            <div class="bg-gradient-page p-4 rounded-xl">
              <h3 class="text-base font-bold text-light-text-primary dark:text-dark-text-primary mb-3">
                Đặt câu hỏi về sản phẩm
              </h3>
              <form @submit.prevent="submitQuestion" class="space-y-4">
                <textarea v-model="newQuestion"
                          rows="3"
                          placeholder="Bạn có câu hỏi gì về sản phẩm này?"
                          class="form-input resize-none"
                          required></textarea>
                <div class="flex justify-end">
                  <button type="submit" class="bg-light-accent-sport dark:bg-dark-accent-sport text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
                    <i class="fas fa-question-circle mr-2"></i>
                    Đặt câu hỏi
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Q&A List -->
            <div class="space-y-3">
              <div v-for="qa in qaList" :key="qa.id" class="bg-gradient-page p-4 rounded-xl">
                <div class="space-y-4">
                  <!-- Question -->
                  <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <i class="fas fa-question text-blue-600 dark:text-blue-400 text-sm"></i>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-light-text-primary dark:text-dark-text-primary">
                        {{ qa.question }}
                      </p>
                      <p class="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
                        {{ qa.asker }} - {{ formatDate(qa.date) }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- Answer -->
                  <div v-if="qa.answer" class="flex space-x-3 ml-11">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-green-600 dark:text-green-400 text-sm"></i>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="text-light-text-secondary dark:text-dark-text-secondary">
                        {{ qa.answer }}
                      </p>
                      <p class="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
                        Shop - {{ formatDate(qa.answerDate) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props
interface Comment {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified?: boolean;
}

interface Props {
  productId: string;
  comments: Comment[];
}

const props = defineProps<Props>();

// Reactive data
const activeTab = ref('reviews');
const currentPage = ref(1);
const itemsPerPage = 5;
const helpfulComments = ref<string[]>([]);

// New review form
const newReview = ref({
  rating: 0,
  comment: '',
  name: '',
  email: ''
});

// Q&A
const newQuestion = ref('');
const qaList = ref([
  {
    id: '1',
    question: 'Áo này có co giãn không ạ?',
    asker: 'Nguyễn A',
    date: '2024-01-10',
    answer: 'Có ạ, áo được làm từ chất liệu có độ co giãn tốt, rất thoải mái khi vận động.',
    answerDate: '2024-01-11'
  },
  {
    id: '2',
    question: 'Size M tương đương với size nào của Việt Nam?',
    asker: 'Trần B',
    date: '2024-01-08',
    answer: 'Size M tương đương với size L của Việt Nam ạ. Bạn có thể tham khảo bảng size chi tiết.',
    answerDate: '2024-01-09'
  }
]);

// Tabs configuration
const tabs = [
  { id: 'reviews', label: 'Đánh giá', icon: 'fas fa-star', count: props.comments.length },
  { id: 'write', label: 'Viết đánh giá', icon: 'fas fa-edit' },
  { id: 'qa', label: 'Hỏi & Đáp', icon: 'fas fa-question-circle', count: qaList.value.length }
];

// Computed properties
const overallRating = computed(() => {
  if (props.comments.length === 0) return 0;
  const sum = props.comments.reduce((acc, comment) => acc + comment.rating, 0);
  return sum / props.comments.length;
});

const overallRatingDisplay = computed(() => {
  return overallRating.value.toFixed(1);
});

const totalReviews = computed(() => props.comments.length);

const ratingBreakdown = computed(() => {
  const breakdown = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
  props.comments.forEach(comment => {
    breakdown[5 - comment.rating]++;
  });
  
  return breakdown.map(count => ({
    count,
    percentage: totalReviews.value > 0 ? (count / totalReviews.value) * 100 : 0
  }));
});

const totalPages = computed(() => Math.ceil(props.comments.length / itemsPerPage));

const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.comments.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const isReviewValid = computed(() => {
  return newReview.value.rating > 0 && 
         newReview.value.comment.trim() && 
         newReview.value.name.trim() && 
         newReview.value.email.trim();
});

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const toggleHelpful = (commentId: string) => {
  const index = helpfulComments.value.indexOf(commentId);
  if (index > -1) {
    helpfulComments.value.splice(index, 1);
  } else {
    helpfulComments.value.push(commentId);
  }
};

const submitReview = () => {
  // Here you would typically submit to your API
  console.log('Submitting review:', newReview.value);
  alert('Cảm ơn bạn đã đánh giá! Đánh giá của bạn sẽ được xem xét và hiển thị sớm.');
  
  // Reset form
  newReview.value = {
    rating: 0,
    comment: '',
    name: '',
    email: ''
  };
  
  // Switch back to reviews tab
  activeTab.value = 'reviews';
};

const submitQuestion = () => {
  // Here you would typically submit to your API
  console.log('Submitting question:', newQuestion.value);
  alert('Câu hỏi của bạn đã được gửi! Chúng tôi sẽ trả lời sớm nhất có thể.');
  
  // Reset form
  newQuestion.value = '';
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