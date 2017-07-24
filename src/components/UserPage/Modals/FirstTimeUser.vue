<template>
  <modal 
    title="What is your name?"
    subtitle="I want to know about you">

    <text-input label="My name is" v-model="displayName" />

    <template slot="footer">
      <button class="submit" @click="updateName">Remember that</button>
    </template>

  </modal>  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'FirstTimeUserModal',
  props: {
    user: Object,
  },
  data: () => ({
    displayName: '',
  }),
  methods: {
    ...mapActions('auth', [
      'updateAuthProfile',
    ]),
    updateName() {
      this.updateAuthProfile({
        ...this.user,
        displayName: this.displayName,
      });
    },
  },
};
</script>
