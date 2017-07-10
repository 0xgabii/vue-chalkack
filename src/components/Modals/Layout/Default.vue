<template>
  <div class="modal">
    <div class="modal-wrapper">
      <header class="modal-header" v-if="!name">
        <h3>{{ name }}</h3>        
        <span class="close" @click="handleClose"><i class="material-icons">close</i></span>
      </header>
      <section class="modal-content">                
        <slot />
      </section>
      <footer class="modal-footer">
        <button class="closeBtn" @click="handleClose">Cancel</button>
        <button class="submitBtn" @click="handleSubmit">Submit</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'photoupload',
  props: {
    name: {
      type: String,
      required: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleSubmit() {
      this.$emit('submit');
    },
  },
};
</script>
