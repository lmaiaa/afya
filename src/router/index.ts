import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/checkout', component: () => import('views/Checkout.vue') },
  { path: '/resume', component: () => import('views/Resume.vue') },
];
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
