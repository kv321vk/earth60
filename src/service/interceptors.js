import axios from 'axios'
import { objectEmptyFilter } from '@/utils/tools'
import qs from 'qs'

export default {
    install (Vue, store) {
        axios.interceptors.request.use(request => {
            store.dispatch('START_LOADING')
            if (request.data && request.data.WithoutPostEmptyFilter) {
                delete request.data.WithoutPostEmptyFilter
                request.data = qs.stringify(request.data)
            } else if (request.data) {
                request.data = qs.stringify(objectEmptyFilter(request.data))
            }
            return request
        }, error => {
            store.dispatch('STOP_LOADING')
            return Promise.reject(error)
        })

        axios.interceptors.response.use(response => {
            store.dispatch('STOP_LOADING')
            if (response.data) {
                let code = response.data.code
                if (code !== 200) {
                    if (code === 401) {
                        Vue.prototype.$toast.fail(response.data.info)
                        // window.setTimeout(function () {
                        //     store.dispatch('LOGOUT')
                        // }, 2000)
                    } else if (code === 201) {
                        // 暂时没有需要统一处理的内容
                    } else {
                        // let errMsg = response.data.info || '错误内容'
                        // Vue.prototype.$toast.fail(errMsg)
                    }
                }
            }
            return response
        }, error => {
            store.dispatch('STOP_LOADING')
            // store.dispatch('OPEN_ERROR_NOTIFICATION', '网络异常，请重新尝试。')
            return Promise.reject(error)
        })
    }
}
