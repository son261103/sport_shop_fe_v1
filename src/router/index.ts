import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home - Sport Shop'
    }
  },
  {
    path: '/components',
    name: 'ComponentShowcase',
    component: () => import('@/views/ComponentShowcase.vue'),
    meta: {
      title: 'Component Showcase - Sport Shop'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  // Set page title
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
