<template>
  <div
    class="min-h-screen bg-gradient-to-br from-light-bg-primary via-light-accent-sport/5 to-light-accent-sport/10 dark:from-dark-bg-primary dark:via-dark-accent-sport/5 dark:to-dark-accent-sport/10 relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating Orbs -->
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-light-accent-sport/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/15 to-light-accent-sport/15 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"
        style="animation-delay: 1s"
      ></div>

      <!-- Geometric Patterns -->
      <div
        class="absolute top-20 left-20 w-4 h-4 bg-light-accent-sport/30 rounded-full animate-bounce"
        style="animation-delay: 0.5s"
      ></div>
      <div
        class="absolute top-40 right-32 w-3 h-3 bg-purple-500/40 rounded-full animate-bounce"
        style="animation-delay: 1.5s"
      ></div>
      <div
        class="absolute bottom-32 left-32 w-2 h-2 bg-blue-500/50 rounded-full animate-bounce"
        style="animation-delay: 2.5s"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-5 h-5 bg-pink-500/30 rounded-full animate-bounce"
        style="animation-delay: 3s"
      ></div>
    </div>

    <!-- Sports Pattern Background -->
    <div
      class="absolute inset-0 bg-sports-pattern opacity-4 dark:opacity-10"
    ></div>

    <!-- Additional Sports Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Soccer Ball Pattern -->
      <div
        class="absolute top-10 left-10 w-8 h-8 bg-sports-ball opacity-20 rounded-full animate-spin-slow"
      ></div>
      <div
        class="absolute top-32 right-20 w-6 h-6 bg-sports-ball opacity-15 rounded-full animate-spin-slow"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute bottom-20 left-32 w-10 h-10 bg-sports-ball opacity-10 rounded-full animate-spin-slow"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute bottom-40 right-40 w-4 h-4 bg-sports-ball opacity-25 rounded-full animate-spin-slow"
        style="animation-delay: 3s"
      ></div>

      <!-- Basketball Lines -->
      <div
        class="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-orange-400/20 rounded-full animate-pulse"
        style="animation-delay: 0.5s"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-orange-400/15 rounded-full animate-pulse"
        style="animation-delay: 2.5s"
      ></div>

      <!-- Tennis Net Pattern -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-tennis-net opacity-10 transform rotate-45"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-24 h-24 bg-tennis-net opacity-8 transform -rotate-45"
      ></div>
    </div>

    <!-- Main Container with Two Columns -->
    <div class="relative z-10 min-h-screen flex">
      <!-- Left Side - Information Panel -->
      <div
        class="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-center"
      >
        <div class="max-w-lg space-y-8 animate-fade-in">
          <!-- Logo and Brand -->
          <div class="flex justify-center mb-8">
            <div
              class="w-24 h-24 bg-gradient-sport rounded-3xl flex items-center justify-center shadow-sport transform hover:scale-110 transition-all duration-500 hover:rotate-6 group"
            >
              <svg
                class="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300"
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
          </div>

          <!-- Welcome Message -->
          <div class="space-y-6">
            <h1
              class="text-5xl font-bold text-gradient-sport-animated tracking-tight"
            >
              Đăng nhập
            </h1>
            <h2 class="text-6xl font-black text-gradient-sport">Sport Shop</h2>
            <p
              class="text-xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              Chào mừng trở lại! Tiếp tục hành trình khám phá thế giới thể thao
              cùng chúng tôi
            </p>
          </div>

          <!-- Features List -->
          <div class="space-y-4 text-left">
            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 bg-gradient-sport rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
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
              >
                Truy cập nhanh vào tài khoản
              </span>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 bg-gradient-sport rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
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
              >
                Theo dõi đơn hàng dễ dàng
              </span>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 bg-gradient-sport rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
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
              >
                Ưu đãi độc quyền cho thành viên
              </span>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="flex justify-center space-x-2 mt-8">
            <div
              class="w-3 h-3 bg-gradient-sport rounded-full animate-pulse"
            ></div>
            <div
              class="w-3 h-3 bg-gradient-sport rounded-full animate-pulse"
              style="animation-delay: 0.5s"
            ></div>
            <div
              class="w-3 h-3 bg-gradient-sport rounded-full animate-pulse"
              style="animation-delay: 1s"
            ></div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div
        class="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-md w-full space-y-4 animate-fade-in">
          <!-- Enhanced Login Form -->
          <div
            class="card p-8 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02]"
          >
            <form @submit.prevent="handleLogin" class="space-y-2">
              <!-- Enhanced Email Field -->
              <div class="group">
                <label
                  for="email"
                  class="form-label text-light-text-primary dark:text-dark-text-primary font-medium mb-3 block"
                >
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
                    autocomplete="email"
                    required
                    class="form-input pl-12 pr-4 h-14 text-base backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-2 transition-all duration-300 group-hover:border-light-accent-sport/50 dark:group-hover:border-dark-accent-sport/50"
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500':
                        formErrors.email,
                      'border-green-500 focus:ring-green-500 focus:border-green-500':
                        formData.email && !formErrors.email,
                      'border-light-border-primary dark:border-dark-border-primary focus:border-light-accent-sport dark:focus:border-dark-accent-sport':
                        !formErrors.email,
                    }"
                    placeholder="Nhập email của bạn"
                    :disabled="isLoading"
                  />
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-light-text-muted dark:text-dark-text-muted group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-300"
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
                  </div>
                  <!-- Success indicator -->
                  <div
                    v-if="formData.email && !formErrors.email"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <svg
                      class="h-5 w-5 text-green-500 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <p
                  v-if="formErrors.email"
                  class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake"
                >
                  {{ formErrors.email }}
                </p>
              </div>

              <!-- Enhanced Password Field -->
              <div class="group mt-3">
                <label
                  for="password"
                  class="form-label text-light-text-primary dark:text-dark-text-primary font-medium mb-3 block"
                >
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
                    autocomplete="current-password"
                    required
                    class="form-input pl-12 pr-12 h-14 text-base backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-2 transition-all duration-300 group-hover:border-light-accent-sport/50 dark:group-hover:border-dark-accent-sport/50"
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500':
                        formErrors.password,
                      'border-green-500 focus:ring-green-500 focus:border-green-500':
                        formData.password && !formErrors.password,
                      'border-light-border-primary dark:border-dark-border-primary focus:border-light-accent-sport dark:focus:border-dark-accent-sport':
                        !formErrors.password,
                    }"
                    placeholder="Nhập mật khẩu"
                    :disabled="isLoading"
                  />
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-light-text-muted dark:text-dark-text-muted group-hover:text-light-accent-sport dark:group-hover:text-dark-accent-sport transition-colors duration-300"
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
                  </div>
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                    :disabled="isLoading"
                  >
                    <svg
                      v-if="showPassword"
                      class="h-5 w-5 text-light-text-muted dark:text-dark-text-muted hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors duration-300"
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
                      class="h-5 w-5 text-light-text-muted dark:text-dark-text-muted hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors duration-300"
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
                  <!-- Success indicator -->
                  <div
                    v-if="
                      formData.password && !formErrors.password && !showPassword
                    "
                    class="absolute inset-y-0 right-12 pr-2 flex items-center"
                  >
                    <svg
                      class="h-4 w-4 text-green-500 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <p
                  v-if="formErrors.password"
                  class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake"
                >
                  {{ formErrors.password }}
                </p>
              </div>

              <!-- Enhanced Remember Me & Forgot Password -->
              <div class="flex items-center justify-between pt-1">
                <div class="flex items-center group">
                  <div class="relative">
                    <input
                      id="remember"
                      v-model="formData.remember"
                      type="checkbox"
                      class="h-5 w-5 text-light-accent-sport dark:text-dark-accent-sport focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport border-2 border-light-border-primary dark:border-dark-border-primary rounded-md transition-all duration-300 hover:border-light-accent-sport dark:hover:border-dark-accent-sport"
                      :disabled="isLoading"
                    />
                    <div
                      v-if="formData.remember"
                      class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <svg
                        class="w-3 h-3 text-white animate-scale-in"
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
                  </div>
                  <label
                    for="remember"
                    class="ml-3 block text-sm text-light-text-secondary dark:text-dark-text-secondary group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary transition-colors duration-300 cursor-pointer"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-light-accent-sport dark:text-dark-accent-sport hover:text-light-accent-sport/80 dark:hover:text-dark-accent-sport/80 transition-all duration-300 hover:underline underline-offset-4"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <!-- General Error -->
              <div
                v-if="formErrors.general"
                class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
              >
                <div class="flex">
                  <svg
                    class="h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm text-red-800 dark:text-red-200">
                      {{ formErrors.general }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Enhanced Submit Button -->
              <div class="pt-1">
                <button
                  type="submit"
                  class="btn-primary-animated w-full flex justify-center items-center py-4 text-base font-semibold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                  :disabled="isLoading || !isFormValid"
                >
                  <!-- Button background animation -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-light-accent-sport via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></div>
                  <div class="relative z-10 flex items-center">
                    <Loading
                      v-if="isLoading"
                      size="sm"
                      color="white"
                      class="mr-3"
                    />
                    <svg
                      v-else
                      class="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300"
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
                    <span v-if="isLoading" class="animate-pulse"
                      >Đang đăng nhập...</span
                    >
                    <span v-else>Đăng nhập</span>
                  </div>
                  <!-- Ripple effect -->
                  <div
                    class="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 rounded-2xl transition-transform duration-200"
                  ></div>
                </button>
              </div>
            </form>

            <!-- Enhanced Divider -->
            <div class="mt-1">
              <div class="relative py-1">
                <div class="absolute inset-0 flex items-center">
                  <div
                    class="w-full border-t border-gradient-to-r from-transparent via-light-border-primary to-transparent dark:via-dark-border-primary opacity-50"
                  ></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span
                    class="px-3 py-0.5 bg-light-bg-primary/80 dark:bg-dark-bg-primary/80 backdrop-blur-sm text-light-text-secondary dark:text-dark-text-secondary rounded-full border border-light-border-primary/30 dark:border-dark-border-primary/30"
                  >
                    Hoặc
                  </span>
                </div>
              </div>
            </div>

            <!-- Enhanced Register Link -->
            <div class="mt-0.5 text-center">
              <div>
                <p
                  class="text-sm text-light-text-secondary dark:text-dark-text-secondary"
                >
                  Chưa có tài khoản?
                  <router-link
                    to="/register"
                    class="font-semibold text-light-accent-sport dark:text-dark-accent-sport hover:text-light-accent-sport/80 dark:hover:text-dark-accent-sport/80 transition-all duration-300 hover:underline underline-offset-4 ml-1 relative group"
                  >
                    Đăng ký ngay
                    <svg
                      class="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </router-link>
                </p>
              </div>
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
import { Loading } from "@/components/ui";
import type { LoginRequest, AuthFormData, AuthFormErrors } from "@/types/auth";

const { login, isLoading, error, clearError, isAuthenticated, redirectByRole } =
  useAuth();

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

<style scoped>
/* Enhanced Background Animation */
.bg-gradient-page {
  background: linear-gradient(
    -45deg,
    #667eea,
    #764ba2,
    #f093fb,
    #f5576c,
    #4facfe,
    #00f2fe
  );
  background-size: 600% 600%;
  animation: gradientShift 20s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Floating Elements Animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(-10px) rotate(240deg);
  }
}

@keyframes floatReverse {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(15px) rotate(-120deg);
  }
  66% {
    transform: translateY(-5px) rotate(-240deg);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Custom styles for login page */
/* Sports Pattern Background */
.bg-sports-pattern {
  background-image: 
    /* Hexagon pattern for soccer ball effect */ radial-gradient(
      circle at 25% 25%,
      rgba(0, 200, 151, 0.08) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 165, 0, 0.06) 2px,
      transparent 2px
    ),
    /* Grid lines for sports field */
      linear-gradient(rgba(0, 200, 151, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 151, 0.05) 1px, transparent 1px),
    /* Diagonal lines for dynamic effect */
      linear-gradient(45deg, rgba(0, 200, 151, 0.03) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(255, 165, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px, 60px 60px, 30px 30px, 30px 30px, 50px 50px,
    50px 50px;
  background-position: 0 0, 20px 20px, 0 0, 0 0, 0 0, 25px 25px;
}

.dark .bg-sports-pattern {
  background-image: radial-gradient(
      circle at 25% 25%,
      rgba(0, 229, 161, 0.1) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 193, 7, 0.08) 2px,
      transparent 2px
    ),
    linear-gradient(rgba(0, 229, 161, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 161, 0.06) 1px, transparent 1px),
    linear-gradient(45deg, rgba(0, 229, 161, 0.04) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(255, 193, 7, 0.04) 1px, transparent 1px);
}

/* Sports Ball Pattern */
.bg-sports-ball {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(0, 200, 151, 0.8),
    rgba(0, 200, 151, 0.4)
  );
  position: relative;
}

.bg-sports-ball::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    circle,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 45%,
    transparent 50%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.dark .bg-sports-ball {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(0, 229, 161, 0.8),
    rgba(0, 229, 161, 0.4)
  );
}

/* Tennis Net Pattern */
.bg-tennis-net {
  background-image: linear-gradient(
      0deg,
      rgba(0, 200, 151, 0.3) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(0, 200, 151, 0.3) 1px, transparent 1px);
  background-size: 8px 8px;
}

.dark .bg-tennis-net {
  background-image: linear-gradient(
      0deg,
      rgba(0, 229, 161, 0.4) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(0, 229, 161, 0.4) 1px, transparent 1px);
}

/* Slow spin animation for sports elements */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Enhanced Form animations */
.form-input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

/* Enhanced Button Effects */
.btn-primary-animated {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-primary-animated:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0, 200, 151, 0.3);
}

.btn-primary-animated:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

/* Loading state */
.btn-primary-animated:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Enhanced Card Effects */
.card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slide-up 0.6s ease-out;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

/* Custom Animations */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
  animation: floatReverse 8s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

/* Icon Hover Effects */
.icon-hover {
  transition: all 0.3s ease;
}

.icon-hover:hover {
  transform: scale(1.1) rotate(5deg);
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass Effect */
.glass-effect {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Success State */
.input-success {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Error State */
.input-error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
</style>
