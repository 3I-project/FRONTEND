<template>
  <div class="myInput">
    <span v-show="subTitle.length">{{ subTitle }}</span>
    <input :placeholder="placeholder" @input="$emit('input', $event)" :value="value"  :type="typeInput">
  </div>
</template>

<script>
import './myInput.scss'

export default {
  name: "MyInput",
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    typeInput: {
      type: String,
      default: 'text'
    },
    subTitle: {
      type: String,
      default: ''
    },
    value: {
      type: String,
    }
  },
}
</script>
