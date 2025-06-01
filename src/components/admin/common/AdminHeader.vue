<template>
  <header class="bg-white dark:bg-dark-bg-secondary border-b border-light-border-primary dark:border-dark-border-primary shadow-sm h-16 flex items-center justify-between px-6">
    <!-- Left Section -->
    <div class="flex items-center space-x-4">
      <!-- Sidebar Toggle -->
      <button 
        @click="$emit('toggle-sidebar')"
        class="p-2 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-primary transition-colors"
      >
        <svg class="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Right Section -->
    <div class="flex items-center space-x-4">
      <!-- Admin Profile -->
      <div 
        class="relative"
        @mouseenter="showProfileMenu"
        @mouseleave="hideProfileMenu"
      >
        <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-primary transition-colors">
          <div class="w-8 h-8 bg-gradient-sport rounded-full flex items-center justify-center">
            <span class="text-white font-medium text-sm">A</span>
          </div>
          <span class="text-light-text-primary dark:text-dark-text-primary font-medium">Admin</span>
        </button>
        
        <!-- Profile Dropdown -->
        <div 
          class="dropdown-menu w-52"
          :class="{ 'show': isProfileMenuOpen }"
        >
          <div class="dropdown-header">
            <div class="font-medium text-light-text-primary dark:text-dark-text-primary text-base">Tài khoản quản trị</div>
          </div>
          <div class="py-1.5">
            <a href="#" class="dropdown-item">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2.5 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Hồ sơ</span>
              </div>
            </a>
            <a href="#" class="dropdown-item">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2.5 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Cài đặt tài khoản</span>
              </div>
            </a>
            <a href="#" class="dropdown-item">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2.5 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM16 3H4v2h12V3zM4 7h12v2H4V7zM4 11h12v2H4v-2z"></path>
                </svg>
                <span>Báo cáo</span>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <button 
              @click="toggleTheme"
              class="dropdown-item w-full text-left"
            >
              <div class="flex items-center">
                <svg v-if="isDark" class="w-4 h-4 mr-2.5 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2.5 text-light-accent-sport dark:text-dark-accent-sport" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
                <span>{{ isDark ? 'Chế độ sáng' : 'Chế độ tối' }}</span>
              </div>
            </button>
            <a href="#" class="dropdown-item danger">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2.5 text-light-accent-danger dark:text-dark-accent-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Đăng xuất</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

defineEmits<{
  'toggle-sidebar': []
}>()

const { isDark, toggleTheme } = useTheme()
const isProfileMenuOpen = ref(false)
let hideTimeout: NodeJS.Timeout | null = null

const showProfileMenu = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  isProfileMenuOpen.value = true
}

const hideProfileMenu = () => {
  hideTimeout = setTimeout(() => {
    isProfileMenuOpen.value = false
  }, 150) // Delay 150ms để tránh giật
}
</script>