import { ref, onUnmounted, readonly } from 'vue';
import { SepayService } from '@/services/sepayService';
import type { PaymentStatusCheckResponse } from '@/types/payment';

export interface PaymentPollingOptions {
  intervalMs?: number;
  timeoutMs?: number;
  onSuccess?: (response: PaymentStatusCheckResponse) => void;
  onTimeout?: () => void;
  onError?: (error: Error) => void;
}

export function usePaymentPolling() {
  const isPolling = ref(false);
  const isPaid = ref(false);
  const isTimeout = ref(false);
  const error = ref<string | null>(null);

  let intervalId: number | undefined;

  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
      isPolling.value = false;
      console.log('🛑 Polling stopped.');
    }
  };

  const startPolling = (orderId: string, options: PaymentPollingOptions = {}) => {
    if (isPolling.value) return;

    isPolling.value = true;
    isPaid.value = false;
    isTimeout.value = false;
    error.value = null;

    const { intervalMs = 5000, timeoutMs = 600000, onSuccess, onTimeout, onError } = options;
    const startTime = Date.now();

    const checkStatus = async () => {
      if (Date.now() - startTime > timeoutMs) {
        stopPolling();
        isTimeout.value = true;
        if (onTimeout) onTimeout();
        return;
      }

      try {
        const status = await SepayService.checkPaymentStatus(orderId);
        if (status.paid) {
          stopPolling();
          isPaid.value = true;
          if (onSuccess) onSuccess(status);
        }
      } catch (err: any) {
        stopPolling();
        error.value = err.message || 'Polling error';
        if (onError) onError(err);
      }
    };

    checkStatus();
    intervalId = setInterval(checkStatus, intervalMs) as unknown as number;
  };

  onUnmounted(stopPolling);

  return {
    isPolling: readonly(isPolling),
    isPaid: readonly(isPaid),
    isTimeout: readonly(isTimeout),
    error: readonly(error),
    startPolling,
    stopPolling,
  };
}
