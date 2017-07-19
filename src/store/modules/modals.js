export default {
  namespaced: true,
  state: {
    modals: {
      createAlbum: true,
    },
  },
  mutations: {
    OPEN_MODAL(state, name) {
      state.modals[name] = true;
    },
    CLOSE_MODAL(state, name) {
      state.modals[name] = false;
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
