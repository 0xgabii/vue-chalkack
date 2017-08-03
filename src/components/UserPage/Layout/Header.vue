<template>
  <header class="header">
    {{ me.displayName }}

    <button @click="signOut">LogOut</button>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LayoutHeader',
  computed: {
    ...mapState('auth', [
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

