import Vue from "vue";
import VueRouter from "vue-router";
//import HomeView from "../views/HomeView.vue";
import EventList from "../components/EventList.vue";
import UpdateEvent from "../components/UpdateEvent.vue";
import RegisterEvent from "../components/RegisterEvent.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: EventList,
    },
    {
      path: "/eventos",
      name: "eventos",
      component: EventList,
    },
    {
      path: "/cadastrar",
      name: "cadastrar",
      component: RegisterEvent,
    },
    {
      path: "/atualizar/:id",
      name: "atualizar",
      component: UpdateEvent,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
