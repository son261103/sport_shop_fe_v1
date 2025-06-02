import { ref } from "vue";

// Global loading state
const isLoading = ref(false);
const loadingText = ref("");

export const useLoading = () => {
  const showLoading = (text: string = "Đang tải...") => {
    loadingText.value = text;
    isLoading.value = true;
  };

  const hideLoading = () => {
    isLoading.value = false;
    loadingText.value = "";
  };

  return {
    isLoading,
    loadingText,
    showLoading,
    hideLoading,
  };
};
