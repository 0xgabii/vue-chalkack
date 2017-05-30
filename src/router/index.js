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

// check auth
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 이 라우트는 인증이 필요하며 로그인 한 경우 확인하십시오.
    // 그렇지 않은 경우 로그인 페이지로 리디렉션하십시오.
    console.log('?');
    if (store.getters['auth/checkAuth']) {
      next();
    } else {
      store.dispatch('auth/updateAuth').then(() => {
        next();
      }, () => {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        });
      });
    }
  } else {
    next(); // 반드시 next()를 호출하십시오!
  }
});

export default router;
