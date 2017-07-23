export default {
  namespaced: true,
  state: {
    createAlbum: false,
    uploadPhoto: false,
  },
  mutations: {
    OPEN_MODAL(state, name) {
      state[name] = true;
    },
    CLOSE_MODAL(state, name) {
      state[name] = false;
    },
  },
  actions: {
    openModal({ commit }, name) {
      commit('OPEN_MODAL', name);
    },
    closeModal({ commit }, name) {
      commit('CLOSE_MODAL', name);
    },
  },
};
