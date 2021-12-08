import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import MainView from "../views/MainView/MainView.vue";
import AuthView from "../views/AuthView/AuthView";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'mainLayout'
    }
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainView,
    meta: {
      layout: 'authLayout'
    }
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: AuthView,
    meta: {
      layout: 'authLayout'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
