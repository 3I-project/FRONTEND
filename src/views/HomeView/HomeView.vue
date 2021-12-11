<template>
  <div class="page home-page">
    <div class="ideas-wrapper">
      <div class="wrapper-item" v-for="index in 10" :key="index">
        <Idea />
      </div>
    </div>
  </div>
</template>

<script>
import './homeView.scss'

import Idea from "../../components/Idea/Idea";

export default {
  name: 'HomeView',
  components: {
    Idea
  }
}
</script>
