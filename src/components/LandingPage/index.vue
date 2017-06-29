<template>
  <section class="landingPage">
    Chalkack
    <header>
      <router-link :to="{ name: 'LoginPage'}">
        로그인
      </router-link>
      <router-link :to="{ name: 'RegisterPage'}">
        회원가입
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
      'me',
    ]),
  },
};
</script>
