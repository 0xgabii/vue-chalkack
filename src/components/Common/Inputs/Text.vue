<template>
  <input-wrapper :label="label">
    <input
      class="textInput" 
      :value="value"
      :readonly="readOnly"
      @input="updateValue($event.target.value)" />
  </input-wrapper>
</template>

<script>
import InputWrapper from './InputWrapper';

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
  components: {
    InputWrapper,
  },
};
</script>
