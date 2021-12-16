<template>
  <div class="vote">
    <MyButton class="vote-btn orange-btn">Поддержать</MyButton>
    <div class="vote-center">
      <p>Голосование закончится 22.06.22г в 13:56</p>
      <div></div>
    </div>
    <MyButton class="vote-btn grey-btn">Отклонить</MyButton>
  </div>
</template>

<script>
import './voteController.scss';

import MyButton from "../UI/MyButton/MyButton";

export default {
  name: "VoteController",
  data () {
    return {}
  },
  components: {
    MyButton
  }
}
</script>
