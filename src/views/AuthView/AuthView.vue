<template>
  <div class="auth-window main-window">
    <div class="window__wrapper">
      <h1 class="window__title">Добро пожаловать в «Инкубатор Иновационных Идей»!</h1>
      <div class="window__describe">
        <p class="window__text">«Инкубатор Иновационных Идей» (3И) - это уникальное web-приложение, позволяющее очень просто выносить идеи, возникающии в организации, на голосование.</p>
        <p class="window__text">Зарегистрируйтесь в нашей системе и принимайте участие в решинии важных вопросов вашей организации.</p>
      </div>
      <img class="window__img" src="../../assets/auth/light.svg" alt="">
      <div class="window__buttons">
        <MyButton class="blue-btn">Зарегистрироваться</MyButton>
        <MyButton class="orange-btn button-login">Войти</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import './authView.scss'

import MyButton from '../../components/UI/MyButton/MyButton.vue'

export default {
  name: "AuthView",
  components: {
    MyButton
  }
}
</script>
