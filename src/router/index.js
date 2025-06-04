import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Privacypolicy from "@/views/Privacypolicy.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import DashboardLayout from "@/views/dashboard/index.vue";
import Transfer from "@/views/dashboard/Transfer.vue";
import WireTransfer from "@/views/dashboard/WireTransfer.vue";
import Transactions from "@/views/dashboard/Transactions.vue";
import Settings from "@/views/dashboard/Settings.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import AdminLayout from "../views/admin/index.vue";
import Admin from "../views/admin/dashboard.vue";
import User from "../views/admin/userinfo.vue";
import UserTransactioms from "../views/admin/transactions.vue";
import Password from "../views/admin/password.vue";
import Track from "@/views/Track.vue";
import Request from "@/views/dashboard/Request.vue";
import AdminRequest from "@/views/admin/Request.vue";
import RequestDetail from "@/views/admin/RequestDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/privacypolicy",
      name: "Privacy policy",
      component: Privacypolicy,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/adminLogin",
      name: "Admin Login",
      component: AdminLogin,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/tracking/:id",
      name: "Track",
      component: Track,
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "transfer",
          name: "Transfer",
          component: Transfer,
        },
        {
          path: "wire-transfer",
          name: "Wire Transfer",
          component: WireTransfer,
        },
        {
          path: "transactions",
          name: "Transactions",
          component: Transactions,
        },
        {
          path: "Profile",
          name: "profile",
          component: Settings,
        },
        {
          path: "request",
          name: "Request",
          component: Request,
        },
      ],
    },
    {
      path: "/admin",
      component: AdminLayout,
      meta: {
        requiresAdminAuth: true,
      },
      children: [
        {
          path: "",
          name: "admin",
          component: Admin,
        },
        {
          path: "users/:id",
          name: "User details",
          component: User,
        },
        {
          path: "transactions",
          name: "User Transactions",
          component: UserTransactioms,
        },
        {
          path: "adminList",
          name: "Admin List",
          component: () => import("@/views/admin/AdminList.vue"),
        },
        {
          path: "addAdmin",
          name: "Add Admin",
          component: () => import("@/views/admin/AddAdmin.vue"),
        },
        {
          path: "password",
          name: "Password",
          component: Password,
        },
        {
          path: "requests",
          name: "Card request",
          component: AdminRequest,
        },
        {
          path: "request/:id",
          name: "Card request Detail",
          component: RequestDetail,
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    localStorage.getItem("token") ? next() : next("/login");
  } else {
    next();
  }
});
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.admin)) {
    localStorage.getItem("admin") ? next() : next("/");
  } else {
    next();
  }
});

export default router;
