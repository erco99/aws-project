import { createRouter, createWebHistory } from "vue-router";
import BookingPanel from "../views/BookingPanel.vue";
import Login from "../views/login/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/booking-panel",
      name: "booking-panel",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BookingPanel,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
