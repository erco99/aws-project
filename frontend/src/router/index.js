import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Index.vue";
import BookingPanel from "../views/booking-panel/Index.vue";
import Login from "../views/login/Index.vue";
import SignUp from "@/views/signup/Index.vue"
import CreditsManagement from "@/views/credits-management/Index.vue"

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
          name: "Prenotazioni",
          component: BookingPanel,
        },
      ],
    }, 
    {
      path: "/credits-management",
      component: Layout,
      children: [
        {
          path: "/credits-management",
          name: "Crediti",
          component: CreditsManagement
        }
      ]
    }
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: main_routes
})

export default router;
