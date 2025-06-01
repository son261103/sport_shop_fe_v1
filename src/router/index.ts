import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { userRoutes } from './userRouter'
import { adminRoutes } from './adminRouter'

// Combine all routes
const routes: RouteRecordRaw[] = [
  ...userRoutes,
  ...adminRoutes
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
