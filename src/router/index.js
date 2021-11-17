import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/acount/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/acount/Register.vue"),
  },
  {
    path: "/forget",
    name: "Forget",
    component: () => import("../views/acount/Forget.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../views/News.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
