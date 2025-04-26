import { createRouter, createWebHistory } from "vue-router";
import errPage from "../pages/404";
import homePage from "../pages/Homepage/homePage.vue";

const routers = [
  {
    path: "/",
    name: "Home",
    component: homePage,
  },

  {
    path: "/:catchAll(.*)",
    name: "errPage",
    component: errPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
