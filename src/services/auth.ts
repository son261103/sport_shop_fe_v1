// 🔐 Authentication Service for Sport Shop

import { api } from "./api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth";

// Auth API endpoints
const AUTH_ENDPOINTS = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  ME: "/me",
  REFRESH: "/refresh",
} as const;

export class AuthService {
  /**
   * Register a new user
   */
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER,
        data
      );

      // Store token if registration successful
      if (response.status && response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
      }

      return response;
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  /**
   * Login user
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, data);

      // Store token and user data if login successful
      if (response.status && response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user_data", JSON.stringify(response.data.user));

        // Store remember preference
        if (data.remember) {
          localStorage.setItem("remember_me", "true");
        }
      }

      return response;
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<{ status: boolean; message: string }> {
    try {
      const response = await api.post<{ status: boolean; message: string }>(
        AUTH_ENDPOINTS.LOGOUT
      );

      // Clear stored data regardless of API response
      this.clearAuthData();

      return response;
    } catch (error: any) {
      console.error("Logout error:", error);
      // Clear data even if API call fails
      this.clearAuthData();
      throw error;
    }
  }

  /**
   * Get current user data
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<{ user: User }>(AUTH_ENDPOINTS.ME);
      return response.user;
    } catch (error: any) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem("auth_token");
    return !!token;
  }

  /**
   * Get stored auth token
   */
  static getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  /**
   * Get stored user data
   */
  static getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  }

  /**
   * Clear all authentication data
   */
  static clearAuthData(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("remember_me");
  }

  /**
   * Check if remember me was selected
   */
  static isRememberMe(): boolean {
    return localStorage.getItem("remember_me") === "true";
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Mật khẩu phải có ít nhất 8 ký tự");
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ thường");
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ hoa");
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 số");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Export default instance
export default AuthService;
