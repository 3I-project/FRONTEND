<template>
  <div class="page edit-page">
    <div class="edit-block">
      <div class="edit-block__header">
        <input v-model="title" type="text" placeholder="ВВЕДИТЕ ЗАГОЛОВОК">
      </div>
      <div class="edit-block__content">
        <QuillEditor v-model:content="content" :readOnly="false" theme="snow" toolbar="full" />
        <MyButton @click="saveIdea" class="orange-btn"> Сохранить</MyButton>
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
      content: {}
    }
  },
  methods: {
    saveIdea() {
      this.$api.post('/idea/create', {
        title: this.title,
        content: JSON.stringify(this.content)
      })
      .then(response => {
        const { data } = response

        console.log(data);
      })
      .catch(error => {
        console.log(error.response)
      })
      console.log(JSON.stringify(this.content))
    }
  }
}
</script>
