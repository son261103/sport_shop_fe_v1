// 🔐 Authentication Types for Sport Shop

export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    role: string;
    remember?: boolean;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthError {
  status: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ValidationErrors {
  [key: string]: string[];
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  password_confirmation?: string;
  remember?: boolean;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  name?: string;
  password_confirmation?: string;
  general?: string;
}
