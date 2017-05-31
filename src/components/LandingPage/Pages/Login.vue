<template>
  <section class="signIn" v-if="">
    <div>
      <input v-model="form.email" />
      <input type="password" v-model="form.pwd" />

      <button @click="SignIn">Submit</button>
    </div>
    <div>
      <button @click="SignInWithProvider('Google')">Google</button>
      <button @click="SignInWithProvider('Facebook')">Facebook</button>
      <button @click="SignInWithProvider('Github')">Github</button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import firebase from '~helpers/firebase';

const providers = {
  Google: new firebase.auth.GoogleAuthProvider(),
  Github: new firebase.auth.GithubAuthProvider(),
  Facebook: new firebase.auth.FacebookAuthProvider(),
};

export default {
  name: 'LoginPage',
  data: () => ({
    form: {
      email: 'gomonk3037@gmail.com',
      pwd: 'asdf6961',
    },
  }),
  methods: {
    ...mapActions('auth', [
      'checkAuthStart',
    ]),
    SignIn() {
      const { email, pwd } = this.form;

      this.checkAuthStart();

      firebase.auth().signInWithEmailAndPassword(email, pwd).catch(() => {
        console.log('아이디 혹은 비밀번호가 일치하지 않거나 존재하지 않는 계정입니다.');
      });
    },
    SignInWithProvider(providerName) {
      this.checkAuthStart();

      firebase.auth().signInWithRedirect(providers[providerName]);
    },
  },
};
</script>
