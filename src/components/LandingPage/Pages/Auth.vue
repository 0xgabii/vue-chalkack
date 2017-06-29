<template>
  <section class="auth">
    {{ error }}
    <div>
      <input v-model="user.email" />
      <input type="password" v-model="user.pwd" />

      <button @click="SignIn">SignIn</button>
      <button @click="SignUp">SignUp</button>
    </div>
    <div>
      <button @click="SignInWithProvider('Google')">Google</button>
      <button @click="SignInWithProvider('Facebook')">Facebook</button>
      <button @click="SignInWithProvider('Github')">Github</button>
    </div>
  </section>
</template>

<script>
import firebase from '~helpers/firebase';

const providers = {
  Google: new firebase.auth.GoogleAuthProvider(),
  Github: new firebase.auth.GithubAuthProvider(),
  Facebook: new firebase.auth.FacebookAuthProvider(),
};

export default {
  name: 'AuthPage',
  data: () => ({
    user: {
      email: '',
      pwd: '',
    },
    error: '',
  }),
  methods: {
    SignUp() {
      const { email, password } = this.user;

      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        this.error = error;
      });
    },
    SignIn() {
      const { email, pwd } = this.user;

      firebase.auth().signInWithEmailAndPassword(email, pwd).catch(() => {
        this.error = '아이디 혹은 비밀번호가 일치하지 않거나 존재하지 않는 계정입니다.';
      });
    },
    SignInWithProvider(providerName) {
      firebase.auth().signInWithRedirect(providers[providerName]);
    },
  },
};
</script>
