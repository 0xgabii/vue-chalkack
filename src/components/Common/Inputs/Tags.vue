<template>
  <div class="inputBox">
    <label class="inputBox__guideText">{{label}}</label>
    <div class="tagsInput">
      <div class="tagsInput-list">
        <span v-for="(item, index) in tags" @click="removeTag(index)">
          {{item}}
        </span>
      </div>
      <input
        class="tagsInput__typeTag" 
        v-model="input" 
        @keydown.enter="addTag" 
        @keydown.tab.prevent="addTag" />
    </div> 
  </div>
</template>

<script>
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
};
</script>
