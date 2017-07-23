<template>
  <input-wrapper :label="label">
    <div class="tagsInput">
      <span class="tagsInput__tag" v-for="(item, index) in tags" @click="removeTag(index)" >
        {{item}}
        <i class="ion-android-close" />
      </span>
      <input
        class="tagsInput__typeTag" 
        v-model="input" 
        @keydown.enter="addTag" 
        @keydown.tab.prevent="addTag" />
    </div>
  </input-wrapper>
</template>

<script>
import InputWrapper from './InputWrapper';

export default {
  name: 'TagsInput',
  props: {
    label: {
      type: String,
    },
    value: {
      type: Array,
    },
    max: {
      type: Number,
      default: 4,
    },
  },
  data: () => ({
    input: '',
    tags: [],
  }),
  watch: {
    value(array) {
      this.tags = array;
    },
  },
  methods: {
    addTag() {
      const { input, tags, max } = this;

      if (tags.length < max) {
        this.tags.push(input);
        this.input = '';
      }

      this.$emit('input', this.tags);
    },
    removeTag(index) {
      this.tags.splice(index, 1);

      this.$emit('input', this.tags);
    },
  },
  created() {
    if (this.value.length) {
      this.tags = [
        ...this.value,
      ];
    }
  },
  components: {
    InputWrapper,
  },
};
</script>
