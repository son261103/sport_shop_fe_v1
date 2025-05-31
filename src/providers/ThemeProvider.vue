<template>
  <n-config-provider
    :theme="isDark ? darkTheme : null"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <n-global-style />
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <slot />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  darkTheme,
  type GlobalThemeOverrides
} from 'naive-ui'
import { useNaiveTheme } from '@/composables/useTheme'

// Locale imports - Vietnamese locale
import { viVN, dateViVN } from 'naive-ui'

const { isDark } = useNaiveTheme()

// Locale configuration - Vietnamese
const locale = computed(() => viVN)
const dateLocale = computed(() => dateViVN)

// Theme overrides for better integration with Tailwind
const themeOverrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    // Font family to match Tailwind's default
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    
    // Border radius to match Tailwind's default
    borderRadius: '0.375rem', // rounded-md
    borderRadiusSmall: '0.25rem', // rounded
    
    // Line height
    lineHeight: '1.5',
    
    // Animation duration
    cubicBezierEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Tailwind's ease-in-out
    
    // Z-index values to work well with Tailwind
    popoverZIndex: 1000,
    modalZIndex: 1000,
    drawerZIndex: 1000,
    
    // Scrollbar styling
    scrollbarColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    scrollbarColorHover: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
  },
  
  // Button overrides
  Button: {
    borderRadiusMedium: '0.5rem', // rounded-lg
    borderRadiusSmall: '0.375rem', // rounded-md
    borderRadiusLarge: '0.75rem', // rounded-xl
    
    // Font weight
    fontWeightMedium: '500', // font-medium
    fontWeightStrong: '600', // font-semibold
    
    // Padding
    paddingMedium: '0.5rem 1rem', // py-2 px-4
    paddingSmall: '0.375rem 0.75rem', // py-1.5 px-3
    paddingLarge: '0.75rem 1.5rem', // py-3 px-6
    
    // Height
    heightMedium: '2.5rem', // h-10
    heightSmall: '2rem', // h-8
    heightLarge: '3rem', // h-12
  },
  
  // Input overrides
  Input: {
    borderRadius: '0.5rem', // rounded-lg
    paddingMedium: '0.5rem 0.75rem', // py-2 px-3
    paddingSmall: '0.375rem 0.5rem', // py-1.5 px-2
    paddingLarge: '0.75rem 1rem', // py-3 px-4
    
    heightMedium: '2.5rem', // h-10
    heightSmall: '2rem', // h-8
    heightLarge: '3rem', // h-12
  },
  
  // Card overrides
  Card: {
    borderRadius: '0.75rem', // rounded-xl
    paddingMedium: '1.5rem', // p-6
    paddingSmall: '1rem', // p-4
    paddingLarge: '2rem', // p-8
  },
  
  // Modal overrides
  Modal: {
    borderRadius: '0.75rem', // rounded-xl
  },
  
  // Drawer overrides
  Drawer: {
    borderRadius: '0.75rem', // rounded-xl
  },
  
  // Popover overrides
  Popover: {
    borderRadius: '0.5rem', // rounded-lg
    padding: '0.75rem', // p-3
  },
  
  // Tooltip overrides
  Tooltip: {
    borderRadius: '0.375rem', // rounded-md
    padding: '0.5rem 0.75rem', // py-2 px-3
  },
  
  // Tag overrides
  Tag: {
    borderRadius: '9999px', // rounded-full
    padding: '0.125rem 0.625rem', // py-0.5 px-2.5
  },
  
  // Badge overrides
  Badge: {
    borderRadius: '9999px', // rounded-full
  },
  
  // Avatar overrides
  Avatar: {
    borderRadius: '9999px', // rounded-full
  },
  
  // Progress overrides
  Progress: {
    borderRadius: '9999px', // rounded-full
  },
  
  // Slider overrides
  Slider: {
    railBorderRadius: '9999px', // rounded-full
    fillBorderRadius: '9999px', // rounded-full
    handleBorderRadius: '9999px', // rounded-full
  },
  
  // Switch overrides
  Switch: {
    borderRadius: '9999px', // rounded-full
  },
  
  // Rate overrides
  Rate: {
    itemSize: '1.25rem', // w-5 h-5
  },
  
  // Pagination overrides
  Pagination: {
    itemBorderRadius: '0.375rem', // rounded-md
  },
  
  // Steps overrides
  Steps: {
    indicatorBorderRadius: '9999px', // rounded-full
  },
  
  // Timeline overrides
  Timeline: {
    iconBorderRadius: '9999px', // rounded-full
  },
  
  // Upload overrides
  Upload: {
    borderRadius: '0.5rem', // rounded-lg
  },
  
  // Table overrides
  DataTable: {
    borderRadius: '0.5rem', // rounded-lg
    thPaddingMedium: '0.75rem', // p-3
    tdPaddingMedium: '0.75rem', // p-3
  },
  
  // Menu overrides
  Menu: {
    borderRadius: '0.375rem', // rounded-md
    itemBorderRadius: '0.25rem', // rounded
  },
  
  // Dropdown overrides
  Dropdown: {
    borderRadius: '0.5rem', // rounded-lg
    optionBorderRadius: '0.25rem', // rounded
    padding: '0.25rem', // p-1
  },
  
  // Select overrides
  Select: {
    borderRadius: '0.5rem', // rounded-lg
    optionBorderRadius: '0.25rem', // rounded
  },
  
  // Cascader overrides
  Cascader: {
    borderRadius: '0.5rem', // rounded-lg
    optionBorderRadius: '0.25rem', // rounded
  },
  
  // Tree overrides
  Tree: {
    borderRadius: '0.375rem', // rounded-md
    nodeBorderRadius: '0.25rem', // rounded
  },
  
  // Transfer overrides
  Transfer: {
    borderRadius: '0.5rem', // rounded-lg
    itemBorderRadius: '0.25rem', // rounded
  },
  
  // Calendar overrides
  Calendar: {
    borderRadius: '0.5rem', // rounded-lg
    dayBorderRadius: '0.25rem', // rounded
  },
  
  // DatePicker overrides
  DatePicker: {
    borderRadius: '0.5rem', // rounded-lg
    panelBorderRadius: '0.5rem', // rounded-lg
  },
  
  // TimePicker overrides
  TimePicker: {
    borderRadius: '0.5rem', // rounded-lg
    panelBorderRadius: '0.5rem', // rounded-lg
  },
  
  // ColorPicker overrides
  ColorPicker: {
    borderRadius: '0.5rem', // rounded-lg
  },
  
  // Form overrides
  Form: {
    labelFontSizeTopMedium: '0.875rem', // text-sm
    labelFontWeight: '500', // font-medium
  },
  
  // Tabs overrides
  Tabs: {
    tabBorderRadius: '0.375rem', // rounded-md
    paneBorderRadius: '0.5rem', // rounded-lg
  },
  
  // Collapse overrides
  Collapse: {
    borderRadius: '0.5rem', // rounded-lg
    itemBorderRadius: '0.375rem', // rounded-md
  },
  
  // Alert overrides
  Alert: {
    borderRadius: '0.5rem', // rounded-lg
    padding: '1rem', // p-4
  },
  
  // Result overrides
  Result: {
    iconSize: '4rem', // w-16 h-16
  },
  
  // Statistic overrides
  Statistic: {
    valueFontSize: '1.875rem', // text-3xl
  },
  
  // Empty overrides
  Empty: {
    iconSize: '3rem', // w-12 h-12
  },
  
  // Spin overrides
  Spin: {
    borderRadius: '9999px', // rounded-full
  },
  
  // BackTop overrides
  BackTop: {
    borderRadius: '9999px', // rounded-full
  },
  
  // Anchor overrides
  Anchor: {
    borderRadius: '0.25rem', // rounded
  },
  
  // Affix overrides
  Affix: {
    borderRadius: '0.5rem', // rounded-lg
  },
}))
</script>
