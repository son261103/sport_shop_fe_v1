<template>
  <div class="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary flex flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <FloatingChatButton v-if="showChatButton" />
      <!-- Breadcrumb -->
      <AppBreadcrumb :current-path="currentPath" />
      
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import FloatingChatButton from '@/components/common/FloatingChatButton.vue';
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
import { AppHeader, AppFooter, AppBreadcrumb } from "@/components/user/common";

interface Props {
  currentPath?: string;
  showBreadcrumb?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  currentPath: "/",
  showBreadcrumb: true,
});

// In a real app, this would come from Vue Router
const currentPath = ref(props.currentPath);

const route = useRoute();
const showChatButton = computed(() => route.name !== 'Chat');
</script>
