<template>
  <div class="myDropList">
    <span class="myDropList-title" v-show="subTitle.length">{{ subTitle }}</span>
    <div class="myDropList-input" @click="isOpenList = !isOpenList">
      <p class="current-select">{{ currentSelect.name || currentSelect.type }}</p>
      <div class="myDropList-arrow" :class="{'rotate-arrow' : isOpenList}">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 11.7002C9.64157 11.7002 9.28317 11.5634 9.00989 11.2902L0.410344 2.6906C-0.1367 2.14356 -0.1367 1.25662 0.410344 0.709799C0.957166 0.162977 1.84393 0.162977 2.39101 0.709799L10 8.31923L17.609 0.710065C18.1561 0.163243 19.0428 0.163243 19.5895 0.710065C20.1368 1.25689 20.1368 2.14382 19.5895 2.69087L10.9901 11.2905C10.7167 11.5637 10.3583 11.7002 10 11.7002Z" fill="black"/>
        </svg>
      </div>
    </div>
    <div class="myDropList-options" :class="{'myDropList-options_visible': isOpenList}">
      <ul>
        <li v-for="item in optionsList" @click="selectItem(item)" :key="item.name">{{ item.name || item.type }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import './myDropList.scss';

export default {
  name: "MyDropList",
  props: {
    optionsList: {
      type: Array
    },
    subTitle: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpenList: false,
      currentSelect: null
    }
  },
  created() {
    this.currentSelect = this.defaultValue
  },
  methods: {
    selectItem(item) {
      this.currentSelect = item;
      this.isOpenList = false;

      this.$emit('select', item);
    }
  }
}
</script>
