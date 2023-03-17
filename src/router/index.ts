import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '', component: () => import('@/views/Checkout.vue') },
  { path: '/resume', component: () => import('@/views/Resume.vue') },
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
