import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/event/create',
        name: 'eventcreate',
        component: () => import('@/views/eventCreateView.vue')
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
