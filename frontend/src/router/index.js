import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Index.vue";
import BookingPanel from "../views/booking-panel/Index.vue";
import Login from "../views/login/Index.vue";
import ResetPassword from "@/views/reset-password/Index.vue";
import SignUp from "@/views/signup/Index.vue";
import CreditsManagement from "@/views/credits-management/Index.vue";
import Profile from "@/views/profile/Index.vue";
import NotificationArea from "@/views/notifications/Index.vue";

export const main_routes = [
  {
    path: "/login",
    component: Login,
    hidden: true,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    sidebar: "yes",
    path: "/",
    component: Layout,
    redirect: "/booking-panel",
    children: [
      {
        path: "/booking-panel",
        name: "Prenotazioni",
        component: BookingPanel,
        icon: "mdi-calendar-range",
      },
    ],
  },
  {
    sidebar: "yes",
    path: "/credits-management",
    component: Layout,
    children: [
      {
        path: "/credits-management",
        name: "Crediti",
        component: CreditsManagement,
        icon: "mdi-currency-eur",
      },
    ],
  },
  {
    sidebar: "no",
    path: "/profile",
    component: Layout,
    children: [
      {
        path: "/profile",
        name: "Profilo",
        component: Profile,
      },
    ],
  },
  {
    sidebar: "yes",
    path: "/notifications",
    component: Layout,
    children: [
      {
        path: "/notifications",
        name: "Notifiche",
        component: NotificationArea,
        icon: "mdi-email-outline",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: main_routes,
});

export default router;
