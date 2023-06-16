import {createRouter, createWebHashHistory} from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import CatalogsListView from "@/views/CatalogsListView.vue";
import MenusListView from "@/views/MenusListView.vue";
import HomePageView from "@/views/HomePageView.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";
import AccountManagementView from "@/views/AccountManagementView.vue";
import CartManagementView from "@/views/CartManagementView.vue";
import InfoMenuView from "@/views/InfoMenuView.vue";
import CommandHistoricView from "@/views/CommandsHistoricView.vue";
import InfoCommandView from "@/views/InfoCommandView.vue";

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
        component: AccountManagementView
    },
    {
        path: '/catalogs',
        name: 'catalogs',
        component: CatalogsListView
    },
    {
        path: '/catalogs/:catalogId',
        name: 'menus',
        component: MenusListView
    },
    {
        path: '/catalogs/:catalogId/menus/:menuId',
        name: 'menu',
        component: InfoMenuView
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartManagementView
    },
    {
        path: '/commands',
        name: 'commands',
        component: CommandHistoricView
    },
    {
        path: '/commands/:commandId',
        name: 'command',
        component: InfoCommandView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
