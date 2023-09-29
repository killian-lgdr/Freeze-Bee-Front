import {createRouter, createWebHashHistory} from 'vue-router'

import HomePageView from "@/views/HomePageView.vue";
import ProcessView from "@/views/ProcessView.vue";
import ProductView from "@/views/ProductView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePageView
    },
    {
        path: '/process',
        name: 'process',
        component: ProcessView
    },
    {
        path: '/product',
        name: 'product',
        component: ProductView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
