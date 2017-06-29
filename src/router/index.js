import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import store from '../store';

import landingPage from './modules/landingPage';
import userPage from './modules/userPage';

const router = new Router({
  mode: 'history',
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
    // 인증실패했을 경우, 리다이렉트
    } else {
      next({ name: 'AuthPage' });
    }
  } else {
    next();
  }
});

export default router;
