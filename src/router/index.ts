import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        { path: '/', component: () => import('@/views/CheckoutView.vue') },
        {
          path: '/resume/:id',
          component: () => import('@/views/ResumeView.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/ErrorNotFound.vue'),
    },
  ],
})
