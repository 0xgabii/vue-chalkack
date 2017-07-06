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
  components: {
    LayoutHeader,
  },
};
</script>
