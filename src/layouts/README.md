# 🏗️ Layouts System - Sport Shop

## 📋 Tổng quan

Hệ thống layouts được thiết kế để tạo ra cấu trúc trang web nhất quán và có thể tái sử dụng cho Sport Shop. Hệ thống này sử dụng Vue 3 Composition API và tích hợp với Naive UI + Tailwind CSS.

## 📁 Cấu trúc thư mục

```
src/
├── layouts/
│   ├── DefaultLayout.vue     # Layout chính cho hầu hết các trang
│   ├── index.ts             # Export layouts
│   └── README.md            # Tài liệu này
├── components/
│   └── layout/
│       ├── AppHeader.vue    # Header component
│       ├── AppFooter.vue    # Footer component
│       ├── AppNavigation.vue # Navigation component
│       ├── AppBreadcrumb.vue # Breadcrumb component
│       └── index.ts         # Export layout components
└── views/
    ├── Home.vue             # Trang chủ
    └── index.ts             # Export views
```

## 🎯 Các Layout có sẵn

### DefaultLayout
Layout chính bao gồm:
- **Header**: Logo, navigation, search, cart, theme toggle
- **Breadcrumb**: Điều hướng theo cấp bậc
- **Main Content**: Nội dung trang (slot)
- **Footer**: Thông tin liên hệ, links, newsletter

## 🧩 Layout Components

### AppHeader
- **Logo & Brand**: Hiển thị tên thương hiệu
- **Navigation**: Menu điều hướng chính
- **Search**: Tìm kiếm sản phẩm
- **Cart**: Giỏ hàng với badge số lượng
- **Theme Toggle**: Chuyển đổi light/dark mode
- **Mobile Menu**: Menu responsive cho mobile

### AppNavigation
- **Desktop Navigation**: Menu ngang cho desktop
- **Active State**: Highlight trang hiện tại
- **Icons**: Icon cho mỗi menu item

### AppBreadcrumb
- **Auto-generation**: Tự động tạo breadcrumb từ path
- **Custom Items**: Hỗ trợ custom breadcrumb items
- **Clickable**: Có thể click để điều hướng

### AppFooter
- **Brand Section**: Thông tin thương hiệu và social links
- **Quick Links**: Links nhanh
- **Categories**: Danh mục sản phẩm
- **Contact Info**: Thông tin liên hệ
- **Newsletter**: Đăng ký nhận tin

## 🚀 Cách sử dụng

### Sử dụng DefaultLayout

```vue
<template>
  <DefaultLayout current-path="/products">
    <YourPageContent />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { DefaultLayout } from '@/layouts'
import YourPageContent from './YourPageContent.vue'
</script>
```

### Sử dụng trong App.vue

```vue
<template>
  <ThemeProvider>
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { DefaultLayout } from './layouts'
import { Home } from './views'
</script>
```

## 🎨 Tính năng

### Theme Support
- **Light/Dark Mode**: Hỗ trợ chuyển đổi theme
- **Sport Colors**: Sử dụng bảng màu thể thao
- **Responsive**: Tương thích với mọi kích thước màn hình

### Accessibility
- **Keyboard Navigation**: Hỗ trợ điều hướng bằng bàn phím
- **Screen Reader**: Tương thích với screen reader
- **Focus Management**: Quản lý focus states

### Performance
- **Lazy Loading**: Components được load khi cần
- **Tree Shaking**: Chỉ import components được sử dụng
- **Optimized**: Tối ưu hóa cho performance

## 🔧 Customization

### Thêm Layout mới

1. Tạo file layout mới trong `src/layouts/`
2. Export trong `src/layouts/index.ts`
3. Sử dụng trong components

### Thêm Layout Component mới

1. Tạo component trong `src/components/layout/`
2. Export trong `src/components/layout/index.ts`
3. Import và sử dụng trong layout

### Tùy chỉnh Theme

Chỉnh sửa trong `src/style.css`:
- CSS Variables
- Tailwind Classes
- Component Styles

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- **Mobile Menu**: Hamburger menu cho mobile
- **Touch Friendly**: Buttons và links tối ưu cho touch
- **Responsive Grid**: Layout tự động điều chỉnh

## 🔮 Tương lai

### Planned Features
- **Multiple Layouts**: Admin layout, Auth layout
- **Dynamic Breadcrumbs**: Tích hợp với Vue Router
- **Layout Transitions**: Hiệu ứng chuyển trang
- **SEO Optimization**: Meta tags, structured data

### Integration Plans
- **Vue Router**: Điều hướng động
- **Pinia Stores**: State management
- **API Integration**: Dynamic content
- **PWA Support**: Progressive Web App features
