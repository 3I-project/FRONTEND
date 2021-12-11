import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import $api from "./http/axios";

const Vue = createApp(App);

Vue.config.globalProperties.$api = $api;

Vue.use(store).use(router).mount('#app')
