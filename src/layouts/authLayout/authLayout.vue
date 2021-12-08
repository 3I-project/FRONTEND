<template>
  <div class="auth-layout main-stage">
    <AuthView />
  </div>
</template>

<script>
import './authLayout.scss';

import AuthView from "../../views/AuthView/AuthView.vue";

export default {
  name: "authLayout",
  components: {
    AuthView
  }
}
</script>
