<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
        Liên hệ
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các thông tin dưới đây.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Contact Information -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-dark-bg-secondary rounded-lg p-6 shadow-md">
          <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
            Thông tin liên hệ
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary">Địa chỉ</h3>
                <p class="text-light-text-secondary dark:text-dark-text-secondary">123 Đường ABC, Quận 1, TP.HCM</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary">Điện thoại</h3>
                <p class="text-light-text-secondary dark:text-dark-text-secondary">+84 123 456 789</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-light-text-primary dark:text-dark-text-primary">Email</h3>
                <p class="text-light-text-secondary dark:text-dark-text-secondary">contact@sportshop.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Business Hours -->
        <div class="bg-white dark:bg-dark-bg-secondary rounded-lg p-6 shadow-md">
          <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
            Giờ làm việc
          </h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-light-text-secondary dark:text-dark-text-secondary">Thứ 2 - Thứ 6:</span>
              <span class="text-light-text-primary dark:text-dark-text-primary">8:00 - 18:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-light-text-secondary dark:text-dark-text-secondary">Thứ 7:</span>
              <span class="text-light-text-primary dark:text-dark-text-primary">8:00 - 17:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-light-text-secondary dark:text-dark-text-secondary">Chủ nhật:</span>
              <span class="text-light-text-primary dark:text-dark-text-primary">9:00 - 16:00</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="bg-white dark:bg-dark-bg-secondary rounded-lg p-6 shadow-md">
        <h2 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Gửi tin nhắn
        </h2>
        
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Họ và tên
            </label>
            <input 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-bg-primary dark:text-dark-text-primary"
              placeholder="Nhập họ và tên của bạn"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Email
            </label>
            <input 
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-bg-primary dark:text-dark-text-primary"
              placeholder="Nhập email của bạn"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Chủ đề
            </label>
            <input 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-bg-primary dark:text-dark-text-primary"
              placeholder="Nhập chủ đề tin nhắn"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Tin nhắn
            </label>
            <textarea 
              rows="4" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-bg-primary dark:text-dark-text-primary"
              placeholder="Nhập tin nhắn của bạn"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Gửi tin nhắn
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Contact page logic will be implemented here
</script>