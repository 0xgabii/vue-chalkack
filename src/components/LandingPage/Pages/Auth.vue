<template>
  <section class="authPage">
    {{ error }}
    <div class="form">

      <div class="form-inputGroup">
        <input v-model="user.email" placeholder="이메일 입력..." />
        <input type="password" v-model="user.pwd" placeholder="비밀번호 입력..." />
      </div>

      <div class="form-buttonGroup">
        <button class="logIn" @click="logIn">로그인</button>
        <button class="register" @click="register">회원가입</button>
      </div>

      <div class="form-OauthGroup">
        <div v-for="item in oauthList" :class="item.name" @click="registerWithProvider(item.name)">
          <span><i class="icon" :class="item.icon" /></span>
          Sign in with <strong>{{item.name}}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from '~helpers/firebase';

const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

export default {
  name: 'AuthPage',
  data: () => ({
    user: {
      email: '',
      pwd: '',
    },
    error: '',
    oauthList: [
      { name: 'facebook', icon: 'ion-social-facebook' },
      { name: 'google', icon: 'ion-social-google' },
      { name: 'github', icon: 'ion-social-github' },
    ],
  }),
  methods: {
    logIn() {
      const { email, pwd } = this.user;

      firebase.auth().signInWithEmailAndPassword(email, pwd).catch(() => {
        this.error = '아이디 혹은 비밀번호가 일치하지 않거나 존재하지 않는 계정입니다.';
      });
    },
    register() {
      const { email, password } = this.user;

      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        this.error = error;
      });
    },
    registerWithProvider(providerName) {
      firebase.auth().signInWithRedirect(providers[providerName]);
    },
  },
};
</script>
