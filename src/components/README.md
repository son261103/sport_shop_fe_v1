# 🎨 Components Structure - Sport Shop

## 📋 Tổng quan

Cấu trúc component đã được tối ưu hóa để phân chia rõ ràng giữa các loại component khác nhau:

- **Common**: Chỉ chứa layout components (Header, Footer, Breadcrumb)
- **UI**: Basic reusable UI components 
- **Examples**: Complex interactive components và showcase examples

## 📁 Cấu trúc thư mục

```
src/components/
├── common/                    # 🏗️ Layout Components (Dùng chung)
│   ├── AppHeader.vue         # Header với navigation, search, cart
│   ├── AppFooter.vue         # Footer với links và thông tin
│   ├── AppBreadcrumb.vue     # Breadcrumb navigation
│   └── index.ts              # Export layout components
│
├── ui/                       # 🎨 Basic UI Components
│   ├── Button.vue            # Button với nhiều variant, size
│   ├── Card.vue              # Card với các style khác nhau
│   ├── Input.vue             # Input field với validation
│   ├── Modal.vue             # Modal dialog
│   ├── Badge.vue             # Badge/Tag components
│   ├── Table.vue             # Data table
│   ├── ComponentSection.vue  # Section wrapper cho showcase
│   └── index.ts              # Export UI components
│
└── examples/                 # 🚀 Complex Example Components
    ├── ProductGrid.vue       # Grid sản phẩm với filter/sort
    ├── ProductCard.vue       # Card sản phẩm interactive
    ├── ProductListItem.vue   # List item sản phẩm
    ├── CategoryCard.vue      # Card danh mục với hover effects
    ├── SearchBar.vue         # Search với suggestions
    ├── ShoppingCart.vue      # Shopping cart dropdown
    ├── Dashboard.vue         # Dashboard layout hoàn chỉnh
    ├── StatCard.vue          # Card thống kê với chart
    └── index.ts              # Export examples + types
```

## 🎯 Phân loại Components

### 1. **Common Components** (Layout)
> Chỉ chứa các component layout cơ bản được dùng chung

- **AppHeader**: Navigation, search, cart, theme toggle
- **AppFooter**: Footer links, newsletter, contact info
- **AppBreadcrumb**: Breadcrumb navigation

**Import:**
```typescript
import { AppHeader, AppFooter, AppBreadcrumb } from '@/components/common'
```

### 2. **UI Components** (Basic)
> Các component UI cơ bản có thể tái sử dụng

- **Button**: Nhiều variant (primary, secondary, danger, etc.)
- **Card**: Các style khác nhau (default, bordered, shadow)
- **Input**: Input fields với validation
- **Modal**: Modal dialogs
- **Badge**: Badge/Tag components
- **Table**: Data tables
- **ComponentSection**: Wrapper cho showcase sections

**Import:**
```typescript
import { Button, Card, Input, Modal, Badge, Table } from '@/components/ui'
```

### 3. **Example Components** (Complex)
> Các component phức tạp, interactive cho sport shop

- **ProductGrid**: Grid sản phẩm với filter/sort
- **ProductCard**: Card sản phẩm với add to cart, favorite
- **CategoryCard**: Card danh mục với hover effects
- **SearchBar**: Search với autocomplete suggestions
- **ShoppingCart**: Shopping cart dropdown với quantity controls
- **Dashboard**: Dashboard layout với stats
- **StatCard**: Card thống kê với progress

**Import:**
```typescript
import { 
  ProductGrid, 
  ProductCard, 
  CategoryCard, 
  SearchBar, 
  ShoppingCart,
  Dashboard,
  StatCard 
} from '@/components/examples'
```

## 🔧 Cách sử dụng

### Layout trong DefaultLayout.vue
```vue
<template>
  <div class="min-h-screen">
    <AppHeader />
    <main>
      <AppBreadcrumb :current-path="currentPath" />
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { AppHeader, AppFooter, AppBreadcrumb } from '@/components/common'
</script>
```

### UI Components trong pages
```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Click me
    </Button>
    
    <Card variant="shadow">
      <template #header>Card Title</template>
      <p>Card content here</p>
    </Card>
  </div>
</template>

<script setup>
import { Button, Card } from '@/components/ui'
</script>
```

### Example Components trong showcase
```vue
<template>
  <div>
    <SearchBar @search="handleSearch" />
    <ProductGrid :products="products" />
    <ShoppingCart :items="cartItems" />
  </div>
</template>

<script setup>
import { SearchBar, ProductGrid, ShoppingCart } from '@/components/examples'
</script>
```

## 📚 Component Showcase

Xem tất cả components tại: `/components` route

File: `src/views/ComponentShowcase.vue` chứa demo đầy đủ của tất cả components.

## 🎨 Theme Support

Tất cả components đều hỗ trợ:
- ✅ Light/Dark mode
- ✅ Sport theme colors
- ✅ Responsive design
- ✅ Accessibility

## 🔮 Tương lai

- [ ] Thêm animation components
- [ ] Thêm form validation components
- [ ] Thêm chart components
- [ ] Thêm notification components
