import {createRouter, createWebHashHistory} from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import CatalogsListView from "@/views/CatalogsListView.vue";
import MenusListView from "@/views/MenusListView.vue";
import HomePageView from "@/views/HomePageView.vue";
import AccountManagementView from "@/views/AccountManagementView.vue";
import CartManagementView from "@/views/CartManagementView.vue";
import InfoMenuView from "@/views/InfoMenuView.vue";
import OrdersHistoricView from "@/views/OrdersHistoricView.vue";
import InfoOrderView from "@/views/InfoOrderView.vue";

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
        path: '/orders',
        name: 'orders',
        component: OrdersHistoricView
    },
    {
        path: '/orders/:orderId',
        name: 'order',
        component: InfoOrderView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
