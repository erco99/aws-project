import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookingPanel from "../views/BookingPanel.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/booking-panel",
      name: "booking-panel",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BookingPanel,
    },
  ],
});

export default router;
