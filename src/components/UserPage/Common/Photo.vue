<template>
  <div class="photo">
    
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
    },
  },
};
</script>
