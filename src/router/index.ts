import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { userRoutes } from "./userRouter";
import { adminRoutes } from "./adminRouter";
import { useAuthStore } from "@/stores/auth";

// Combine all routes
const routes: RouteRecordRaw[] = [...userRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, _, next) => {
  // Set page title
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }

  // Get auth store instance
  const authStore = useAuthStore();

  // Check authentication requirements
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta?.requiresGuest);
  const requiresAdmin = to.matched.some((record) => record.meta?.requiresAdmin);
  const isAuthenticated = authStore.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if authentication is required but user is not logged in
    next({ name: "Login", query: { redirect: to.fullPath } });
    return;
  }

  if (requiresGuest && isAuthenticated) {
    // Redirect authenticated users away from guest-only pages
    const redirectPath = authStore.getRedirectPath();
    next(redirectPath);
    return;
  }

  if (requiresAdmin && (!isAuthenticated || !authStore.isAdmin)) {
    // Redirect non-admin users away from admin pages
    if (!isAuthenticated) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next("/");
    }
    return;
  }

  next();
});

export default router;
