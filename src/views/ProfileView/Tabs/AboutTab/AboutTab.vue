<template>
  <div class="about">
    <div class="about-section">
      <div class="about-section__header">
        <p class="about-section__title">Личная информация</p>
      </div>
      <textarea
          class="about-section__field about-section__field_textarea"
          :readonly="!editPersonalInformation"
          v-model="personalInformationCopy.about"
          :placeholder="isMyProfile ? 'Укажите информация о себе...' : 'Пользовтаель не указал личной информации'"></textarea>
    </div>
    <div class="about__wrapper">
      <div class="about-section">
        <div class="about-section__header">
          <p class="about-section__title">Образование</p>
        </div>
        <input type="text" class="about-section__field about-section__field_input" :readonly="!editPersonalInformation" v-model="personalInformationCopy.education" placeholder="Не указано" />
      </div>
      <div class="about-section">
        <div class="about-section__header">
          <p class="about-section__title">Дата рождения</p>
        </div>
        <input
            type="text"
            class="about-section__field about-section__field_input"
            readonly :value="displayBirthday"
            :placeholder="isMyProfile ? 'Пример: 25.10.22' : 'Не указана'"
        />
      </div>
    </div>
    <div class="about__footer" v-if="isMyProfile">
      <MyButton class="blue-btn" v-if="!editPersonalInformation" @click="startEditPersonalInformation">Редактировать</MyButton>
      <template v-else>
        <MyButton class="grey-btn" @click="cancelEditPersonalInformation">Отменить</MyButton>
        <MyButton class="orange-btn" @click="saveEditPersonalInformation">Сохранить</MyButton>
      </template>
    </div>
  </div>
</template>

<script>
import './aboutTab.scss';
import moment from 'moment';

import MyButton from "../../../../components/UI/MyButton/MyButton";
import axios from "../../../../http/axios";

export default {
  name: "AboutTab",
  props: {
    personalInformation: {
      type: Object
    },
    isMyProfile: {
      type: Boolean
    }
  },
  data() {
    return {
      personalInformationCopy: {},
      editPersonalInformation: false
    }
  },
  components: {
    MyButton
  },
  computed: {
    displayBirthday() {
      if (!Object.keys(this.personalInformationCopy).length || !this.personalInformationCopy.date_birth) {
        return ""
      }
      return moment(this.personalInformationCopy.date_birth).format("D.MM.YYYY")
    }
  },
  methods: {
    startEditPersonalInformation() {
      this.editPersonalInformation = true
    },
    cancelEditPersonalInformation() {
      this.editPersonalInformation = false
    },
    async saveEditPersonalInformation() {
      const payload = {
        payload: {
          user_id: this.$store.state.userProfile.id_employee,
          education: this.personalInformationCopy?.education,
          date_birth: this.personalInformationCopy?.date_birth,
          about: this.personalInformationCopy?.about
        }
      }

      const { data } = await axios.post('http://134.0.115.249:6500/apiV1/update-pi', payload,{
        headers: {
          Authorization: localStorage.getItem('access')
        }
      })

      if (data.payload.success) {
        this.editPersonalInformation = false

        this.$emit('updateProfileData');
      } else {
        console.log('Ошибка при сохранении данных')
      }
    }
  },
  mounted() {
    this.personalInformationCopy = {...this.personalInformation};
  }
}
</script>
