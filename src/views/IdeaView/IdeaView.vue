<template>
  <div class="page idea-page">
    <div class="idea-loader" v-if="isLoading">
      <Loader :loader-text="'Загрузка идеи ...'" />
    </div>
    <template v-else>
      <EditIdeaModal :idea="ideaData[0]" @closeEditModal="closeEditModal" v-show="openEditIdeaModal" />
      <div class="idea-wrapper">
        <Idea :idea="ideaData[0]" :reactions="{likes, dislikes}" @editIdea="(value) => this.openEditIdeaModal = value" />
      </div>
<!--      <div class="idea-vote">-->
<!--        <VoteController />-->
<!--      </div>-->
      <div class="idea-comments">
        <div class="idea-comments__hint" v-show="!this.ideaData[0].enableComments">
          Автор отключил комментарии к данной идеи!
        </div>
        <div :class="!this.ideaData[0].enableComments ? 'idea-comments_off': ''" >
          <div class="input-comment">
            <p>Оставить комментарий</p>
            <textarea v-model="commentInput" @keydown.enter="sendComment" placeholder="Написать комментарий..."></textarea>
            <MyButton class="comment-input blue-btn" @click="sendComment">Отправить</MyButton>
            <span>{{ comments.length || 0 }} комментария</span>
          </div>
          <div class="comment-line"></div>
          <div class="comments-wrapper" v-if="comments.length">
            <div class="comment-item" v-for="comment in comments" :key="comment.id_comment">
              <div class="comment-item__top">
                <div class="user-avatar">
                  <img :src="avatarUrl(comment.author.avatarHash)" alt="">
                </div>
                <p>
                  {{ comment.author.first_name }} {{ comment.author.last_name }}

                  <span v-if="comment.author.isLeader">(руководитель организации)</span>
                </p>
                <small>{{ timePassed(comment.created_date) }}</small>
              </div>
              <div class="comment-item__content">
                <p>{{ comment.text }}</p>
              </div>
            </div>
          </div>
          <div class="comments-empty" v-else>
            <p>Будь первый! Напиши комментарий!</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import './ideaView.scss';

import { mapGetters } from 'vuex'

import MyButton from "../../components/UI/MyButton/MyButton";

import Loader from "../../components/Loader/Loader";
import Idea from "../../components/Idea/Idea";
// import VoteController from "../../components/VoteController/VoteController";
import EditIdeaModal from "../../components/Modals/EditIdeaModal/EditIdeaModal";

export default {
  name: "IdeaView",
  data () {
    return {
      isLoading: true,
      ideaData: null,
      comments: 0,
      commentInput: '',
      openEditIdeaModal: false,
      likes: 0,
      dislikes: 0,
    }
  },
  components: {
    Loader,
    Idea,
    // VoteController,
    MyButton,
    EditIdeaModal
  },
  computed: {
    ...mapGetters(['userProfile']),
  },
  methods: {
    async closeEditModal(updateStatus) {
      if (updateStatus) {
        this.isLoading= true;
        await this.getIdeaData()
        this.isLoading= false;
      }

      this.openEditIdeaModal = false
    },
    timePassed (date) {
      const d = new Date(Date.now() - new Date(date));

      const month = d.getUTCMonth();
      const day = d.getUTCDate() - 1;
      const hour = d.getUTCHours() - 3;
      const minutes = d.getUTCMinutes();
      const seconds = d.getUTCSeconds();

      const secondsDict = ['секудну', 'секунды', 'секунд'];
      const minutesDict = ['мунуту', 'минуты', 'минут'];
      const hoursDict = ['час', 'часа', 'часов'];
      const daysDict = ['день', 'дня', 'дней'];
      const monthsDict = ['месяц', 'месяца', 'месяцев'];

      if (month === 0 && day === 0 && hour === 0 && minutes === 0) return `${seconds} ${this.declOfNum(seconds, secondsDict)} назад`;
      else if (month === 0 && day === 0 && hour === 0) return `${minutes} ${this.declOfNum(minutes, minutesDict)} назад`;
      else if (month === 0 && day === 0) return `${hour} ${this.declOfNum(hour, hoursDict)} назад`;
      else if (month === 0) return `${day} ${this.declOfNum(day, daysDict)} назад`;
      else return `${month} ${this.declOfNum(month, monthsDict)} назад`;
    },
    declOfNum(number, dict) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) return dict[2];
      n %= 10;
      if (n === 1) return dict[0];
      if (n >= 2 && n <= 4) return dict[1];
      return dict[2];
    },
    avatarUrl(avatarHash) {
      const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5500/apiV1': 'http://134.0.115.249:5500/apiV1'

      if (avatarHash) {
        return `${baseURL}/avatar/${ avatarHash }`
      }

      return require('../../assets/default-avatar.jpg')
    },
    async sendComment () {
      if (!this.commentInput.length) return
      if (!this.ideaData[0].enableComments) return

      const requestPayload = {
        text: this.commentInput,
        id_idea: this.$route.params.id,
      }

      await this.$api.post('/comments/create', requestPayload)
      .then(async response => {
        const { data } = response;

        if (data.status) {
          await this.getIdeaComments();

          this.commentInput = ''
        }
      })
      .catch(error => {
        console.log(error.response);
      })
    },
    async getIdeaComments() {
      await this.$api.get(`/comments?id=${this.$route.params.id}`)
      .then(response => {
        const { data } = response;

        console.log(data);

        this.comments = data.comments;
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    async getIdeaData () {
      await this.$api.get(`/idea/idea?id=${this.$route.params.id}`)
          .then(response => {
            const { data } = response;

            this.ideaData = data.idea;
            // this.ideaData.message_text = JSON.parse(this.ideaData.message_text);
          })
          .catch(error => {
            console.log(error.response)
          })
    },
    // async getIdeaReactions() {
    //   await this.$api.get(`/reaction?idea_id=${this.$route.params.id}`)
    //     .then(response => {
    //       const { data } = response
    //
    //       console.log(data)
    //
    //       this.likes = data.payload.likes;
    //       this.dislikes = data.payload.dislikes;
    //     })
    //       .catch(error => {
    //         console.log(error.response)
    //       })
    // }
  },
  async mounted() {
    this.isLoading= true;

    await this.getIdeaData();
    await this.getIdeaComments();
    // await this.getIdeaReactions();

    this.isLoading = false
  }
}
</script>
