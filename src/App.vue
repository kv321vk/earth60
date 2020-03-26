<template>
  <div id="app">
    <router-view></router-view>
    <audio id="audio" loop="loop" :src="music" autoplay="autoplay"></audio>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import music from '../static/bgmusic.mp3'
export default {
  name: 'app',
  data () {
    return {
      music: music
    }
  },
  mounted () {
    let appid = 'wx6f532da52ec936d6'
    // alert(0)
    // alert(this.headImg)
    // window.localStorage.clear()
    if (this.headImg === 'undefined' || this.headImg === null) {
      // this.getWechatCode()
    }
  },
  computed: {
    ...mapGetters({
      headImg: 'headImg',
    })
  },
  methods: {
    ...mapActions({
      fetchWeChatCode: 'FETCH_WECHAT_CODE'
    }),
    getWechatCode() {
      // window.alert(2)
      this.weChatCode = this.getUrlKey('code')
      // alert(this.weChatCode)
      if (!this.weChatCode) {
        let urlNow = encodeURIComponent(window.location.href)
        // 获取wechatCode
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f532da52ec936d6&redirect_uri=${urlNow}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`
      } else {
        let postData = {
          code: this.weChatCode
        }
        this.fetchWeChatCode(postData).then(res => {
          // alert(this.headImg)
          // alert(JSON.stringify(res))
          // alert('will reload')
          window.location.reload()
          // console.log(res, 'res====')
        })
      }
    },
    getUrlKey:function(name){
      //获取url 参数
      return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null
    }
  }
}
</script>

<style>
#app {
  font-family: segoeuib, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
