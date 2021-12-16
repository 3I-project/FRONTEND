<template>
  <div class="page idea-page">
    <div class="idea-loader" v-if="isLoading">
      <Loader :loader-text="'Загрузка идеи ...'" />
    </div>
    <template v-else>
      <div class="idea-wrapper">
        <Idea :idea="ideaData" />
      </div>
      <div class="idea-vote">
        <VoteController />
      </div>
      <div class="idea-comments">
        <div class="input-comment">
          <p>Оставить комментарий</p>
          <textarea placeholder="Написать комментарий..."></textarea>
          <MyButton class="comment-input blue-btn">Отправить</MyButton>
          <span>2 комментария</span>
        </div>
        <div class="comment-line"></div>
        <div class="comments-wrapper">
          <div class="comment-item">
            <div class="comment-item__top">
              <div class="user-avatar">
                <img src="https://avatars.dicebear.com/api/avataaars/Tank.svg" alt="">
              </div>
              <p>Андрей Николаевич</p>
              <small>2 часа назад</small>
            </div>
            <div class="comment-item__content">
              <p>Собираем команду разработиков 05.06, обсуждаем этот проект и приступаем к работе!</p>
            </div>
          </div>
          <div class="comment-item">
            <div class="comment-item__top">
              <div class="user-avatar">
                <img src="https://avatars.dicebear.com/api/avataaars/Tank.svg" alt="">
              </div>
              <p>Андрей Николаевич</p>
              <small>2 часа назад</small>
            </div>
            <div class="comment-item__content">
              <p>Собираем команду разработиков 05.06, обсуждаем этот проект и приступаем к работе!</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import './ideaView.scss';

import MyButton from "../../components/UI/MyButton/MyButton";

import Loader from "../../components/Loader/Loader";
import Idea from "../../components/Idea/Idea";
import VoteController from "../../components/VoteController/VoteController";

export default {
  name: "IdeaView",
  data () {
    return {
      isLoading: true,
      ideaData: null,
    }
  },
  components: {
    Loader,
    Idea,
    VoteController,
    MyButton
  },
  mounted() {
    this.isLoading= true;

    this.$api.get(`/idea/idea?id=${this.$route.params.id}`, {
      headers: {
        Authorization: localStorage.getItem('access')
      }
    })
    .then(response => {
      const { data } = response;

      this.ideaData = data.idea;

      console.log(data)
    })
    .catch(error => {
      console.log(error.response)
    })
    .finally(() => {
      this.isLoading = false
    })
  }
}
</script>
