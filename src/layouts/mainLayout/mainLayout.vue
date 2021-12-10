<template>
  <div class="wrapper">
    <TopHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import TopHeader from "../../components/TopHeader/TopHeader";

export default {
  name: "mainLayout",
  components: {
    TopHeader
  }
}
</script>
