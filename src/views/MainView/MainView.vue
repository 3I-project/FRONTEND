<template>
  <div class="auth-window main-window">
    <div class="auth__wrapper">
      <h1 class="window__title">Добро пожаловать в «Инкубатор Иновационных Идей»!</h1>
      <div class="window__describe">
        <p class="window__text">«Инкубатор Инновационных Идей» (3И) - это уникальное приложение, позволяющее принимать участие всем сотрудникам в жизни организации.</p>
        <p class="window__text">Зарегистрируйтесь в нашей системе и примите участие в решинии важных вопросов вашей организации.</p>
      </div>
      <img class="window__img" src="../../assets/auth/light.svg" alt="">
      <div class="window__buttons">
        <MyButton class="blue-btn" @click="$router.push('/registration')">Зарегистрироваться</MyButton>
        <MyButton class="orange-btn button-login" @click="$router.push('/auth')">Войти</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import './mainView.scss'

import MyButton from '../../components/UI/MyButton/MyButton.vue'

export default {
  name: "MainView",
  components: {
    MyButton
  }
}
</script>
