chỉhàng <template>
  <section class="pt-2 pb-8 px-4" style="background-color: white;">
    <div class="w-full max-w-full">
      <!-- Header -->
      <div data-aos="fade-up" class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Đánh giá sản phẩm
        </h2>
        <div class="w-16 h-1 bg-primary mx-auto mb-4"></div>
      </div>

      <div class="w-full">
        <!-- Rating Summary -->
        <div data-aos="fade-up" data-aos-delay="100" class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Overall Rating -->
            <div class="text-center">
              <div class="text-4xl font-bold text-primary mb-1">{{ overallRating }}</div>
              <div class="flex justify-center mb-1">
                <div class="flex space-x-1">
                  <i v-for="star in 5" :key="star" 
                     :class="star <= Math.floor(Number(overallRating)) ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                     class="text-lg"></i>
                </div>
              </div>
              <p class="text-gray-600 text-sm">{{ totalReviews }} đánh giá</p>
            </div>

            <!-- Rating Breakdown -->
            <div class="col-span-2 space-y-2">
              <div v-for="(rating, index) in ratingBreakdown" :key="index" class="flex items-center">
                <span class="text-sm text-gray-600 w-6">{{ 5 - index }}</span>
                <i class="fas fa-star text-yellow-400 text-xs mx-2"></i>
                <div class="flex-1 bg-gray-200 rounded-full h-1.5 mx-2">
                  <div class="bg-primary h-1.5 rounded-full" :style="{ width: rating + '%' }"></div>
                </div>
                <span class="text-xs text-gray-600 w-10">{{ rating }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews List -->
        <div data-aos="fade-up" data-aos-delay="200" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Đánh giá từ khách hàng</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="comment in comments" :key="comment.id" 
                 class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div class="flex items-start space-x-3">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {{ comment.user.charAt(0).toUpperCase() }}
                  </div>
                </div>
                
                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-medium text-gray-800 text-sm truncate">{{ comment.user }}</h4>
                    <span class="text-xs text-gray-500">{{ formatDate(comment.date) }}</span>
                  </div>
                  
                  <!-- Rating Stars -->
                  <div class="flex space-x-1 mb-2">
                    <i v-for="star in 5" :key="star"
                       :class="star <= comment.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                       class="text-xs"></i>
                  </div>
                  
                  <!-- Comment Text -->
                  <p class="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-3">{{ comment.comment }}</p>
                  
                  <!-- Helpful Button -->
                  <div class="flex items-center">
                    <button @click="toggleHelpful(comment.id)" 
                            class="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary transition-colors">
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