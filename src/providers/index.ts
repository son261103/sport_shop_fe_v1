// 🎯 Providers Exports for Sport Shop

export { default as ThemeProvider } from './ThemeProvider.vue'

// Export provider types for TypeScript
export type ProviderType = 'theme'

export const PROVIDERS = {
  theme: 'ThemeProvider',
} as const
