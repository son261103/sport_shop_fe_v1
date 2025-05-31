// 🎨 Theme Composable for Sport Shop (Updated for Pinia + Naive UI)

import {computed, onMounted, onUnmounted, ref} from 'vue'
import { useThemeStore } from '@/stores/theme'
import type { ThemeContextType } from '@/types'

export const useTheme = (): ThemeContextType => {
  const themeStore = useThemeStore()

  // Initialize theme on mount
  onMounted(() => {
    themeStore.initTheme()
    const cleanup = themeStore.setupSystemThemeListener()

    // Cleanup on unmount
    onUnmounted(() => {
      cleanup()
    })
  })

  return {
    theme: themeStore.currentTheme,
    toggleTheme: themeStore.toggleTheme,
    colors: themeStore.colors,
  }
}

// Composable for Naive UI theme
export const useNaiveTheme = () => {
  const themeStore = useThemeStore()

  return {
    naiveTheme: themeStore.naiveTheme,
    isDark: themeStore.isDark,
  }
}

// Utility composable for theme-aware classes
export const useThemeClasses = () => {
  const themeStore = useThemeStore()

  const getThemeClass = (lightClass: string, darkClass: string): string => {
    return themeStore.currentTheme === 'dark' ? darkClass : lightClass
  }

  const getBgClass = (type: 'primary' | 'secondary' = 'primary'): string => {
    return type === 'primary' 
      ? 'bg-light-bg-primary dark:bg-dark-bg-primary'
      : 'bg-light-bg-secondary dark:bg-dark-bg-secondary'
  }

  const getTextClass = (type: 'primary' | 'secondary' | 'muted' = 'primary'): string => {
    switch (type) {
      case 'primary':
        return 'text-light-text-primary dark:text-dark-text-primary'
      case 'secondary':
        return 'text-light-text-secondary dark:text-dark-text-secondary'
      case 'muted':
        return 'text-light-text-muted dark:text-dark-text-muted'
      default:
        return 'text-light-text-primary dark:text-dark-text-primary'
    }
  }

  const getBorderClass = (type: 'primary' | 'secondary' = 'primary'): string => {
    return type === 'primary'
      ? 'border-light-border-primary dark:border-dark-border-primary'
      : 'border-light-border-secondary dark:border-dark-border-secondary'
  }

  const getAccentClass = (type: 'sport' | 'danger' | 'warning' | 'info' = 'sport'): string => {
    switch (type) {
      case 'sport':
        return 'text-light-accent-sport dark:text-dark-accent-sport'
      case 'danger':
        return 'text-light-accent-danger dark:text-dark-accent-danger'
      case 'warning':
        return 'text-light-accent-warning dark:text-dark-accent-warning'
      case 'info':
        return 'text-light-accent-info dark:text-dark-accent-info'
      default:
        return 'text-light-accent-sport dark:text-dark-accent-sport'
    }
  }

  // 🌈 Gradient helper functions
  const getGradientBgClass = (type: 'sport' | 'sport-soft' | 'danger' | 'animated' = 'sport'): string => {
    switch (type) {
      case 'sport':
        return 'bg-gradient-sport dark:bg-gradient-sport-dark'
      case 'sport-soft':
        return 'bg-gradient-sport-soft dark:bg-gradient-sport-dark-soft'
      case 'danger':
        return 'bg-gradient-danger dark:bg-gradient-danger-dark'
      case 'animated':
        return 'bg-gradient-sport-animated dark:bg-gradient-sport-animated-dark animate-gradient-x bg-[length:200%_200%]'
      default:
        return 'bg-gradient-sport dark:bg-gradient-sport-dark'
    }
  }

  const getGradientTextClass = (animated: boolean = false): string => {
    return animated
      ? 'bg-gradient-sport-animated dark:bg-gradient-sport-animated-dark bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]'
      : 'bg-gradient-text-sport dark:bg-gradient-text-sport-dark bg-clip-text text-transparent'
  }

  const getGradientHoverClass = (type: 'sport' | 'danger' = 'sport'): string => {
    switch (type) {
      case 'sport':
        return 'hover:bg-gradient-sport-hover dark:hover:bg-gradient-sport-dark-hover'
      case 'danger':
        return 'hover:opacity-90'
      default:
        return 'hover:bg-gradient-sport-hover dark:hover:bg-gradient-sport-dark-hover'
    }
  }

  return {
    getThemeClass,
    getBgClass,
    getTextClass,
    getBorderClass,
    getAccentClass,
    getGradientBgClass,
    getGradientTextClass,
    getGradientHoverClass,
  }
}

// Utility for responsive design
export const useResponsive = () => {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  const updateBreakpoints = (): void => {
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
    isDesktop.value = width >= 1024
  }

  onMounted(() => {
    updateBreakpoints()
    window.addEventListener('resize', updateBreakpoints)
  })

  return {
    isMobile: computed(() => isMobile.value),
    isTablet: computed(() => isTablet.value),
    isDesktop: computed(() => isDesktop.value),
  }
}

// Animation utilities
export const useAnimations = () => {
  const fadeIn = (element: HTMLElement, duration = 500): Promise<void> => {
    return new Promise((resolve) => {
      element.style.opacity = '0'
      element.style.transform = 'translateY(10px)'
      element.style.transition = `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`
      
      requestAnimationFrame(() => {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
        
        setTimeout(() => {
          resolve()
        }, duration)
      })
    })
  }

  const slideUp = (element: HTMLElement, duration = 600): Promise<void> => {
    return new Promise((resolve) => {
      element.style.opacity = '0'
      element.style.transform = 'translateY(30px)'
      element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`
      
      requestAnimationFrame(() => {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
        
        setTimeout(() => {
          resolve()
        }, duration)
      })
    })
  }

  const bounceIn = (element: HTMLElement): void => {
    element.classList.add('animate-bounce-gentle')
  }

  return {
    fadeIn,
    slideUp,
    bounceIn,
  }
}
