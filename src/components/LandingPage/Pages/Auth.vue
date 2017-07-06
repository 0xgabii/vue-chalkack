<template>
  <section class="authPage">
    <div class="form">

      <div class="form-inputGroup">
        <input v-model="user.email" placeholder="이메일 입력..." />
        <input type="password" v-model="user.pwd" placeholder="비밀번호 입력..." />
      </div>

      <div class="form-buttonGroup">
        <button class="logIn" @click="signIn(user)">로그인</button>
        <button class="register" @click="signUp(user)">회원가입</button>
      </div>

      <div class="form-OauthGroup">
        <div v-for="item in oauthList" :class="item.name" @click="signInWithProvider(item.name)">
          <span><i class="icon" :class="item.icon" /></span>
          Sign in with <strong>{{item.name}}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthPage',
  data: () => ({
    user: {
      email: '',
      pwd: '',
    },
    oauthList: [
      { name: 'facebook', icon: 'ion-social-facebook' },
      { name: 'google', icon: 'ion-social-google' },
      { name: 'github', icon: 'ion-social-github' },
    ],
  }),
  methods: {
    ...mapActions('auth', [
      'signIn',
      'signUp',
      'signInWithProvider',
    ]),
  },
};
</script>
