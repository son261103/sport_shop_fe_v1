<template>
  <div class="p-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loading size="lg" color="sport" text="Đang tải quản lý khách hàng..." />
    </div>

    <!-- Page Content -->
    <div
      v-else
      class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm p-6"
    >
      <h1
        class="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4"
      >
        Quản lý khách hàng
      </h1>
      <p class="text-light-text-secondary dark:text-dark-text-secondary">
        Trang quản lý khách hàng. Nội dung sẽ được triển khai sớm.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Loading } from "@/components/ui";

// Loading state
const isLoading = ref(true);

// Load page data
const loadPageData = async () => {
  try {
    isLoading.value = true;
    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // TODO: Load customers data when implemented
  } catch (error) {
    console.error("Error loading customers data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Load data when component mounts
onMounted(() => {
  loadPageData();
});
</script>
