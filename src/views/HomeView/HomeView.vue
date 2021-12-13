<template>
  <div class="page home-page">
    <div class="idea-loader" v-if="isLoading">
      <Loader :loader-text="'Идет загрузка идей ...'" />
    </div>
    <div class="ideas-wrapper" v-else>
      <div class="wrapper-item" v-for="idea in ideas" :key="idea.id_idea">
        <Idea :idea="idea" />
      </div>
    </div>
  </div>
</template>

<script>
import './homeView.scss'

import Idea from "../../components/Idea/Idea.vue";
import Loader from "../../components/Loader/Loader.vue";

export default {
  name: 'HomeView',
  data() {
    return {
      ideas: null,
      isLoading: true,
    }
  },
  components: {
    Idea,
    Loader
  },
  mounted() {
    this.isLoading = true;

    this.$api.get('/idea/posts', {
      headers: {
        Authorization: localStorage.getItem('access')
      }
    })
        .then(response => {
          const { data } = response;
          this.ideas = data.ideas
        })
        .catch(() => {
          console.log('Не удалось загрузить идеи')
        })
        .finally(() => {
          this.isLoading = false
        })
  }
}
</script>
