<template>
  <div class="page edit-page" v-if="isDataLoaded">
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
              @select="(item) => this.selectedIdeaType = item.type_id"
          />
        </div>
        <div class="edit-block__set-comment">
          <p>Отключить комментарии к идеи:</p>
          <MyCheckBox
              :elementID="'Нет'"
              :value="false"
              @change="e => { this.hiddenComments = JSON.parse(e.target.value) }"
              :check-box-group="'setCommentsCheckBox'"
              :checked="true"
          >
            Нет
          </MyCheckBox>
          <MyCheckBox
              :elementID="'Да'"
              @change="e => { this.hiddenComments = JSON.parse(e.target.value) }"
              :value="true"
              :check-box-group="'setCommentsCheckBox'"
          >
            Да
          </MyCheckBox>
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
import MyCheckBox from "../../components/UI/MyCheckBox/MyCheckBox";

import {QuillEditor} from '@vueup/vue-quill'

export default {
  name: "CreateIdeaView",
  components: {
    QuillEditor,
    MyButton,
    MyDropList,
    MyCheckBox
  },
  data() {
    return {
      title: '',
      content: {},
      isLoading: false,
      selectedIdeaType: '',
      ideaTypeList: {},
      isDataLoaded: false,
      hiddenComments: false,
    }
  },
  computed: {
    validIdeaData () {
      return Object.keys(this.content).length && this.title.length
    }
  },
  methods: {
    async getTypeList () {
      await this.$api.get('/idea/types-list')
      .then(response => {
        const { data } = response

        this.ideaTypeList = data.payload
      })
    },
    saveIdea() {
      this.isLoading = true;

      if (!this.validIdeaData) {
        this.isLoading = false;

        return
      }

      this.$api.post('/idea/create', {
        title: this.title,
        content: JSON.stringify(this.content),
        type_id: this.selectedIdeaType,
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
  },
  async mounted() {
    this.isDataLoaded = false

    await this.getTypeList()

    this.isDataLoaded = true
  }
}
</script>
