<template>
  <footer class="relative overflow-hidden bg-gradient-page">
    <!-- Background với gradient pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-light-bg-secondary via-light-bg-primary to-light-bg-secondary dark:from-dark-bg-secondary dark:via-dark-bg-primary dark:to-dark-bg-secondary opacity-50"></div>
    
    <!-- Decorative Elements -->
    <div class="absolute inset-0 bg-gradient-to-t from-light-accent-sport/5 to-transparent dark:from-dark-accent-sport/5"></div>
    
    <div class="relative z-10">
      <!-- Main Footer Content -->
      <div class="container-custom py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <!-- Brand Section -->
          <div class="lg:col-span-1 space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-gradient-sport-animated mb-4">
                🏃‍♂️ Sport Shop
              </h3>
              <p class="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                Điểm đến tối ưu cho các thiết bị thể thao cao cấp và trang phục thể thao. 
                Trao quyền cho các vận động viên ở mọi cấp độ để đạt được thành tích tốt nhất.
              </p>
            </div>
            
            <!-- Social Media -->
            <div>
              <h5 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">🌐 Theo dõi chúng tôi</h5>
              <div class="flex space-x-4">
                <a href="#" class="social-link group" title="Facebook">
                  <LogoFacebook class="w-5 h-5" />
                </a>
                <a href="#" class="social-link group" title="Twitter">
                  <LogoTwitter class="w-5 h-5" />
                </a>
                <a href="#" class="social-link group" title="Instagram">
                  <LogoInstagram class="w-5 h-5" />
                </a>
                <a href="#" class="social-link group" title="YouTube">
                  <LogoYoutube class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">🔗 Liên kết nhanh</h4>
            <nav class="space-y-3">
              <a href="#" class="footer-link">🏠 Trang chủ</a>
              <a href="#" class="footer-link">🛍️ Sản phẩm</a>
              <a href="#" class="footer-link">📂 Danh mục</a>
              <a href="#" class="footer-link">🔥 Khuyến mãi</a>
              <a href="#" class="footer-link">✨ Sản phẩm mới</a>
              <a href="#" class="footer-link">❤️ Yêu thích</a>
            </nav>
          </div>

          <!-- Categories -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">🏆 Danh mục thể thao</h4>
            <nav class="space-y-3">
              <a href="#" class="footer-link category-running">🏃 Chạy bộ & Điền kinh</a>
              <a href="#" class="footer-link category-football">⚽ Bóng đá</a>
              <a href="#" class="footer-link category-basketball">🏀 Bóng rổ</a>
              <a href="#" class="footer-link category-tennis">🎾 Tennis & Cầu lông</a>
              <a href="#" class="footer-link category-gym">💪 Gym & Fitness</a>
              <a href="#" class="footer-link">🏊 Bơi lội</a>
            </nav>
          </div>

          <!-- Contact & Newsletter -->
          <div class="space-y-6">
            <div>
              <h4 class="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">📞 Liên hệ</h4>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="w-5 h-5 mt-0.5 text-light-accent-info dark:text-dark-accent-info flex-shrink-0">
                    <LocationOutline />
                  </div>
                  <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">
                    123 Đường Thể Thao<br>
                    Quận 1, TP.HCM, Việt Nam
                  </span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 text-light-accent-sport dark:text-dark-accent-sport flex-shrink-0">
                    <CallOutline />
                  </div>
                  <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm">+84 (028) 123-4567</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 text-light-accent-warning dark:text-dark-accent-warning flex-shrink-0">
                    <MailOutline />
                  </div>
                  <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm">info@sportshop.vn</span>
                </div>
              </div>
            </div>

            <!-- Newsletter -->
            <div class="card">
              <div class="card-body p-4">
                <h5 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">📧 Đăng ký nhận tin</h5>
                <p class="text-light-text-muted dark:text-dark-text-muted text-xs mb-4">Cập nhật ưu đãi và sản phẩm mới nhất!</p>
                <div class="space-y-3">
                  <input 
                    type="email"
                    placeholder="Nhập email của bạn"
                    class="form-input text-sm"
                  />
                  <button class="btn-primary-animated w-full text-sm">
                    📤 Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-light-border-primary dark:border-dark-border-primary bg-light-bg-secondary/50 dark:bg-dark-bg-secondary/50">
        <div class="container-custom py-6">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p class="text-light-text-muted dark:text-dark-text-muted text-sm">
                © 2024 Sport Shop Vietnam. Tất cả quyền được bảo lưu.
              </p>
              <div class="flex items-center space-x-2 text-xs text-light-text-muted dark:text-dark-text-muted">
                <span>Được tạo với</span>
                <span class="text-light-accent-danger dark:text-dark-accent-danger animate-pulse">❤️</span>
                <span>cho các vận động viên</span>
              </div>
            </div>
            
            <div class="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <a href="#" class="footer-link text-sm">🔒 Chính sách bảo mật</a>
              <a href="#" class="footer-link text-sm">📋 Điều khoản dịch vụ</a>
              <a href="#" class="footer-link text-sm">🍪 Chính sách Cookie</a>
              <a href="#" class="footer-link text-sm">💬 Hỗ trợ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { 
  LogoFacebook,
  LogoTwitter,
  LogoInstagram,
  LogoYoutube,
  LocationOutline,
  CallOutline,
  MailOutline
} from '@vicons/ionicons5'
</script>

<style scoped>
.footer-link {
  display: block;
  color: rgb(107, 114, 128);
  font-size: 0.875rem;
  transition: color 0.2s ease-in-out;
}

.footer-link:hover {
  color: var(--accent-sport);
}

.dark .footer-link {
  color: rgb(156, 163, 175);
}

.dark .footer-link:hover {
  color: var(--accent-sport);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgb(243, 244, 246);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.75rem;
  color: rgb(107, 114, 128);
  transition: all 0.3s ease;
}

.dark .social-link {
  background-color: rgb(31, 41, 55);
  border-color: rgb(75, 85, 99);
  color: rgb(156, 163, 175);
}

.social-link:hover {
  background-color: var(--accent-sport);
  border-color: var(--accent-sport);
  color: white;
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>
