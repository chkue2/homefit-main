import axios from 'axios'
import { cloneDeep, concat } from 'lodash'
export default {
  namespaced: true,
  state: () => ({
    isLoading: false,
    isReviewDetailModal: false,
    selectedReviewId: '',
    imageReviewPagination: {
      currentPage: 0,
    },
    imageReviews: [],
    allReviewPagination: {
      currentPage: 0,
    },
    allReviews: [],
    imageReview: {},
  }),
  mutations: {
    TOGGLEREVIEWDETAILMODAL(state, payload) {
      state.isReviewDetailModal = payload
    },
    SETSELECTEDREVIEWID(state, payload) {
      state.selectedReviewId = payload
    },
    SETIMAGEREVIEWSPAGINATION(state, payload) {
      state.imageReviewPagination = cloneDeep(payload)
    },
    SETIMAGEREVIEWS(state, payload) {
      state.imageReviews = concat(state.imageReviews, payload)
    },
    SETALLREVIEWPAGINATION(state, payload) {
      state.allReviewPagination = cloneDeep(payload)
    },
    SETALLREVIEWS(state, payload) {
      state.allReviews = concat(state.allReviews, payload)
    },
    SETISLOADING(state, payload) {
      state.isLoading = payload
    },
    SETSIMAGEREVIEW(state, payload) {
      state.imageReview = cloneDeep(payload)
    },
  },
  actions: {
    async fetchImageReviews(context) {
      context.commit('SETISLOADING', true)
      await axios
        .post('/api/reviews/', {
          _method: 'get',
          page: context.state.imageReviewPagination.currentPage + 1,
          isOnlyImageReviews: true,
        })
        .then((response) => {
          context.commit('SETIMAGEREVIEWS', response.data.index)
          context.commit('SETIMAGEREVIEWSPAGINATION', response.data.pagination)
        })
        .finally(() => {
          context.commit('SETISLOADING', false)
        })
    },
    async fetchAllReviews(context) {
      context.commit('SETISLOADING', true)
      await axios
        .post('/api/reviews/', {
          _method: 'get',
          page: context.state.allReviewPagination.currentPage + 1,
          isOnlyImageReviews: false,
        })
        .then((response) => {
          context.commit('SETALLREVIEWS', response.data.index)
          context.commit('SETALLREVIEWPAGINATION', response.data.pagination)
        })
        .finally(() => {
          context.commit('SETISLOADING', false)
        })
    },
    openReviewDetailModal(context) {
      context.commit('TOGGLEREVIEWDETAILMODAL', true)
    },
    closeReviewDetailModal(context) {
      context.commit('TOGGLEREVIEWDETAILMODAL', false)
    },
    setSelectedReviewId(context, id) {
      context.commit('SETSELECTEDREVIEWID', id)
    },
    setImageReviews(context, reviews) {
      context.commit('SETIMAGEREVIEWS', reviews)
    },
    setSelectedReview(context, review) {
      context.commit('SETSIMAGEREVIEW', review)
    },
  },
  getters: {},
}
