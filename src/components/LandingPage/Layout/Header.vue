<template>
  <header class="header">
    <h3 class="logo">Chalkack</h3>
    <button class="action" @click="action">{{ renderAction }}</button>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LandingPageHeader',
  computed: {
    ...mapState('auth', [
      'isAuthenticated',
      'me',
    ]),
    renderAction() {
      if (this.$route.name === 'AuthPage') {
        return '홈으로';
      }
      return '로그인';
    },
  },
  methods: {
    action() {
      if (this.$route.name === 'AuthPage') {
        return this.$router.push({ name: 'LandingPage' });
      }
      return this.$router.push({ name: 'AuthPage' });
    },
  },
};
</script>
