<template>
  <div class="auth-layout"
  :class="currentBG">
    <router-view />
  </div>
</template>

<script>
import './authLayout.scss';

export default {
  name: "authLayout",
  computed: {
    currentBG() {
      const background = {
        '/main': 'main-stage',
        '/auth': 'auth-stage'
      }

      return background[this.$route.path]
    }
  }
}
</script>
