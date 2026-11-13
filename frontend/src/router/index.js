import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/event/create',
        name: 'eventcreate',
        component: () => import('@/views/eventCreateView.vue')
    },
    {
        path: '/event',
        name: 'getevent',
        component: () => import('@/views/eventPage.vue')
    },
    {
        path: '/event/delete/:id',
        name: 'deleteEvenement',
        component: () => import('@/views/eventDeletePage.vue'),
        props: true
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
