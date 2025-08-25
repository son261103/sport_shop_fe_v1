<template>
  <div class="flex h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
    <ChatSidebar />
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-6">
        <div class="mx-auto max-w-6xl">
          <!-- Welcome Message -->
          <div v-if="messages.length === 0" class="flex h-full flex-col items-center justify-center text-center">
            <h1 class="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">Chào,</h1>
            <h2 class="text-3xl text-light-text-secondary dark:text-dark-text-secondary">Hôm nay tôi có thể giúp gì cho bạn?</h2>
            <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="cursor-pointer rounded-lg border border-light-border-secondary bg-light-bg-secondary p-4 text-left transition-colors hover:bg-light-bg-tertiary dark:border-dark-border-secondary dark:bg-dark-bg-secondary dark:hover:bg-dark-bg-tertiary">
                <h3 class="font-semibold">Viết một bài sonnet theo phong cách Shakespeare về điện thoại thông minh</h3>
              </div>
              <div class="cursor-pointer rounded-lg border border-light-border-secondary bg-light-bg-secondary p-4 text-left transition-colors hover:bg-light-bg-tertiary dark:border-dark-border-secondary dark:bg-dark-bg-secondary dark:hover:bg-dark-bg-tertiary">
                <h3 class="font-semibold">Gợi ý 10 trang phục Halloween sáng tạo cho trẻ em</h3>
              </div>
              <div class="cursor-pointer rounded-lg border border-light-border-secondary bg-light-bg-secondary p-4 text-left transition-colors hover:bg-light-bg-tertiary dark:border-dark-border-secondary dark:bg-dark-bg-secondary dark:hover:bg-dark-bg-tertiary">
                <h3 class="font-semibold">Phác thảo lộ trình cho người mới bắt đầu học về tài chính cá nhân</h3>
              </div>
              <div class="cursor-pointer rounded-lg border border-light-border-secondary bg-light-bg-secondary p-4 text-left transition-colors hover:bg-light-bg-tertiary dark:border-dark-border-secondary dark:bg-dark-bg-secondary dark:hover:bg-dark-bg-tertiary">
                <h3 class="font-semibold">Giải thích cho một đứa trẻ 10 tuổi tại sao bầu trời có màu xanh</h3>
              </div>
            </div>
          </div>

          <!-- Message List -->
          <div v-else class="space-y-6">
            <div v-for="(message, index) in messages" :key="index">
              <div v-if="message.isUser" class="flex flex-row-reverse items-start gap-3">
                <div class="rounded-2xl rounded-br-none bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white shadow-md">
                  <p class="text-sm" v-html="message.text"></p>
                </div>
              </div>
              <div v-else class="flex items-start gap-3">
                <div class="rounded-lg bg-light-bg-secondary p-2 dark:bg-dark-bg-secondary">
                  <svg class="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M21.75 12.002c0 5.01-3.978 9.07-8.89 9.07-1.833 0-3.53-.563-4.995-1.545l-4.15 1.472 1.47-4.152c-.98-1.467-1.543-3.164-1.543-4.995C3.642 6.93 7.62 2.86 12.53 2.86c4.912 0 8.89 4.07 8.89 9.072h.33zM7.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                </div>
                <div class="w-full">
                  <div class="font-semibold text-light-text-primary dark:text-dark-text-primary">Sider Fusion</div>
                  <div class="mt-1 text-sm text-light-text-primary dark:text-dark-text-primary">
                    <VueMarkdownIt v-if="!message.typing && message.text" :source="message.text" />
                  </div>
                  <div v-if="message.typing" class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                  </div>
                  <div v-if="message.products && message.products.length" class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <ProductCard v-for="product in message.products" :key="product.id" :product="product" />
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="flex-shrink-0 p-4 md:pb-8 md:pt-2">
        <div class="relative mx-auto max-w-4xl">
          <div class="flex items-center rounded-full border border-light-border-secondary bg-light-bg-secondary px-2 py-1 shadow-lg dark:border-dark-border-secondary dark:bg-dark-bg-secondary">
            <input
              type="text"
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Hỏi bất kỳ điều gì"
              class="flex-1 appearance-none bg-transparent px-4 py-2 text-light-text-primary focus:border-transparent focus:outline-none focus:ring-0 dark:text-dark-text-primary"
            />
            <button @click="sendMessage" :disabled="newMessage.trim() === ''" class="rounded-full bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600 disabled:opacity-50">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { sendMessage as sendChatMessage } from '@/services/chatService';
import ProductCard from '@/components/chat/ProductCard.vue';
import ChatSidebar from '@/components/chat/ChatSidebar.vue';
import { VueMarkdownIt } from '@f3ve/vue-markdown-it';

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
  typing?: boolean;
}

const router = useRouter();
const newMessage = ref('');
const messages = ref<Message[]>([]);

const goHome = () => {
  router.push('/');
};

const sendMessage = async () => {
  const messageText = newMessage.value.trim();
  if (messageText === '') return;

  messages.value.push({ text: messageText, isUser: true });
  newMessage.value = '';

  const typingMessage = {
    text: '',
    isUser: false,
    typing: true
  };
  messages.value.push(typingMessage);

  try {
    const response = await sendChatMessage(messageText);

    const messageIndex = messages.value.findIndex(msg => msg.typing);

    if (messageIndex !== -1) {
      const botMessage = messages.value[messageIndex];
      botMessage.typing = false;
      botMessage.products = response.products;

      await typeMessage(response.message, botMessage);
    }

  } catch (error) {
    const messageIndex = messages.value.findIndex(msg => msg.typing);
    if (messageIndex !== -1) {
      messages.value[messageIndex] = { text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.', isUser: false };
    } else {
      messages.value.push({ text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.', isUser: false });
    }
  }
};

const typeMessage = async (fullText: string, messageObj: Message) => {
  const words = fullText.split(' ');
  for (let i = 0; i < words.length; i++) {
    messageObj.text = words.slice(0, i + 1).join(' ');
    await new Promise(resolve => setTimeout(resolve, 50)); // Adjust speed as needed
  }
};

// Sample products to show on initial load
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    formatted_price: "2.500.000 VNĐ",
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    formatted_price: "3.200.000 VNĐ",
    image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Puma RS-X",
    formatted_price: "1.800.000 VNĐ",
    image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop"
  }
];

// Initialize with welcome message and sample products
onMounted(() => {
  setTimeout(() => {
    messages.value.push({
      text: `Chào bạn! Tôi là trợ lý AI của cửa hàng thể thao. Tôi có thể giúp bạn tìm kiếm và lựa chọn các sản phẩm thể thao phù hợp với nhu cầu của bạn.

Dưới đây là một số sản phẩm nổi bật hiện tại:`,
      isUser: false,
      products: sampleProducts
    });
  }, 1000);
});
</script>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #6b7280;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: 0s;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.dark .typing-dot {
  background-color: #9ca3af;
}

/* Markdown styling */
:deep(.vue-markdown-it) {
  line-height: 1.6;
}

:deep(.vue-markdown-it h1),
:deep(.vue-markdown-it h2),
:deep(.vue-markdown-it h3),
:deep(.vue-markdown-it h4),
:deep(.vue-markdown-it h5),
:deep(.vue-markdown-it h6) {
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: inherit;
}

:deep(.vue-markdown-it h1) { font-size: 1.875rem; }
:deep(.vue-markdown-it h2) { font-size: 1.5rem; }
:deep(.vue-markdown-it h3) { font-size: 1.25rem; }

:deep(.vue-markdown-it p) {
  margin-bottom: 1rem;
}

:deep(.vue-markdown-it ul),
:deep(.vue-markdown-it ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

:deep(.vue-markdown-it li) {
  margin-bottom: 0.25rem;
}

:deep(.vue-markdown-it strong) {
  font-weight: 600;
}

:deep(.vue-markdown-it em) {
  font-style: italic;
}

:deep(.vue-markdown-it code) {
  background-color: rgba(156, 163, 175, 0.1);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}

:deep(.vue-markdown-it pre) {
  background-color: rgba(156, 163, 175, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

:deep(.vue-markdown-it pre code) {
  background-color: transparent;
  padding: 0;
}

:deep(.vue-markdown-it blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.dark :deep(.vue-markdown-it blockquote) {
  border-left-color: #4b5563;
  color: #9ca3af;
}

.dark :deep(.vue-markdown-it code) {
  background-color: rgba(75, 85, 99, 0.3);
}

.dark :deep(.vue-markdown-it pre) {
  background-color: rgba(75, 85, 99, 0.3);
}

/* Smooth message animations */
.message-enter-active {
  transition: all 0.3s ease-out;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
