import { createRouter, createWebHistory } from 'vue-router'
import Home from './../pages/Home.vue'

const routes = [
    {
        path: '/',
        component: () => import('../layouts/Main.vue'),
        children: [
            {
                path: '/',
                redirect: '/Home',
            },
            {
                path: '/Home',
                name: 'Home',
                component: Home,
            },
        ],
    },
    {
        path: '/',
        component: () => import('../layouts/Default.vue'),
        children: [
            {
                path: '/',
                redirect: '/Home',
            },
            {
                path: '/About',
                name: 'About',
                component: () =>
                    import(
                        /* webpackChunkName: "About" */ '../pages/About.vue'
                    ),
            },
            {
                path: '/Contact',
                name: 'Contact',
                component: () =>
                    import(
                        /* webpackChunkName: "Contact" */ '../pages/Contact.vue'
                    ),
            },
            {
                path: '/Gallery',
                name: 'Gallery',
                component: () =>
                    import(
                        /* webpackChunkName: "Gallery" */ '../pages/gallery/Gallery.vue'
                    ),
            },
            {
                path: '/Gallery/:id',
                name: 'Gallery-id',
                component: () =>
                    import(
                        /* webpackChunkName: "Gallery" */ '../pages/gallery/_id.vue'
                    ),
            },
            {
                path: '/News',
                name: 'News',
                component: () =>
                    import(/* webpackChunkName: "News" */ '../pages/News.vue'),
            },
            {
                path: '/Workshop',
                name: 'Workshop',
                component: () =>
                    import(
                        /* webpackChunkName: "Workshop" */ '../pages/Workshop.vue'
                    ),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
