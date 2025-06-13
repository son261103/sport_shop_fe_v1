# 🏃‍♂️ Sport Shop - Vue 3 + Tailwind CSS + Naive UI + Pinia

> Modern sport shop application với complete tech stack

## 🛠️ Tech Stack

- **Vue 3** + Composition API + TypeScript
- **Tailwind CSS** với sport-themed color palette
- **Naive UI** component library với custom theme
- **Pinia** state management
- **Vite** build tool với HMR

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env file with your configuration

# Start development server
npm run dev

# Build for production
npm run build
```

**🌐 Development URL**: http://localhost:5173

## 🔧 Environment Configuration

The application uses environment variables for configuration. Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000

# Application URLs
VITE_APP_URL=http://localhost:5173

# External APIs
VITE_PROVINCES_API_URL=https://provinces.open-api.vn/api

# Authentication
VITE_AUTH_TOKEN_KEY=auth_token

# Development Settings
VITE_DEV_MODE=true
VITE_DEBUG_MODE=false
```

### 🔐 Security Notes
- Never commit `.env` files to version control
- Use `.env.example` as a template for required variables
- All environment variables must be prefixed with `VITE_` to be accessible in the frontend

## 📁 Project Structure

```
src/
├── types/              # 📝 TypeScript types
├── constants/          # 📊 Application constants
├── utils/              # 🛠️ Utility functions
├── components/         # 🎨 Vue components
├── composables/        # 🔧 Vue composables
├── stores/            # 🗃️ Pinia stores
└── style.css          # 🎨 Global styles
```

## 🎯 Usage Examples

### Theme Management
```vue
<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <n-button @click="toggleTheme">
    {{ theme === 'dark' ? '☀️' : '🌙' }}
  </n-button>
</template>
```

### Import Examples
```typescript
// Types & Constants
import type { ThemeMode } from '@/types'
import { SPORT_THEME } from '@/constants'

// Utils & Components
import { getCategoryClass } from '@/utils'
import ThemeProvider from '@/components/ThemeProvider.vue'
```

## 🎨 Features

- ✅ **Dark/Light Mode**: Seamless theme switching
- ✅ **Sport Theme**: Custom color palette
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Clean Architecture**: Organized folder structure

## 📚 Documentation

- 📁 [Project Structure](./PROJECT_STRUCTURE.md) - Detailed folder organization

---

**🎉 Happy coding!**
