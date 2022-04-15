<template>
  <div class="captcha-wrapper">
    <VueRecaptcha
        ref="recaptcha"
        :sitekey="sitekey"
        @verify="verifyMethod"
        @error="errorMethod"
        @expired="onCaptchaExpired"
    />
  </div>
</template>

<script>
import './reCaptcha.scss';
import { VueRecaptcha } from 'vue-recaptcha';

export default {
  name: "ReCaptcha",
  components: {
    VueRecaptcha
  },
  data() {
    return {
      sitekey: "6LeATXgfAAAAAH694ulcpAFtZdBzKmklkdisVYEm"
    }
  },
  methods: {
    verifyMethod(response) {
      this.$emit("verifyStatus", {
        token: response,
        status: true,
      })
    },
    errorMethod() {
      this.$emit("verifyMethod", {
        status: false
      })
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>
