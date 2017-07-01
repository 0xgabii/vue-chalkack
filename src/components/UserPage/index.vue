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
      'me',
    ]),
  },
  components: {
    LayoutHeader,
  },
};
</script>
