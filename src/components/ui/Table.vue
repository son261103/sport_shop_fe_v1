<template>
  <div class="table-container">
    <!-- Table Header Actions -->
    <div v-if="$slots.actions" class="table-actions">
      <slot name="actions" />
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table :class="tableClasses">
        <!-- Table Head -->
        <thead :class="headClasses">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="getHeaderClasses(column)"
              @click="handleSort(column)"
            >
              <div class="flex items-center space-x-2">
                <span>{{ column.title }}</span>
                <div v-if="column.sortable" class="sort-icons">
                  <n-icon
                    :class="getSortIconClass(column, 'asc')"
                    class="w-3 h-3"
                  >
                    <ChevronUpOutline />
                  </n-icon>
                  <n-icon
                    :class="getSortIconClass(column, 'desc')"
                    class="w-3 h-3"
                  >
                    <ChevronDownOutline />
                  </n-icon>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody :class="bodyClasses">
          <tr
            v-for="(row, index) in sortedData"
            :key="getRowKey(row, index)"
            :class="getRowClasses(row, index)"
            @click="handleRowClick(row, index)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="getCellClasses(column)"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :column="column"
                :index="index"
                :value="getColumnValue(row, column.key)"
              >
                {{ getColumnValue(row, column.key) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="!data.length" :class="emptyClasses">
        <slot name="empty">
          <div class="text-center py-12">
            <n-icon class="w-12 h-12 mx-auto mb-4 text-light-text-muted dark:text-dark-text-muted">
              <DocumentOutline />
            </n-icon>
            <p class="text-light-text-muted dark:text-dark-text-muted">
              {{ emptyText }}
            </p>
          </div>
        </slot>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination" class="table-pagination">
      <slot name="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { ChevronUpOutline, ChevronDownOutline, DocumentOutline } from '@vicons/ionicons5'
import { useThemeClasses } from '@/composables/useTheme'

interface Column {
  key: string
  title: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
}

interface Props {
  columns: Column[]
  data: any[]
  loading?: boolean
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  emptyText?: string
  rowKey?: string | ((row: any) => string)
  pagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  striped: false,
  bordered: false,
  hoverable: true,
  size: 'md',
  emptyText: 'No data available',
  rowKey: 'id',
  pagination: false
})

const emit = defineEmits<{
  rowClick: [row: any, index: number]
  sort: [column: Column, direction: 'asc' | 'desc' | null]
}>()

const { getBgClass, getTextClass, getBorderClass } = useThemeClasses()

const sortColumn = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc' | null>(null)

const tableClasses = computed(() => {
  const baseClasses = [
    'w-full table-auto'
  ]

  if (props.bordered) {
    baseClasses.push(`border ${getBorderClass('primary')}`)
  }

  return baseClasses.join(' ')
})

const headClasses = computed(() => [
  getBgClass('secondary'),
  getTextClass('primary')
].join(' '))

const bodyClasses = computed(() => [
  getBgClass('primary')
].join(' '))

const emptyClasses = computed(() => [
  getBgClass('primary'),
  getTextClass('muted')
].join(' '))

const sortedData = computed(() => {
  if (!sortColumn.value || !sortDirection.value) {
    return props.data
  }

  return [...props.data].sort((a, b) => {
    const aVal = getColumnValue(a, sortColumn.value!)
    const bVal = getColumnValue(b, sortColumn.value!)

    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})

const getHeaderClasses = (column: Column) => {
  const baseClasses = [
    'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
  ]

  if (column.sortable) {
    baseClasses.push('cursor-pointer hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary')
  }

  if (column.align) {
    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
    baseClasses.push(alignClasses[column.align])
  }

  return baseClasses.join(' ')
}

const getCellClasses = (column: Column) => {
  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6'
  }

  const baseClasses = [
    sizeClasses[props.size],
    'whitespace-nowrap',
    getTextClass('primary')
  ]

  if (column.align) {
    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
    baseClasses.push(alignClasses[column.align])
  }

  return baseClasses.join(' ')
}

const getRowClasses = (_row: any, index: number) => {
  const baseClasses = []

  if (props.striped && index % 2 === 1) {
    baseClasses.push('bg-light-bg-secondary dark:bg-dark-bg-secondary')
  }

  if (props.hoverable) {
    baseClasses.push('hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary cursor-pointer')
  }

  if (props.bordered) {
    baseClasses.push(`border-b ${getBorderClass('secondary')}`)
  }

  return baseClasses.join(' ')
}

const getSortIconClass = (column: Column, direction: 'asc' | 'desc') => {
  const baseClass = 'transition-colors duration-200'
  
  if (sortColumn.value === column.key && sortDirection.value === direction) {
    return `${baseClass} text-light-accent-sport dark:text-dark-accent-sport`
  }
  
  return `${baseClass} text-light-text-muted dark:text-dark-text-muted`
}

const getColumnValue = (row: any, key: string) => {
  return key.split('.').reduce((obj, k) => obj?.[k], row)
}

const getRowKey = (row: any, index: number) => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row)
  }
  return row[props.rowKey] || index
}

const handleSort = (column: Column) => {
  if (!column.sortable) return

  if (sortColumn.value === column.key) {
    if (sortDirection.value === 'asc') {
      sortDirection.value = 'desc'
    } else if (sortDirection.value === 'desc') {
      sortDirection.value = null
      sortColumn.value = null
    } else {
      sortDirection.value = 'asc'
    }
  } else {
    sortColumn.value = column.key
    sortDirection.value = 'asc'
  }

  emit('sort', column, sortDirection.value)
}

const handleRowClick = (row: any, index: number) => {
  emit('rowClick', row, index)
}
</script>

<style scoped>
.table-container {
  @apply bg-light-bg-primary dark:bg-dark-bg-primary rounded-lg overflow-hidden;
}

.table-actions {
  @apply p-4 border-b border-light-border-secondary dark:border-dark-border-secondary;
}

.table-wrapper {
  @apply overflow-x-auto;
}

.table-pagination {
  @apply p-4 border-t border-light-border-secondary dark:border-dark-border-secondary;
}

.sort-icons {
  @apply flex flex-col -space-y-1;
}
</style>
