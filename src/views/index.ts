// 📄 Views Exports for Sport Shop

export { default as Home } from './Home.vue'
export { default as ComponentShowcase } from './ComponentShowcase.vue'

// Export view types for TypeScript
export type ViewType = 'home' | 'components'

export const VIEWS = {
  home: 'Home',
  components: 'ComponentShowcase',
} as const
