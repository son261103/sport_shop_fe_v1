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
router.beforeEach(async (to, from, next) => {
  // Set page title
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }

  // Get auth store instance
  const authStore = useAuthStore();

  // Check if we're navigating from login/register pages
  const isFromAuth = from.name === 'Login' || from.name === 'Register';

  // If coming from auth pages and we have a token, ensure auth state is properly initialized
  if (isFromAuth && authStore.token && !authStore.user) {
    try {
      console.log('🔄 Refreshing user data after login/register...');
      await authStore.refreshUser();
    } catch (error) {
      console.error('Failed to refresh user after auth:', error);
    }
  }

  // Check authentication requirements
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta?.requiresGuest);
  const requiresAdmin = to.matched.some((record) => record.meta?.requiresAdmin);
  const isAuthenticated = authStore.isAuthenticated;

  console.log('🔍 Router guard check:', {
    to: to.name,
    from: from.name,
    requiresAuth,
    requiresGuest,
    requiresAdmin,
    isAuthenticated,
    hasToken: !!authStore.token,
    hasUser: !!authStore.user
  });

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if authentication is required but user is not logged in
    console.log('🚫 Redirecting to login - auth required but not authenticated');
    next({ name: "Login", query: { redirect: to.fullPath } });
    return;
  }

  if (requiresGuest && isAuthenticated) {
    // Redirect authenticated users away from guest-only pages
    console.log('🚫 Redirecting authenticated user away from guest page');
    const redirectPath = authStore.getRedirectPath();
    next(redirectPath);
    return;
  }

  if (requiresAdmin && (!isAuthenticated || !authStore.isAdmin)) {
    // Redirect non-admin users away from admin pages
    console.log('🚫 Redirecting non-admin user away from admin page');
    if (!isAuthenticated) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next("/");
    }
    return;
  }

  console.log('✅ Navigation allowed');
  next();
});

export default router;
