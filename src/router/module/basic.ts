import { defineAsyncComponent } from "vue";

export default [
  {
    path: "/basic",
    name: "basic",
    component: () => import("../../components/layout.vue"),
    redirect:'/basicIndex',
    children:[{
      path: "/basicIndex",
      name: "basicIndex",
      component:() => import("../../views/basic/index.vue"),
    }]
  },
  
];
