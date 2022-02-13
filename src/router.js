import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/deliverers",
      name: "deliverers",
      component: () => import("./components/DeliverersList")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddDeliverer")
    }
  ]
});