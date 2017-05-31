import firebase from '~helpers/firebase';
import store from '../../store';
import router from '../../router';

// Auth 감시자 메서드
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('auth/checkAuth', user);
    router.push({ name: 'UserPage' });
  } else {
    store.dispatch('auth/checkAuth');

    if (router.history.current.name === 'LoginPage'
      || router.history.current.name === 'RegisterPage') {
      router.push({ name: router.history.current.name });
    } else {
      router.push({ name: 'LandingPage' });
    }
  }
});

export default {
  namespaced: true,
  state: {
    loading: false,
    isAuthenticated: false,
    me: {},
  },
  getters: {
    getMyAuth(state) {
      return state.isAuthenticated;
    },
  },
  mutations: {
    CHECK_AUTH_START(state) {
      state.loading = true;
    },
    UPDATE_AUTH(state, obj) {
      state.isAuthenticated = true;
      state.me = obj;
      state.loading = false;
    },
    CHECK_AUTH_FAILED(state) {
      state.isAuthenticated = false;
      state.me = {};
      state.loading = false;
    },
  },
  actions: {
    checkAuthStart({ commit }) {
      commit('CHECK_AUTH_START');
    },
    checkAuth({ commit }, user) {
      if (user) {
        commit('UPDATE_AUTH', user);
      } else {
        commit('CHECK_AUTH_FAILED');
      }
    },
  },
};
