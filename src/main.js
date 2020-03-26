import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptors from './service/interceptors'

import { Toast } from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import animated from 'animate.css'
import './styles/index.less'
import { Uploader, Button } from 'vant';

// import 'vant/lib/index.css'
import config from './config'
import VueCropper from 'vue-cropper'
// import VConsole from 'vconsole'

Vue.config.productionTip = false

// new VConsole()
Vue.use(VueCropper)
Vue.use(interceptors, store)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$toast = Toast
Vue.use(Uploader)
Vue.use(Button)
Vue.use(animated)

Vue.prototype.$imgUrl = (process.env.NODE_ENV === 'production' ? config.production.imgUrl : config.development.imgUrl)
Vue.prototype.$fileUrl = (process.env.NODE_ENV === 'production' ? config.production.fileUrl : config.development.fileUrl)

Vue.prototype.$toBack = () => {
  window.history.back()
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
