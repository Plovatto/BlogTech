import { createRouter, createWebHistory } from 'vue-router';

import publi0 from "@/components/publi0.vue";
import publi1 from "@/components/publi1.vue";
import publi2 from "@/components/publi2.vue";
import publi3 from "@/components/publi3.vue";
import publi4 from "@/components/publi4.vue";
import publi5 from "@/components/publi5.vue";
import Inicio from "@/views/Inicio.vue";

const routes = [
  { path: "/", name: "Inicio", component: Inicio },
  { path: "/Inicio", redirect: "/" },
  { path: "/publi0", name: "publi0", component: publi0 },
  { path: "/publi1", name: "publi1", component: publi1 },
  { path: "/publi2", name: "publi2", component: publi2 },
  { path: "/publi3", name: "publi3", component: publi3 },
  { path: "/publi4", name: "publi4", component: publi4 },
  { path: "/publi5", name: "publi5", component: publi5 },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

// BASE_URL vem do publicPath (/BlogTech/ em produção). No GitHub Pages, o
// workflow copia o index.html para 404.html para as rotas funcionarem ao recarregar.
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
