<template>
  <section class="userPage">
    <layout-header />

    <router-view></router-view>
  
    <!-- modal area -->
    <first-time-user-modal 
      v-if="firstTime" 
      :user="me" 
    />

  </section>
</template>

<script>
import { mapState } from 'vuex';

import LayoutHeader from './Layout/Header';

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
  components: {
    LayoutHeader,

    FirstTimeUserModal: FirstTimeUser,
  },
};
</script>
