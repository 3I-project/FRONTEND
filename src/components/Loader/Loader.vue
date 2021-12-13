<template>
  <div class="wrapper-loader">
    <div class="loader"></div>
    <p>{{ loaderText }}</p>
  </div>
</template>

<script>
import './loader.scss';

export default {
  name: "Loader",
  props: {
    loaderText: {
      type: String,
      default: ''
    }
  }
}
</script>
