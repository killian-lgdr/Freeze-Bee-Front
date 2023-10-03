import {createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized} from 'vue-router'

import HomePageView from "../views/HomePageView.vue";
import ProcessView from "../views/ProcessView.vue";
import ProductView from "../views/ProductView.vue";
import IngredientView from "../views/IngredientView.vue";
import LoginView from "../views/LoginView.vue";
import {authGuard} from "@/router/authGuard";

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
        component: ProcessView,
        meta: { requiredRoles: ['R&D', 'Production'] }
    },
    {
        path: '/product:state?:session_state?:code?',
        name: 'product',
        component: ProductView,
        meta: { requiredRoles: ['R&D', 'Production', 'Commerce'] }
    },
    {
        path: '/ingredient:state?:session_state?:code?',
        name: 'ingredient',
        component: IngredientView,
        meta: { requiredRoles: ['R&D', 'Production', 'Commerce'] }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(authGuard);

export default router
