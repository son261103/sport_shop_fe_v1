<template>
  <div
    class="min-h-screen flex items-center justify-center bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary font-sans relative overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div
      class="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-gradient-to-br from-light-accent-sport/20 to-transparent rounded-full blur-3xl animate-pulse"
    ></div>
    <div
      class="absolute bottom-[-12rem] right-[-12rem] w-96 h-96 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse"
      style="animation-delay: 2s"
    ></div>
    <div
      class="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl animate-pulse"
      style="animation-delay: 1s"
    ></div>
    <div
      class="absolute top-20 right-40 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
    ></div>
    <div
      class="absolute bottom-10 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
      style="animation-delay: 1.5s"
    ></div>
    <div
      class="absolute bottom-40 left-10 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"
      style="animation-delay: 2.5s"
    ></div>

    <div class="w-full max-w-6xl flex z-10">
      <!-- Left Side - Information Panel -->
      <div
        class="hidden lg:flex lg:w-1/2 flex-col justify-center items-start p-12 space-y-8"
      >
        <div
          class="w-20 h-20 bg-light-accent-sport dark:bg-dark-accent-sport rounded-2xl flex items-center justify-center shadow-lg"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div class="space-y-4">
          <h1
            class="text-5xl font-bold text-light-text-primary dark:text-dark-text-primary tracking-tight"
          >
            Đăng nhập
          </h1>
          <h2
            class="text-6xl font-black text-light-accent-sport dark:text-dark-accent-sport"
          >
            Sport Shop
          </h2>
          <p
            class="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-md"
          >
            Chào mừng trở lại! Tiếp tục hành trình khám phá thế giới thể thao
            cùng chúng tôi
          </p>
        </div>

        <div class="space-y-3 text-left pt-4">
          <div class="flex items-center gap-3">
            <div
              class="w-6 h-6 bg-light-accent-sport/20 dark:bg-dark-accent-sport/20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span
              class="text-light-text-primary dark:text-dark-text-primary font-medium"
              >Truy cập nhanh vào tài khoản</span
            >
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-6 h-6 bg-light-accent-sport/20 dark:bg-dark-accent-sport/20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span
              class="text-light-text-primary dark:text-dark-text-primary font-medium"
              >Theo dõi đơn hàng dễ dàng</span
            >
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-6 h-6 bg-light-accent-sport/20 dark:bg-dark-accent-sport/20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span
              class="text-light-text-primary dark:text-dark-text-primary font-medium"
              >Ưu đãi độc quyền cho thành viên</span
            >
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div class="max-w-md w-full space-y-6">
          <div
            class="bg-light-bg-secondary/60 dark:bg-dark-bg-secondary/60 backdrop-blur-lg p-8 rounded-2xl border border-light-border-secondary/50 dark:border-dark-border-secondary/50"
          >
            <div class="flex justify-end mb-4">
              <button
                type="button"
                @click="toggleTheme"
                class="p-2 rounded-lg border border-light-accent-sport/50 dark:border-dark-accent-sport/50 text-light-accent-sport dark:text-dark-accent-sport hover:bg-light-accent-sport/10 dark:hover:bg-dark-accent-sport/10 transition-colors duration-300"
              >
                <svg
                  v-if="isDark"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                  />
                </svg>
              </button>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <div>
                <label for="email" class="form-label mb-2">
                  <span class="flex items-center gap-2">
                    <svg
                      class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    Email
                  </span>
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    class="form-input"
                    placeholder="Nhập email của bạn"
                    :disabled="isLoading"
                  />
                </div>
                <p
                  v-if="formErrors.email"
                  class="mt-2 text-sm text-red-400 animate-shake"
                >
                  {{ formErrors.email }}
                </p>
              </div>

              <div>
                <label for="password" class="form-label mb-2">
                  <span class="flex items-center gap-2">
                    <svg
                      class="w-4 h-4 text-light-accent-sport dark:text-dark-accent-sport"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Mật khẩu
                  </span>
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="form-input"
                    placeholder="Nhập mật khẩu"
                    :disabled="isLoading"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-light-text-muted dark:text-dark-text-muted hover:text-light-accent-sport dark:hover:text-dark-accent-sport"
                  >
                    <svg
                      v-if="showPassword"
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                <p
                  v-if="formErrors.password"
                  class="mt-2 text-sm text-red-400 animate-shake"
                >
                  {{ formErrors.password }}
                </p>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember"
                    v-model="formData.remember"
                    type="checkbox"
                    class="h-4 w-4 bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-border-primary dark:border-dark-border-primary text-light-accent-sport dark:text-dark-accent-sport focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport rounded"
                    :disabled="isLoading"
                  />
                  <label
                    for="remember"
                    class="ml-2 block text-sm text-light-text-secondary dark:text-dark-text-secondary"
                    >Ghi nhớ đăng nhập</label
                  >
                </div>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-light-accent-sport dark:text-dark-accent-sport hover:text-light-accent-sport/80 dark:hover:text-dark-accent-sport/80"
                    >Quên mật khẩu?</a
                  >
                </div>
              </div>

              <p
                v-if="formErrors.general"
                class="text-sm text-red-400 text-center"
              >
                {{ formErrors.general }}
              </p>

              <div>
                <button
                  type="submit"
                  class="btn-primary w-full"
                  :disabled="isLoading || !isFormValid"
                >
                  <Loading
                    v-if="isLoading"
                    size="sm"
                    color="white"
                    class="mr-2"
                  />
                  <svg
                    v-else
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span v-if="isLoading">Đang đăng nhập...</span>
                  <span v-else>Đăng nhập</span>
                </button>
              </div>
            </form>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div
                    class="w-full border-t border-light-border-primary dark:border-dark-border-primary"
                  ></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span
                    class="px-2 bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-muted dark:text-dark-text-muted rounded-full"
                    >Hoặc</span
                  >
                </div>
              </div>
            </div>

            <div class="mt-6 text-center">
              <p
                class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
              >
                Chưa có tài khoản?
                <router-link
                  to="/register"
                  class="font-medium text-light-accent-sport dark:text-dark-accent-sport hover:text-light-accent-sport/80 dark:hover:text-dark-accent-sport/80"
                >
                  Đăng ký ngay
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useTheme, useNaiveTheme } from "@/composables/useTheme";
import { Loading } from "@/components/ui";
import type { LoginRequest, AuthFormData, AuthFormErrors } from "@/types/auth";

const { login, isLoading, error, clearError, isAuthenticated, redirectByRole } =
  useAuth();

const { isDark } = useNaiveTheme();
const { toggleTheme } = useTheme();

// Form state
const formData = ref<AuthFormData>({
  email: "",
  password: "",
  remember: false,
});

const formErrors = ref<AuthFormErrors>({});
const showPassword = ref(false);

// Email validation helper
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Computed
const isFormValid = computed(() => {
  return (
    formData.value.email &&
    formData.value.password &&
    validateEmail(formData.value.email) &&
    !Object.keys(formErrors.value).length
  );
});

// Methods
const validateForm = (): boolean => {
  const errors: AuthFormErrors = {};

  // Email validation
  if (!formData.value.email) {
    errors.email = "Email là bắt buộc";
  } else if (!validateEmail(formData.value.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Password validation
  if (!formData.value.password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (formData.value.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const handleLogin = async (): Promise<void> => {
  if (!validateForm()) return;

  clearError();
  formErrors.value = {};

  try {
    const loginData: LoginRequest = {
      email: formData.value.email,
      password: formData.value.password,
      remember: formData.value.remember,
    };

    const success = await login(loginData);

    if (!success && error.value) {
      // Handle validation errors from server
      if (error.value.errors) {
        Object.keys(error.value.errors).forEach((key) => {
          if (key in formErrors.value && error.value?.errors?.[key]) {
            formErrors.value[key as keyof AuthFormErrors] =
              error.value.errors[key][0];
          }
        });
      } else {
        // Handle general server error
        formErrors.value.general =
          error.value.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      }
    }
  } catch (err: any) {
    console.error("Login error:", err);
    formErrors.value.general = "Đăng nhập thất bại. Vui lòng thử lại.";
  }
};

// Check if user is already logged in
onMounted(() => {
  if (isAuthenticated.value) {
    redirectByRole();
  }
});
</script>
