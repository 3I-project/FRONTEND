import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookies from 'vue3-cookies'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client';

import $api from "./http/axios";

const Vue = createApp(App);

Vue.use(VueCookies);

Vue.use(new VueSocketIO({
    connection: SocketIO('http://localhost:5506', { transports: ['websocket'] }),
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))

Vue.config.globalProperties.$api = $api;
Vue.use(store).use(router).mount('#app')
