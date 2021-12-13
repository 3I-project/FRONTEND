<template>
  <div class="page home-page">
    <div class="idea-loader" v-if="isLoading">
      <Loader :loader-text="'Идет загрузка идей ...'" />
    </div>
    <div class="home-page__wrapper" v-else>
      <div class="search-wrapper">
        <SearchFilter />
      </div>
      <div class="ideas-wrapper">
        <div class="wrapper-item" v-for="idea in ideas" :key="idea.id_idea">
          <Idea :idea="idea" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './homeView.scss'

import Idea from "../../components/Idea/Idea.vue";
import Loader from "../../components/Loader/Loader.vue";
import SearchFilter from "../../components/SearchFilter/SearchFilter.vue";

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
    Loader,
    SearchFilter
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
