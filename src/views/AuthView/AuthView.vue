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
          <MyCheckBox
              :checked="true"
              @change="e => { this.type = e.target.value }"
              :elementID="'employee'"
              :check-box-group="'authCheckbox'"
          >
            Сотрудник
          </MyCheckBox>
          <MyCheckBox
              :elementID="'organizations'"
              @change="e => { this.type = e.target.value }"
              :check-box-group="'authCheckbox'"
          >
            Организация
          </MyCheckBox>
        </div>
      </div>
      <div class="login-window__inputs">
        <MyInput
            :value="login"
            @input="e => { this.login = e.target.value }"
            :sub-title="'Логин:'"
            @keydown.enter="authorization"
        />
        <MyInput
            @keydown.enter="authorization"
            :value="password"
            @input="e => { this.password = e.target.value }"
            :sub-title="'Пароль:'"
            :type-input="'password'"
        />
      </div>
      <span class="error" :class="{'error_visible': error.status}">{{ error.message }}</span>
      <div class="login-window__btn">
        <MyButton @click="authorization" :is-loading="isLoadingResponse" class="orange-btn">Войти</MyButton>
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
  data () {
    return {
      isLoadingResponse: false,
      type: 'employee',
      login: null,
      password: null,
      error: {
        status: false,
        message: 'Поля не могут быть пустыми!'
      }
    }
  },
  components: {
    MyCheckBox,
    MyInput,
    MyButton
  },
  methods: {
    authorization() {
      if (!this.login?.length || !this.password?.length) {
        console.log(1)
        this.error.status = true;
        this.error.message = 'Поля не могут быть пустыми!'

        return;
      }
      this.error.status = false;

      const payload = {
        type: this.type,
        data: {
          login: this.login,
          password: this.password
        }
      }

      this.isLoadingResponse = true;

      fetch('http://localhost:5500/apiV1/auth/authorization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
          .then(res => res.json())
          .then(data => {
            if (data.status) {
              this.$store.commit('setTokens', data.tokens);

              this.$router.push('/')
            } else {
              this.error.status = true;
              this.error.message = data.msg;
            }
            this.isLoadingResponse = false;
          })
    }
  }
}
</script>
