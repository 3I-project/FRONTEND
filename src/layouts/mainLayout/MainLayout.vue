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

import {mapGetters} from 'vuex'

export default {
  name: "mainLayout",
  components: {
    TopHeader
  },
  computed: {
    ...mapGetters(['userProfile']),
  },
  async mounted() {
    await store.dispatch('getProfileInformation');

    this.$socket.emit('CONNECT_TO_NOTIFICATION', {
      id_organization: this.userProfile.id_organization,
      first_name: this.userProfile.first_name,
      last_name: this.userProfile.last_name
    })

    this.sockets.subscribe('USER_CONNECT', (data) => {
      console.log(data);
    });
  },
  beforeUnmount() {
    // this.sockets.unsubscribe('USER_CONNECT')
  }
}
</script>
