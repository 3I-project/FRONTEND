<template>
  <div class="page edit-page">
    <div class="edit-block">
      <div class="edit-block__header">
        <input v-model="title" type="text" placeholder="ВВЕДИТЕ ЗАГОЛОВОК">
      </div>
      <div class="edit-block__content">
        <QuillEditor v-model:content="content" :readOnly="false" theme="snow" toolbar="full" />
      </div>
      <div class="edit-block__controllers">
        <div class="controllers-drop-menu">
          <MyDropList
              :sub-title="'Выберите тип идеи'"
              :optionsList="ideaTypeList"
              :default-value="ideaTypeList[0]"
              @select="(item) => this.selectedIdeaType = item.name"
          />
        </div>
        <div class="edit-block__btn">
          <MyButton @click="saveIdea" :is-loading="isLoading" class="orange-btn">Опубликовать</MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import './createIdeaView.scss';
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

import MyButton from "../../components/UI/MyButton/MyButton";
import MyDropList from "../../components/UI/MyDropList/MyDropList";

import {QuillEditor} from '@vueup/vue-quill'

export default {
  name: "CreateIdeaView",
  components: {
    QuillEditor,
    MyButton,
    MyDropList
  },
  data() {
    return {
      title: '',
      content: {},
      isLoading: false,
      selectedIdeaType: '',
      ideaTypeList: [
        {name: 'Бизнес идея'},
        {name: 'Маркетинговая идея'},
        {name: 'Рекламная идея'},
        {name: 'Технологическая идея'},
        {name: 'Идея нововведения'}
      ]
    }
  },
  computed: {
    validIdeaData () {
      return Object.keys(this.content).length && this.title.length
    }
  },
  methods: {
    saveIdea() {
      this.isLoading = true;

      if (!this.validIdeaData) {
        this.isLoading = false;

        return
      }

      this.$api.post('/idea/create', {
        title: this.title,
        content: JSON.stringify(this.content),
        selectedIdeaType: this.selectedIdeaType
      })
          .then(response => {
            const {data} = response

            console.log(data);

            if (data.status) {
              this.$router.push('/')
            }
          })
          .catch(error => {
            console.log(error.response)
          })

      this.isLoading = false;
    }
  }
}
</script>
