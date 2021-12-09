<template>
  <div class="auth-window login-window">
    <div class="auth-window__back" @click="$router.push('/main')">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#19BE87"/>
        <path d="M28.5831 17.563C24.9106 17.563 21.2381 17.563 17.5659 17.563C18.5016 16.6272 19.4373 15.6915 20.3731 14.7554C22.5316 12.5969 19.1689 9.25908 17.0049 11.4234C14.7239 13.7044 12.4431 15.9855 10.1621 18.2666C9.24653 19.1821 9.27119 20.7078 10.18 21.6166C12.4611 23.8974 14.7419 26.1784 17.0229 28.4592C19.1815 30.6177 22.5193 27.255 20.355 25.0911C19.4249 24.161 18.4949 23.231 17.5648 22.3013C21.2263 22.3013 24.8877 22.3013 28.5489 22.3013C31.6079 22.3013 31.635 17.563 28.5831 17.563Z" fill="white"/>
      </svg>
    </div>
    <div class="auth__wrapper">
      <h1 class="auth-window__title login-window__title">
        Авторизация
      </h1>
      <div class="login-window__select">
        <p class="auth-window__text">Войти как:</p>
        <div class="auth-select-checkbox">
          <MyCheckBox :checked="true" :elementID="'employer'" :check-box-group="'authCheckbox'">Сотрудник</MyCheckBox>
          <MyCheckBox :elementID="'organizations'" :check-box-group="'authCheckbox'">Организация</MyCheckBox>
        </div>
      </div>
      <div class="login-window__inputs">
        <MyInput :sub-title="'Логин:'" />
        <MyInput :sub-title="'Пароль:'" type-input="password" />
      </div>
      <div class="login-window__btn">
        <MyButton class=" orange-btn">Войти</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import './authView.scss';

import MyButton from "../../components/UI/MyButton/MyButton.vue";
import MyCheckBox from "../../components/UI/MyCheckBox/MyCheckBox";
import MyInput from "../../components/UI/MyInput/MyInput.vue";

export default {
  name: "AuthView",
  components: {
    MyCheckBox,
    MyInput,
    MyButton
  }
}
</script>
