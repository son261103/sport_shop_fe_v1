# 🛒 Cart System Implementation

## Overview

Hệ thống giỏ hàng đầy đủ được xây dựng theo các API đã cung cấp với architecture hoàn chỉnh và tích hợp toàn bộ workflow từ header đến checkout.

## 📋 API Endpoints Implemented

### 1. GET /api/cart

- **Mô tả**: Lấy thông tin giỏ hàng của user
- **Response**: CartResponse with items, totals, shipping fee, discount
- **Implementation**: CartService.getCart()

### 2. POST /api/cart/add

- **Mô tả**: Thêm sản phẩm vào giỏ hàng
- **Request**: `{ product_id: number, quantity: number, variant_id?: number }`
- **Response**: AddToCartResponse with updated cart count
- **Implementation**: CartService.addToCart()

### 3. PUT /api/cart/update/{itemId}

- **Mô tả**: Cập nhật số lượng sản phẩm
- **Request**: `{ quantity: number }`
- **Response**: UpdateCartItemResponse
- **Implementation**: CartService.updateCartItem()

### 4. DELETE /api/cart/remove/{itemId}

- **Mô tả**: Xóa sản phẩm khỏi giỏ hàng
- **Response**: RemoveFromCartResponse
- **Implementation**: CartService.removeFromCart()

### 5. DELETE /api/cart/clear

- **Mô tả**: Xóa toàn bộ giỏ hàng
- **Response**: ClearCartResponse
- **Implementation**: CartService.clearCart()

### 6. GET /api/cart/count

- **Mô tả**: Lấy số lượng sản phẩm trong giỏ hàng
- **Response**: CartCountResponse
- **Implementation**: CartService.getCartCount()

## 🏗️ Architecture

### 1. Service Layer

- **File**: `src/services/cartService.ts`
- **Chức năng**: Gọi API và xử lý HTTP requests
- **Features**:
  - Error handling
  - TypeScript typing
  - Consistent API interface

### 2. Types Definition

- **File**: `src/types/cart.ts`
- **Chức năng**: Định nghĩa TypeScript types cho API
- **Types**:
  - CartItem
  - CartResponse
  - AddToCartRequest/Response
  - UpdateCartItemRequest/Response
  - RemoveFromCartResponse
  - ClearCartResponse
  - CartCountResponse

### 3. Pinia Store

- **File**: `src/stores/cart.ts`
- **Chức năng**: Quản lý state giỏ hàng
- **Features**:
  - Reactive state management
  - Computed properties
  - Loading states
  - Error handling
  - Notification integration

### 4. Composables

- **File**: `src/composables/useCart.ts`
- **Chức năng**: Business logic và reusable functions
- **Features**:
  - Cart operations
  - Quantity management
  - Price formatting
  - Helper functions

### 5. Components

#### ShoppingCartNew.vue

- **Location**: `src/components/user/common/ShoppingCartNew.vue`
- **Chức năng**: Cart dropdown trong header
- **Features**:
  - Real-time cart count badge
  - Cart items preview
  - Quick quantity controls
  - Remove items
  - Navigate to cart/checkout

#### CartNew.vue

- **Location**: `src/views/user/CartNew.vue`
- **Chức năng**: Full cart page
- **Features**:
  - Complete cart management
  - Item quantity controls
  - Remove items
  - Cart summary
  - Checkout navigation

#### ProductCard.vue (Updated)

- **Location**: `src/components/examples/ProductCard.vue`
- **Chức năng**: Add to cart functionality
- **Features**:
  - Direct add to cart
  - Store integration
  - Error handling

### 6. Header Integration

- **File**: `src/components/user/common/AppHeader.vue`
- **Updates**: Replaced old cart component with new one
- **Features**:
  - Real-time cart count
  - Cart dropdown
  - Responsive design

## 🚀 Key Features

### 1. Real-time Cart Updates

- Cart count updates immediately after add/remove/update
- Automatic refresh of cart data
- Optimistic UI updates

### 2. Error Handling

- API error handling with user-friendly messages
- Loading states for better UX
- Validation for cart operations

### 3. Responsive Design

- Mobile-first approach
- Responsive cart dropdown
- Optimized for all screen sizes

### 4. User Experience

- Loading indicators
- Success/error notifications
- Empty cart states
- Smooth animations

### 5. Type Safety

- Full TypeScript support
- Strongly typed API responses
- Intellisense support

## 🔧 Usage

### 1. Initialize Cart

```typescript
// In main.ts
const cartStore = useCartStore();
await cartStore.initializeCart();
```

### 2. Add to Cart

```typescript
// In product component
const { addProductToCart } = useCart();
await addProductToCart(productId, quantity, variantId);
```

### 3. Update Quantity

```typescript
// In cart component
const { updateCartItem } = useCart();
await updateCartItem(itemId, newQuantity);
```

### 4. Remove from Cart

```typescript
// In cart component
const { removeFromCart } = useCart();
await removeFromCart(itemId);
```

### 5. Clear Cart

```typescript
// In cart component
const { clearCart } = useCart();
await clearCart();
```

## 📱 Components Integration

### Header Component

```vue
<template>
  <header>
    <!-- Other header content -->
    <ShoppingCartNew />
  </header>
</template>
```

### Product Card

```vue
<template>
  <div class="product-card">
    <!-- Product info -->
    <button @click="handleAddToCart">Add to Cart</button>
  </div>
</template>

<script setup>
import { useCart } from "@/composables/useCart";

const { addProductToCart } = useCart();

const handleAddToCart = async () => {
  await addProductToCart(product.id, 1);
};
</script>
```

## 🎯 Navigation Flow

1. **Product Listing** → Add to Cart → Cart Count Updates
2. **Header Cart Icon** → Cart Dropdown → Preview Items
3. **Cart Dropdown** → "View Cart" → Full Cart Page
4. **Cart Page** → Manage Items → "Checkout"
5. **Product Card** → Add to Cart → Notification

## 🔒 Authentication Integration

- Cart automatically initializes when user logs in
- Cart persists across sessions
- Guest cart support (can be extended)

## 📊 State Management

### Cart Store State

```typescript
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  isLoading: boolean;
  isCartOpen: boolean;
}
```

### Computed Properties

- `cartCount`: Total items in cart
- `isEmpty`: Whether cart is empty
- `formattedTotal`: Formatted total price

## 🚀 Getting Started

1. **Import Types**:

```typescript
import type { CartItem, AddToCartRequest } from "@/types/cart";
```

2. **Use Cart Store**:

```typescript
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
```

3. **Use Cart Composable**:

```typescript
import { useCart } from "@/composables/useCart";
const { addProductToCart, items, cartCount } = useCart();
```

## 📝 Notes

- All components are fully typed with TypeScript
- Error handling is implemented at all levels
- Loading states provide smooth user experience
- Responsive design works on all devices
- Real-time updates ensure data consistency

## 🎨 Styling

- Uses existing theme system
- Consistent with app design language
- Dark mode support
- Responsive layout
- Smooth animations and transitions

Hệ thống giỏ hàng đã được implement đầy đủ theo yêu cầu với architecture chắc chắn và user experience tối ưu!
