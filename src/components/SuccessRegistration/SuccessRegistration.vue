<template>
  <div class="success-modal">
    <h1>Поздравляем!</h1>
    <h1>Вы успешно зарегистрировались в системе!</h1>

    <div class="success-modal__img">
      <svg width="164" height="164" viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_891)">
          <path d="M82 164C127.287 164 164 127.287 164 82C164 36.7127 127.287 0 82 0C36.7127 0 0 36.7127 0 82C0 127.287 36.7127 164 82 164Z" fill="#32BA7C"/>
          <path d="M61.0475 118.99L103.212 161.154C138.133 151.842 164 120.025 164 81.9999C164 81.2239 164 80.4479 164 79.6719L130.89 49.1482L61.0475 118.99Z" fill="#0AA06E"/>
          <path d="M84.0692 100.366C87.6907 103.988 87.6907 110.196 84.0692 113.817L76.5677 121.319C72.9462 124.94 66.738 124.94 63.1165 121.319L30.2648 88.2083C26.6433 84.5869 26.6433 78.3787 30.2648 74.7572L37.7664 67.2556C41.3878 63.6342 47.596 63.6342 51.2175 67.2556L84.0692 100.366Z" fill="white"/>
          <path d="M112.782 43.1988C116.403 39.5773 122.612 39.5773 126.233 43.1988L133.735 50.7003C137.356 54.3218 137.356 60.53 133.735 64.1514L76.8262 120.801C73.2047 124.423 66.9965 124.423 63.3751 120.801L55.8735 113.3C52.252 109.678 52.252 103.47 55.8735 99.8486L112.782 43.1988Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_1_891">
            <rect width="164" height="164" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="success-modal__btn">
      <MyButton class="orange-btn" @click="$router.push('/auth')">Войти в систему</MyButton>
    </div>
  </div>
</template>

<script>
import './successRegistration.scss';

import MyButton from "../UI/MyButton/MyButton";

export default {
  name: "SuccessRegistration",
  components: {
    MyButton
  }
}
</script>
