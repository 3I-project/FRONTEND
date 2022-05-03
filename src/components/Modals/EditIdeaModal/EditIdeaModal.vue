<template>
  <div class="modal edit-modal">
    <div class="modal-block">
      <div class="modal-block__close" @click="$emit('closeEditModal')">
        <img src="../../../assets/modal/close.svg" alt="close">
      </div>
      <div class="modal-block__body">
        <div class="edit-modal__title">
          <input type="text" v-model="editIdea.title" >
        </div>
        <div class="edit-modal__editor" v-if="!isLoading">
          <QuillEditor v-model:content="this.editIdea.message_text" :readOnly="false" theme="snow" toolbar="full" />
        </div>
      </div>
      <div class="edit-modal__footer">
        <MyButton class="orange-btn">
          Сохранить измененния
        </MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import './editIdeaModal.scss';

import {QuillEditor} from '@vueup/vue-quill'

import MyButton from "../../UI/MyButton/MyButton";

export default {
  name: "EditIdeaModal",
  props: {
    idea: {
      type: Object
    }
  },
  components: {
    QuillEditor,
    MyButton
  },
  data() {
    return {
      editIdea: {},
      isLoading: true
    }
  },
  mounted() {
    this.isLoading = true

    this.editIdea = {...this.idea}
    this.editIdea.message_text = JSON.parse(this.editIdea.message_text)

    this.isLoading = false
  }
}
</script>
