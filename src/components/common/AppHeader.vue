<template>
  <header class="bg-light-bg-secondary dark:bg-dark-bg-secondary border-b border-light-border-secondary dark:border-dark-border-secondary">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo & Brand -->
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-gradient-sport-animated">
            🏃‍♂️ Sport Shop
          </h1>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'nav-link',
              { 'active': $route.path === item.path }
            ]"
          >
            <n-icon v-if="item.icon" size="16" class="mr-1">
              <component :is="item.icon" />
            </n-icon>
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden lg:block w-64">
            <SearchBar
              placeholder="Search products..."
              size="small"
              :show-category-filter="false"
              @search="handleSearch"
            />
          </div>

          <!-- Shopping Cart -->
          <ShoppingCart ref="shoppingCartRef" />

          <!-- Theme Toggle -->
          <n-button
            @click="toggleTheme"
            quaternary
            circle
            size="large"
          >
            <template #icon>
              <n-icon size="20">
                <component :is="isDark ? SunnyOutline : MoonOutline" />
              </n-icon>
            </template>
          </n-button>

          <!-- Mobile Menu Toggle -->
          <n-button
            @click="toggleMobileMenu"
            quaternary
            circle
            size="large"
            class="md:hidden"
          >
            <template #icon>
              <n-icon size="20">
                <component :is="isMobileMenuOpen ? CloseOutline : MenuOutline" />
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden bg-light-bg-secondary dark:bg-dark-bg-secondary border-t border-light-border-secondary dark:border-dark-border-secondary"
    >
      <div class="container-custom py-4">
        <!-- Mobile Search -->
        <div class="mb-4">
          <SearchBar
            placeholder="Search products..."
            size="medium"
            :show-category-filter="true"
            @search="handleSearch"
          />
        </div>

        <!-- Mobile Navigation -->
        <nav class="space-y-2">
          <router-link
            v-for="item in navigationItems"
            :key="`mobile-${item.path}`"
            :to="item.path"
            :class="[
              'block nav-link',
              { 'active': $route.path === item.path }
            ]"
            @click="isMobileMenuOpen = false"
          >
            <n-icon v-if="item.icon" size="16" class="mr-2">
              <component :is="item.icon" />
            </n-icon>
            {{ item.label }}
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import {
  SunnyOutline,
  MoonOutline,
  MenuOutline,
  CloseOutline,
  HomeOutline,
  GridOutline
} from '@vicons/ionicons5'
import { useTheme, useNaiveTheme } from '@/composables/useTheme'
import { SearchBar, ShoppingCart } from '@/components/examples'

interface NavigationItem {
  label: string
  path: string
  icon?: any
}

const { toggleTheme } = useTheme()
const { isDark } = useNaiveTheme()

// Refs
const shoppingCartRef = ref()

// Navigation state
const isMobileMenuOpen = ref(false)

// Navigation items
const navigationItems: NavigationItem[] = [
  { label: 'Home', path: '/', icon: HomeOutline },
  { label: 'Components', path: '/components', icon: GridOutline }
]

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleSearch = (query: string, filters: any) => {
  console.log('Search:', query, filters)
  // Here you would typically navigate to search results page
  isMobileMenuOpen.value = false // Close mobile menu on search
}
</script>
