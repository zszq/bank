import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/banking'
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: () => import('../views/DashBoard.vue')
    },
    {
      path: '/banking',
      name: 'Banking',
      component: () => import('../views/Banking.vue')
    }
  ]
})

export default router
