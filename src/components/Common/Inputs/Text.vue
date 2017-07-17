<template>
  <div class="inputBox">
    <label class="inputBox__guideText">{{label}}</label>
    <input
      class="inputBox__typeArea" 
      :value="value"
      :readonly="readOnly"
      @input="updateValue($event.target.value)" /> 
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    readOnly: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>
