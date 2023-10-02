import {createRouter, createWebHashHistory} from 'vue-router'

import HomePageView from "../views/HomePageView.vue";
import ProcessView from "../views/ProcessView.vue";
import ProductView from "../views/ProductView.vue";
import IngredientView from "../views/IngredientView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePageView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
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
    },
    {
        path: '/ingredient',
        name: 'ingredient',
        component: IngredientView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
