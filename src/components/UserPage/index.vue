<template>
  <section class="userPage">
    UserPage

    <button @click="signOut">SignOut</button>
  </section>
</template>

<script>
import firebase from '~helpers/firebase';

export default {
  name: 'UserPage',
  methods: {
    signOut() {
      firebase.auth().signOut();
    },
  },
};
</script>
