import { isEmpty } from 'lodash'
export default {
  setLocalStorageWithExpireTime(key, value, tts) {
    const obj = {
      value,
      expire: Date.now() + tts,
    }

    const objString = JSON.stringify(obj)

    localStorage.setItem(key, objString)
  },
  getLocalStorageWithExpireTime(key) {
    const objString = localStorage.getItem(key)

    if (isEmpty(objString)) {
      return null
    }

    const obj = JSON.parse(objString)

    if (Date.now() > obj.expire) {
      localStorage.removeItem(key)

      return null
    }

    return obj.value
  },
}
