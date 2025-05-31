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

# Start development server
npm run dev

# Build for production
npm run build
```

**🌐 Development URL**: http://localhost:5173

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
