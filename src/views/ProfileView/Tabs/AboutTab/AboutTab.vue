<template>
  <div class="about">
    <div class="about-section">
      <div class="about-section__header">
        <p class="about-section__title">Личная информация</p>
        <span class="about-section__button">Редактировать</span>
      </div>
      <textarea class="about-section__field about-section__field_textarea" readonly v-model="personalInformationCopy.about" placeholder="Укажите информация о себе..."></textarea>
    </div>
    <div class="about__wrapper">
      <div class="about-section">
        <div class="about-section__header">
          <p class="about-section__title">Образование</p>
          <span class="about-section__button">Редактировать</span>
        </div>
        <input type="text" class="about-section__field about-section__field_input" readonly v-model="personalInformationCopy.education" placeholder="Не указано" />
      </div>
      <div class="about-section">
        <div class="about-section__header">
          <p class="about-section__title">Дата рождения</p>
<!--          <span class="about-section__button">Редактировать</span>-->
        </div>
        <input type="text" class="about-section__field about-section__field_input" readonly :value="displayBirthday" placeholder="Пример: 25.10.22" />
      </div>
    </div>
  </div>
</template>

<script>
import './aboutTab.scss';
import moment from 'moment';

export default {
  name: "AboutTab",
  props: {
    personalInformation: {
      type: Object
    }
  },
  data() {
    return {
      personalInformationCopy: {}
    }
  },
  computed: {
    displayBirthday() {
      if (!Object.keys(this.personalInformationCopy).length) {
        return ""
      }
      return moment(this.personalInformationCopy.date_birth).format("D.MM.YYYY")
    }
  },
  mounted() {
    this.personalInformationCopy = {...this.personalInformation};
    console.log(moment(this.personalInformationCopy.date_birth).format("D.MM.YYYY"))
  }
}
</script>
