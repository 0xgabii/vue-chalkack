import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import store from '../store';

import landingPage from './modules/landingPage';
import userPage from './modules/userPage';

const router = new Router({
  routes: [
    ...landingPage,
    ...userPage,
  ],
});

router.beforeEach((to, from, next) => {
  // 인증이 필요한 라우트인가?
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // store에서 인증되었는지 확인
    if (store.getters['auth/getMyAuth']) {
      next();
    // 인증실패했을 경우, 로그인페이지로 리다이렉트
    } else {
      next({ name: 'LoginPage' });
    }
  // 로그인했을 경우, 랜딩페이지에는 접근하지 못함
  } else if (store.getters['auth/getMyAuth']) {
    next({ name: 'UserPage' });
  } else {
    next();
  }
});

export default router;
