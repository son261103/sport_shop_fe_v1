import type { RouteRecordRaw } from "vue-router";

// Admin Routes with AdminLayout
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: "",
        name: "AdminHome",
        component: () => import("@/views/admin/AdminHome.vue"),
        meta: {
          title: "Admin Dashboard - Sport Shop",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "brands",
        name: "AdminBrands",
        component: () => import("@/views/admin/AdminBrand.vue"),
        meta: {
          title: "Brands - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "categories",
        name: "AdminCategories",
        component: () => import("@/views/admin/AdminCategory.vue"),
        meta: {
          title: "Categories - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "products",
        name: "AdminProducts",
        component: () => import("@/views/admin/AdminProducts.vue"),
        meta: {
          title: "Products - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "products/:id",
        name: "AdminProductDetail",
        component: () => import("@/views/admin/AdminProductDetail.vue"),
        meta: {
          title: "Product Detail - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: () => import("@/views/admin/AdminOrders.vue"),
        meta: {
          title: "Orders - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "customers",
        name: "AdminCustomers",
        component: () => import("@/views/admin/AdminCustomers.vue"),
        meta: {
          title: "Customers - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "analytics",
        name: "AdminAnalytics",
        component: () => import("@/views/admin/AdminAnalytics.vue"),
        meta: {
          title: "Analytics - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "store",
        name: "AdminStore",
        component: () => import("@/views/admin/AdminStore.vue"),
        meta: {
          title: "Store Settings - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("@/views/admin/AdminSettings.vue"),
        meta: {
          title: "Settings - Admin Dashboard",
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
    ],
  },
];
