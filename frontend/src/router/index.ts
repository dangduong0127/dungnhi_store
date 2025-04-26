import { createRouter, createWebHistory } from "vue-router";
import ErrPage from "../pages/404";
import HomePage from "../pages/Homepage/HomePage.vue";

const routers = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },

  {
    path: "/:catchAll(.*)",
    name: "ErrPage",
    component: ErrPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
