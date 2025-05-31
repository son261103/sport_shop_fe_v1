<template>
  <div class="product-grid-container">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-6">
        <h2 :class="titleClasses">{{ title }}</h2>
        <p v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</p>

        <!-- Filter Dropdown -->
        <n-dropdown
            :options="filterDropdownOptions"
            @select="handleFilterSelect"
            trigger="click"
            placement="bottom-end"
        >
          <Button variant="outline" size="sm">
            <n-icon class="w-4 h-4 mr-2">
              <FunnelOutline/>
            </n-icon>
          </Button>
        </n-dropdown>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" :class="gridClasses">
      <div v-for="i in 8" :key="i" class="animate-pulse">
        <div class="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl h-72 shadow-sm"></div>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else :class="gridClasses">
      <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @click="handleProductClick"
          @add-to-cart="handleAddToCart"
          @toggle-favorite="handleToggleFavorite"
      />
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !filteredProducts.length" class="text-center py-16">
      <div class="max-w-md mx-auto">
        <n-icon class="w-20 h-20 mx-auto mb-6 text-light-text-muted dark:text-dark-text-muted">
          <SearchOutline/>
        </n-icon>
        <h3 :class="emptyTitleClasses">Không tìm thấy sản phẩm</h3>
        <p :class="emptyTextClasses">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
        <Button variant="primary" class="mt-6" @click="clearFilters">
          <n-icon class="w-4 h-4 mr-2">
            <RefreshOutline/>
          </n-icon>
          Xóa bộ lọc
        </Button>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && filteredProducts.length" class="flex justify-center mt-12">
      <n-pagination
          v-model:page="currentPage"
          :page-count="totalPages"
          :page-size="pageSize"
          prev-text="‹"
          next-text="›"
          size-picker-option-label=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch, h} from 'vue'
import {NIcon, NDropdown, NPagination} from 'naive-ui'
import {SearchOutline, RefreshOutline, FunnelOutline} from '@vicons/ionicons5'
import {Button} from '@/components/ui'
import ProductCard from './ProductCard.vue'
import {useThemeClasses} from '@/composables/useTheme'
import type { Product } from './index'

interface Props {
  products: Product[]
  title?: string
  subtitle?: string
  loading?: boolean
  showFilters?: boolean
  pagination?: boolean
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Sản phẩm',
  loading: false,
  showFilters: true,
  pagination: true,
  pageSize: 12
})

const emit = defineEmits<{
  productClick: [product: Product]
  addToCart: [product: Product]
  toggleFavorite: [product: Product]
}>()

const {getTextClass} = useThemeClasses()

// State
const sortBy = ref('name')
const currentPage = ref(1)

const filters = ref({
  category: null as string | null
})

// Computed
const titleClasses = computed(() => [
  getTextClass('primary'),
  'text-3xl font-bold'
].join(' '))

const subtitleClasses = computed(() => [
  getTextClass('secondary'),
  'text-base mt-2'
].join(' '))


const emptyTitleClasses = computed(() => [
  getTextClass('primary'),
  'text-2xl font-semibold mb-3'
].join(' '))

const emptyTextClasses = computed(() => [
  getTextClass('muted'),
  'text-base'
].join(' '))

const gridClasses = computed(() => {
  const cols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return `grid ${cols[4]} gap-6`
})

const sortOptions = [
  {label: 'Tên A-Z', value: 'name'},
  {label: 'Tên Z-A', value: 'name-desc'},
  {label: 'Giá thấp → cao', value: 'price'},
  {label: 'Giá cao → thấp', value: 'price-desc'},
  {label: 'Đánh giá cao', value: 'rating'},
  {label: 'Mới nhất', value: 'newest'}
]

const categoryOptions = computed(() => {
  const categories = [...new Set(props.products.map(p => p.category))]
  return categories.map(cat => ({label: cat, value: cat}))
})

const filterDropdownOptions = computed(() => {
  const options = []

  // Category options
  if (categoryOptions.value.length > 0) {
    options.push({
      type: 'group',
      label: 'Danh mục',
      key: 'category-group',
      children: [
        {
          label: 'Tất cả danh mục',
          key: 'category-all'
        },
        ...categoryOptions.value.map(cat => ({
          label: cat.label,
          key: `category-${cat.value}`
        }))
      ]
    })
  }

  // Sort options
  options.push({
    type: 'group',
    label: 'Sắp xếp',
    key: 'sort-group',
    children: sortOptions.map(option => ({
      label: option.label,
      key: `sort-${option.value}`
    }))
  })

  // Clear option
  options.push({
    type: 'divider',
    key: 'divider'
  })
  options.push({
    label: 'Xóa bộ lọc',
    key: 'clear-filters',
    icon: () => h(NIcon, null, {default: () => h(RefreshOutline)})
  })

  return options
})

const filteredProducts = computed(() => {
  let filtered = [...props.products]

  // Apply filters
  if (filters.value.category) {
    filtered = filtered.filter(p => p.category === filters.value.category)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'price':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / props.pageSize)
)

const paginatedProducts = computed(() => {
  if (!props.pagination) return filteredProducts.value

  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  return filteredProducts.value.slice(start, end)
})

// Methods

const clearFilters = () => {
  filters.value = {
    category: null
  }
  sortBy.value = 'name'
}

const handleFilterSelect = (key: string) => {
  if (key === 'clear-filters') {
    clearFilters()
  } else if (key === 'category-all') {
    filters.value.category = null
  } else if (key.startsWith('category-')) {
    filters.value.category = key.replace('category-', '')
  } else if (key.startsWith('sort-')) {
    sortBy.value = key.replace('sort-', '')
  }
}

const handleProductClick = (product: Product) => {
  emit('productClick', product)
}

const handleAddToCart = (product: Product) => {
  emit('addToCart', product)
}

const handleToggleFavorite = (product: Product) => {
  emit('toggleFavorite', product)
}

// Watch for filter changes to reset pagination
watch(filters, () => {
  currentPage.value = 1
}, {deep: true})
</script>
