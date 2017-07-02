<template>
  <section class="userPage">
    <layout-header />
    UserPage

    <router-view></router-view>

  </section>
</template>

<script>
import { mapState } from 'vuex';

import LayoutHeader from './Layout/Header';

export default {
  name: 'UserPage',
  computed: {
    ...mapState('auth', [
      'isAuthenticated',
      'me',
    ]),
  },
  watch: {
    isAuthenticated(bools) {
      if (!bools) this.$router.push({ name: 'LandingPage' });
    },
  },
  created() {
    if (!this.isAuthenticated) this.$router.push({ name: 'LandingPage' });
  },
  components: {
    LayoutHeader,
  },
};
</script>
