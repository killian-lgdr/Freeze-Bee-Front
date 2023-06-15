import { createRouter, createWebHashHistory } from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: SignInView
  },
  {
    path: '/register',
    name: 'register',
    component: SignUpView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
