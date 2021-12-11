<template>
  <component :is="currentComponent"></component>
</template>

<script>
import './scss/main.scss';

import authLayout from "./layouts/authLayout/authLayout.vue";
import mainLayout from "./layouts/mainLayout/MainLayout.vue";

export default {
  name: "App",
  components: {
    authLayout,
    mainLayout
  },
  computed: {
    currentComponent() {
      return this.$route.meta.layout || 'authLayout';
    }
  }
}
</script>
