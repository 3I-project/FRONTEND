import { createStore } from 'vuex'
import { useCookies } from "vue3-cookies"

import $api from "../http/axios";

const { cookies  } = useCookies();

export default createStore({
  state: {
    tokens: {
      access: localStorage.getItem('access') || '',
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
    async getProfileInformation({ commit }) {
      await $api.get('auth/me', {
        headers: {
          Authorization: localStorage.getItem('access')
        }
      }).then(response => {
            const { data } = response;

            commit('setProfileData', data.profile);
          })
          .catch(() => {})
    }
  },
  modules: {
  },
  getters: {
    userProfile: state => state.userProfile
  }
})
