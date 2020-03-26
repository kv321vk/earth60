import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/views/Home'
import Cropper from '@/views/Cropper/index'
import UploadPicture from '@/views/UploadPicture/index'

export const config = {
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/cropper',
            name: 'Cropper',
            component: Cropper
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/uploadPicture',
            name: 'UploadPicture',
            component: UploadPicture
        }
    ]
}

export default new VueRouter(config)
