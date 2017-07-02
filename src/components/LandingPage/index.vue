<template>
  <section class="landingPage">
    Chalkack
    <header>
      <router-link :to="{ name: 'AuthPage'}">
        SignIn/SignUp
      </router-link>

      사용자: {{ me }}
    </header>

    <router-view></router-view>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LandingPage',
  computed: {
    ...mapState('auth', [
      'isAuthenticated',
      'me',
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
};
</script>
