import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { ThemeMode, ColorPalette } from '@/types'
import { SPORT_THEME } from '@/constants'

export const useThemeStore = defineStore('theme', () => {
  // State
  const currentTheme = ref<ThemeMode>('light')
  const isInitialized = ref(false)

  // Getters
  const isDark = computed(() => currentTheme.value === 'dark')
  const colors = computed<ColorPalette>(() => SPORT_THEME[currentTheme.value])

  // Naive UI Theme Configuration
  const naiveTheme = computed(() => {
    const themeColors = colors.value

    const baseTheme = {
      common: {
        primaryColor: themeColors.accent.sport,
        primaryColorHover: themeColors.accent.sport + 'E6',
        primaryColorPressed: themeColors.accent.sport + 'CC',
        primaryColorSuppl: themeColors.accent.sport + '1A',

        errorColor: themeColors.accent.danger,
        errorColorHover: themeColors.accent.danger + 'E6',
        errorColorPressed: themeColors.accent.danger + 'CC',
        errorColorSuppl: themeColors.accent.danger + '1A',

        warningColor: themeColors.accent.warning,
        warningColorHover: themeColors.accent.warning + 'E6',
        warningColorPressed: themeColors.accent.warning + 'CC',
        warningColorSuppl: themeColors.accent.warning + '1A',

        infoColor: themeColors.accent.info,
        infoColorHover: themeColors.accent.info + 'E6',
        infoColorPressed: themeColors.accent.info + 'CC',
        infoColorSuppl: themeColors.accent.info + '1A',

        successColor: '#52c41a',
        successColorHover: '#52c41aE6',
        successColorPressed: '#52c41aCC',
        successColorSuppl: '#52c41a1A',

        // Background colors
        bodyColor: themeColors.bg.primary,
        cardColor: themeColors.bg.secondary,
        modalColor: themeColors.bg.secondary,
        popoverColor: themeColors.bg.secondary,
        tableHeaderColor: themeColors.bg.secondary,

        // Text colors
        textColorBase: themeColors.text.primary,
        textColor1: themeColors.text.primary,
        textColor2: themeColors.text.secondary,
        textColor3: themeColors.text.muted,
        textColorDisabled: themeColors.text.muted,

        // Border colors
        borderColor: themeColors.border.primary,
        dividerColor: themeColors.border.secondary,

        // Input colors
        inputColor: themeColors.bg.primary,
        inputColorDisabled: themeColors.bg.secondary,

        // Border radius
        borderRadius: '8px',
        borderRadiusSmall: '4px',

        // Font
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        fontSizeMini: '12px',
        fontSizeTiny: '12px',
        fontSizeSmall: '14px',
        fontSizeMedium: '14px',
        fontSizeLarge: '15px',
        fontSizeHuge: '16px',

        // Line height
        lineHeight: '1.6',

        // Box shadow
        boxShadow1: '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
        boxShadow2: '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
        boxShadow3: '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',
      }
    }

    // Dark mode specific overrides
    if (isDark.value) {
      return {
        ...baseTheme,
        common: {
          ...baseTheme.common,
          // Dark mode specific colors
          baseColor: '#000000',
          invertedColor: '#ffffff',

          // Hover colors for dark mode
          hoverColor: 'rgba(255, 255, 255, 0.09)',
          pressedColor: 'rgba(255, 255, 255, 0.13)',

          // Opacity colors
          opacityDisabled: '0.38',
          opacity1: '0.82',
          opacity2: '0.72',
          opacity3: '0.38',
          opacity4: '0.24',
          opacity5: '0.18',

          // Close icon color
          closeIconColor: themeColors.text.muted,
          closeIconColorHover: themeColors.text.secondary,
          closeIconColorPressed: themeColors.text.primary,

          // Clear icon color
          clearColor: themeColors.text.muted,
          clearColorHover: themeColors.text.secondary,
          clearColorPressed: themeColors.text.primary,
        }
      }
    }

    return baseTheme
  })

  // Actions
  const setTheme = (theme: ThemeMode) => {
    currentTheme.value = theme
  }

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  const initTheme = () => {
    if (isInitialized.value) return

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('sport-shop-theme') as ThemeMode | null
    
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      currentTheme.value = savedTheme
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme.value = prefersDark ? 'dark' : 'light'
    }

    // Apply theme immediately after setting it
    applyTheme(currentTheme.value)
    
    isInitialized.value = true
  }

  // Initialize theme immediately when store is created to prevent flash
  const initThemeOnLoad = () => {
    const savedTheme = localStorage.getItem('sport-shop-theme') as ThemeMode | null
    
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      // Apply dark class immediately if saved theme is dark
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      currentTheme.value = savedTheme
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
        currentTheme.value = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        currentTheme.value = 'light'
      }
    }
  }

  // Call initThemeOnLoad immediately when store is created
  initThemeOnLoad()

  const applyTheme = (theme: ThemeMode) => {
    const htmlElement = document.documentElement
    
    // Apply/remove dark class
    if (theme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('sport-shop-theme', theme)
    
    // Update CSS custom properties for Tailwind
    const root = document.documentElement
    const themeColors = SPORT_THEME[theme]
    
    root.style.setProperty('--bg-primary', themeColors.bg.primary)
    root.style.setProperty('--bg-secondary', themeColors.bg.secondary)
    root.style.setProperty('--text-primary', themeColors.text.primary)
    root.style.setProperty('--text-secondary', themeColors.text.secondary)
    root.style.setProperty('--text-muted', themeColors.text.muted)
    root.style.setProperty('--accent-sport', themeColors.accent.sport)
    root.style.setProperty('--accent-danger', themeColors.accent.danger)
    root.style.setProperty('--accent-warning', themeColors.accent.warning)
    root.style.setProperty('--accent-info', themeColors.accent.info)
    root.style.setProperty('--border-primary', themeColors.border.primary)
    root.style.setProperty('--border-secondary', themeColors.border.secondary)
  }

  const setupSystemThemeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('sport-shop-theme')) {
        currentTheme.value = e.matches ? 'dark' : 'light'
      }
    }
    
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }

  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  return {
    // State
    currentTheme: computed(() => currentTheme.value),
    isDark,
    colors,
    naiveTheme,
    isInitialized: computed(() => isInitialized.value),
    
    // Actions
    setTheme,
    toggleTheme,
    initTheme,
    setupSystemThemeListener,
  }
})
