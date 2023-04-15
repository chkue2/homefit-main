import axios from 'axios'
import { isEmpty, concat, cloneDeep } from 'lodash'
import geoLocation from '~/assets/js/geolocation'
export default {
  namespaced: true,
  state: () => ({
    isLoading: true,
    isLocationTypeModal: false,
    isLocationModal: false,
    isWorkoutCoachProfileModal: false,
    isHobbyCoachProfileModal: false,
    selectLocation: '전국',
    selectedCategory: 'all',
    selectedAddress: {},
    categories: [],
    list: [],
  }),
  mutations: {
    SETISLOADING(state, payload) {
      state.isLoading = payload
    },
    SETLOCATIONTYPEMODAL(state, payload) {
      state.isLocationTypeModal = payload
    },
    SETLOCATIONMODAL(state, payload) {
      state.isLocationModal = payload
    },
    SETSELECTLOCATION(state, payload) {
      state.selectLocation = payload
    },
    SETSELECTEDCATEGORY(state, payload) {
      state.selectedCategory = payload
    },
    SETSELECTEDADDRESS(state, payload) {
      state.selectedAddress = cloneDeep(payload)
      if (!isEmpty(payload)) {
        localStorage.setItem('popularLocation-live', JSON.stringify(payload))
        localStorage.setItem(
          'popularLocation-listings',
          JSON.stringify(payload)
        )
      } else {
        localStorage.removeItem('popularLocation-live')
        localStorage.removeItem('popularLocation-listings')
      }
    },
    SETCATEGORIES(state, payload) {
      state.categories = payload
    },
    SETLIST(state, payload) {
      state.list = payload
    },
    SETWORKOUTCOACHPROFILEMODAL(state, payload) {
      state.isWorkoutCoachProfileModal = payload
    },
    SETHOBBYCOACHPROFILEMODAL(state, payload) {
      state.isHobbyCoachProfileModal = payload
    },
  },
  actions: {
    fetchPopular(context) {
      context.commit('SETISLOADING', true)
      axios
        .post('/api/popularHomefits/', {
          _method: 'get',
          province: context.state.selectedAddress.province ?? '',
          city: context.state.selectedAddress.city ?? '',
        })
        .then((response) => {
          context.commit(
            'SETCATEGORIES',
            concat(['all'], response.data.serviceTypes)
          )
          context.commit('SETLIST', response.data.popularHomefits)
        })
        .catch((e) => {
          console.log(e.response.data.message)
        })
        .finally(() => {
          context.commit('SETISLOADING', false)
        })
    },
    fetchSelectedAddress(context) {
      const location = isEmpty(localStorage.getItem('popularLocation-live'))
        ? {}
        : JSON.parse(localStorage.getItem('popularLocation-live'))
      context.commit('SETSELECTEDADDRESS', location)
    },
    openLocationTypeModal(context) {
      context.commit('SETLOCATIONTYPEMODAL', true)
    },
    closeLocationTypeModal(context) {
      context.commit('SETLOCATIONTYPEMODAL', false)
    },
    openLoading(context) {
      context.commit('SETISLOADING', true)
    },
    closeLoading(context) {
      context.commit('SETISLOADING', false)
    },
    openLocationModal(context) {
      context.commit('SETLOCATIONMODAL', true)
    },
    closeLocationModal(context) {
      context.commit('SETLOCATIONMODAL', false)
    },
    handlerClickLocationType(context, payload) {
      // 1 : 전국의 인기 홈핏 보기
      // 2 : 내 위치 주변으로 변경
      // 3 : 위치 직접 변경
      switch (payload) {
        case 1: {
          context.commit('SETSELECTEDADDRESS', {})
          context.commit('SETLOCATIONTYPEMODAL', false)
          break
        }
        case 2: {
          context.commit('SETISLOADING', true)
          geoLocation
            .callGeoLocation()
            .then((response) => {
              const lng = response.coords.longitude
              const lat = response.coords.latitude

              const res = geoLocation.getLocationForLatLng(lng, lat)
              const getRes = () => {
                res
                  .then((r) => {
                    console.log(r)
                    if (!isEmpty(r)) {
                      localStorage.setItem(
                        'popularLocation-live',
                        JSON.stringify(r)
                      )
                      context.commit('SETSELECTEDADDRESS', r)
                      context.commit('SETLOCATIONTYPEMODAL', false)
                    } else {
                      localStorage.removeItem('popularLocation-live')
                    }
                  })
                  .catch(() => {
                    alert('알 수 없는 오류가 발생했습니다.')
                  })
              }
              getRes()
            })
            .catch((e) => {
              switch (e.code) {
                case 1:
                  alert('위치 정보 수집 요청을 거부하셨습니다.')
                  break
                case 2:
                  alert('위치 정보를 사용할 수 없습니다.')
                  break
                case 3:
                  alert(
                    '위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.'
                  )
                  break
                default:
                  break
              }
            })
            .finally(() => {
              context.commit('SETISLOADING', false)
            })
          break
        }
        case 3:
          context.commit('SETLOCATIONMODAL', true)
          context.commit('SETLOCATIONTYPEMODAL', false)
          break
        default:
          break
      }
    },
    setSelectLocation(context, payload) {
      context.commit('SETSELECTLOCATION', payload)
    },
    setSelectedCategory(context, payload) {
      context.commit('SETSELECTEDCATEGORY', payload)
    },
    setSelectedAddress(context, payload) {
      context.commit('SETSELECTEDADDRESS', payload)
      context.commit('SETLOCATIONMODAL', false)
    },
    setCategories(context, payload) {
      context.commit('SETCATEGORIES', payload)
    },
    setList(context, payload) {
      context.commit('SETLIST', payload)
    },
    openWorkoutCoachProfileModal(context) {
      context.commit('SETWORKOUTCOACHPROFILEMODAL', true)
    },
    openHobbyCoachProfileModal(context) {
      context.commit('SETHOBBYCOACHPROFILEMODAL', true)
    },
    openCoachProfileModal(context, payload) {
      window.homefit.queryParams.q = payload.permalink
      if (['WORKOUT', 'MEDITATION'].includes(payload.serviceType)) {
        context.commit('SETWORKOUTCOACHPROFILEMODAL', true)
      } else {
        context.commit('SETHOBBYCOACHPROFILEMODAL', true)
      }
    },
    closeCoachProfileModal(context) {
      context.commit('SETWORKOUTCOACHPROFILEMODAL', false)
      context.commit('SETHOBBYCOACHPROFILEMODAL', false)
    },
    reOpenCoachProfileModal(context, payload) {
      window.homefit.queryParams.q = payload.permalink
      context.commit('SETWORKOUTCOACHPROFILEMODAL', false)
      context.commit('SETHOBBYCOACHPROFILEMODAL', false)
      setTimeout(() => {
        if (['WORKOUT', 'MEDITATION'].includes(payload.serviceType)) {
          context.commit('SETWORKOUTCOACHPROFILEMODAL', true)
        } else {
          context.commit('SETHOBBYCOACHPROFILEMODAL', true)
        }
      }, 300)
    },
  },
  getters: {},
}
