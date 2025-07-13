<template>
  <header
    class="relative z-50 bg-gradient-to-b from-light-bg-primary/80 via-light-bg-primary/60 to-transparent dark:from-dark-bg-primary/80 dark:via-dark-bg-primary/60 dark:to-transparent text-light-text-primary dark:text-dark-text-primary backdrop-blur-sm"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-14">
        <!-- Logo & Brand -->
        <div class="flex items-center space-x-4">
          <h1 class="text-3xl font-bold text-gradient-sport-animated">
            <router-link to="/" class="flex items-center">
              SportShop
            </router-link>
          </h1>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link py-1.5 px-2 text-base font-semibold text-light-text-secondary dark:text-dark-text-secondary relative"
            :class="{
              'text-light-accent-sport dark:text-dark-accent-sport active':
                $route.path === item.path,
            }"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Icon Only -->
          <SearchBar ref="searchBarRef" />

          <!-- Shopping Cart -->
          <ShoppingCart />

          <!-- User Menu -->
          <div
            class="relative user-menu-container"
            @mouseenter="showUserMenu"
            @mouseleave="hideUserMenu"
          >
            <button
              class="header-icon text-light-text-secondary dark:text-dark-text-secondary transition-colors relative"
              :class="{
                'text-light-accent-sport dark:text-dark-accent-sport active-icon':
                  isUserMenuOpen,
              }"
            >
              <n-icon size="22">
                <PersonOutline />
              </n-icon>
            </button>

            <!-- User Dropdown -->
            <div class="dropdown-menu w-52" :class="{ show: isUserMenuOpen }">
              <!-- Authenticated User Content -->
              <template v-if="isAuthenticated">
                <div class="dropdown-header">
                  <div
                    class="font-medium text-light-text-primary dark:text-dark-text-primary text-base"
                  >
                    {{ userName || "Tài khoản của tôi" }}
                  </div>
                  <div
                    class="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1"
                  >
                    {{ userEmail }}
                  </div>
                </div>
                <div class="py-1.5 font-medium">
                  <a href="#" class="dropdown-item">
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <PersonOutline />
                      </n-icon>
                      <span>Hồ sơ</span>
                    </div>
                  </a>
                  <a href="#" class="dropdown-item">
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <HeartOutline />
                      </n-icon>
                      <span>Yêu thích</span>
                    </div>
                  </a>
                  <a href="#" class="dropdown-item">
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <BagOutline />
                      </n-icon>
                      <span>Đơn hàng</span>
                    </div>
                  </a>
                  <a href="#" class="dropdown-item">
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <SettingsOutline />
                      </n-icon>
                      <span>Cài đặt</span>
                    </div>
                  </a>
                  <a href="#" class="dropdown-item">
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <NotificationsOutline />
                      </n-icon>
                      <span>Thông báo</span>
                    </div>
                  </a>
                  <!-- Admin Access for Admin Users -->
                  <button
                    v-if="isAdmin"
                    @click="handleAdminAccess"
                    class="dropdown-item w-full text-left"
                  >
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <SettingsOutline />
                      </n-icon>
                      <span>Quản trị</span>
                    </div>
                  </button>
                  <div class="dropdown-divider"></div>
                  <button
                    @click="toggleTheme"
                    class="dropdown-item w-full text-left"
                  >
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <component :is="isDark ? SunnyOutline : MoonOutline" />
                      </n-icon>
                      <span>{{ isDark ? "Chế độ sáng" : "Chế độ tối" }}</span>
                    </div>
                  </button>
                  <button
                    @click="handleLogout"
                    class="dropdown-item danger w-full text-left"
                  >
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-danger dark:text-dark-accent-danger"
                      >
                        <LogOutOutline />
                      </n-icon>
                      <span>Đăng xuất</span>
                    </div>
                  </button>
                </div>
              </template>

              <!-- Not Authenticated Content -->
              <template v-else>
                <div class="dropdown-header">
                  <div
                    class="font-medium text-light-text-primary dark:text-dark-text-primary text-base"
                  >
                    Tài khoản
                  </div>
                </div>
                <div class="py-1.5 font-medium">
                  <button
                    @click="handleLogin"
                    class="dropdown-item w-full text-left"
                  >
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <PersonOutline />
                      </n-icon>
                      <span>Đăng nhập</span>
                    </div>
                  </button>
                  <button
                    @click="handleRegister"
                    class="dropdown-item w-full text-left"
                  >
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <PersonOutline />
                      </n-icon>
                      <span>Đăng ký</span>
                    </div>
                  </button>
                  <div class="dropdown-divider"></div>
                  <button
                    @click="toggleTheme"
                    class="dropdown-item w-full text-left"
                  >
                    <div class="flex items-center">
                      <n-icon
                        size="16"
                        class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
                      >
                        <component :is="isDark ? SunnyOutline : MoonOutline" />
                      </n-icon>
                      <span>{{ isDark ? "Chế độ sáng" : "Chế độ tối" }}</span>
                    </div>
                  </button>
                </div>
              </template>
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="header-icon md:hidden p-1.5 text-light-text-secondary dark:text-dark-text-secondary transition-colors relative"
            :class="{
              'text-light-accent-sport dark:text-dark-accent-sport active-icon':
                isMobileMenuOpen,
            }"
          >
            <n-icon size="22">
              <component :is="isMobileMenuOpen ? CloseOutline : MenuOutline" />
            </n-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden bg-light-bg-primary dark:bg-dark-bg-primary border-t border-light-border-primary dark:border-dark-border-primary"
    >
      <div class="container-custom py-3">
        <!-- Mobile Navigation -->
        <nav class="space-y-1.5">
          <router-link
            v-for="item in navigationItems"
            :key="`mobile-${item.path}`"
            :to="item.path"
            class="block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors relative"
            :class="{
              'text-light-accent-sport dark:text-dark-accent-sport active':
                $route.path === item.path,
            }"
            @click="isMobileMenuOpen = false"
          >
            <n-icon
              v-if="item.icon"
              size="16"
              class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
            >
              <component :is="item.icon" />
            </n-icon>
            {{ item.label }}
          </router-link>

          <!-- Mobile Account Links - Authenticated -->
          <div
            v-if="isAuthenticated"
            class="mt-4 pt-3 border-t border-light-border-primary dark:border-dark-border-primary"
          >
            <div
              class="text-xs uppercase text-light-text-muted dark:text-dark-text-muted font-semibold tracking-wider mb-2 px-3"
            >
              {{ userName || "Tài khoản" }}
            </div>
            <a
              href="#"
              class="block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
            >
              <n-icon
                size="16"
                class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
              >
                <PersonOutline />
              </n-icon>
              Hồ sơ
            </a>
            <a
              href="#"
              class="block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
            >
              <n-icon
                size="16"
                class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
              >
                <HeartOutline />
              </n-icon>
              Yêu thích
            </a>
            <a
              href="#"
              class="block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
            >
              <n-icon
                size="16"
                class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
              >
                <BagOutline />
              </n-icon>
              Đơn hàng
            </a>
            <a
              href="#"
              class="block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
            >
              <n-icon
                size="16"
                class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
              >
                <SettingsOutline />
              </n-icon>
              Cài đặt
            </a>
            <a
              href="#"
              class="block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
            >
              <n-icon
                size="16"
                class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
              >
                <NotificationsOutline />
              </n-icon>
              Thông báo
            </a>
            <!-- Admin Access for Admin Users in Mobile -->
            <button
              v-if="isAdmin"
              @click="handleAdminAccess"
              class="w-full block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors text-left"
            >
              <n-icon
                size="16"
                class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
              >
                <SettingsOutline />
              </n-icon>
              Quản trị
            </button>
          </div>

          <!-- Mobile Login/Register - Not Authenticated -->
          <div
            v-else
            class="mt-4 pt-3 border-t border-light-border-primary dark:border-dark-border-primary space-y-2"
          >
            <button
              @click="handleLogin"
              class="w-full py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors text-left"
            >
              Đăng nhập
            </button>
            <button
              @click="handleRegister"
              class="w-full py-2 px-3 rounded-md font-medium bg-gradient-sport text-white hover:opacity-90 transition-opacity"
            >
              Đăng ký
            </button>
          </div>

          <!-- Theme Toggle in Mobile Menu -->
          <button
            @click="toggleTheme"
            class="w-full mt-2 flex items-center py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors"
          >
            <n-icon
              size="16"
              class="mr-2.5 text-light-accent-sport dark:text-dark-accent-sport"
            >
              <component :is="isDark ? SunnyOutline : MoonOutline" />
            </n-icon>
            <span>{{ isDark ? "Chế độ sáng" : "Chế độ tối" }}</span>
          </button>

          <!-- Logout for Authenticated Users in Mobile -->
          <button
            v-if="isAuthenticated"
            @click="handleLogout"
            class="w-full block py-2 px-3 rounded-md font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-sport dark:hover:text-dark-accent-sport transition-colors text-left"
          >
            <n-icon
              size="16"
              class="mr-2.5 text-light-accent-danger dark:text-dark-accent-danger"
            >
              <LogOutOutline />
            </n-icon>
            Đăng xuất
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NIcon } from "naive-ui";
import {
  SunnyOutline,
  MoonOutline,
  MenuOutline,
  CloseOutline,
  PersonOutline,
  HeartOutline,
  BagOutline,
  SettingsOutline,
  NotificationsOutline,
  LogOutOutline,
} from "@vicons/ionicons5";
import { useTheme, useNaiveTheme } from "@/composables/useTheme";
import { useAuth } from "@/composables/useAuth";
import { SearchBar, ShoppingCart } from "@/components/examples";

interface NavigationItem {
  label: string;
  path: string;
  icon?: any;
}

const router = useRouter();
const { toggleTheme } = useTheme();
const { isDark } = useNaiveTheme();
const { logout, isAuthenticated, userName, userEmail, isAdmin } = useAuth();

// Refs
const searchBarRef = ref();
const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
let hideMenuTimeout: number | null = null;

// Navigation items
const navigationItems: NavigationItem[] = [
  { label: "Trang chủ", path: "/" },
  { label: "Sản phẩm", path: "/products" },
  { label: "Danh mục", path: "/categories" },
  { label: "Khuyến mãi", path: "/sale" },
  { label: "Liên hệ", path: "/contact" },
];

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isUserMenuOpen.value = false;
  }
};

const showUserMenu = () => {
  if (hideMenuTimeout) {
    clearTimeout(hideMenuTimeout);
    hideMenuTimeout = null;
  }
  isUserMenuOpen.value = true;
  isMobileMenuOpen.value = false;
};

const hideUserMenu = () => {
  hideMenuTimeout = setTimeout(() => {
    isUserMenuOpen.value = false;
  }, 200);
};

const handleLogout = async () => {
  try {
    await logout();
    // Logout sẽ tự động redirect về trang chủ
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const handleLogin = () => {
  router.push("/login");
};

const handleRegister = () => {
  router.push("/register");
};

const handleAdminAccess = () => {
  if (isAdmin.value) {
    router.push("/admin");
  }
};
</script>
