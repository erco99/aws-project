import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Index.vue";
import BookingPanel from "../views/booking-panel/Index.vue";
import Login from "../views/login/Index.vue";
import SignUp from "@/views/signup/Index.vue";

export const main_routes = [
    {
      path: "/login",
      component: Login,
      hidden: true,
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/",
      component: Layout,
      redirect: "/booking-panel",
      children: [
        {
          path: "/booking-panel",
          name: "booking-panel",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: BookingPanel,
        },
      ],
    }
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: main_routes
})

export default router;
