export default {
  namespaced: true,
  state: () => ({
    isDetailModal: false,
    selectedId: '',
  }),
  mutations: {
    SETDETAILMODAL(state, payload) {
      state.isDetailModal = payload
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
