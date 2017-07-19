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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'FirstTimeUserModal',
  data: () => ({
    displayName: '',
  }),
  computed: {
    ...mapState('auth', [
      'me',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'updateAuthProfile',
    ]),
    updateName() {
      this.updateAuthProfile({
        ...this.me,
        displayName: this.displayName,
      });
    },
  },
};
</script>
