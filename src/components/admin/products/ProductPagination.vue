<template>
  <div
    v-if="pagination && pagination.total > 0"
    class="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm p-4 mt-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Results Info -->
      <div
        class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
      >
        Hiển thị {{ pagination.from }} - {{ pagination.to }} trong tổng số
        {{ pagination.total }} sản phẩm
      </div>

      <!-- Pagination Controls -->
      <div class="flex items-center space-x-2">
        <!-- Per Page Selector -->
        <div class="flex items-center space-x-2">
          <span
            class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >Hiển thị:</span
          >
          <select
            :value="pagination.per_page || 10"
            @change="handlePerPageChange"
            class="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <!-- Page Navigation -->
        <div class="flex items-center space-x-1">
          <!-- Previous Button -->
          <button
            @click="goToPage(pagination.current_page - 1)"
            :disabled="pagination.current_page <= 1"
            class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Trang trước"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <!-- Page Numbers -->
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="goToPage(page as number)"
              :class="[
                'px-3 py-2 text-sm rounded-md transition-colors',
                page === pagination.current_page
                  ? 'bg-gradient-sport text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          </template>

          <!-- Next Button -->
          <button
            @click="goToPage(pagination.current_page + 1)"
            :disabled="pagination.current_page >= pagination.last_page"
            class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Trang sau"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ProductPaginationData } from "@/types/admin/product";

// Props
interface Props {
  pagination: ProductPaginationData;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  "page-change": [page: number];
  "per-page-change": [perPage: number];
}>();

// Computed
const visiblePages = computed(() => {
  const current = props.pagination.current_page;
  const last = props.pagination.last_page;
  const pages: (number | string)[] = [];

  if (last <= 7) {
    // Show all pages if total pages <= 7
    for (let i = 1; i <= last; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (current <= 4) {
      // Show pages 2-5 and ellipsis
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
    } else if (current >= last - 3) {
      // Show ellipsis and last 4 pages
      pages.push("...");
      for (let i = last - 3; i <= last - 1; i++) {
        pages.push(i);
      }
    } else {
      // Show ellipsis, current page area, and ellipsis
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
    }

    // Always show last page
    if (last > 1) {
      pages.push(last);
    }
  }

  return pages;
});

// Methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.pagination.last_page) {
    emit("page-change", page);
  }
};

const handlePerPageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const perPage = parseInt(target.value);
  emit("per-page-change", perPage);
};
</script>
