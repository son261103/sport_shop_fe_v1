# Public Products API Integration

This document describes how to use the public products API integration in the Vue.js frontend application.

## Overview

The public products API allows frontend users to browse and search products without authentication. It supports pagination, search, filtering, and sorting.

## API Endpoint

```
GET /api/products
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `per_page` | integer | Items per page (default: 12) |
| `search` | string | Search by product name |
| `category_id` | integer | Filter by category ID |
| `brand_id` | integer | Filter by brand ID |
| `min_price` | number | Minimum price filter |
| `max_price` | number | Maximum price filter |
| `sort_by` | string | Sort by field (`name`, `price`, `created_at`) |
| `sort_order` | string | Sort order (`asc`, `desc`) |

### Response Format

```json
{
  "status": true,
  "message": "Products retrieved successfully",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "name": "Product Name",
        "price": "100000",
        "discount_price": "80000",
        "description": "Product description",
        "image": "product-image.jpg",
        "stock_quantity": 10,
        "is_active": true,
        "category_id": 1,
        "brand_id": 1,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z",
        "category": {
          "id": 1,
          "name": "Category Name",
          "description": "Category description"
        },
        "brand": {
          "id": 1,
          "name": "Brand Name",
          "description": "Brand description"
        }
      }
    ],
    "first_page_url": "http://localhost:8000/api/products?page=1",
    "from": 1,
    "last_page": 5,
    "last_page_url": "http://localhost:8000/api/products?page=5",
    "links": [...],
    "next_page_url": "http://localhost:8000/api/products?page=2",
    "path": "http://localhost:8000/api/products",
    "per_page": 12,
    "prev_page_url": null,
    "to": 12,
    "total": 50
  }
}
```

## Usage

### 1. Using the API Service Directly

```typescript
import { api } from '@/services/api';

// Get all products with filters
const response = await api.publicProducts.getAll({
  page: 1,
  per_page: 12,
  search: 'nike',
  category_id: 1,
  sort_by: 'price',
  sort_order: 'asc'
});

// Get a specific product
const product = await api.publicProducts.getById(1);
```

### 2. Using the Composable (Recommended)

```vue
<template>
  <div>
    <!-- Search -->
    <input 
      v-model="searchQuery" 
      @keyup.enter="handleSearch"
      placeholder="Search products..."
    />
    
    <!-- Products Grid -->
    <div v-if="hasProducts" class="grid grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>{{ formatPrice(product.price) }}</p>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="!hasPrevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ lastPage }}</span>
      <button @click="nextPage" :disabled="!hasNextPage">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePublicProducts } from '@/composables/usePublicProducts';

const {
  products,
  isLoading,
  hasProducts,
  currentPage,
  lastPage,
  hasNextPage,
  hasPrevPage,
  searchQuery,
  fetchProducts,
  searchProducts,
  nextPage,
  prevPage,
} = usePublicProducts();

const localSearchQuery = ref('');

const handleSearch = async () => {
  await searchProducts(localSearchQuery.value);
};

const formatPrice = (price: string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(parseFloat(price));
};

onMounted(() => {
  fetchProducts();
});
</script>
```

### 3. Available Composable Methods

#### State
- `products` - Array of products
- `selectedProduct` - Currently selected product
- `isLoading` - Loading state
- `error` - Error message
- `paginationData` - Pagination information

#### Filter State
- `searchQuery` - Current search query
- `currentPage` - Current page number
- `perPage` - Items per page
- `categoryFilter` - Selected category ID
- `brandFilter` - Selected brand ID
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sortBy` - Sort field
- `sortOrder` - Sort order

#### Computed Properties
- `hasProducts` - Whether there are products
- `totalProducts` - Total number of products
- `lastPage` - Last page number
- `hasNextPage` - Whether there's a next page
- `hasPrevPage` - Whether there's a previous page

#### Methods
- `fetchProducts(params?)` - Fetch products with optional parameters
- `fetchProduct(id)` - Fetch a specific product
- `searchProducts(query)` - Search products by query
- `filterByCategory(categoryId?)` - Filter by category
- `filterByBrand(brandId?)` - Filter by brand
- `filterByPriceRange(min?, max?)` - Filter by price range
- `sortProducts(field, order)` - Sort products
- `goToPage(page)` - Go to specific page
- `nextPage()` - Go to next page
- `prevPage()` - Go to previous page
- `resetFilters()` - Reset all filters
- `clearSelectedProduct()` - Clear selected product

## Components

### ProductList Component

A complete product listing component with search, filters, and pagination:

```vue
<template>
  <ProductList />
</template>

<script setup>
import { ProductList } from '@/components/user/products';
</script>
```

### ProductsPage View

A complete page example with sidebar filters:

```vue
<template>
  <ProductsPage />
</template>

<script setup>
import ProductsPage from '@/views/user/ProductsPage.vue';
</script>
```

## Error Handling

The composable automatically handles errors and shows notifications. You can also access the error state:

```typescript
const { error, isLoading } = usePublicProducts();

watch(error, (newError) => {
  if (newError) {
    console.error('Products error:', newError);
  }
});
```

## TypeScript Support

All types are fully typed with TypeScript:

```typescript
import type { 
  PublicProduct, 
  PublicProductsParams, 
  PublicProductsResponse 
} from '@/composables/usePublicProducts';
```

## Best Practices

1. **Use the composable** instead of calling the API directly for better state management
2. **Debounce search inputs** to avoid too many API calls
3. **Handle loading states** to provide good user experience
4. **Use pagination** for better performance with large datasets
5. **Cache results** when appropriate to reduce API calls
6. **Handle errors gracefully** with proper error messages

## Examples

### Search with Debouncing

```typescript
import { debounce } from 'lodash-es';

const debouncedSearch = debounce(async (query: string) => {
  await searchProducts(query);
}, 300);

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});
```

### Filter by Multiple Criteria

```typescript
const applyFilters = async () => {
  await fetchProducts({
    search: searchQuery.value,
    category_id: selectedCategory.value,
    brand_id: selectedBrand.value,
    min_price: minPrice.value,
    max_price: maxPrice.value,
    sort_by: 'price',
    sort_order: 'asc'
  });
};
```

### Infinite Scrolling

```typescript
const loadMore = async () => {
  if (hasNextPage.value && !isLoading.value) {
    const nextPageProducts = await fetchProducts({
      page: currentPage.value + 1,
      // ... other params
    });
    
    // Append to existing products
    products.value.push(...nextPageProducts.data.data);
  }
};
```