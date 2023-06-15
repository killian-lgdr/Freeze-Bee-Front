import { createRouter, createWebHashHistory } from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import CatalogsListView from "@/views/CatalogsListView.vue";
import MenusListView from "@/views/MenusListView.vue";
import HomePageView from "@/views/HomePageView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePageView
  },{
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
    path: '/catalogs',
    name: 'catalogs',
    component: CatalogsListView
  },
  {
    path: '/menus/:catalogId',
    name: 'menus',
    component: MenusListView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
