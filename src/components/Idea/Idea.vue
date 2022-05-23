<template>
  <div class="idea">
    <div class="idea__header">
      <div
          class="idea-author"
      >
        <img @click="$router.push(`/profile/${idea.id_employee}`)" :src="avatarUrl" alt="">
        <p v-if="isMyIdea">Вы предлагаете: </p>
        <p v-else>
          {{ idea.author.first_name }} {{ idea.author.last_name }}
          предлагает:
        </p>
      </div>
      <div class="idea-date">
        <p>Дата публикации: {{ publishDate.pD }}.{{ publishDate.pMn }}.{{ publishDate.year }}.</p>
        <div class="idea-date__more" @click="openMoreList = !openMoreList" v-if="isMyIdea && !setIdeaLink">
          <img src="../../../src/assets/idea/more.svg" alt="more">

          <div class="more-list" :class="openMoreList ? 'more-list_open' : ''">
            <ul>
              <li @click="editIdea">Редактировать</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="idea__content" :class="{'idea-link': setIdeaLink}" @click="goToIdea($event)">
      <h3 class="idea-title">{{ idea.title }}</h3>
      <div class="idea-content-body">
        <QuillEditor v-model:content="ideaMessage" :readOnly="true" theme="bubble" toolbar="" />
      </div>
    </div>
    <div class="idea__footer">
      <div class="idea-controllers">
        <div class="idea-controllers__item like-controller" @click="setReaction(1)">
          <img src="../../../src/assets/idea/controllers/like.svg" alt="">
          <p>{{ ideaReactions.likes}}</p>
        </div>
        <div class="idea-controllers__item dislike-controller" @click="setReaction(-1)">
          <img src="../../../src/assets/idea/controllers/dislike.svg" alt="">
          <p>{{ ideaReactions.dislikes }}</p>
        </div>
        <div class="idea-controllers__item comment-controller">
          <img src="../../../src/assets/idea/controllers/comment.svg" alt="">
          <p>{{ idea.commentsCount }}</p>
        </div>
      </div>
      <div class="idea-type">
        <p>Тип: {{ idea.type }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import './idea.scss';
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

import { mapGetters } from "vuex";

import { QuillEditor } from '@vueup/vue-quill'

import parseDate from "../../utility/time.utility";

export default {
  name: "Idea",
  props: {
    idea: {
      type: Object,
      default: () => {
        return {}
      }
    },
    setIdeaLink: {
      type: Boolean,
      default: false,
    },
    reactions: {
      type: Object,
      default: () => {
        return {
          likes: 0,
          dislikes: 0
        }
      }
    }
  },
  components: {
    QuillEditor
  },
  data() {
    return {
      openMoreList: false,
      ideaReactions: {
        likes: this.idea.reactions.likes,
        dislikes: this.idea.reactions.dislikes
      }
    }
  },
  computed: {
    ...mapGetters(['userProfile']),
    isMyIdea () {
      return this.userProfile.id_employee === this.idea.id_employee;
    },
    publishDate () {
      const { pD, pMn, year } = parseDate(this.idea.created);
      console.log(pD)
      return {
        pD,
        pMn,
        year
      }
    },
    ideaMessage() {
      return JSON.parse(this.idea.message_text)
    },
    avatarUrl() {
      const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5500/apiV1': 'https://server-3i.herokuapp.com/apiV1'

      if (this.idea.author.avatarHash) {
        return `${baseURL}/avatar/${ this.idea.author.avatarHash }`
      }

      return require('../../assets/default-avatar.jpg')
    }
  },
  methods: {
    goToIdea (event) {
      const ideaBody = event.target.closest('.idea-content-body');
      if (this.setIdeaLink && !ideaBody) {
        this.$router.push(`/idea/${this.idea.id_idea}`);
      }
    },
    editIdea() {
      this.$emit('editIdea', this.openMoreList)
    },
    setReaction(type) {
      this.$api.post('/reaction/set', {
        idea_id: this.idea.id_idea,
        type
      })
          .then(response => {
            const { data } = response;

            if (data.statusCode === 200) {
              console.log(data.payload.msg);

              type === 1 ? this.ideaReactions.likes += 1 : this.ideaReactions.dislikes += 1;
            }
          })
          .catch((err) => {
            const { data } = err.response
            console.log(data)
          })
    }
  }
}
</script>
