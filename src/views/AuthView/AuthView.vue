<template>
  <div class="auth-window login-window">
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
