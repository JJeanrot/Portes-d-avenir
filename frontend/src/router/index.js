import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/event'
    },
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
        path: '/event/validation',
        name: 'eventValidation',
        component: () => import('@/views/eventValidationView.vue')
    },
    {
        path: '/event/valider/:id',
        name: 'validerEvenement',
        component: () => import('@/views/eventValidatePage.vue'),
        props: true
    },
    {
        path: '/event/edit/:id',
        name: 'editEvenement',
        component: () => import('@/views/eventEditView.vue'),
        props: true
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
