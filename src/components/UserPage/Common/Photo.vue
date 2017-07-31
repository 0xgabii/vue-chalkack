<template>
  <div class="photo" :style="photoStyle">
    
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
