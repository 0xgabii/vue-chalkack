<template>
  <section class="landing">
    <form @submit="logIn">
      <input v-model="form.email" />
      <input v-model="form.pwd" />

      <button>Submit</button>
    </form>
  </section>
</template>

<script>
import firebase from 'helpers/firebase';

const checkAuth = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    } else {
      console.log('No user is signed in.');
    }
  });
};

export default {
  name: 'LandingPage',
  data: () => ({
    form: {
      email: '',
      pwd: '',
    },
  }),
  methods: {
    logIn() {
      const { email, pwd } = this.form;

      firebase.auth().signInWithEmailAndPassword(email, pwd).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

      checkAuth();
    },
  },
};
</script>
