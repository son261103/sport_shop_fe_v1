<template>
  <div class="min-h-screen bg-gradient-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <Loading size="lg" color="sport" text="Đang tải chi tiết sản phẩm..." />
    </div>

    <!-- Page Content -->
    <div v-else class="section-padding">
      <!-- Product Detail Section -->
      <div data-aos="fade-up" class="pb-8 border-b border-gray-200">
        <ProductDetail :product="product" />
      </div>

      <!-- Product Watch Section (Recently Viewed) -->
      <div data-aos="fade-up" data-aos-delay="200" class="mt-8 mb-16 pb-8 border-b border-gray-200">
        <ProductWatch :relatedProducts="relatedProducts" />
      </div>



      <!-- Product Reviews Section with Tabs -->
      <div data-aos="fade-up" data-aos-delay="400" class="mb-16">
        <ProductReviews :productId="productId" :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import AOS from "aos";
import {
  ProductDetail,
  ProductWatch,
  ProductReviews,
} from "@/components/user/products_detail";
import { Loading } from "@/components/ui";
import type { Product, SportCategory } from "@/types/sport";

// Route and product ID
const route = useRoute();
const productId = computed(() => route.params.id as string);

// Loading state
const isLoading = ref(true);

// Product data
const product = ref({
  id: '',
  name: '',
  price: 0,
  originalPrice: 0,
  image: '',
  images: [] as string[],
  description: '',
  category: 'fitness' as SportCategory,
  brand: '',
  sizes: [] as string[],
  colors: [] as Array<{ name: string; value: string; }>,
  rating: 0,
  reviewCount: 0,
  inStock: true,
  features: [] as string[],
  stock: 0,
  discount: 0
});

// Related products
const relatedProducts = ref([] as Product[]);

// Comments
const comments = ref([] as Array<{
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}>);

// Fetch product data
const fetchProductData = async () => {
  try {
    // Simulate API call to fetch product details
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock product data with real images
    product.value = {
      id: productId.value,
      name: 'Áo thể thao Nike Dri-FIT Pro',
      price: 890000,
      originalPrice: 1200000,
      discount: 26,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop'
      ],
      description: 'Áo thể thao Nike Dri-FIT Pro với công nghệ thấm hút mồ hôi tiên tiến, thiết kế ergonomic và chất liệu cao cấp. Hoàn hảo cho training, chạy bộ và các hoạt động thể thao cường độ cao.',
      category: 'fitness' as SportCategory,
      brand: 'Nike',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'Đen', value: '#000000' },
        { name: 'Trắng', value: '#FFFFFF' },
        { name: 'Xanh navy', value: '#1E3A8A' },
        { name: 'Đỏ', value: '#DC2626' },
        { name: 'Xám', value: '#6B7280' }
      ],
      rating: 4.7,
      reviewCount: 256,
      inStock: true,
      stock: 25,
      features: [
        'Công nghệ Dri-FIT ADV thấm hút mồ hôi vượt trội',
        'Chất liệu polyester tái chế thân thiện môi trường',
        'Thiết kế thoáng khí với lưới thông gió',
        'Đường may phẳng giảm ma sát',
        'Logo phản quang tăng khả năng nhìn thấy',
        'Phù hợp cho mọi hoạt động thể thao cường độ cao'
      ]
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

// Fetch related products
const fetchRelatedProducts = async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Mock related products with real images
    relatedProducts.value = [
      {
        id: '2',
        name: 'Quần short thể thao Adidas ClimaCool',
        description: 'Quần short thể thao với công nghệ ClimaCool thoáng mát',
        price: 650000,
        originalPrice: 850000,
        category: 'fitness' as SportCategory,
        image: 'https://images.unsplash.com/photo-1506629905607-d9c36e0a3f90?w=400&h=400&fit=crop',
        brand: 'Adidas',
        rating: 4.3,
        reviews: 89,
        inStock: true
      },
      {
        id: '3',
        name: 'Giày chạy bộ Nike Air Zoom',
        description: 'Giày chạy bộ với công nghệ Air Zoom đệm êm ái',
        price: 2500000,
        originalPrice: 3000000,
        category: 'running' as SportCategory,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        brand: 'Nike',
        rating: 4.7,
        reviews: 156,
        inStock: true
      },
      {
        id: '4',
        name: 'Áo khoác thể thao Puma Training',
        description: 'Áo khoác training chống gió và nước',
        price: 1200000,
        originalPrice: 1500000,
        category: 'gym' as SportCategory,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
        brand: 'Puma',
        rating: 4.4,
        reviews: 73,
        inStock: true
      },
      {
        id: '5',
        name: 'Quần legging thể thao Under Armour',
        description: 'Quần legging co giãn 4 chiều thoải mái',
        price: 890000,
        originalPrice: 1100000,
        category: 'fitness' as SportCategory,
        image: 'https://images.unsplash.com/photo-1506629905607-d9c36e0a3f90?w=400&h=400&fit=crop',
        brand: 'Under Armour',
        rating: 4.5,
        reviews: 124,
        inStock: true
      },
      {
        id: '6',
        name: 'Áo tank top thể thao Reebok',
        description: 'Áo tank top thoáng mát cho tập luyện',
        price: 450000,
        originalPrice: 600000,
        category: 'gym' as SportCategory,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        brand: 'Reebok',
        rating: 4.2,
        reviews: 67,
        inStock: true
      },
      {
        id: '7',
        name: 'Giày training Nike Metcon',
        description: 'Giày training đa năng cho mọi bài tập',
        price: 3200000,
        originalPrice: 3800000,
        category: 'gym' as SportCategory,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
        brand: 'Nike',
        rating: 4.8,
        reviews: 203,
        inStock: true
      }
    ];
  } catch (error) {
    console.error('Error fetching related products:', error);
  }
};

// Fetch comments
const fetchComments = async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    // Mock comments with real avatars
    comments.value = [
      {
        id: '1',
        user: 'Nguyễn Văn A',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Sản phẩm rất tốt, chất lượng vượt mong đợi! Áo rất thoáng mát, thấm hút mồ hôi tốt. Đã mua 3 chiếc rồi.',
        date: '2024-01-15',
        helpful: 24,
        verified: true
      },
      {
        id: '2',
        user: 'Trần Thị B',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        comment: 'Áo đẹp, vải mềm mại. Giao hàng nhanh, đóng gói cẩn thận. Size vừa như mô tả.',
        date: '2024-01-10',
        helpful: 18,
        verified: true
      },
      {
        id: '3',
        user: 'Lê Minh C',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Chất lượng tuyệt vời! Mặc rất thoải mái khi tập gym. Màu sắc đẹp, không phai sau nhiều lần giặt.',
        date: '2024-01-08',
        helpful: 15,
        verified: false
      },
      {
        id: '4',
        user: 'Phạm Thu D',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        comment: 'Sản phẩm ok, giá hợp lý. Chỉ có điều size hơi rộng so với mong đợi.',
        date: '2024-01-05',
        helpful: 9,
        verified: true
      },
      {
        id: '5',
        user: 'Hoàng Văn E',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Tuyệt vời! Đây là lần thứ 2 mình mua. Chất lượng ổn định, thiết kế đẹp.',
        date: '2024-01-03',
        helpful: 21,
        verified: true
      }
    ];
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

// Initialize page data and AOS
const initializePage = async () => {
  try {
    isLoading.value = true;
    
    // Fetch all data concurrently
    await Promise.all([
      fetchProductData(),
      fetchRelatedProducts(),
      fetchComments()
    ]);
    
    // Initialize AOS animations
    AOS.refresh();
  } catch (error) {
    console.error('Error initializing page:', error);
  } finally {
    isLoading.value = false;
  }
};

// Initialize when component is mounted
onMounted(() => {
  initializePage();
});
</script>