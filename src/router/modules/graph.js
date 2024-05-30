export default [
    {
        path: '/',
        name: 'Index',
        component: () => import('../../views/Index.vue')
    },
    {
        path: '/graph',
        name: 'Graph',
        component: () => import('../../views/Graphs.vue')
    }
]