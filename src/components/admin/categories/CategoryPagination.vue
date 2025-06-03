<template>
  <div
    v-if="pagination.total > 0"
    class="flex items-center justify-between px-4 py-3 bg-white dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-gray-700"
  >
    <!-- Results Info -->
    <div
      class="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary"
    >
      <span>
        Hiển thị {{ pagination.from }} đến {{ pagination.to }} trong tổng số
        {{ pagination.total }} kết quả
      </span>
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <!-- Previous Button -->
      <button
        @click="goToPage(pagination.current_page - 1)"
        :disabled="!pagination.prev_page_url"
        class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Trước
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center space-x-1">
        <template v-for="link in visibleLinks" :key="link.label">
          <button
            v-if="link.url && !isNaN(Number(link.label))"
            @click="goToPage(Number(link.label))"
            :class="[
              'px-3 py-1 text-sm border rounded transition-colors',
              link.active
                ? 'bg-gradient-sport text-white border-light-accent-sport shadow-sm'
                : 'border-gray-300 dark:border-gray-600 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary hover:border-light-accent-sport dark:hover:border-dark-accent-sport',
            ]"
          >
            {{ link.label }}
          </button>
          <span
            v-else-if="link.label === '...'"
            class="px-2 py-1 text-sm text-light-text-secondary dark:text-dark-text-secondary"
          >
            ...
          </span>
        </template>
      </div>

      <!-- Next Button -->
      <button
        @click="goToPage(pagination.current_page + 1)"
        :disabled="!pagination.next_page_url"
        class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Sau
      </button>
    </div>

    <!-- Per Page Selector -->
    <div class="flex items-center space-x-2 text-sm">
      <label class="text-light-text-secondary dark:text-dark-text-secondary">
        Hiển thị:
      </label>
      <select
        :value="pagination.per_page"
        @change="changePerPage($event)"
        class="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport transition-colors"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="text-light-text-secondary dark:text-dark-text-secondary">
        mục/trang
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CategoryListResponse } from "../../../types/admin/category";

interface Props {
  pagination: CategoryListResponse["data"];
}

interface Emits {
  pageChange: [page: number];
  perPageChange: [perPage: number];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Calculate visible page links (show max 7 pages)
const visibleLinks = computed(() => {
  const links = props.pagination.links;
  const currentPage = props.pagination.current_page;
  const lastPage = props.pagination.last_page;

  // If total pages <= 7, show all
  if (lastPage <= 7) {
    return links;
  }

  // Otherwise, show smart pagination
  const visiblePages: typeof links = [];

  // Always show first page
  if (currentPage > 3) {
    visiblePages.push({ url: "1", label: "1", active: false });
    if (currentPage > 4) {
      visiblePages.push({ url: null, label: "...", active: false });
    }
  }

  // Show pages around current page
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(lastPage, currentPage + 2);

  for (let i = start; i <= end; i++) {
    visiblePages.push({
      url: i.toString(),
      label: i.toString(),
      active: i === currentPage,
    });
  }

  // Always show last page
  if (currentPage < lastPage - 2) {
    if (currentPage < lastPage - 3) {
      visiblePages.push({ url: null, label: "...", active: false });
    }
    visiblePages.push({
      url: lastPage.toString(),
      label: lastPage.toString(),
      active: false,
    });
  }

  return visiblePages;
});

const goToPage = (page: number) => {
  if (
    page >= 1 &&
    page <= props.pagination.last_page &&
    page !== props.pagination.current_page
  ) {
    emit("pageChange", page);
  }
};

const changePerPage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const perPage = parseInt(target.value);
  emit("perPageChange", perPage);
};
</script>
