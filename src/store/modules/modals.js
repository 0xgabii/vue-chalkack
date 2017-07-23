export default {
  namespaced: true,
  state: {
    createAlbum: false,
    uploadPhoto: false,
  },
  mutations: {
    OPEN_MODAL(state, modal) {
      if (modal.constructor === Object) {
        state[modal.name] = {
          visible: true,
          data: modal.data,
        };
      } else {
        state[modal] = true;
      }
    },
    CLOSE_MODAL(state, name) {
      state[name] = false;
    },
  },
  actions: {
    openModal({ commit }, modal) {
      commit('OPEN_MODAL', modal);
    },
    closeModal({ commit }, name) {
      commit('CLOSE_MODAL', name);
    },
  },
};
