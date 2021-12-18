import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookies from 'vue3-cookies'

import $api from "./http/axios";

const Vue = createApp(App);

Vue.use(VueCookies);

Vue.config.globalProperties.$api = $api;

Vue.use(store).use(router).mount('#app')
