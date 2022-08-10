import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'on',
    component: () => import('../components/on.vue')
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('../components/start.vue')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../components/details.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../components/setting.vue')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../components/video.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
