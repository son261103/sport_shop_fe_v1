// 🔐 Authentication Store for Sport Shop using Pinia

import { defineStore } from "pinia";
import { ref, computed, readonly } from "vue";
import { AuthService } from '@/services/auth'
import type { User, LoginRequest, RegisterRequest, AuthError } from '@/types/auth'
import { ENV } from '@/constants'
import { useCartStore } from './cart'

// Environment variables
const AUTH_TOKEN_KEY = ENV.AUTH.TOKEN_KEY

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(AuthService.getToken());
  const isLoading = ref(false);
  const error = ref<AuthError | null>(null);
  const isAuthReady = ref(false); // New state to track initialization

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const isUser = computed(() => user.value?.role === "user");
  const userName = computed(() => user.value?.name || "");
  const userEmail = computed(() => user.value?.email || "");

  // Actions
  const setUser = (userData: User | null) => {
    user.value = userData;
  };

  const setToken = (tokenValue: string | null) => {
    token.value = tokenValue
    if (tokenValue) {
      localStorage.setItem(AUTH_TOKEN_KEY, tokenValue)
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  };

  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  const setError = (errorData: AuthError | string | null) => {
    if (typeof errorData === "string") {
      error.value = { status: false, message: errorData };
    } else {
      error.value = errorData;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  /**
   * Login user with credentials
   */
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setLoading(true);
    clearError();

    try {
      const response = await AuthService.login(credentials);

      if (response.status) {
        setUser(response.data.user);
        setToken(response.data.token);
        
        // Initialize cart after successful login
        try {
          const cartStore = useCartStore();
          await cartStore.initializeCart();
        } catch (cartError) {
          console.error('Failed to initialize cart after login:', cartError);
          // Don't fail login if cart initialization fails
        }
        
        return true;
      }

      return false;
    } catch (error: any) {
      if (error.type === "validation" && error.errors) {
        setError({
          status: false,
          message: error.message || "Đăng nhập thất bại",
          errors: error.errors,
        });
      } else {
        setError(error.message || "Đăng nhập thất bại");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    setLoading(true);
    clearError();

    try {
      const response = await AuthService.register(userData);

      if (response.status) {
        setUser(response.data.user);
        setToken(response.data.token);
        
        // Initialize cart after successful registration
        try {
          const cartStore = useCartStore();
          await cartStore.initializeCart();
        } catch (cartError) {
          console.error('Failed to initialize cart after registration:', cartError);
          // Don't fail registration if cart initialization fails
        }
        
        return true;
      }

      return false;
    } catch (error: any) {
      if (error.type === "validation" && error.errors) {
        setError({
          status: false,
          message: error.message || "Đăng ký thất bại",
          errors: error.errors,
        });
      } else {
        setError(error.message || "Đăng ký thất bại");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    setLoading(true);
    clearError();

    try {
      await AuthService.logout();
    } catch (error: any) {
      console.error("Logout error:", error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local state regardless of API response
      setUser(null);
      setToken(null);
      
      // Clear cart data on logout
      try {
        const cartStore = useCartStore();
        cartStore.clearCart();
      } catch (cartError) {
        console.error('Failed to clear cart during logout:', cartError);
      }
      
      setLoading(false);
    }
  };

  /**
   * Refresh current user data
   */
  const refreshUser = async (): Promise<void> => {
    if (!token.value) return;

    setLoading(true);
    clearError();

    try {
      const userData = await AuthService.getCurrentUser();
      setUser(userData);
    } catch (error: any) {
      console.error("Refresh user error:", error);
      // If refresh fails, user might be logged out
      if (error.status === 401) {
        await logout();
      } else {
        setError(error.message || "Không thể tải thông tin người dùng");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initialize authentication state
   */
  const initAuth = async (): Promise<void> => {
    try {
      const storedToken = AuthService.getToken();
      const storedUser = AuthService.getStoredUser();

      if (storedToken) {
        // Restore token and user data from localStorage
        setToken(storedToken);

        if (storedUser) {
          setUser(storedUser);
        }

        try {
          // Try to refresh user data from server to ensure it's up to date
          await refreshUser();

          // Initialize cart after successful auth restoration
          try {
            const cartStore = useCartStore();
            await cartStore.initializeCart();
          } catch (cartError) {
            console.error('Failed to initialize cart during auth init:', cartError);
            // Don't fail auth if cart initialization fails
          }

        } catch (error: any) {
          console.error("🔐 Auth initialization error:", error);

        // Only try to refresh token if we get a 40
          if (error.type === 'unauthorized' || error.status === 401) {
            console.log('🔐 Attempting token refresh...');
            try {
              const refreshResponse = await AuthService.refreshToken();
              if (refreshResponse.status && refreshResponse.data.token) {
                setToken(refreshResponse.data.token);
                console.log('🔐 Token refreshed successfully');
                // Retry getting user data with new token
                await refreshUser();

                // Initialize cart after successful token refresh
                try {
                  const cartStore = useCartStore();
                  await cartStore.initializeCart();
                } catch (cartError) {
                  console.error('Failed to initialize cart after token refresh:', cartError);
                }

                return;
              }
            } catch (refreshError: any) {
              console.error("🔐 Token refresh failed:", refreshError);
              // Clear authentication for any refresh error
              console.warn('🔐 Token refresh failed. Clearing authentication.');
            }
          }

          // If we have stored user data but can't refresh from server,
          // keep the user logged in with cached data (offline mode)
          if (storedUser && error.type === 'network') {
            console.warn('Network error during auth init. Using cached user data.');

            // Initialize cart even in offline mode
            try {
              const cartStore = useCartStore();
              await cartStore.initializeCart();
            } catch (cartError) {
              console.error('Failed to initialize cart in offline mode:', cartError);
            }

            return;
          }

          // Clear invalid authentication
          console.log('🔐 Clearing invalid authentication data');
          AuthService.clearAuthData();
          setUser(null);
          setToken(null);
        }
      } else {
        console.log('🔐 No stored token found');
      }

      console.log('🔐 Authentication initialization complete. Authenticated:', isAuthenticated.value);
    } finally {
      isAuthReady.value = true;
      console.log('🔐 Auth is ready.');
    }
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role: string): boolean => {
    return user.value?.role === role;
  };

  /**
   * Get redirect path based on user role
   */
  const getRedirectPath = (): string => {
    if (!isAuthenticated.value || !user.value) return "/";
    return user.value.role === "admin" ? "/admin" : "/";
  };

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isAuthReady: readonly(isAuthReady), // Export the new state

    // Getters
    isAuthenticated,
    isAdmin,
    isUser,
    userName,
    userEmail,

    // Actions
    setUser,
    setToken,
    setLoading,
    setError,
    clearError,
    login,
    register,
    logout,
    refreshUser,
    initAuth,
    hasRole,
    getRedirectPath,
  };
});
