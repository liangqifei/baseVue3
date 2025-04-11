// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./module/*.ts',{
  eager:true
}) // 自动引入所有 vue 文件

const routes: RouteRecordRaw[] = [
  { 
    path: '/:pathMatch(.*)*', name: 'NotFound',  component: () => import("../views/sys/NotFound.vue") },
]

Object.keys(modules).forEach((key)=>{
  const mod=modules[key]?.default||{}
  routes.push(...mod)
})

console.log(routes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
