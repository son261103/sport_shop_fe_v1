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
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/user/Checkout.vue'),
        meta: {
          title: "Thanh toán - Sport Shop",
        },
      },
      {
        path: 'sepay-demo',
        name: 'SepayDemo',
        component: () => import('@/components/debug/SepayWebhookDemo.vue'),
        meta: {
          title: "SePay Webhook Demo - Sport Shop",
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
      {
        path: "products",
        name: "Products",
        component: () => import("@/views/user/Products.vue"),
        meta: {
          title: "Sản phẩm - Sport Shop",
        },
      },
      {
        path: "categories",
        name: "Categories",
        component: () => import("@/views/user/Categories.vue"),
        meta: {
          title: "Danh mục - Sport Shop",
        },
      },
      {
        path: "sale",
        name: "Sale",
        component: () => import("@/views/user/Sale.vue"),
        meta: {
          title: "Khuyến mãi - Sport Shop",
        },
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/user/Contact.vue"),
        meta: {
          title: "Liên hệ - Sport Shop",
        },
      }
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
