import axios from 'axios'
import Cookies from 'js-cookie'
import helpers from '~/assets/js/helpers'

const LOCAL_STORAGE_KEY = 'recommender'
export default {
  setLocalStorage(recommender) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, recommender)
  },
  requestToMakeCookie(recommenderEmail) {
    axios.post('/api/recommend/cookie/', { _method: 'post', recommenderEmail })
  },
  makeCookie(recommender) {
    Cookies.set('recommender', recommender, { expires: 1 })
  },
  getFromLocalStorage() {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY)
  },
  getFromUriQueryParameter() {
    return helpers.getQueryParameter().recommender
  },
  fetchDecryptedRecommender(encryptedRecommender) {
    return axios.post('/api/recommend/decryptedRecommender/', {
      encryptedRecommender,
    })
  },
}
