<template>
  <section class="py-16 px-4" style="background-color: #e9ecef;">
    <div class="container-custom">
      <!-- Header -->
      <div data-aos="fade-up" class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          Đánh giá sản phẩm
        </h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Chia sẻ trải nghiệm của bạn về sản phẩm này
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Rating Summary -->
        <div data-aos="fade-up" data-aos-delay="100" class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Overall Rating -->
            <div class="text-center">
              <div class="text-5xl font-bold text-primary mb-2">{{ overallRating }}</div>
              <div class="flex justify-center mb-2">
                <div class="flex space-x-1">
                  <i v-for="star in 5" :key="star" 
                     :class="star <= Math.floor(Number(overallRating)) ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                     class="text-xl"></i>
                </div>
              </div>
              <p class="text-gray-600">{{ totalReviews }} đánh giá</p>
            </div>

            <!-- Rating Breakdown -->
            <div class="space-y-3">
              <div v-for="(rating, index) in ratingBreakdown" :key="index" class="flex items-center">
                <span class="text-sm text-gray-600 w-8">{{ 5 - index }}</span>
                <i class="fas fa-star text-yellow-400 text-sm mx-2"></i>
                <div class="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                  <div class="bg-primary h-2 rounded-full" :style="{ width: rating + '%' }"></div>
                </div>
                <span class="text-sm text-gray-600 w-12">{{ rating }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Write Review Form -->
        <div data-aos="fade-up" data-aos-delay="200" class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">Viết đánh giá của bạn</h3>
          
          <form @submit.prevent="submitReview" class="space-y-6">
            <!-- Rating Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Đánh giá của bạn</label>
              <div class="flex space-x-2">
                <button v-for="star in 5" :key="star" type="button"
                        @click="newReview.rating = star"
                        :class="star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'"
                        class="text-2xl hover:text-yellow-400 transition-colors">
                  <i class="fas fa-star"></i>
                </button>
              </div>
            </div>

            <!-- Name Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
              <input v-model="newReview.name" type="text" 
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                     placeholder="Nhập họ và tên của bạn" required>
            </div>

            <!-- Comment Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bình luận</label>
              <textarea v-model="newReview.comment" rows="4"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..." required></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" 
                    class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Gửi đánh giá
            </button>
          </form>
        </div>

        <!-- Reviews List -->
        <div data-aos="fade-up" data-aos-delay="300" class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">Đánh giá từ khách hàng</h3>
          
          <div v-for="comment in comments" :key="comment.id" 
               class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-start space-x-4">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {{ comment.user.charAt(0).toUpperCase() }}
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-gray-800">{{ comment.user }}</h4>
                  <span class="text-sm text-gray-500">{{ formatDate(comment.date) }}</span>
                </div>
                
                <!-- Rating Stars -->
                <div class="flex space-x-1 mb-3">
                  <i v-for="star in 5" :key="star"
                     :class="star <= comment.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                     class="text-sm"></i>
                </div>
                
                <!-- Comment Text -->
                <p class="text-gray-700 leading-relaxed mb-3">{{ comment.comment }}</p>
                
                <!-- Helpful Button -->
                <div class="flex items-center space-x-4">
                  <button @click="toggleHelpful(comment.id)" 
                          class="flex items-center space-x-2 text-sm text-gray-500 hover:text-primary transition-colors">
                    <i class="far fa-thumbs-up"></i>
                    <span>Hữu ích ({{ comment.helpful }})</span>
                  </button>
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
interface Props {
  productId: string;
  comments: Array<{
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  comments: () => []
});

// New review form
const newReview = ref({
  rating: 0,
  name: '',
  comment: ''
});

// Computed properties
const overallRating = computed(() => {
  if (props.comments.length === 0) return 0;
  const total = props.comments.reduce((sum, comment) => sum + comment.rating, 0);
  return (total / props.comments.length).toFixed(1);
});

const totalReviews = computed(() => props.comments.length);

const ratingBreakdown = computed(() => {
  const breakdown = [0, 0, 0, 0, 0]; // 5 stars to 1 star
  
  props.comments.forEach(comment => {
    breakdown[5 - comment.rating]++;
  });
  
  return breakdown.map(count => 
    props.comments.length > 0 ? Math.round((count / props.comments.length) * 100) : 0
  );
});

// Methods
const submitReview = () => {
  if (newReview.value.rating === 0 || !newReview.value.name || !newReview.value.comment) {
    alert('Vui lòng điền đầy đủ thông tin đánh giá');
    return;
  }
  
  // Here you would typically send the review to your API
  console.log('Submitting review:', newReview.value);
  
  // Reset form
  newReview.value = {
    rating: 0,
    name: '',
    comment: ''
  };
  
  alert('Cảm ơn bạn đã đánh giá sản phẩm!');
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