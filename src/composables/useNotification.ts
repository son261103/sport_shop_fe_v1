import { useNotification as useNaiveNotification } from "naive-ui";

export const useNotification = () => {
  const notification = useNaiveNotification();

  const showSuccess = (message: string, title?: string) => {
    notification.success({
      title: title || "Thành công",
      content: message,
      duration: 3000,
    });
  };

  const showError = (message: string, title?: string) => {
    notification.error({
      title: title || "Lỗi",
      content: message,
      duration: 5000,
    });
  };

  const showWarning = (message: string, title?: string) => {
    notification.warning({
      title: title || "Cảnh báo",
      content: message,
      duration: 4000,
    });
  };

  const showInfo = (message: string, title?: string) => {
    notification.info({
      title: title || "Thông tin",
      content: message,
      duration: 3000,
    });
  };

  const showValidationErrors = (errors: Record<string, string[]>) => {
    Object.entries(errors).forEach(([field, messages]) => {
      messages.forEach((message) => {
        showError(message, `Lỗi validation - ${field}`);
      });
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showValidationErrors,
  };
};
