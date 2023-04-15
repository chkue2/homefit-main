export default {
  namespaced: true,
  state: () => ({
    isFeedDetailModal: false,
    selectedId: '',
  }),
  mutations: {
    SETDETAILMODAL(state, payload) {
      state.isFeedDetailModal = payload
    },
    SETSELECTEDID(state, payload) {
      state.selectedId = payload
    },
  },
  actions: {
    openDetailModal(context, id) {
      context.commit('SETSELECTEDID', id)
      context.commit('SETDETAILMODAL', true)
    },
    closeDetailModal(context) {
      context.commit('SETDETAILMODAL', false)
    },
  },
  getters: {},
}
