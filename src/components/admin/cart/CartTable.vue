<template>
  <div class="cart-table">
    <!-- Loading State -->
    <div v-if="loading" class="cart-table__loading">
      <div class="loading-spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!carts.length" class="cart-table__empty">
      <div class="empty-icon">
        <Icon name="shopping-cart" />
      </div>
      <h3>Không có giỏ hàng nào</h3>
      <p>Chưa có giỏ hàng nào được tạo trong hệ thống.</p>
    </div>

    <!-- Table -->
    <div v-else class="cart-table__wrapper">
      <table class="cart-table__table">
        <thead>
          <tr>
            <th class="cart-table__th cart-table__th--checkbox">
              <input
                type="checkbox"
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="handleSelectAll"
                class="cart-table__checkbox"
              />
            </th>
            <th class="cart-table__th">ID</th>
            <th class="cart-table__th">Khách hàng</th>
            <th class="cart-table__th">Số sản phẩm</th>
            <th class="cart-table__th">Tổng tiền</th>
            <th class="cart-table__th">Ngày tạo</th>
            <th class="cart-table__th">Ngày cập nhật</th>
            <th class="cart-table__th cart-table__th--actions">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cart in carts"
            :key="cart.id"
            class="cart-table__row"
            :class="{ 'cart-table__row--selected': selectedCarts.includes(cart.id) }"
          >
            <td class="cart-table__td cart-table__td--checkbox">
              <input
                type="checkbox"
                :checked="selectedCarts.includes(cart.id)"
                @change="handleSelect(cart.id)"
                class="cart-table__checkbox"
              />
            </td>
            <td class="cart-table__td">
              <span class="cart-id">#{{ cart.id }}</span>
            </td>
            <td class="cart-table__td">
              <div class="customer-info">
                <div class="customer-name">{{ cart.user?.name || 'N/A' }}</div>
                <div class="customer-email">{{ cart.user?.email || 'N/A' }}</div>
              </div>
            </td>
            <td class="cart-table__td">
              <span class="item-count">{{ cart.total_items }}</span>
            </td>
            <td class="cart-table__td">
              <span class="total-amount">{{ formatCurrency(cart.total_amount) }}</span>
            </td>
            <td class="cart-table__td">
              <span class="date">{{ formatDate(cart.created_at) }}</span>
            </td>
            <td class="cart-table__td">
              <span class="date">{{ formatDate(cart.updated_at) }}</span>
            </td>
            <td class="cart-table__td cart-table__td--actions">
              <div class="action-buttons">
                <button
                  @click="handleViewDetail(cart)"
                  class="action-btn action-btn--view"
                  title="Xem chi tiết"
                >
                  <Icon name="eye" />
                </button>
                <button
                  @click="handleDelete(cart)"
                  class="action-btn action-btn--delete"
                  title="Xóa giỏ hàng"
                >
                  <Icon name="trash-2" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import type { Cart } from '@/types/admin/cart'

// Props
interface Props {
  carts: Cart[]
  loading: boolean
  selectedCarts: number[]
}

const props = defineProps<Props>()

// Emits
interface Emits {
  select: [cartId: number]
  selectAll: [selected: boolean]
  viewDetail: [cart: Cart]
  delete: [cart: Cart]
}

const emit = defineEmits<Emits>()

// Computed
const isAllSelected = computed(() => {
  return props.carts.length > 0 && props.selectedCarts.length === props.carts.length
})

const isIndeterminate = computed(() => {
  return props.selectedCarts.length > 0 && props.selectedCarts.length < props.carts.length
})

// Methods
const handleSelect = (cartId: number) => {
  emit('select', cartId)
}

const handleSelectAll = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('selectAll', target.checked)
}

const handleViewDetail = (cart: Cart) => {
  emit('viewDetail', cart)
}

const handleDelete = (cart: Cart) => {
  emit('delete', cart)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.cart-table {
  width: 100%;
}

.cart-table__loading,
.cart-table__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-border);
  border-top: 2px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cart-table__loading p {
  color: var(--color-text-secondary);
  margin: 0;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  background: var(--color-background);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.cart-table__empty h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.cart-table__empty p {
  color: var(--color-text-secondary);
  margin: 0;
}

.cart-table__wrapper {
  overflow-x: auto;
}

.cart-table__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.cart-table__th {
  background: var(--color-background);
  color: var(--color-text-secondary);
  font-weight: 600;
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.cart-table__th--checkbox {
  width: 3rem;
  text-align: center;
}

.cart-table__th--actions {
  width: 8rem;
  text-align: center;
}

.cart-table__td {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
  vertical-align: middle;
}

.cart-table__td--checkbox {
  text-align: center;
}

.cart-table__td--actions {
  text-align: center;
}

.cart-table__row {
  transition: background-color 0.2s ease;
}

.cart-table__row:hover {
  background: var(--color-background);
}

.cart-table__row--selected {
  background: var(--color-primary-alpha);
}

.cart-table__checkbox {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.cart-id {
  font-weight: 600;
  color: var(--color-primary);
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.customer-name {
  font-weight: 500;
  color: var(--color-text-primary);
}

.customer-email {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.item-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 1.5rem;
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0 0.5rem;
}

.total-amount {
  font-weight: 600;
  color: var(--color-success, #10b981);
}

.date {
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
}

.action-btn--view {
  color: var(--color-info, #3b82f6);
}

.action-btn--view:hover {
  background: var(--color-info-alpha, rgba(59, 130, 246, 0.1));
}

.action-btn--delete {
  color: var(--color-error, #ef4444);
}

.action-btn--delete:hover {
  background: var(--color-error-alpha, rgba(239, 68, 68, 0.1));
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-table__wrapper {
    overflow-x: scroll;
  }
  
  .cart-table__table {
    min-width: 800px;
  }
  
  .cart-table__th,
  .cart-table__td {
    padding: 0.75rem 0.5rem;
  }
  
  .customer-info {
    min-width: 150px;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .cart-table {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-border: #334155;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #cbd5e1;
    --color-primary: #3b82f6;
    --color-primary-alpha: rgba(59, 130, 246, 0.1);
    --color-success: #10b981;
    --color-info: #3b82f6;
    --color-info-alpha: rgba(59, 130, 246, 0.1);
    --color-error: #ef4444;
    --color-error-alpha: rgba(239, 68, 68, 0.1);
  }
}
</style>