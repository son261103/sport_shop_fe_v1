import type { RouteRecordRaw } from "vue-router";

// Admin Routes with AdminLayout
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "AdminHome",
        component: () => import("@/views/admin/AdminHome.vue"),
        meta: {
          title: "Admin Dashboard - Sport Shop",
        },
      },
      {
        path: "brands",
        name: "AdminBrands",
        component: () => import("@/views/admin/AdminBrand.vue"),
        meta: {
          title: "Dashboard - Admin Dashboard",
        },
      },
      {
        path: "categories",
        name: "AdminCategories",
        component: () => import("@/views/admin/AdminCategory.vue"),
        meta: {
          title: "Categories - Admin Dashboard",
        },
      },
      {
        path: "products",
        name: "AdminProducts",
        component: () => import("@/views/admin/AdminProducts.vue"),
        meta: {
          title: "Products - Admin Dashboard",
        },
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: () => import("@/views/admin/AdminOrders.vue"),
        meta: {
          title: "Orders - Admin Dashboard",
        },
      },
      {
        path: "customers",
        name: "AdminCustomers",
        component: () => import("@/views/admin/AdminCustomers.vue"),
        meta: {
          title: "Customers - Admin Dashboard",
        },
      },
      {
        path: "analytics",
        name: "AdminAnalytics",
        component: () => import("@/views/admin/AdminAnalytics.vue"),
        meta: {
          title: "Analytics - Admin Dashboard",
        },
      },
      {
        path: "store",
        name: "AdminStore",
        component: () => import("@/views/admin/AdminStore.vue"),
        meta: {
          title: "Store Settings - Admin Dashboard",
        },
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("@/views/admin/AdminSettings.vue"),
        meta: {
          title: "Settings - Admin Dashboard",
        },
      },
    ],
  },
];
