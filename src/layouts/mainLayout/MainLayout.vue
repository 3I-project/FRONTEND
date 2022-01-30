<template>
  <div class="wrapper">
    <TopHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import './mainLayout.scss';

import TopHeader from "../../components/TopHeader/TopHeader";
import store from "../../store";

export default {
  name: "mainLayout",
  components: {
    TopHeader
  },
  async mounted() {
    await store.dispatch('getProfileInformation');
  }
}
</script>
