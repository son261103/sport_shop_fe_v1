import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Public Routes with DefaultLayout
export const userRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/user/Home.vue"),
        meta: {
          title: "Home - Sport Shop",
        },
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/user/Products.vue'),
        meta: {
          title: "Sản phẩm - Sport Shop",
        },
      },
      {
        path: 'products/:id',
        name: 'ProductsDetail',
        component: () => import('@/views/user/ProductsDetail.vue'),
        meta: {
          title: "Chi tiết sản phẩm - Sport Shop",
        },
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/user/Cart.vue'),
        meta: {
          title: "Giỏ hàng - Sport Shop",
        },
      },

      {
        path: 'components',
        name: 'ComponentShowcase',
        component: () => import('@/views/ComponentShowcase.vue'),
        meta: {
          title: "Component Showcase - Sport Shop",
        },
      },
    ],
  },
  // Authentication Routes (no layout)
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      title: "Đăng nhập - Sport Shop",
      requiresGuest: true,
    },
    beforeEnter: (_, __, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        const redirectPath = authStore.getRedirectPath();
        next(redirectPath);
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/Register.vue"),
    meta: {
      title: "Đăng ký - Sport Shop",
      requiresGuest: true,
    },
    beforeEnter: (_, __, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        const redirectPath = authStore.getRedirectPath();
        next(redirectPath);
      } else {
        next();
      }
    },
  },
];
