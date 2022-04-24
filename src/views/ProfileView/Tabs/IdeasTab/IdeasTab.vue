<template>
  <div class="wrapper-item" v-for="idea in posts" :key="idea.id_idea">
    <Idea :idea="idea" :set-idea-link="true" />
  </div>
</template>

<script>

import Idea from "../../../../components/Idea/Idea";

export default {
  name: "IdeasTab",
  props: {
    posts: {
      type: Object
    }
  },
  components: {
    Idea
  }
}
</script>

