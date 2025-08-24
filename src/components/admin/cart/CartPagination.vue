<template>
  <div class="cart-pagination">
    <!-- Per Page Selector -->
    <div class="cart-pagination__per-page">
      <label class="per-page-label">Hiển thị:</label>
      <select
        :value="perPage"
        @change="handlePerPageChange"
        class="per-page-select"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="per-page-text">mục mỗi trang</span>
    </div>

    <!-- Pagination Info -->
    <div class="cart-pagination__info">
      <span class="pagination-text">
        Hiển thị {{ fromItem }} - {{ toItem }} trong tổng số {{ total }} giỏ hàng
      </span>
    </div>

    <!-- Pagination Controls -->
    <div class="cart-pagination__controls">
      <!-- First Page -->
      <button
        :disabled="currentPage === 1"
        @click="handlePageChange(1)"
        class="pagination-btn pagination-btn--first"
        title="Trang đầu"
      >
        <Icon name="chevrons-left" />
      </button>

      <!-- Previous Page -->
      <button
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
        class="pagination-btn pagination-btn--prev"
        title="Trang trước"
      >
        <Icon name="chevron-left" />
      </button>

      <!-- Page Numbers -->
      <div class="pagination-pages">
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="[
            'pagination-btn',
            'pagination-btn--page',
            { 'pagination-btn--active': page === currentPage }
          ]"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Page -->
      <button
        :disabled="currentPage === lastPage"
        @click="handlePageChange(currentPage + 1)"
        class="pagination-btn pagination-btn--next"
        title="Trang sau"
      >
        <Icon name="chevron-right" />
      </button>

      <!-- Last Page -->
      <button
        :disabled="currentPage === lastPage"
        @click="handlePageChange(lastPage)"
        class="pagination-btn pagination-btn--last"
        title="Trang cuối"
      >
        <Icon name="chevrons-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'

// Props
interface Props {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}

const props = defineProps<Props>()

// Emits
interface Emits {
  pageChange: [page: number]
  perPageChange: [perPage: number]
}

const emit = defineEmits<Emits>()

// Computed
const fromItem = computed(() => {
  if (props.total === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const toItem = computed(() => {
  const to = props.currentPage * props.perPage
  return Math.min(to, props.total)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)
  
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.lastPage, start + maxVisible - 1)
  
  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('pageChange', page)
  }
}

const handlePerPageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newPerPage = parseInt(target.value)
  emit('perPageChange', newPerPage)
}
</script>

<style scoped>
.cart-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  flex-wrap: wrap;
}

.cart-pagination__per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.per-page-label {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.per-page-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background: var(--color-background);
  color: var(--color-text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.per-page-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}

.per-page-text {
  color: var(--color-text-secondary);
}

.cart-pagination__info {
  flex: 1;
  text-align: center;
}

.pagination-text {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.cart-pagination__controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0 0.5rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background: var(--color-background);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border-color: var(--color-text-secondary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn--active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pagination-btn--active:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pagination-btn--first,
.pagination-btn--last,
.pagination-btn--prev,
.pagination-btn--next {
  min-width: 2.5rem;
}

.pagination-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-pagination {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .cart-pagination__per-page,
  .cart-pagination__info {
    text-align: center;
  }
  
  .cart-pagination__controls {
    justify-content: center;
  }
  
  .pagination-pages {
    margin: 0 0.25rem;
  }
  
  .pagination-btn {
    min-width: 2rem;
    height: 2rem;
    font-size: 0.8125rem;
  }
}

@media (max-width: 480px) {
  .pagination-pages {
    max-width: 200px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .pagination-pages::-webkit-scrollbar {
    display: none;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .cart-pagination {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-border: #334155;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #cbd5e1;
    --color-primary: #3b82f6;
    --color-primary-alpha: rgba(59, 130, 246, 0.1);
  }
}
</style>