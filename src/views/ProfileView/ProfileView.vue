<template>
  <div class="idea-loader" v-if="isLoading">
    <Loader v-if="isLoading" :loader-text="'Загрузка профиля ...'"  />
  </div>
  <div class="profile-page" v-else>
    <div class="profile-page__banner">
      <div class="profile-page__wrapper profile-page__banner-text">
        <MyButton class="orange-btn" v-if="userProfile.id_employee !== userData.id_employee">Написать сообщение</MyButton>
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
            <p>{{ userData.first_name }} {{ userData.last_name }}</p>
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
    <div class="page profile-page">
      <div class="wrapper-item" v-for="idea in posts" :key="idea.id_idea">
        <Idea :idea="idea" :set-idea-link="true" />
      </div>
    </div>
  </div>
</template>

<script>
import './profileView.scss'

import MyButton from "../../components/UI/MyButton/MyButton";
import Idea from "../../components/Idea/Idea";
import Loader from "../../components/Loader/Loader";

import {mapGetters} from "vuex";
import axios from "../../http/axios";

export default {
  name: "ProfileView",
  data () {
    return {
      userData: {},
      posts: {},
      isLoading: false,
    }
  },
  components: {
    MyButton,
    Idea,
    Loader
  },
  watch: {
    async '$route.params' () {
      const { id } = this.$route.params;

      await this.getUserData(id)
    }
  },
  computed: {
    ...mapGetters(['userProfile']),
    avatarUrl () {
      const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5500/apiV1': 'https://server-3i.herokuapp.com/apiV1'

      if (this.userData.avatarUrl) {
        return `${baseURL}/avatar/${ this.userData.avatarUrl }`
      }

      return require('../../assets/default-avatar.jpg')
    }
  },
  methods: {
    async getUserData (id) {
      this.isLoading = true
      const { data } = await axios.get(`http://localhost:6500/apiV1/profile/${id}`, {
        headers: {
          Authorization: localStorage.getItem('access')
        }
      })

      if (data.status) {
        // console.log(data.payload)
        this.userData = data.payload.user
        this.posts = data.payload.posts

        this.isLoading = false
      }
    }
  },
  async mounted() {
    const { id } = this.$route.params;

    await this.getUserData(id)
  }
}
</script>
