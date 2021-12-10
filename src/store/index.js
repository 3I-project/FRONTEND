import { createStore } from 'vuex'
import { useCookies } from "vue3-cookies"

const { cookies  } = useCookies();

export default createStore({
  state: {
    tokens: {
      access: '',
      refresh: ''
    },
    userProfile: {}
  },
  mutations: {
    setProfileData(state, profileData) {
      state.userProfile = profileData;
    },
    setTokens(state, tokens) {
      state.tokens.access = tokens.access_token;
      state.tokens.refresh = tokens.refresh_token;

      localStorage.setItem('access', state.tokens.access);
      cookies.set('refresh', state.tokens.refresh);
    },
    exit(state) {
      state.tokens.access = '';
      state.tokens.refresh = '';

      localStorage.removeItem('access');
      cookies.remove('refresh');
    }
  },
  actions: {
    getProfileInformation({ commit }) {
      fetch('http://localhost:5500/apiV1/auth/me', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('access')
        }
      })
          .then(res => res.json())
          .then(data => {
            if (data.status) {
              commit('setProfileData', data.profile);
            }
          })
    }
  },
  modules: {
  },
  getters: {
    userProfile: state => state.userProfile
  }
})
