export default {
  namespaced: true,
  state: {
    messages: [],
  },
  mutations: {
    SUCCESS(state, success) {
      state.messages.push({
        type: 'success',
        content: success,
      });
    },
    ERROR(state, error) {
      state.messages.push({
        type: 'error',
        content: error,
      });
    },
  },
};
