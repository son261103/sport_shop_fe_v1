// 🎨 Theme Types for Sport Shop

export type ThemeMode = 'light' | 'dark'

export interface ColorPalette {
  bg: {
    primary: string
    secondary: string
    tertiary?: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
  }
  accent: {
    sport: string
    danger: string
    warning: string
    info: string
  }
  border: {
    primary: string
    secondary: string
  }
}

export interface ThemeConfig {
  light: ColorPalette
  dark: ColorPalette
}

export interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
  colors: ColorPalette
}
