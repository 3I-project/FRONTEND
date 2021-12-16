<template>
  <div class="idea">
    <div class="idea__header">
      <div
          class="idea-author"
      >
        <img src="../../../src/assets/idea/avatar.png" alt="">
        <p v-if="isMyIdea">Вы предлагаете: </p>
        <p v-else>
          {{ idea.author.first_name }} {{ idea.author.last_name }}
          предлагает:
        </p>
      </div>
      <div class="idea-date">
        <p>Дата публикации: {{ publishDate.pD }}.{{ publishDate.pM }}.{{ publishDate.year }}.</p>
      </div>
    </div>
    <div class="idea__content" :class="{'idea-link': setIdeaLink}" @click="goToIdea">
      <h3 class="idea-title">{{ idea.title }}</h3>
      <div class="idea-content-body">
        <p class="idea-content-body__text">
          {{ idea.message_text }}
        </p>
      </div>
    </div>
    <div class="idea__footer">
      <div class="idea-controllers">
        <div class="idea-controllers__item like-controller">
          <img src="../../../src/assets/idea/controllers/like.svg" alt="">
          <p>0</p>
        </div>
        <div class="idea-controllers__item dislike-controller">
          <img src="../../../src/assets/idea/controllers/dislike.svg" alt="">
          <p>0</p>
        </div>
        <div class="idea-controllers__item comment-controller">
          <img src="../../../src/assets/idea/controllers/comment.svg" alt="">
          <p>0</p>
        </div>
      </div>
      <div class="idea-type">
        <p>Тип: бизнес идея</p>
      </div>
    </div>
  </div>
</template>

<script>
import './idea.scss';

import { mapGetters } from "vuex";

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
    }
  },
  computed: {
    ...mapGetters(['userProfile']),
    isMyIdea () {
      return this.userProfile.id_employee === this.idea.id_employee;
    },
    publishDate() {
      const date = new Date(this.idea.created);

      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();

      const pM = (`0${month}`).substr(-2);
      const pD = (`0${day}`).substr(-2);

      return {
        year,
        pM,
        pD
      }
    }
  },
  methods: {
    goToIdea () {
      if (this.setIdeaLink) {
        this.$router.push(`/idea/${this.idea.id_idea}`);
      }
    }
  }
}
</script>
