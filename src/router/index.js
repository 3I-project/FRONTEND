import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView/HomeView.vue'
import MainView from "../views/MainView/MainView.vue";
import IdeaView from "../views/IdeaView/IdeaView.vue";
import AuthView from "../views/AuthView/AuthView.vue";
import RegistrationView from "../views/RegistrationView/RegistrationView.vue";

import store from '../store/index'

const routes = [
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
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomeView,
    meta: {
      layout: 'mainLayout'
    }
  },
  {
    path: '/idea/:id',
    name: 'IdeaPage',
    component: IdeaView,
    meta: {
      layout: 'mainLayout'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (from, to, next) => {
  const access = localStorage.getItem('access') || store.state.tokens.access;

  if (access.length) {
    if (from.path === '/main' || from.path === '/auth' || from.path === '/registration') {
      next('/')
    }

    await store.dispatch('getProfileInformation');

    next()
  } else if (from.path === '/main' || from.path === '/auth' || from.path === '/registration' ) {
    next()
  } else {
    next('/main')
  }
})

export default router
