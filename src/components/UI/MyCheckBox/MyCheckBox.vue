<template>
  <label  class="myCheckbox">
    <input :checked="checked" type="radio" :id="elementID" :name="checkBoxGroup" />
    <slot />
  </label >
</template>

<script>
import './myCheckBox.scss';

export default {
  name: "MyCheckBox",
  props: {
    elementID: {
      type: String
    },
    checkBoxGroup: {
      type: String
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
