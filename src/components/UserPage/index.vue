<template>
  <section class="userPage">
    UserPage
    {{me}}

    <button @click="signOut">logout</button>

    <router-view></router-view>
  
    <!-- modal area -->
    <first-time-user-modal 
      v-if="firstTime" 
      :user="me" 
    />

  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import FirstTimeUser from './Modals/FirstTimeUser';

export default {
  name: 'UserPage',
  computed: {
    ...mapState('auth', [
      'me',
    ]),
    firstTime() {
      if (Object.keys(this.me).length && !this.me.id) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions('auth', [
      'signOut',
    ]),
  },
  components: {
    FirstTimeUserModal: FirstTimeUser,
  },
};
</script>
