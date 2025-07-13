<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { NNotificationProvider, NMessageProvider, NDialogProvider } from 'naive-ui';
import { ThemeProvider } from "./providers";
import { useThemeStore } from "./stores/theme";
import { useLoading } from "./composables/useLoading";
import Loading from "./components/ui/Loading.vue";
import CartInitializer from "./components/common/CartInitializer.vue";

const themeStore = useThemeStore();
const router = useRouter();
const { isLoading, loadingText, showLoading, hideLoading } = useLoading();

// Setup router loading
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    showLoading("Đang chuyển trang...");
  }
  next();
});

router.afterEach(() => {
  // Hide loading after a short delay to ensure smooth transition
  setTimeout(() => {
    hideLoading();
  }, 300);
});

// Initialize theme immediately when component is created
themeStore.initTheme();

onMounted(() => {
  themeStore.setupSystemThemeListener();
});
</script>

<template>
  <ThemeProvider>
    <NNotificationProvider>
      <NMessageProvider>
        <NDialogProvider>
          <!-- Cart Initializer -->
          <CartInitializer />
          
          <!-- Global Loading Overlay -->
          <Loading
            v-if="isLoading"
            :text="loadingText"
            size="lg"
            color="sport"
            :fullscreen="true"
          />

          <!-- Main App Content -->
          <router-view />
        </NDialogProvider>
      </NMessageProvider>
    </NNotificationProvider>
  </ThemeProvider>
</template>
