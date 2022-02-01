<template>
  <div class="page edit-page">
    <div class="edit-block">
      <div class="edit-block__header">
        <input v-model="title" type="text" placeholder="ВВЕДИТЕ ЗАГОЛОВОК">
      </div>
      <div class="edit-block__content">
        <QuillEditor v-model:content="content" :readOnly="false" theme="snow" toolbar="full" />
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

import { QuillEditor } from '@vueup/vue-quill'

export default {
  name: "CreateIdeaView",
  components: {
    QuillEditor,
    MyButton
  },
  data() {
    return {
      title: '',
      content: {},
      isLoading: false
    }
  },
  methods: {
    saveIdea() {
      this.isLoading = true;

      this.$api.post('/idea/create', {
        title: this.title,
        content: JSON.stringify(this.content)
      })
      .then(response => {
        const { data } = response

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
