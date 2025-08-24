import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/stores/auth";
import AOS from "aos";
import "aos/dist/aos.css";
// import { createDiscreteApi } from 'naive-ui' // Commented out as it's not currently used;
import { validateEnv, debugEnv } from '@/constants/env';

// Validate environment variables
validateEnv()
debugEnv()

// Create Vue app
const app = createApp(App);

// Create Pinia store
const pinia = createPinia();

// Use plugins
app.use(pinia);
app.use(router);

// Initialize authentication before mounting
const authStore = useAuthStore();

// Initialize auth state (only once!)
authStore
  .initAuth()
  .then(() => {
    console.log('🔐 Auth initialization completed');
    // Mount app after auth initialization
    app.mount("#app");

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  })
  .catch((error: any) => {
    console.error("🔐 Failed to initialize authentication:", error);
    // Mount app anyway to prevent blocking
    app.mount("#app");

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

// Auto refresh token every 30 minutes
setInterval(async () => {
  if (authStore.isAuthenticated) {
    try {
      await authStore.refreshUser();
    } catch (error) {
      console.error('Auto token refresh failed:', error);
    }
  }
}, 30 * 60 * 1000); // 30 minutes

// Refresh token when page becomes visible again
document.addEventListener('visibilitychange', async () => {
  if (!document.hidden && authStore.isAuthenticated) {
    try {
      await authStore.refreshUser();
    } catch (error) {
      console.error('Visibility token refresh failed:', error);
    }
  }
});
