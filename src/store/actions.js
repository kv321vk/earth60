import {global as G} from './type'
import request from '@/utils/request'

export default {
    /**
     * 开启/关闭loading
     */
    [G.actions.START_LOADING] ({ commit }) {
        commit(G.mutations.SET_LOADING_STATUS, true)
    },
    [G.actions.STOP_LOADING] ({ commit }) {
        commit(G.mutations.SET_LOADING_STATUS, false)
    },
    /**
     * 上传图片或文件
     */
    [G.actions.UPLOAD_PICTURE_OR_FILE] ({ commit }, postData) {
        return request.post({
            url: '/common/uploadPictureOrFile',
            postData
        })
    },
    [G.actions.FETCH_WECHAT_CODE] ({commit}, postData) {
        return request.post({
            url: '/wechat/getAdvWechatInfo',
            postData,
            successCallback: (response) => {
                console.log(response, 'store response')
                // alert('response')
                // alert(JSON.stringify(response))
                commit(G.mutations.SET_HEADIMG, response.headimgurl)
            }
        })
    },
}
