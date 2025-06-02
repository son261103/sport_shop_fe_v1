// 🔐 Authentication Hook for Sport Shop

import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

/**
 * Custom hook for authentication operations
 * Provides reactive authentication state and methods
 */
export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  // Reactive state from store
  const user = computed(() => authStore.user);
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const isLoading = computed(() => authStore.isLoading);
  const error = computed(() => authStore.error);
  const isAdmin = computed(() => authStore.isAdmin);
  const isUser = computed(() => authStore.isUser);
  const userName = computed(() => authStore.userName);
  const userEmail = computed(() => authStore.userEmail);

  /**
   * Login user and redirect based on role
   */
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const success = await authStore.login(credentials);

      if (success) {
        const redirectPath = authStore.getRedirectPath();
        await router.push(redirectPath);
      }

      return success;
    } catch (error) {
      console.error("Login hook error:", error);
      return false;
    }
  };

  /**
   * Register user and redirect based on role
   */
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      const success = await authStore.register(userData);

      if (success) {
        const redirectPath = authStore.getRedirectPath();
        await router.push(redirectPath);
      }

      return success;
    } catch (error) {
      console.error("Register hook error:", error);
      return false;
    }
  };

  /**
   * Logout user and redirect to home
   */
  const logout = async (): Promise<void> => {
    try {
      await authStore.logout();
      await router.push("/");
    } catch (error) {
      console.error("Logout hook error:", error);
      // Force redirect even if logout fails
      await router.push("/");
    }
  };

  /**
   * Refresh user data
   */
  const refreshUser = async (): Promise<void> => {
    await authStore.refreshUser();
  };

  /**
   * Clear authentication error
   */
  const clearError = (): void => {
    authStore.clearError();
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role: string): boolean => {
    return authStore.hasRole(role);
  };

  /**
   * Redirect user based on their role
   */
  const redirectByRole = async (): Promise<void> => {
    if (isAuthenticated.value) {
      const redirectPath = authStore.getRedirectPath();
      await router.push(redirectPath);
    }
  };

  /**
   * Initialize authentication on app startup
   */
  const initAuth = async (): Promise<void> => {
    await authStore.initAuth();
  };

  /**
   * Check if user is authenticated and redirect if not
   */
  const requireAuth = async (
    redirectTo: string = "/login"
  ): Promise<boolean> => {
    if (!isAuthenticated.value) {
      await router.push({
        path: redirectTo,
        query: { redirect: router.currentRoute.value.fullPath },
      });
      return false;
    }
    return true;
  };

  /**
   * Check if user is admin and redirect if not
   */
  const requireAdmin = async (redirectTo: string = "/"): Promise<boolean> => {
    if (!isAuthenticated.value) {
      await router.push({
        path: "/login",
        query: { redirect: router.currentRoute.value.fullPath },
      });
      return false;
    }

    if (!isAdmin.value) {
      await router.push(redirectTo);
      return false;
    }

    return true;
  };

  /**
   * Check if user is guest (not authenticated) and redirect if authenticated
   */
  const requireGuest = async (): Promise<boolean> => {
    if (isAuthenticated.value) {
      const redirectPath = authStore.getRedirectPath();
      await router.push(redirectPath);
      return false;
    }
    return true;
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    isUser,
    userName,
    userEmail,

    // Methods
    login,
    register,
    logout,
    refreshUser,
    clearError,
    hasRole,
    redirectByRole,
    initAuth,
    requireAuth,
    requireAdmin,
    requireGuest,
  };
}
