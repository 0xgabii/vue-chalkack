import firebase from '~helpers/firebase';

import auth from '~helpers/api/auth';

import store from '../../store';
import router from '../../router';

// auth observer
firebase.auth().onAuthStateChanged((user) => {
  const thisPageNeedsAuth = router.currentRoute.meta.requiresAuth;
  /*
    After executing the store's action,
    it redirects to the UserPage or AuthPage
    according to the Promise returned and the meta attribute of the router
  */
  store.dispatch('auth/updateAuth', user).then(() => {
    if (!thisPageNeedsAuth) router.push({ name: 'UserPage' });
  }).catch(() => {
    if (thisPageNeedsAuth) router.push({ name: 'AuthPage' });
  });
});

export default {
  namespaced: true,
  state: {
    isAuthenticated: true,
    me: {},
  },
  getters: {
    getMyAuth(state) {
      return state.isAuthenticated;
    },
  },
  mutations: {
    UPDATE_AUTH(state, user) {
      state.me = user;
      state.isAuthenticated = true;
    },
    UPDATE_AUTH_FAILED(state) {
      state.isAuthenticated = false;
      state.me = {};
    },
  },
  actions: {
    updateAuth({ commit }, user) {
      return new Promise((resolve, reject) => {
        if (user) {
          auth.setUser(user).then((userFromDatabase) => {
            const userName = userFromDatabase.val().displayName;
            commit('UPDATE_AUTH', userFromDatabase.val());
            commit('messages/SUCCESS', `${userName}님 환영합니다!`, { root: true });
            resolve();
          });
        } else {
          commit('UPDATE_AUTH_FAILED');
          reject();
        }
      });
    },
    updateAuthProfile({ commit, dispatch }, user) {
      // update Profile
      auth.updateUser(user).then(() => {
        // update auth state
        auth.setUser(firebase.auth().currentUser).then((userFromDatabase) => {
          commit('UPDATE_AUTH', userFromDatabase.val());
          commit('messages/SUCCESS', '프로필이 업데이트 되었습니다', { root: true });
        });
      }, (error) => {
        commit('messages/ERROR', error, { root: true });
      });
    },
    signIn({ commit }, user) {
      auth.signIn(user).catch(() => {
        commit('messages/ERROR', '이메일 혹은 비밀번호가 일치하지 않거나 존재하지 않는 계정입니다.', { root: true });
      });
    },
    signUp({ commit }, user) {
      auth.signUp(user).catch(() => {
        commit('messages/ERROR', '이메일 혹은 비밀번호가 일치하지 않거나 존재하지 않는 계정입니다.', { root: true });
      });
    },
    signOut() {
      auth.signOut();
    },
    signInWithProvider({ commit }, providerName) {
      auth.signInWithProvider(providerName);
    },
  },
};
