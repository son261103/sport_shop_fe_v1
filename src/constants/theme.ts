// 🎨 Theme Constants for Sport Shop

import type { ThemeConfig } from '@/types/theme'

export const SPORT_THEME: ThemeConfig = {
  light: {
    bg: {
      primary: '#F8F9FA',
      secondary: '#E9ECEF',
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
      muted: '#ADB5BD',
    },
    accent: {
      sport: '#00C897',
      danger: '#EF233C',
      warning: '#FFC107',
      info: '#17A2B8',
    },
    border: {
      primary: '#CED4DA',
      secondary: '#DEE2E6',
    },
  },
  dark: {
    bg: {
      primary: '#000000',
      secondary: '#000000',
      tertiary: '#000000',
    },
    text: {
      primary: '#F8F9FA',
      secondary: '#E9ECEF',
      muted: '#6C757D',
    },
    accent: {
      sport: '#00E5A1',
      danger: '#FF4757',
      warning: '#FFA726',
      info: '#26C6DA',
    },
    border: {
      primary: '#2C2C2C',
      secondary: '#404040',
    },
  },
}
