<template>
  <section class="userPage">
    UserPage
    {{me}}

    <button @click="signOut">logout</button>

    <router-view></router-view>

  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserPage',
  computed: {
    ...mapState('auth', [
      'isAuthenticated',
      'me',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'signOut',
    ]),
  },
};
</script>
