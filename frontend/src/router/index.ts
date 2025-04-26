import { createRouter, createWebHistory } from "vue-router";
import { h } from "vue";
import ErrPage from "../pages/404";
import HomePage from "../pages/Homepage/homePage.vue";

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
