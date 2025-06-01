import type { RouteRecordRaw } from 'vue-router'

// Public Routes with DefaultLayout
export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'Home - Sport Shop'
        }
      },
      {
        path: 'components',
        name: 'ComponentShowcase',
        component: () => import('@/views/ComponentShowcase.vue'),
        meta: {
          title: 'Component Showcase - Sport Shop'
        }
      }
    ]
  }
]