<template>
  <div class="flex h-screen flex-col bg-light-bg-primary dark:bg-dark-bg-primary">
    <!-- Header -->
    <header class="flex-shrink-0">
      <div class="flex items-center justify-between border-b border-light-border-secondary bg-light-bg-secondary p-4 dark:border-dark-border-secondary dark:bg-dark-bg-secondary">
        <div class="flex items-center space-x-3">
          <div class="rounded-full bg-gradient-sport p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.75 12.002c0 5.01-3.978 9.07-8.89 9.07-1.833 0-3.53-.563-4.995-1.545l-4.15 1.472 1.47-4.152c-.98-1.467-1.543-3.164-1.543-4.995C3.642 6.93 7.62 2.86 12.53 2.86c4.912 0 8.89 4.07 8.89 9.072h.33zM7.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
          </div>
          <h1 class="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Sport Shop AI</h1>
        </div>
        <button @click="goHome" class="text-light-text-secondary transition-colors hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-7-4h4m-4 4h4" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content: Messages + Input -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-6">
        <div class="mx-auto max-w-2xl">
          <!-- Welcome Message -->
          <div v-if="messages.length === 0" class="flex h-full flex-col items-center justify-end pb-16 text-center">
            <div class="rounded-full bg-gradient-sport p-4 text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M21.75 12.002c0 5.01-3.978 9.07-8.89 9.07-1.833 0-3.53-.563-4.995-1.545l-4.15 1.472 1.47-4.152c-.98-1.467-1.543-3.164-1.543-4.995C3.642 6.93 7.62 2.86 12.53 2.86c4.912 0 8.89 4.07 8.89 9.072h.33zM7.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
            </div>
            <h2 class="mt-6 text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Xin chào! Tôi có thể giúp gì cho bạn?
            </h2>
            <p class="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
              Hãy hỏi tôi về sản phẩm, khuyến mãi, hoặc bất cứ điều gì khác.
            </p>
          </div>

          <!-- Message List -->
          <div v-else class="space-y-4">
            <div v-for="(message, index) in messages" :key="index" :class="['flex', 'max-w-lg', 'gap-3', message.isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row']">
              <div :class="['rounded-2xl', 'p-3', 'shadow-md', message.isUser ? 'rounded-br-none bg-gradient-sport text-white' : 'rounded-bl-none bg-light-bg-secondary text-light-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary']">
                <p class="text-sm" v-html="message.text"></p>
                <!-- Product Cards -->
                <div v-if="message.products && message.products.length" class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <ProductCard
                    v-for="product in message.products"
                    :key="product.id"
                    :product="product"
                  />
                </div>
              </div>
            </div>
            <div v-if="isLoading" class="flex max-w-lg gap-3 mr-auto flex-row">
              <div class="rounded-2xl rounded-bl-none bg-light-bg-secondary p-3 shadow-md dark:bg-dark-bg-secondary">
                <div class="flex items-center space-x-2">
                  <span class="h-2 w-2 animate-pulse rounded-full bg-light-text-muted dark:bg-dark-text-muted"></span>
                  <span class="h-2 w-2 animate-pulse rounded-full bg-light-text-muted delay-150 dark:bg-dark-text-muted"></span>
                  <span class="h-2 w-2 animate-pulse rounded-full bg-light-text-muted delay-300 dark:bg-dark-text-muted"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="flex-shrink-0 p-4 md:pb-8 md:pt-2">
        <div class="relative mx-auto max-w-2xl">
          <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Hỏi về sản phẩm hoặc dịch vụ..."
            class="w-full rounded-full border-light-border-primary bg-light-bg-secondary py-3 pl-5 pr-14 text-light-text-primary shadow-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder-dark-text-muted"
          />
          <button @click="sendMessage" :disabled="isLoading || newMessage.trim() === ''" class="absolute inset-y-0 right-0 flex w-14 items-center justify-center rounded-full text-light-text-muted transition-colors hover:text-primary-500 disabled:text-light-border-primary dark:disabled:text-dark-border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { sendMessage as sendChatMessage } from '@/services/chatService';
import ProductCard from '@/components/chat/ProductCard.vue';

interface Product {
  id: number;
  name: string;
  formatted_price: string;
  image_url: string;
}

interface Message {
  text: string;
  isUser: boolean;
  products?: Product[];
}

const router = useRouter();
const newMessage = ref('');
const messages = ref<Message[]>([]);
const isLoading = ref(false);

const goHome = () => {
  router.push('/');
};

const sendMessage = async () => {
  const messageText = newMessage.value.trim();
  if (messageText === '' || isLoading.value) return;

  messages.value.push({ text: messageText, isUser: true });
  newMessage.value = '';
  isLoading.value = true;

  try {
    const response = await sendChatMessage(messageText);
    messages.value.push({
      text: response.message,
      isUser: false,
      products: response.products
    });
  } catch (error) {
    messages.value.push({ text: 'Sorry, something went wrong. Please try again.', isUser: false });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Add any additional scoped styles here */
</style>
