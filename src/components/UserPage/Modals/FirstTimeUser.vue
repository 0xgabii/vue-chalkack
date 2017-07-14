<template>
  <modal 
    v-if="!me.displayName"
    class="firstTimeUser"
    title="What is your name?"
    subtitle="I want to know about you">

    <div class="inputBox">
      <label class="inputBox__guideText">My name is</label>
      <input 
        class="inputBox__typeText" 
        v-model="displayName" />
    </div>

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
