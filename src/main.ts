import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/stores/auth";
import AOS from "aos";
import "aos/dist/aos.css";

// Create Vue app
const app = createApp(App);

// Create Pinia store
const pinia = createPinia();

// Use plugins
app.use(pinia);
app.use(router);

// Initialize authentication before mounting
const authStore = useAuthStore();
authStore
  .initAuth()
  .then(() => {
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
    console.error("Failed to initialize authentication:", error);
    // Mount app anyway
    app.mount("#app");

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
