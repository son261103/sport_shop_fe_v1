<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <Loading size="lg" color="sport" text="Đang tải trang chủ..." />
    </div>

    <!-- Page Content -->
    <div v-else>
      <!-- Hero Section -->
      <HeroSection />

      <!-- Featured Categories Section -->
      <FeaturedCategories />

    <!-- News Section -->
    <NewsSection />

     <!-- LogoRun -->
    <LogoRun />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AOS from "aos";
import {
  HeroSection,
  FeaturedCategories,
  NewsSection,
  LogoRun,
} from "@/components/user/home";
import { Loading } from "@/components/ui";

// Loading state
const isLoading = ref(true);

// Initialize page data and AOS
const initializePage = async () => {
  try {
    isLoading.value = true;
    // Simulate loading time for page initialization
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Initialize AOS animations
    AOS.refresh();
  } catch (error) {
    console.error("Error initializing page:", error);
  } finally {
    isLoading.value = false;
  }
};

// Initialize when component is mounted
onMounted(() => {
  initializePage();
});
</script>
