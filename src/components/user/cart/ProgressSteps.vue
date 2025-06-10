<template>
  <!-- Progress Steps - Tahir Yousaf Style -->
  <div data-aos="fade-up" data-aos-delay="100" class="mb-6">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex items-center justify-between relative">
        <!-- Progress Line Background - Only between circles -->
        <div class="absolute top-1/2 transform -translate-y-1/2 z-0" style="left: 3rem; right: 3rem; height: 2px;">
          <div class="h-full bg-light-border-primary dark:bg-dark-border-primary">
            <div class="h-full bg-gradient-sport transition-all duration-700 ease-in-out" :style="{ width: progressWidth }"></div>
          </div>
        </div>
        
        <!-- Step 1: Giỏ hàng -->
        <div class="relative z-20 flex flex-col items-center">
          <div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 transform bg-white dark:bg-gray-800"
               :class="[
                 currentStep >= 1 
                   ? 'bg-gradient-sport text-white shadow-sport' 
                   : 'bg-light-surface-secondary dark:bg-dark-surface-secondary text-light-text-muted dark:text-dark-text-muted border-2 border-light-border-primary dark:border-dark-border-primary'
               ]">
            <span class="relative z-30">1</span>
          </div>
          <span class="mt-2 text-xs font-medium transition-colors duration-300 relative z-30" 
                :class="currentStep >= 1 ? 'text-light-accent-sport dark:text-dark-accent-sport' : 'text-light-text-muted dark:text-dark-text-muted'">
            Giỏ hàng
          </span>
        </div>
        
        <!-- Step 2: Thông tin -->
        <div class="relative z-20 flex flex-col items-center">
          <div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 transform bg-white dark:bg-gray-800"
               :class="[
                 currentStep >= 2 
                   ? 'bg-gradient-sport text-white shadow-sport' 
                   : 'bg-light-surface-secondary dark:bg-dark-surface-secondary text-light-text-muted dark:text-dark-text-muted border-2 border-light-border-primary dark:border-dark-border-primary'
               ]">
            <span class="relative z-30">2</span>
          </div>
          <span class="mt-2 text-xs font-medium transition-colors duration-300 relative z-30" 
                :class="currentStep >= 2 ? 'text-light-accent-sport dark:text-dark-accent-sport' : 'text-light-text-muted dark:text-dark-text-muted'">
            Thông tin
          </span>
        </div>
        
        <!-- Step 3: Thanh toán -->
        <div class="relative z-20 flex flex-col items-center">
          <div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 transform bg-white dark:bg-gray-800"
               :class="[
                 currentStep >= 3 
                   ? 'bg-gradient-sport text-white shadow-sport' 
                   : 'bg-light-surface-secondary dark:bg-dark-surface-secondary text-light-text-muted dark:text-dark-text-muted border-2 border-light-border-primary dark:border-dark-border-primary'
               ]">
            <span class="relative z-30">3</span>
          </div>
          <span class="mt-2 text-xs font-medium transition-colors duration-300 relative z-30" 
                :class="currentStep >= 3 ? 'text-light-accent-sport dark:text-dark-accent-sport' : 'text-light-text-muted dark:text-dark-text-muted'">
            Thanh toán
          </span>
        </div>
        
        <!-- Step 4: Hoàn thành -->
        <div class="relative z-20 flex flex-col items-center">
          <div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 transform bg-white dark:bg-gray-800"
               :class="[
                 currentStep >= 4 
                   ? 'bg-gradient-sport text-white shadow-sport' 
                   : 'bg-light-surface-secondary dark:bg-dark-surface-secondary text-light-text-muted dark:text-dark-text-muted border-2 border-light-border-primary dark:border-dark-border-primary'
               ]">
            <span class="relative z-30">4</span>
          </div>
          <span class="mt-2 text-xs font-medium transition-colors duration-300 relative z-30" 
                :class="currentStep >= 4 ? 'text-light-accent-sport dark:text-dark-accent-sport' : 'text-light-text-muted dark:text-dark-text-muted'">
            Hoàn thành
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  currentStep: number;
}

const props = defineProps<Props>();

// Calculate progress width based on current step
const progressWidth = computed(() => {
  const stepPercentage = {
    1: '0%',
    2: '33.33%',
    3: '66.66%',
    4: '100%'
  };
  return stepPercentage[props.currentStep as keyof typeof stepPercentage] || '0%';
});
</script>