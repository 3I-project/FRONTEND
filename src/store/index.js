import { createStore } from 'vuex'
import { useCookies } from "vue3-cookies"

const { cookies  } = useCookies();

export default createStore({
  state: {
    tokens: {
      access: '',
      refresh: ''
    }
  },
  mutations: {
    setTokens(state, tokens) {
      state.tokens.access = tokens.access_token;
      state.tokens.refresh = tokens.refresh_token;

      localStorage.setItem('access', state.tokens.access);
      cookies.set('refresh', state.tokens.refresh);
    }
  },
  actions: {
  },
  modules: {
  }
})
