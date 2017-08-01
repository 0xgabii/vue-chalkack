<template>
  <div 
    class="photo" 
    :class="{ selected: checked }"
    :style="photoStyle">

    <div class="checkbox">
      <label class="checkbox__control">
        <input type="checkbox" v-model="checked" />
      </label>
    </div>

    <img :src="data.src" />

  </div>
</template>

<script>
export default {
  name: 'Photo',
  props: {
    data: {
      src: String,
      date: String,
      color: Array,
      ratio: Number,
    },
    height: Number,
  },
  data: () => ({
    checked: false,
  }),
  computed: {
    photoStyle() {
      const { height, data } = this;

      return {
        width: `${height * data.ratio}px`,
        height: `${height}px`,
      };
    },
  },
};
</script>
