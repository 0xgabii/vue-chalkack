<template>
  <div class="modal">
    <div class="modal-wrapper">
      <header class="modal-header">
        <h3 class="modal-header__title">{{ title }}</h3>
        <p class="modal-header__subtitle">{{ subtitle }}</p>
      </header>
      <section class="modal-content">                
        <slot />
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button class="close" @click="handleClose">Submit</button>
          <button class="submit" @click="handleSubmit">Submit</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
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
