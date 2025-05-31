// 🏃‍♂️ Sport Constants for Sport Shop

import type { SportCategory, CategoryConfig } from '@/types/sport'

export const SPORT_CATEGORIES: Record<SportCategory, CategoryConfig> = {
  football: {
    name: 'Football',
    icon: '⚽',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-500/10',
  },
  basketball: {
    name: 'Basketball',
    icon: '🏀',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  tennis: {
    name: 'Tennis',
    icon: '🎾',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  running: {
    name: 'Running',
    icon: '🏃',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  gym: {
    name: 'Gym & Fitness',
    icon: '💪',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  swimming: {
    name: 'Swimming',
    icon: '🏊',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  cycling: {
    name: 'Cycling',
    icon: '🚴',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/10',
  },
  fitness: {
    name: 'Fitness',
    icon: '🏋️',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-500/10',
  },
}
