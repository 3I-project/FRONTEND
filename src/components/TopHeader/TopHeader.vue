<template>
  <header class="header">
    <div class="header-wrapper">
      <nav>
        <router-link to="/" :class="{'link-active': $route.path === '/'}">Ленты событий</router-link>
        <router-link to="/employees" :class="{'link-active': $route.path === '/employees'}">Сотрудники</router-link>
      </nav>
      <div class="header-right">
        <router-link to="/create" class="addButton">Подать идею</router-link>
        <div class="user-block">
          <div class="user-avatar" @click="$router.push(`/profile/${userProfile.id_employee}`)">
            <img :src="avatarUrl" alt="">
          </div>
          <div class="user-menu">
            <div class="wrapper-user" @click="isOpenMenu = !isOpenMenu">
              <div class="user">
                <p v-if="userProfile.type === 'employee'">{{ userProfile.first_name }} {{ userProfile.last_name }}</p>
                <p v-else>{{ userProfile.name }}</p>
                <small v-if="userProfile.type === 'employee'" class="wrapper-user__organization">{{ userProfile.organization.name }}</small>
              </div>
              <div class="drop-arrow" :class="{'rotate-arrow': isOpenMenu}">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.7922 3.30253L12.3664 2.87374C12.2324 2.73982 12.0541 2.66605 11.8635 2.66605C11.673 2.66605 11.4945 2.73982 11.3605 2.87374L6.50291 7.73155L1.6397 2.86835C1.5059 2.73443 1.32738 2.66077 1.13693 2.66077C0.946471 2.66077 0.767852 2.73443 0.63394 2.86835L0.208002 3.2945C-0.0693339 3.57162 -0.0693339 4.02303 0.208002 4.30015L5.99823 10.1112C6.13203 10.245 6.31034 10.3393 6.50248 10.3393H6.5047C6.69527 10.3393 6.87357 10.2449 7.00737 10.1112L12.7922 4.3159C12.9262 4.1821 12.9998 3.9984 13 3.80795C13 3.61738 12.9262 3.43623 12.7922 3.30253Z" fill="#002C39"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="drop-menu" :class="{'open-menu': isOpenMenu}">
              <ul>
                <li @click="exit">Выход</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import './topHeader.scss';

import { mapGetters } from 'vuex'

export default {
  name: "TopHeader",
  data() {
    return {
      isOpenMenu: false
    }
  },
  computed: {
    ...mapGetters(['userProfile']),
    avatarUrl () {
      const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5500/apiV1': 'http://134.0.115.249:5500/apiV1'

      if (this.userProfile.avatarUrl) {
        return `${baseURL}/avatar/${ this.userProfile.avatarUrl }`
      }

      return require('../../assets/default-avatar.jpg')
    }
  },
  methods: {
    exit () {
      this.$store.commit('exit');
      this.$router.push('/main');
    }
  }
}
</script>
