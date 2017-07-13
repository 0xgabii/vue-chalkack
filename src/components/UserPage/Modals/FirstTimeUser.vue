<template>
  <modal 
    v-if="!me.displayName"
    name="당신의 이름은 무엇인가요?"
    @submit="updateName">
    <input v-model="displayName" />
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
