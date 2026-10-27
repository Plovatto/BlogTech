import { createRouter, createWebHistory } from 'vue-router';

import Inicio from "@/views/Inicio.vue";
import PaginaPostagem from "@/views/PaginaPostagem.vue";

const routes = [
  { path: "/", name: "Inicio", component: Inicio },
  {
    path: "/postagem/:id(\\d+)",
    name: "Postagem",
    component: PaginaPostagem,
    props: (route) => ({ id: Number(route.params.id) }),
  },
  // Endereços antigos (/publi0 a /publi5) continuam funcionando
  { path: "/publi:id(\\d+)", redirect: (to) => `/postagem/${to.params.id}` },
  { path: "/Inicio", redirect: "/" },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

// BASE_URL vem do publicPath (/BlogTech/ em produção). No GitHub Pages, o
// workflow copia o index.html para 404.html para as rotas funcionarem ao recarregar.
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
