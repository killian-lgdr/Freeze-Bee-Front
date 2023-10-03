import {createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized} from 'vue-router'

import HomePageView from "../views/HomePageView.vue";
import ProcessView from "../views/ProcessView.vue";
import ProductView from "../views/ProductView.vue";
import IngredientView from "../views/IngredientView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
    {
        path: '/:state?:session_state?:code?',
        name: 'home',
        component: HomePageView
    },
    {
        path: '/login:state?:session_state?:code?',
        name: 'login',
        component: LoginView
    },
    {
        path: '/process:state?:session_state?:code?',
        name: 'process',
        component: ProcessView
    },
    {
        path: '/product:state?:session_state?:code?',
        name: 'product',
        component: ProductView
    },
    {
        path: '/ingredient:state?:session_state?:code?',
        name: 'ingredient',
        component: IngredientView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
