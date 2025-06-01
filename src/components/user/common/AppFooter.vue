<template>
  <footer class="bg-light-bg-secondary dark:bg-dark-bg-secondary border-t border-light-border-secondary dark:border-dark-border-secondary mt-20">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <h3 class="text-xl font-bold text-gradient mb-4">🏃‍♂️ Sport Shop</h3>
          <p class="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Your ultimate destination for premium sports equipment and athletic wear. 
            Empowering athletes of all levels to achieve their best.
          </p>
          <div class="flex space-x-3">
            <n-button quaternary circle size="small">
              <template #icon>
                <n-icon><LogoFacebook /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle size="small">
              <template #icon>
                <n-icon><LogoTwitter /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle size="small">
              <template #icon>
                <n-icon><LogoInstagram /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle size="small">
              <template #icon>
                <n-icon><LogoYoutube /></n-icon>
              </template>
            </n-button>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="#" class="footer-link">Home</a></li>
            <li><a href="#" class="footer-link">Products</a></li>
            <li><a href="#" class="footer-link">Categories</a></li>
            <li><a href="#" class="footer-link">Sale</a></li>
            <li><a href="#" class="footer-link">New Arrivals</a></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Categories</h4>
          <ul class="space-y-2">
            <li><a href="#" class="footer-link">🏃 Running</a></li>
            <li><a href="#" class="footer-link">⚽ Football</a></li>
            <li><a href="#" class="footer-link">🏀 Basketball</a></li>
            <li><a href="#" class="footer-link">🎾 Tennis</a></li>
            <li><a href="#" class="footer-link">💪 Gym & Fitness</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Contact Us</h4>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <n-icon size="16"><LocationOutline /></n-icon>
              <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                123 Sport Street, Athletic City, AC 12345
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <n-icon size="16"><CallOutline /></n-icon>
              <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                +1 (555) 123-4567
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <n-icon size="16"><MailOutline /></n-icon>
              <span class="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                info@sportshop.com
              </span>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="mt-6">
            <h5 class="font-medium text-light-text-primary dark:text-dark-text-primary mb-2">Newsletter</h5>
            <div class="flex space-x-2">
              <n-input
                placeholder="Your email"
                size="small"
                class="flex-1"
              />
              <n-button type="primary" size="small">
                Subscribe
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-light-border-secondary dark:border-dark-border-secondary mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-light-text-muted dark:text-dark-text-muted text-sm">
            © 2024 Sport Shop. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="footer-link text-sm">Privacy Policy</a>
            <a href="#" class="footer-link text-sm">Terms of Service</a>
            <a href="#" class="footer-link text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NButton, NIcon, NInput } from 'naive-ui'
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
  @apply text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors duration-200 text-sm;
}
</style>
