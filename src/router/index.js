import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView/HomeView.vue'
import MainView from "../views/MainView/MainView.vue";
import AuthView from "../views/AuthView/AuthView";
import RegistrationView from "../views/RegistrationView/RegistrationView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
  },
  {
    path: '/registration',
    name: 'RegPage',
    component: RegistrationView,
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
