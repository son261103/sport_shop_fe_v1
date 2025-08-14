<template>
  <div class="w-full bg-light-bg-primary dark:bg-dark-bg-primary py-16 -mt-24">
    <!-- Separator Line -->
    <div class="w-full mb-0 mt-0">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-light-border-secondary dark:border-dark-border-secondary"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-light-bg-primary dark:bg-dark-bg-primary px-4 text-sm text-light-text-muted dark:text-dark-text-muted">
            <i class="fas fa-star text-yellow-400 mx-1"></i>
            Đánh giá sản phẩm
            <i class="fas fa-star text-yellow-400 mx-1"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="w-3/4 mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-4">
        <div class="flex items-center">
          <h2 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mr-4">
            Đánh giá từ khách hàng
          </h2>
          
          <!-- Rating Summary -->
          <div class="flex items-center">
            <div class="flex space-x-1 mr-2">
              <i v-for="star in 5" :key="star" 
                 :class="star <= Math.floor(Number(overallRating)) ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                 class="text-xs"></i>
            </div>
            <span class="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mr-1">{{ overallRating }}</span>
            <span class="text-sm text-gray-600">({{ totalReviews }} đánh giá)</span>
          </div>
        </div>
      </div>

      <!-- Reviews List (Collapsible) -->
      <div class="space-y-4">
        <div v-for="comment in displayedComments" :key="comment.id" 
             class="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-4 border border-light-border-secondary dark:border-dark-border-secondary">
          <div class="flex items-start space-x-3">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {{ comment.user.charAt(0).toUpperCase() }}
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-medium text-light-text-primary dark:text-dark-text-primary text-sm">{{ comment.user }}</h4>
                <span class="text-xs text-gray-500">{{ formatDate(comment.date) }}</span>
              </div>
              
              <!-- Rating Stars -->
              <div class="flex space-x-1 mb-2">
                <i v-for="star in 5" :key="star"
                   :class="star <= comment.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                   class="text-xs"></i>
              </div>
              
              <!-- Comment Text -->
              <p class="text-light-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed mb-2">{{ comment.comment }}</p>
              
              <!-- Images if any -->
              <div v-if="comment.images" class="flex space-x-2 mb-2">
                <img v-for="(image, index) in comment.images" :key="index" 
                     :src="image" 
                     class="w-12 h-12 object-cover rounded border" 
                     alt="Review image">
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center space-x-3">
                <button @click="toggleHelpful(comment.id)" 
                        class="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  <i class="far fa-thumbs-up"></i>
                  <span>Hữu ích ({{ comment.helpful }})</span>
                </button>
                <button class="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  <i class="far fa-comment"></i>
                  <span>Trả lời</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Show More Button -->
        <div v-if="comments.length > 3" class="text-center pt-2">
          <button @click="toggleShowAll" 
                  class="text-sm text-blue-600 hover:text-blue-800 font-medium">
            {{ showAll ? 'Thu gọn' : `Xem thêm ${comments.length - 3} đánh giá` }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props
interface Props {
  productId: string;
  comments: Array<{
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
    images?: string[];
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  comments: () => []
});

// Reactive variables
const showAll = ref(false);

// Computed properties
const displayedComments = computed(() => {
  if (showAll.value) {
    return props.comments;
  }
  return props.comments.slice(0, 3);
});
const overallRating = computed(() => {
  if (props.comments.length === 0) return 0;
  const total = props.comments.reduce((sum, comment) => sum + comment.rating, 0);
  return (total / props.comments.length).toFixed(1);
});

const totalReviews = computed(() => props.comments.length);

// Methods
const toggleShowAll = () => {
  showAll.value = !showAll.value;
};

const toggleHelpful = (commentId: string) => {
  // Here you would typically update the helpful count via API
  console.log('Toggle helpful for comment:', commentId);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>