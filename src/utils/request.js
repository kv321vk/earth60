import axios from 'axios'
import config from '../config'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = config.production.httpBaseUrl
  axios.defaults.withCredentials = true
}

export default {
  post ({postData = {}, url, successCallback = () => {}, errorCallback = () => {}}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: postData,
        timeout: 60000,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then((response) => {
        let res = response.data
        if (res.code === 200) {
          successCallback(res.data)
          resolve(res.data)
        } else {
          errorCallback(res)
          reject(res)
        }
      }).catch((err) => {
        errorCallback(err)
      })
    })
  }
}
