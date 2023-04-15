import { isEmpty } from 'lodash'
import axios from 'axios'

export default {
  callGeoLocation() {
    if ('geolocation' in navigator) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
        })
      )
    } else {
      return alert('위치 정보를 지원하지 않는 브라우저입니다.')
    }
  },
  successCall(position) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    return this.getLocationForLatLng(lat, lng)
  },
  async getLocationForLatLng(lng, lat) {
    let res = {}
    await axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?y=${lat}&x=${lng}`,
        {
          headers: {
            Authorization: 'KakaoAK ac0b36afb60505a65f55afaa597e5714',
          },
        }
      )
      .then((response) => {
        if (!isEmpty(response.data.documents)) {
          res = {
            province: response.data.documents[0].address.region_1depth_name,
            city: response.data.documents[0].address.region_2depth_name.split(
              ' '
            )[0],
          }
        }
      })
    return res
  },
}
