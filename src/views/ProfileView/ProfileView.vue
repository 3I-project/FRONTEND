<template>
  <div class="profile-page">
    <div class="profile-page__banner">
      <div class="profile-page__wrapper profile-page__banner-text">
        <MyButton class="orange-btn">Написать сообщение</MyButton>
      </div>
      <img src="../../../src/assets/Profile/banner.png" alt="">
    </div>
    <div class="profile-page__header">
      <div class="profile-page__wrapper">
        <div class="profile-page__user">
          <div class="profile-page__avatar">
            <img :src="avatarUrl" alt="">
          </div>
          <div class="profile-page__info">
            <p v-if="userProfile.type === 'employee'">{{ userProfile.first_name }} {{ userProfile.last_name }}</p>
            <p v-else>{{ userProfile.name }}</p>
            <small v-if="userProfile.type === 'employee'" class="wrapper-user__organization">{{ userProfile.organization.name }}</small>
          </div>
        </div>
        <nav class="profile-page__nav">
          <p class="nav-active">Идеи</p>
          <p>Статистика</p>
          <p>Обо мне</p>
        </nav>
      </div>
    </div>
    <div class="page"></div>
  </div>
</template>

<script>
import './profileView.scss'

import MyButton from "../../components/UI/MyButton/MyButton";
import {mapGetters} from "vuex";

export default {
  name: "ProfileView",
  components: {
    MyButton
  },
  computed: {
    ...mapGetters(['userProfile']),
    avatarUrl () {
      const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5500/apiV1': 'https://server-3i.herokuapp.com/apiV1'

      if (this.userProfile.avatarUrl) {
        return `${baseURL}/avatar/${ this.userProfile.avatarUrl }`
      }

      return require('../../assets/default-avatar.jpg')
    }
  }
}
</script>
