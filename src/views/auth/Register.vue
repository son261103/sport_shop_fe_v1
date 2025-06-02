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

    <!-- Grid Pattern -->
    <div
      class="absolute inset-0 bg-grid-pattern opacity-3 dark:opacity-8"
    ></div>

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
                  d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1a1 1 0 102 0V7zM12 7a1 1 0 112 0v1a1 1 0 11-2 0V7zM16 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM12 3a1 1 0 112 0v1a1 1 0 11-2 0V3z"
                />
              </svg>
            </div>
          </div>

          <!-- Welcome Message -->
          <div class="space-y-6">
            <h1
              class="text-5xl font-bold text-gradient-sport-animated tracking-tight"
            >
              Chào mừng đến với
            </h1>
            <h2 class="text-6xl font-black text-gradient-sport">Sport Shop</h2>
            <p
              class="text-xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
            >
              Khám phá thế giới thể thao với những sản phẩm chất lượng cao và
              dịch vụ tuyệt vời
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
                Sản phẩm thể thao chính hãng
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
                Giao hàng nhanh chóng toàn quốc
              </span>
            </div>
            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 bg-gradient-sport rounded-full flex items-center justify-center"
              >
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
              </div>
              <span
                class="text-light-text-primary dark:text-dark-text-primary font-medium"
              >
                Hỗ trợ khách hàng 24/7
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

      <!-- Right Side - Register Form -->
      <div
        class="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-md w-full space-y-8 animate-fade-in">
          <!-- Enhanced Header -->
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div
                class="w-20 h-20 bg-gradient-sport rounded-3xl flex items-center justify-center shadow-sport transform hover:scale-110 transition-all duration-500 hover:rotate-6 group"
              >
                <svg
                  class="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1a1 1 0 102 0V7zM12 7a1 1 0 112 0v1a1 1 0 11-2 0V7zM16 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM12 3a1 1 0 112 0v1a1 1 0 11-2 0V3z"
                  />
                </svg>
                <!-- Floating particles around icon -->
                <div
                  class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-70 animate-ping"
                ></div>
                <div
                  class="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"
                  style="animation-delay: 1s"
                ></div>
              </div>
            </div>
            <h2
              class="text-4xl font-bold text-gradient-sport-animated mb-3 tracking-tight"
            >
              Đăng ký
            </h2>
            <p
              class="text-light-text-secondary dark:text-dark-text-secondary text-lg font-light"
            >
              Tạo tài khoản mới để trải nghiệm
              <span class="text-gradient-sport font-medium">Sport Shop</span>
            </p>
            <!-- Decorative line -->
            <div class="flex justify-center mt-4">
              <div
                class="w-16 h-1 bg-gradient-sport rounded-full opacity-60"
              ></div>
            </div>
          </div>

          <!-- Enhanced Register Form -->
          <div
            class="card p-8 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02]"
          >
            <form @submit.prevent="handleRegister" class="space-y-6">
              <!-- Enhanced Name Field -->
              <div class="group">
                <label
                  for="name"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Họ và tên
                  </span>
                </label>
                <div class="relative">
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    autocomplete="name"
                    required
                    class="form-input pl-12 pr-4 h-14 text-base backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-2 transition-all duration-300 group-hover:border-light-accent-sport/50 dark:group-hover:border-dark-accent-sport/50"
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500':
                        formErrors.name,
                      'border-green-500 focus:ring-green-500 focus:border-green-500':
                        formData.name && !formErrors.name,
                      'border-light-border-primary dark:border-dark-border-primary focus:border-light-accent-sport dark:focus:border-dark-accent-sport':
                        !formErrors.name,
                    }"
                    placeholder="Nhập họ và tên của bạn"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <!-- Success indicator -->
                  <div
                    v-if="formData.name && !formErrors.name"
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
                  v-if="formErrors.name"
                  class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake"
                >
                  {{ formErrors.name }}
                </p>
              </div>

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
                        formData.email &&
                        !formErrors.email &&
                        validateEmailFormat(formData.email),
                      'border-light-border-primary dark:border-dark-border-primary focus:border-light-accent-sport dark:focus:border-dark-accent-sport':
                        !formErrors.email,
                    }"
                    placeholder="Nhập email của bạn"
                    :disabled="isLoading"
                    @blur="validateEmail"
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
                    v-if="
                      formData.email &&
                      !formErrors.email &&
                      validateEmailFormat(formData.email)
                    "
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
              <div class="group">
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
                    autocomplete="new-password"
                    required
                    class="form-input pl-12 pr-12 h-14 text-base backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-2 transition-all duration-300 group-hover:border-light-accent-sport/50 dark:group-hover:border-dark-accent-sport/50"
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500':
                        formErrors.password,
                      'border-green-500 focus:ring-green-500 focus:border-green-500':
                        formData.password &&
                        !formErrors.password &&
                        passwordValidation.isValid,
                      'border-light-border-primary dark:border-dark-border-primary focus:border-light-accent-sport dark:focus:border-dark-accent-sport':
                        !formErrors.password,
                    }"
                    placeholder="Nhập mật khẩu"
                    :disabled="isLoading"
                    @input="validatePassword"
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
                </div>

                <!-- Enhanced Password Strength Indicator -->
                <div v-if="formData.password" class="mt-3">
                  <div class="flex space-x-1 mb-3">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="h-2 flex-1 rounded-full transition-all duration-300"
                      :class="getPasswordStrengthColor(i)"
                    ></div>
                  </div>
                  <div class="text-xs space-y-1">
                    <p
                      v-for="error in passwordValidation.errors"
                      :key="error"
                      class="text-red-600 dark:text-red-400 flex items-center gap-1"
                    >
                      <svg
                        class="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ error }}
                    </p>
                  </div>
                </div>

                <p
                  v-if="formErrors.password"
                  class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake"
                >
                  {{ formErrors.password }}
                </p>
              </div>

              <!-- Enhanced Confirm Password Field -->
              <div class="group">
                <label
                  for="password_confirmation"
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Xác nhận mật khẩu
                  </span>
                </label>
                <div class="relative">
                  <input
                    id="password_confirmation"
                    v-model="formData.password_confirmation"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    required
                    class="form-input pl-12 pr-12 h-14 text-base backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-2 transition-all duration-300 group-hover:border-light-accent-sport/50 dark:group-hover:border-dark-accent-sport/50"
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500':
                        formErrors.password_confirmation,
                      'border-green-500 focus:ring-green-500 focus:border-green-500':
                        formData.password_confirmation &&
                        !formErrors.password_confirmation &&
                        formData.password === formData.password_confirmation,
                      'border-light-border-primary dark:border-dark-border-primary focus:border-light-accent-sport dark:focus:border-dark-accent-sport':
                        !formErrors.password_confirmation,
                    }"
                    placeholder="Nhập lại mật khẩu"
                    :disabled="isLoading"
                    @blur="validatePasswordConfirmation"
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                    :disabled="isLoading"
                  >
                    <svg
                      v-if="showConfirmPassword"
                      class="h-5 w-5 text-light-text-muted dark:text-dark-text-muted hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
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
                      class="h-5 w-5 text-light-text-muted dark:text-dark-text-muted hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
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
                  <!-- Success Indicator -->
                  <div
                    v-if="
                      formData.password_confirmation &&
                      !formErrors.password_confirmation &&
                      formData.password === formData.password_confirmation
                    "
                    class="absolute inset-y-0 right-12 flex items-center pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-green-500 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p
                  v-if="formErrors.password_confirmation"
                  class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake"
                >
                  {{ formErrors.password_confirmation }}
                </p>
              </div>

              <!-- Enhanced Terms and Conditions -->
              <div
                class="flex items-start space-x-3 p-4 bg-gradient-to-r from-light-accent-sport/5 to-transparent dark:from-dark-accent-sport/5 rounded-lg border border-light-border-primary/30 dark:border-dark-border-primary/30"
              >
                <input
                  id="terms"
                  v-model="acceptTerms"
                  type="checkbox"
                  class="h-5 w-5 text-light-accent-sport dark:text-dark-accent-sport focus:ring-light-accent-sport dark:focus:ring-dark-accent-sport border-light-border-primary dark:border-dark-border-primary rounded-md mt-0.5 transition-all duration-200 hover:scale-110"
                  :disabled="isLoading"
                />
                <label
                  for="terms"
                  class="block text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed cursor-pointer hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors duration-200"
                >
                  Tôi đồng ý với
                  <a
                    href="#"
                    class="font-semibold text-light-accent-sport dark:text-dark-accent-sport hover:opacity-80 transition-all duration-200 underline decoration-2 underline-offset-2 hover:decoration-light-accent-sport/50"
                  >
                    Điều khoản dịch vụ
                  </a>
                  và
                  <a
                    href="#"
                    class="font-semibold text-light-accent-sport dark:text-dark-accent-sport hover:opacity-80 transition-all duration-200 underline decoration-2 underline-offset-2 hover:decoration-light-accent-sport/50"
                  >
                    Chính sách bảo mật
                  </a>
                </label>
              </div>
              <p
                v-if="!acceptTerms && showTermsError"
                class="text-sm text-red-600 dark:text-red-400 animate-shake mt-2"
              >
                Bạn phải đồng ý với điều khoản dịch vụ
              </p>

              <!-- Enhanced General Error -->
              <div
                v-if="formErrors.general"
                class="bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/30 dark:to-red-800/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 backdrop-blur-sm animate-shake"
              >
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-red-500 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3
                      class="text-sm font-semibold text-red-800 dark:text-red-200 mb-1"
                    >
                      Đăng ký thất bại
                    </h3>
                    <p class="text-sm text-red-700 dark:text-red-300">
                      {{ formErrors.general }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Enhanced Submit Button -->
              <div class="pt-2">
                <button
                  type="submit"
                  class="group relative w-full flex justify-center items-center py-4 px-6 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-light-accent-sport to-light-accent-sport/80 dark:from-dark-accent-sport dark:to-dark-accent-sport/80 hover:from-light-accent-sport/90 hover:to-light-accent-sport/70 dark:hover:from-dark-accent-sport/90 dark:hover:to-dark-accent-sport/70 focus:outline-none focus:ring-4 focus:ring-light-accent-sport/30 dark:focus:ring-dark-accent-sport/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] overflow-hidden"
                  :disabled="isLoading || !isFormValid"
                >
                  <!-- Background Animation -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  ></div>

                  <Loading
                    v-if="isLoading"
                    size="sm"
                    color="white"
                    class="mr-3"
                  />
                  <span v-if="isLoading" class="relative z-10"
                    >Đang tạo tài khoản...</span
                  >
                  <span v-else class="relative z-10 flex items-center gap-2">
                    <svg
                      class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Tạo tài khoản
                  </span>
                </button>
              </div>
            </form>

            <!-- Enhanced Divider -->
            <div class="mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div
                    class="w-full border-t-2 border-gradient-to-r from-transparent via-light-border-primary to-transparent dark:via-dark-border-primary"
                  ></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span
                    class="px-4 py-1 bg-light-bg-secondary/80 dark:bg-dark-bg-secondary/80 text-light-text-muted dark:text-dark-text-muted backdrop-blur-sm rounded-full border border-light-border-primary/30 dark:border-dark-border-primary/30"
                  >
                    Hoặc
                  </span>
                </div>
              </div>
            </div>

            <!-- Enhanced Login Link -->
            <div class="mt-8 text-center">
              <div
                class="p-4 bg-gradient-to-r from-light-accent-sport/5 to-transparent dark:from-dark-accent-sport/5 rounded-lg border border-light-border-primary/20 dark:border-dark-border-primary/20"
              >
                <p
                  class="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2"
                >
                  Đã có tài khoản?
                </p>
                <router-link
                  to="/login"
                  class="inline-flex items-center gap-2 font-semibold text-light-accent-sport dark:text-dark-accent-sport hover:opacity-80 transition-all duration-200 hover:scale-105 underline decoration-2 underline-offset-4 hover:decoration-light-accent-sport/50"
                >
                  <svg
                    class="w-4 h-4"
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
                  Đăng nhập ngay
                </router-link>
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
import type {
  RegisterRequest,
  AuthFormData,
  AuthFormErrors,
} from "@/types/auth";

const {
  register,
  isLoading,
  error,
  clearError,
  isAuthenticated,
  redirectByRole,
} = useAuth();

// Form state
const formData = ref<AuthFormData>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const formErrors = ref<AuthFormErrors>({});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const acceptTerms = ref(false);
const showTermsError = ref(false);

// Email validation helper
const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation helper
const validatePasswordFormat = (password: string) => {
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
};

// Password validation
const passwordValidation = computed(() => {
  return validatePasswordFormat(formData.value.password || "");
});

// Computed
const isFormValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.email &&
    formData.value.password &&
    formData.value.password_confirmation &&
    validateEmailFormat(formData.value.email) &&
    passwordValidation.value.isValid &&
    formData.value.password === formData.value.password_confirmation &&
    acceptTerms.value &&
    !Object.keys(formErrors.value).length
  );
});

// Methods
const getPasswordStrengthColor = (index: number): string => {
  const strength = getPasswordStrength();
  if (index <= strength) {
    switch (strength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300 dark:bg-gray-600";
    }
  }
  return "bg-gray-300 dark:bg-gray-600";
};

const getPasswordStrength = (): number => {
  const password = formData.value.password || "";
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/(?=.*[a-z])/.test(password)) strength++;
  if (/(?=.*[A-Z])/.test(password)) strength++;
  if (/(?=.*\d)/.test(password)) strength++;

  return strength;
};

const validateEmail = (): void => {
  if (formData.value.email && !validateEmailFormat(formData.value.email)) {
    formErrors.value.email = "Email không hợp lệ";
  } else {
    delete formErrors.value.email;
  }
};

const validatePassword = (): void => {
  const validation = validatePasswordFormat(formData.value.password || "");
  if (!validation.isValid && formData.value.password) {
    formErrors.value.password = validation.errors[0];
  } else {
    delete formErrors.value.password;
  }

  // Re-validate password confirmation if it exists
  if (formData.value.password_confirmation) {
    validatePasswordConfirmation();
  }
};

const validatePasswordConfirmation = (): void => {
  if (formData.value.password !== formData.value.password_confirmation) {
    formErrors.value.password_confirmation = "Mật khẩu xác nhận không khớp";
  } else {
    delete formErrors.value.password_confirmation;
  }
};

const validateForm = (): boolean => {
  const errors: AuthFormErrors = {};

  // Name validation
  if (!formData.value.name) {
    errors.name = "Họ và tên là bắt buộc";
  } else if (formData.value.name.length < 2) {
    errors.name = "Họ và tên phải có ít nhất 2 ký tự";
  }

  // Email validation
  if (!formData.value.email) {
    errors.email = "Email là bắt buộc";
  } else if (!validateEmailFormat(formData.value.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Password validation
  const passwordValidation = validatePasswordFormat(
    formData.value.password || ""
  );
  if (!formData.value.password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }

  // Password confirmation validation
  if (!formData.value.password_confirmation) {
    errors.password_confirmation = "Xác nhận mật khẩu là bắt buộc";
  } else if (formData.value.password !== formData.value.password_confirmation) {
    errors.password_confirmation = "Mật khẩu xác nhận không khớp";
  }

  // Terms validation
  if (!acceptTerms.value) {
    showTermsError.value = true;
  } else {
    showTermsError.value = false;
  }

  formErrors.value = errors;
  return Object.keys(errors).length === 0 && acceptTerms.value;
};

const handleRegister = async (): Promise<void> => {
  if (!validateForm()) return;

  clearError();
  formErrors.value = {};

  try {
    const registerData: RegisterRequest = {
      name: formData.value.name!,
      email: formData.value.email,
      password: formData.value.password,
      password_confirmation: formData.value.password_confirmation!,
    };

    const success = await register(registerData);

    if (!success && error.value) {
      // Handle validation errors from server
      if (error.value.errors) {
        const apiErrors: AuthFormErrors = {};
        Object.keys(error.value.errors).forEach((key) => {
          if (
            error.value?.errors?.[key] &&
            error.value.errors[key].length > 0
          ) {
            apiErrors[key as keyof AuthFormErrors] = error.value.errors[key][0];
          }
        });
        formErrors.value = apiErrors;
      } else {
        // Handle general errors
        formErrors.value.general =
          error.value.message || "Đăng ký thất bại. Vui lòng thử lại.";
      }
    }
  } catch (err: any) {
    console.error("Register error:", err);
    formErrors.value.general = "Đăng ký thất bại. Vui lòng thử lại.";
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
/* Custom styles for register page */
.bg-grid-pattern {
  background-image: linear-gradient(rgba(0, 200, 151, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 151, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dark .bg-grid-pattern {
  background-image: linear-gradient(rgba(0, 229, 161, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 161, 0.1) 1px, transparent 1px);
}

/* Enhanced Form animations */
.form-input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(0, 200, 151, 0.1);
}

.form-input:hover {
  transform: translateY(-0.5px);
}

/* Enhanced Button hover effects */
.btn-primary-animated:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.02);
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

/* Enhanced Password strength indicator animation */
.h-1,
.h-2 {
  transition: all 0.3s ease;
}

/* Shake animation for errors */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Floating particles animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(120deg);
  }
  66% {
    transform: translateY(5px) rotate(240deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
  animation-delay: 4s;
}

/* Pulse animation for success indicators */
@keyframes pulse-success {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-success {
  animation: pulse-success 2s ease-in-out infinite;
}

/* Background gradient animation */
@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

/* Slide in animation for form elements */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideInUp 0.6s ease-out;
}

/* Hover glow effect */
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(0, 200, 151, 0.3);
}

.dark .hover-glow:hover {
  box-shadow: 0 0 20px rgba(0, 229, 161, 0.3);
}
</style>
