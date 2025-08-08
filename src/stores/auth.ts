// 🔐 Authentication Store for Sport Shop using Pinia

import { defineStore } from "pinia";
import { ref, computed, readonly } from "vue";
import { AuthService } from '@/services/auth'
import type { User, LoginRequest, RegisterRequest, AuthError } from '@/types/auth'
import { ENV } from '@/constants'

// Environment variables
const AUTH_TOKEN_KEY = ENV.AUTH.TOKEN_KEY

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(AuthService.getToken());
  const isLoading = ref(false);
  const error = ref<AuthError | null>(null);

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
   * Logout current user
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
    console.log('🔐 Initializing authentication...');

    const storedToken = AuthService.getToken();
    const storedUser = AuthService.getStoredUser();

    console.log('🔐 Stored token exists:', !!storedToken);
    console.log('🔐 Stored user exists:', !!storedUser);

    if (storedToken) {
      // Set token first
      setToken(storedToken);
      console.log('🔐 Token set in store');

      // If we have stored user data, set it temporarily
      if (storedUser) {
        setUser(storedUser);
        console.log('🔐 User data restored from localStorage:', storedUser.name);
      }

      try {
        // Try to get fresh user data from server
        console.log('🔐 Fetching fresh user data from server...');
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
        console.log('🔐 Fresh user data loaded:', userData.name);
      } catch (error: any) {
        console.error("🔐 Auth initialization error:", error);

        // Only try to refresh token if we get a 401 error (unauthorized)
        if (error.type === 'unauthorized' || error.status === 401) {
          console.log('🔐 Attempting token refresh...');
          try {
            const refreshResponse = await AuthService.refreshToken();
            if (refreshResponse.status && refreshResponse.data.token) {
              setToken(refreshResponse.data.token);
              console.log('🔐 Token refreshed successfully');
              // Retry getting user data with new token
              const userData = await AuthService.getCurrentUser();
              setUser(userData);
              console.log('🔐 User data loaded after token refresh:', userData.name);
              return;
            }
          } catch (refreshError: any) {
            console.error("🔐 Token refresh failed:", refreshError);
            // Clear authentication for any refresh error
            console.warn('🔐 Token refresh failed. Clearing authentication.');
          }
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
