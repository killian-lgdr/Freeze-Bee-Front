import {createRouter, createWebHashHistory} from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import CatalogsListView from "@/views/CatalogsListView.vue";
import MenusListView from "@/views/MenusListView.vue";
import HomePageView from "@/views/HomePageView.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";
import AccountManagement from "@/components/AccountManagement.vue";
import CartManagementView from "@/views/CartManagementView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePageView
    },
    {
        path: '/login',
        name: 'login',
        component: SignInView
    },
    {
        path: '/register',
        name: 'register',
        component: SignUpView
    },
    {
        path: '/createaccount',
        name: 'createaccount',
        component: CreateAccountView
    },
    {
        path: '/account',
        name: 'account',
        component: AccountManagement
    },
    {
        path: '/catalogs',
        name: 'catalogs',
        component: CatalogsListView
    },
    {
        path: '/menus/:catalogId',
        name: 'menus',
        component: MenusListView
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartManagementView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
