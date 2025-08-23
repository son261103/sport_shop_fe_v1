<template>
  <div class="p-8 bg-light-bg-primary dark:bg-dark-bg-primary min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">
        Component Showcase
      </h1>
      <p class="text-lg text-light-text-secondary dark:text-dark-text-secondary mt-2">
        Complete collection of UI components and examples for the Sport Shop project
      </p>
    </div>

    <!-- UI Components Section -->
    <ComponentSection title="🎨 UI Components" description="Basic reusable UI components">
      <!-- Buttons -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Buttons</h3>
        <div class="space-y-4">
          <!-- Button Variants -->
          <div>
            <h4 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Variants</h4>
            <div class="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="info">Info</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>

          <!-- Button States -->
          <div>
            <h4 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">States</h4>
            <div class="flex flex-wrap gap-4">
              <Button variant="primary" :loading="isLoading" @click="toggleLoading">
                {{ isLoading ? 'Loading...' : 'Click to Load' }}
              </Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button variant="info" :icon="TrendingUpOutline">With Icon</Button>
              <Button variant="danger" size="sm">Small</Button>
              <Button variant="info" size="lg">Large</Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Cards</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="default">
            <template #header>Default Card</template>
            <p>This is a default card with basic styling.</p>
          </Card>
          <Card variant="bordered">
            <template #header>Bordered Card</template>
            <p>This card has a visible border.</p>
          </Card>
          <Card variant="shadow">
            <template #header>Shadow Card</template>
            <p>This card has a shadow effect.</p>
          </Card>
        </div>
      </div>

      <!-- Inputs -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Inputs</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Input placeholder="Enter your name" label="Name" />
          <Input type="email" placeholder="Enter your email" label="Email" />
          <Input type="password" placeholder="Enter password" label="Password" />
          <Input placeholder="Search..." label="Search" />
        </div>
      </div>

      <!-- Badges -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Badges</h3>
        <div class="flex flex-wrap gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <!-- Loading -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Enhanced Loading Spinner</h3>
        <div class="space-y-6">
          <!-- Spinner Sizes -->
          <div>
            <h4 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Different Sizes</h4>
            <div class="flex flex-wrap items-center gap-8">
              <div class="flex flex-col items-center gap-2">
                <Loading size="sm" color="sport" />
                <span class="text-xs text-light-text-muted dark:text-dark-text-muted">Small</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Loading size="md" color="sport" />
                <span class="text-xs text-light-text-muted dark:text-dark-text-muted">Medium</span>
              </div>
            </div>
          </div>

          <!-- Loading with Text -->
          <div>
            <h4 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Loading with Text</h4>
            <div class="flex flex-wrap items-center gap-8">
              <Loading size="sm" color="sport" text="Loading..." />
              <Loading size="md" color="sport" text="Please wait..." />
            </div>
          </div>

          <!-- Different Colors -->
          <div>
            <h4 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Different Colors</h4>
            <div class="flex flex-wrap items-center gap-8">
              <div class="flex flex-col items-center gap-2">
                <Loading size="md" color="sport" />
                <span class="text-xs text-light-text-muted dark:text-dark-text-muted">Sport</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Loading size="md" color="primary" />
                <span class="text-xs text-light-text-muted dark:text-dark-text-muted">Primary</span>
              </div>
            </div>
          </div>

          <!-- Fullscreen Loading Demo -->
          <div>
            <h4 class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Fullscreen Loading</h4>
            <div class="flex gap-4">
              <Button variant="primary" @click="showSpinnerDemo">
                Show Fullscreen Loading
              </Button>
            </div>
          </div>
        </div>

        <!-- Fullscreen Loading Component -->
        <div
          v-if="showFullscreenSpinner"
          @click="showFullscreenSpinner = false"
          class="cursor-pointer"
        >
          <Loading
            size="md"
            color="sport"
            text="Loading, please wait... (Click to close)"
            fullscreen
          />
        </div>
      </div>
    </ComponentSection>

    <!-- Example Components Section -->
    <ComponentSection title="🚀 Example Components" description="Complex interactive components for the sport shop">
      <!-- Search Bar -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Search Bar</h3>
        <div class="max-w-md">
          <SearchBar @search="handleSearch" @select="handleSearchSelect" />
        </div>
      </div>

      <!-- Shopping Cart -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Shopping Cart</h3>
        <div class="flex justify-start">
          <ShoppingCart
            :items="sampleCartItems"
            @update-quantity="handleUpdateQuantity"
            @remove-item="handleRemoveItem"
            @view-cart="handleViewCart"
            @checkout="handleCheckout"
          />
        </div>
      </div>

      <!-- Category Cards -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Category Cards</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            v-for="category in sampleCategories"
            :key="category.id"
            :category="category"
            @click="handleCategoryClick"
          />
        </div>
      </div>

      <!-- Product Grid -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Product Grid</h3>
        <ProductGrid
          :products="sampleProducts"
          @add-to-cart="handleAddToCart"
          @toggle-favorite="handleToggleFavorite"
          @product-click="handleViewProduct"
        />
      </div>

      <!-- Dashboard Components -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Dashboard & Stats</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            v-for="stat in sampleStats"
            :key="stat.id"
            :title="stat.title"
            :value="stat.value"
            :change="stat.change"
            :trend="stat.trend"
            :icon="stat.icon"
            :color="stat.color"
            :progress="stat.progress"
          />
        </div>
        <Dashboard
          :stats="sampleStats"
          :recent-orders="sampleOrders"
          :activities="sampleActivities"
        />
      </div>
    </ComponentSection>

    <!-- UI Components Advanced Section -->
    <ComponentSection title="🎛️ Advanced UI Components" description="More complex UI components">
      <!-- Modal -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Modal</h3>
        <div class="flex gap-4">
          <Button variant="primary" @click="showModal = true">Open Modal</Button>
          <Button variant="secondary" @click="showLargeModal = true">Large Modal</Button>
        </div>

        <Modal v-model:show="showModal" title="Sample Modal">
          <p class="text-light-text-secondary dark:text-dark-text-secondary">
            This is a sample modal content. You can put any content here.
          </p>
          <template #footer>
            <div class="flex justify-end gap-2">
              <Button variant="ghost" @click="showModal = false">Cancel</Button>
              <Button variant="primary" @click="showModal = false">Confirm</Button>
            </div>
          </template>
        </Modal>

        <Modal v-model:show="showLargeModal" title="Large Modal" size="lg">
          <div class="space-y-4">
            <p class="text-light-text-secondary dark:text-dark-text-secondary">
              This is a larger modal with more content space.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" label="First Name" />
              <Input placeholder="Last Name" label="Last Name" />
            </div>
            <Input type="email" placeholder="Email" label="Email" />
          </div>
          <template #footer>
            <div class="flex justify-end gap-2">
              <Button variant="ghost" @click="showLargeModal = false">Cancel</Button>
              <Button variant="primary" @click="showLargeModal = false">Save</Button>
            </div>
          </template>
        </Modal>
      </div>

      <!-- Table -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Table</h3>
        <Table
          :columns="tableColumns"
          :data="tableData"
          @sort="handleSort"
        />
      </div>
    </ComponentSection>

    <!-- Cart API Test Section -->
    <ComponentSection title="🛒 Cart API Test" description="Test cart functionality with API response">
      <CartApiTest />
    </ComponentSection>

  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'

// Import icons
import {
  TrendingUpOutline,
  CartOutline,
  PeopleOutline,
  CubeOutline
} from '@vicons/ionicons5'

// Import UI Components
import { Button, Card, Input, Badge, Loading, ComponentSection, Modal, Table } from '@/components/ui'

// Import Example Components
import {
  SearchBar,
  ShoppingCart,
  CategoryCard,
  ProductGrid,
  Dashboard,
  StatCard,
  type Category,
  type Product,
  type CartItem,
  type SearchSuggestion,
  type StatData,
  type OrderData,
  type ActivityData
} from '@/components/examples'

// Import Cart API Test Component
import CartApiTest from '@/components/CartApiTest.vue'

// Sample data for demonstrations
const sampleCategories = ref<Category[]>([
  {
    id: '1',
    name: 'Running Shoes',
    description: 'High-performance running shoes for all terrains',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    productCount: 45,
    isNew: true
  },
  {
    id: '2',
    name: 'Basketball',
    description: 'Professional basketball gear and equipment',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop',
    productCount: 32,
    salePercentage: 20
  },
  {
    id: '3',
    name: 'Fitness Equipment',
    description: 'Home and gym fitness equipment',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    productCount: 67
  }
])

const sampleProducts = ref<Product[]>([
  {
    id: '1',
    name: 'Giày chạy bộ Nike Air Max 270',
    price: 2990,
    originalPrice: 3590,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    category: 'Giày dép',
    brand: 'Nike',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isFavorite: false,
    description: 'Giày chạy bộ cao cấp với công nghệ đệm khí tiên tiến, mang lại sự thoải mái tối đa cho mọi bước chạy.'
  },
  {
    id: '2',
    name: 'Bóng rổ Adidas Performance',
    price: 690,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=300&fit=crop',
    category: 'Dụng cụ',
    brand: 'Adidas',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    isFavorite: true,
    description: 'Bóng rổ chuyên nghiệp với độ bám tốt và độ bền cao, phù hợp cho cả sân trong và ngoài trời.'
  },
  {
    id: '3',
    name: 'Áo thun thể thao Adidas',
    price: 890,
    originalPrice: 1190,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    category: 'Quần áo',
    brand: 'Adidas',
    rating: 4.3,
    reviews: 67,
    inStock: true,
    isFavorite: false,
    description: 'Áo thun thể thao với chất liệu thấm hút mồ hôi, thiết kế năng động phù hợp cho mọi hoạt động thể thao.'
  },
  {
    id: '4',
    name: 'Đồng hồ thông minh Fitness',
    price: 2290,
    originalPrice: 2990,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    category: 'Phụ kiện',
    brand: 'Fitbit',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    isFavorite: true,
    description: 'Đồng hồ thông minh theo dõi sức khỏe với nhiều tính năng thể thao và pin bền lâu.'
  },
  {
    id: '5',
    name: 'Thảm yoga cao cấp',
    price: 1190,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    category: 'Dụng cụ',
    brand: 'Lululemon',
    rating: 4.6,
    reviews: 156,
    inStock: false,
    isFavorite: false,
    description: 'Thảm yoga chất lượng cao với bề mặt chống trượt, độ dày tối ưu cho việc tập luyện yoga và pilates.'
  },
  {
    id: '6',
    name: 'Bình nước thể thao',
    price: 490,
    originalPrice: 690,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    category: 'Phụ kiện',
    brand: 'Hydro Flask',
    rating: 4.2,
    reviews: 89,
    inStock: true,
    isFavorite: false,
    description: 'Bình nước thể thao giữ nhiệt tốt, thiết kế tiện lợi với nắp đậy chống tràn.'
  }
])

const sampleCartItems = ref<CartItem[]>([
  {
    id: '1',
    name: 'Nike Air Max 270',
    price: 150.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Adidas Running Shorts',
    price: 45.00,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1506629905607-d9c8e8b8e6e8?w=100&h=100&fit=crop'
  }
])

// Modal states
const showModal = ref(false)
const showLargeModal = ref(false)

// Button states
const isLoading = ref(false)

// Loading states
const showFullscreenSpinner = ref(false)

// Sample stats data
const sampleStats = ref<StatData[]>([
  {
    id: 1,
    title: 'Total Sales',
    value: '$12,345',
    change: '+12%',
    trend: 'up',
    icon: markRaw(TrendingUpOutline),
    color: 'sport',
    progress: 75
  },
  {
    id: 2,
    title: 'Orders',
    value: '1,234',
    change: '+5%',
    trend: 'up',
    icon: markRaw(CartOutline),
    color: 'success',
    progress: 60
  },
  {
    id: 3,
    title: 'Customers',
    value: '567',
    change: '-2%',
    trend: 'down',
    icon: markRaw(PeopleOutline),
    color: 'warning',
    progress: 45
  },
  {
    id: 4,
    title: 'Products',
    value: '89',
    change: '+8%',
    trend: 'up',
    icon: markRaw(CubeOutline),
    color: 'info',
    progress: 80
  }
])

// Sample orders data
const sampleOrders = ref<OrderData[]>([
  {
    id: 'ORD-001',
    customer: 'John Doe',
    status: 'completed',
    total: 299.99,
    date: '2024-01-15',
    items: 3
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    status: 'pending',
    total: 159.99,
    date: '2024-01-14',
    items: 1
  }
])

// Sample activities data
const sampleActivities = ref<ActivityData[]>([
  {
    id: 1,
    type: 'order',
    message: 'New order received from John Doe',
    time: '2 minutes ago',
    user: 'John Doe'
  },
  {
    id: 2,
    type: 'product',
    message: 'Product "Nike Air Max" updated',
    time: '1 hour ago',
    user: 'Admin'
  }
])

// Table data
const tableColumns = ref([
  { key: 'name', title: 'Product Name', sortable: true },
  { key: 'category', title: 'Category', sortable: true },
  { key: 'price', title: 'Price', sortable: true },
  { key: 'stock', title: 'Stock', sortable: true },
  { key: 'status', title: 'Status', sortable: false }
])

const tableData = ref([
  {
    id: 1,
    name: 'Nike Air Max 270',
    category: 'Shoes',
    price: '$150.00',
    stock: 25,
    status: 'In Stock'
  },
  {
    id: 2,
    name: 'Adidas Basketball',
    category: 'Sports',
    price: '$25.00',
    stock: 50,
    status: 'In Stock'
  },
  {
    id: 3,
    name: 'Running Shorts',
    category: 'Apparel',
    price: '$35.00',
    stock: 0,
    status: 'Out of Stock'
  }
])

// Event handlers
const handleSearch = (query: string) => {
  console.log('Search query:', query)
}

const handleSearchSelect = (suggestion: SearchSuggestion) => {
  console.log('Selected suggestion:', suggestion)
}

const handleUpdateQuantity = (id: string, quantity: number) => {
  console.log('Update quantity:', id, quantity)
}

const handleRemoveItem = (id: string) => {
  console.log('Remove item:', id)
}

const handleViewCart = () => {
  console.log('View cart clicked')
}

const handleCheckout = () => {
  console.log('Checkout clicked')
}

const handleCategoryClick = (category: Category) => {
  console.log('Category clicked:', category)
}

const handleAddToCart = (product: Product) => {
  console.log('Add to cart:', product)
}

const handleToggleFavorite = (product: Product) => {
  console.log('Toggle favorite:', product)
  // Update the product's favorite status
  const index = sampleProducts.value.findIndex(p => p.id === product.id)
  if (index !== -1) {
    sampleProducts.value[index].isFavorite = !sampleProducts.value[index].isFavorite
  }
}

const handleViewProduct = (product: Product) => {
  console.log('View product:', product)
}

const handleSort = (column: any, direction: 'asc' | 'desc' | null) => {
  console.log('Sort table:', column, direction)
}

const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000) // Loading for 2 seconds
}

// Loading demo function
const showSpinnerDemo = () => {
  showFullscreenSpinner.value = true
  setTimeout(() => {
    showFullscreenSpinner.value = false
  }, 3000) // Auto hide after 3 seconds
}

console.log('ComponentShowcase page loaded with full components')
</script>
