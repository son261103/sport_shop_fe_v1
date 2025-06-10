<template>
  <div class="max-w-4xl mx-auto text-center">
    <div data-aos="zoom-in" class="bg-light-surface-primary dark:bg-dark-surface-primary rounded-2xl p-8 shadow-card border border-light-border-primary dark:border-dark-border-primary">
      <!-- Success Icon -->
      <div class="mb-6">
        <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-4xl text-green-600 dark:text-green-400"></i>
        </div>
        <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
          Đặt hàng thành công!
        </h1>
        <p class="text-light-text-secondary dark:text-dark-text-secondary">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi
        </p>
      </div>
      
      <!-- Order Info -->
      <div class="bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-xl p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary block mb-1">Mã đơn hàng:</span>
            <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ orderInfo.orderCode }}</span>
          </div>
          
          <div>
            <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary block mb-1">Ngày đặt:</span>
            <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ formatDate(orderInfo.orderDate) }}</span>
          </div>
          
          <div>
            <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary block mb-1">Tổng tiền:</span>
            <span class="font-semibold text-light-accent-sport dark:text-dark-accent-sport text-lg">{{ formatPrice(orderInfo.total) }}</span>
          </div>
          
          <div>
            <span class="text-sm text-light-text-secondary dark:text-dark-text-secondary block mb-1">Phương thức thanh toán:</span>
            <span class="font-semibold text-light-text-primary dark:text-dark-text-primary">{{ orderInfo.paymentMethod }}</span>
          </div>
        </div>
      </div>
      
      <!-- Delivery Info -->
      <div class="bg-light-surface-secondary dark:bg-dark-surface-secondary rounded-xl p-6 mb-6 text-left">
        <h3 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
          <i class="fas fa-shipping-fast mr-2 text-light-accent-sport dark:text-dark-accent-sport"></i>
          Thông tin giao hàng
        </h3>
        
        <div class="space-y-2">
          <p class="text-light-text-primary dark:text-dark-text-primary">
            <span class="font-medium">Người nhận:</span> {{ orderInfo.deliveryInfo.fullName }}
          </p>
          <p class="text-light-text-primary dark:text-dark-text-primary">
            <span class="font-medium">Số điện thoại:</span> {{ orderInfo.deliveryInfo.phone }}
          </p>
          <p class="text-light-text-primary dark:text-dark-text-primary">
            <span class="font-medium">Địa chỉ:</span> 
            {{ orderInfo.deliveryInfo.address }}, {{ orderInfo.deliveryInfo.district }}, {{ orderInfo.deliveryInfo.province }}
          </p>
        </div>
      </div>
      
      <!-- Next Steps -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
        <h3 class="font-semibold text-blue-800 dark:text-blue-300 mb-3">
          <i class="fas fa-info-circle mr-2"></i>
          Thông tin quan trọng
        </h3>
        
        <div class="text-left space-y-2 text-blue-700 dark:text-blue-300">
          <p>• Đơn hàng của bạn đang được xử lý và sẽ được giao trong 2-3 ngày làm việc</p>
          <p>• Bạn sẽ nhận được email xác nhận và thông tin theo dõi đơn hàng</p>
          <p>• Liên hệ hotline 1900-xxxx nếu cần hỗ trợ</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          @click="$emit('viewOrderHistory')"
          class="flex items-center justify-center gap-2 px-6 py-3 bg-light-surface-secondary dark:bg-dark-surface-secondary text-light-text-primary dark:text-dark-text-primary rounded-xl hover:bg-light-border-primary dark:hover:bg-dark-border-primary transition-all duration-200 font-medium border border-light-border-primary dark:border-dark-border-primary"
        >
          <i class="fas fa-history"></i>
          <span>Xem lịch sử đơn hàng</span>
        </button>
        
        <button 
          @click="$emit('continueShopping')"
          class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-sport text-white rounded-xl hover:shadow-sport transition-all duration-300 font-medium transform hover:scale-105"
        >
          <i class="fas fa-shopping-bag"></i>
          <span>Tiếp tục mua sắm</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DeliveryInfo {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  address: string;
  provinceCode?: number;
  districtCode?: number;
}

interface OrderInfo {
  orderCode: string;
  orderDate: Date;
  total: number;
  paymentMethod: string;
  deliveryInfo: DeliveryInfo;
}

interface Props {
  orderInfo: OrderInfo;
}

interface Emits {
  viewOrderHistory: [];
  continueShopping: [];
}

defineProps<Props>();
defineEmits<Emits>();

// Format price function
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

// Format date function
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>