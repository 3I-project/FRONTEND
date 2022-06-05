<template>
  <div class="modal edit-modal">
    <div class="modal-block">
      <div class="modal-block__close" @click="closeModal(false)">
        <img src="../../../assets/modal/close.svg" alt="close">
      </div>
      <div class="modal-block__body">
        <div class="edit-modal__title">
          <input type="text" v-model="editIdea.title" >
        </div>
        <div class="edit-modal__editor" v-if="!isLoading">
          <QuillEditor v-model:content="this.editIdea.message_text" :readOnly="false" theme="snow" toolbar="full" />
        </div>
        <div class="edit-modal__comments">
          <p>Отключить комментарии к идеи:</p>
          <MyCheckBox
              :elementID="'Нет'"
              :value="true"
              @change="e => { this.editIdea.enableComments = JSON.parse(e.target.value) }"
              :check-box-group="'setCommentsCheckBox'"
              :checked="this.editIdea.enableComments === true"
          >
            Нет
          </MyCheckBox>
          <MyCheckBox
              :elementID="'Да'"
              @change="e => { this.editIdea.enableComments = JSON.parse(e.target.value) }"
              :value="false"
              :check-box-group="'setCommentsCheckBox'"
              :checked="this.editIdea.enableComments === false"
          >
            Да
          </MyCheckBox>
        </div>
      </div>
      <div class="edit-modal__footer">
        <MyButton class="orange-btn" @click="updateIdea" :is-loading="isUpdating">
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
import MyCheckBox from "../../UI/MyCheckBox/MyCheckBox";

export default {
  name: "EditIdeaModal",
  props: {
    idea: {
      type: Object
    }
  },
  components: {
    QuillEditor,
    MyButton,
    MyCheckBox
  },
  data() {
    return {
      editIdea: {},
      isLoading: true,
      isUpdating: false,
    }
  },
  methods: {
    closeModal(updateStatus) {
      this.$emit('closeEditModal', updateStatus)
    },
    updateIdea() {
      this.isUpdating = true

      const payload = {
        id_idea: this.editIdea.id_idea,
        title: this.editIdea.title,
        content: JSON.stringify(this.editIdea.message_text),
        enableComments: this.editIdea.enableComments
      }

      this.$api.post('/idea/update-post', payload)
      .then(response => {
        const { data } = response

        console.log(data.msg)

        this.closeModal(true);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.isUpdating = false
      })
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
