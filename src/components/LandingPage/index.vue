<template>
  <section class="landingPage">
    <layout-header />

    <router-view></router-view>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import LayoutHeader from './Layout/Header';

export default {
  name: 'LandingPage',
  computed: {
    ...mapState('auth', [
      'isAuthenticated',
    ]),
  },
  watch: {
    isAuthenticated(bools) {
      if (bools) this.$router.push({ name: 'UserPage' });
    },
  },
  created() {
    if (this.isAuthenticated) this.$router.push({ name: 'UserPage' });
  },
  components: {
    LayoutHeader,
  },
};
</script>
