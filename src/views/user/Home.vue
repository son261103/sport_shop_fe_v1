<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Featured Categories Section -->
    <FeaturedCategories />

    <!-- Why Choose Us Section -->
    <WhyChooseUs />

    <!-- News Section -->
    <NewsSection />

     <!-- LogoRun -->
    <LogoRun />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import AOS from "aos";
import {
  HeroSection,
  FeaturedCategories,
  WhyChooseUs,
  NewsSection,
  LogoRun,
} from "@/components/user/home";

// Initialize AOS when component is mounted
onMounted(() => {
  AOS.refresh();
});
</script>
