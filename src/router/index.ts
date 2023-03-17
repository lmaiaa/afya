import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// @ts-ignore <- ignore it
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('@/views/Checkout.vue') },
      { path: '/resume', component: () => import('@/views/Resume.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/ErrorNotFound.vue'),
  },
  ,
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
