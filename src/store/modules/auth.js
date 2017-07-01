import firebase from '~helpers/firebase';
import store from '../../store';
import router from '../../router';

const database = firebase.database();

// Auth 감시자 메서드
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('auth/updateAuth', user);

  if (user) {
    router.push({ name: 'UserPage' });
  } else {
    router.push({ name: 'AuthPage' });
  }
});

export default {
  namespaced: true,
  state: {
    isAuthenticated: true,
    me: {},
    success: {},
    error: {},
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
    UPDATE_AUTH_PROFILE_SUCCEED(state) {
      state.success = {
        ...state.success,
        auth: '성공적으로 업데이트되었습니다',
      };
      state.error = {};
    },
    UPDATE_AUTH_PROFILE_FAILED(state, error) {
      state.error = {
        ...state.error,
        auth: error,
      };
      state.success = {};
    },
  },
  actions: {
    updateAuth({ commit }, user) {
      if (user) {
        const { providerData, uid, displayName, email, photoURL } = user;
        const userData = {
          displayName,
          photoURL,
          email: email || providerData[0].email,
          providerInfo: providerData[0],
        };
        const userInDatabase = database.ref(`users/${uid}`);
        // save userData to database
        userInDatabase.set(userData);
        // get userData from database (on 'value')
        userInDatabase.on('value', (snapshot) => {
          commit('UPDATE_AUTH', snapshot.val());
        });
      } else {
        commit('UPDATE_AUTH_FAILED');
      }
    },
    updateAuthProfile({ commit, dispatch }, userObj) {
      const currentUser = firebase.auth().currentUser;

      currentUser.updateProfile(userObj).then(() => {
        dispatch('updateAuth', currentUser);
        commit('UPDATE_AUTH_PROFILE_SUCCEED');
      }, (error) => {
        commit('UPDATE_AUTH_PROFILE_FAILED', error);
      });
    },
  },
};
