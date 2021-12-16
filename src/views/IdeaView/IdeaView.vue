<template>
  <div class="page idea-page">
    <div class="idea-loader" v-if="isLoading">
      <Loader :loader-text="'Загрузка идеи ...'" />
    </div>
    <div class="idea-wrapper" v-else>
      <Idea :idea="ideaData" />
    </div>
  </div>
</template>

<script>
import './ideaView.scss';

import Loader from "../../components/Loader/Loader";
import Idea from "../../components/Idea/Idea";

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
    Idea
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
