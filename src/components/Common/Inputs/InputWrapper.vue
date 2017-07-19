<template>
  <section class="inputBox">
    <label class="inputBox__guideText" v-if="label">{{label}}</label>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'inputWrapper',
  props: {
    label: {
      type: String,
    },
  },
};
</script>
