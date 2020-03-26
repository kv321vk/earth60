<template>
  <div class="home">
    <swiper :options="swiperOption"
            ref="mySwiper"
            class="swiper-container"
            @slideChangeTransitionEnd="slideChangeTransitionEnd"
            @slideChangeTransitionStart="slideChangeTransitionStart">
      <swiper-slide>
        <div class="swiper swiper1">
          <div class="content animated fadeIn" ref="c1"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper swiper2">
          <div class="content animated fadeIn" ref="c2"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper swiper3">
          <div class="content animated fadeIn" ref="c3"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper swiper4">
          <div class="content animated fadeIn" ref="c4"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper swiper5">
          <div class="content animated fadeIn" ref="c5"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper swiper6">
          <div class="btm" @click="toUploadPicture"></div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="arrows animated flash" v-show="showArrow"></div>
  </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
export default {
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        autoplay: false,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      showArrow: true
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    activeIndex () {
      return this.swiper.activeIndex
    }
  },
  methods: {
    toUploadPicture () {
      this.$router.replace('/uploadPicture')
    },
    slideChangeTransitionEnd () {
      if (this.activeIndex === 0) {
        this.$refs.c1.classList.remove('fadeIn')
        setTimeout(() => {
          this.$refs.c1.hidden = false
          this.$refs.c1.classList.add('fadeIn')
        }, 0)
      }
      if (this.activeIndex === 1) {
        this.$refs.c2.classList.remove('fadeIn')
        setTimeout(() => {
          this.$refs.c2.hidden = false
          this.$refs.c2.classList.add('fadeIn')
        }, 0)
      }
      if (this.activeIndex === 2) {
        this.$refs.c3.classList.remove('fadeIn')
        setTimeout(() => {
          this.$refs.c3.hidden = false
          this.$refs.c3.classList.add('fadeIn')
        }, 0)
      }
      if (this.activeIndex === 3) {
        this.$refs.c4.classList.remove('fadeIn')
        setTimeout(() => {
          this.$refs.c4.hidden = false
          this.$refs.c4.classList.add('fadeIn')
        }, 0)
      }
      if (this.activeIndex === 4) {
        this.$refs.c5.classList.remove('fadeIn')
        setTimeout(() => {
          this.$refs.c5.hidden = false
          this.$refs.c5.classList.add('fadeIn')
        }, 0)
      }
    },
    slideChangeTransitionStart () {
      if (this.activeIndex === 0) {
        this.$refs.c1.hidden = true
      }
      if (this.activeIndex === 1) {
        this.$refs.c2.hidden = true
      }
      if (this.activeIndex === 2) {
        this.$refs.c3.hidden = true
      }
      if (this.activeIndex === 3) {
        this.$refs.c4.hidden = true
      }
      if (this.activeIndex === 4) {
        this.$refs.c5.hidden = true
      }
      if (this.activeIndex === 5) {
        this.showArrow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .home{
    height: 100%;
    position: relative;
    .fadeIn{
      animation-duration: 2s;
    }
    .swiper-container{
      height: 100%;
      .swiper{
        height: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
        .content{
          position: absolute;
          left: 60px;
          background-size: 100% 100%;
        }
        &.swiper1{
          background-image: url('../../assets/img/home/swiper1/1.jpg');
          .content{
            top: 80px;
            width: 621px;
            height: 241px;
            background-image: url('../../assets/img/home/swiper1/01.png');
          }
        }
        &.swiper2{
          background-image: url('../../assets/img/home/swiper2/2.jpg');
          .content{
            bottom: 80px;
            width: 578px;
            height: 241px;
            background-image: url('../../assets/img/home/swiper2/02.png');
          }
        }
        &.swiper3{
          background-image: url('../../assets/img/home/swiper3/3.jpg');
          .content{
            bottom: 80px;
            width: 593px;
            height: 254px;
            background-image: url('../../assets/img/home/swiper3/03.png');
          }
        }
        &.swiper4{
          background-image: url('../../assets/img/home/swiper4/4.jpg');
          .content{
            bottom: 80px;
            width: 564px;
            height: 341px;
            background-image: url('../../assets/img/home/swiper4/04.png');
          }
        }
        &.swiper5{
          background-image: url('../../assets/img/home/swiper5/5.jpg');
          .content{
            bottom: 60px;
            width: 656px;
            height: 341px;
            background-image: url('../../assets/img/home/swiper5/05.png');
          }
        }
        &.swiper6{
          background-image: url('../../assets/img/home/swiper6/6.gif');
          .btm {
            position: absolute;
            background-image: url('../../assets/img/home/swiper6/btm.png');
            width: 266px;
            height: 91px;
            background-size: 100% 100%;
            bottom: 100px;
            left: calc(50% - 133px);
          }
        }
      }
    }
    .arrows{
      z-index: 10;
      position: absolute;
      bottom: 0;
      left: calc(50% - 57.5px);
      background-image: url('../../assets/img/home/swiper1/arrows.png');
      background-size: 100% 100%;
      margin: 0 auto;
      height: 117px;
      width: 115px;
      animation-iteration-count: infinite;
      animation-duration: 2s;
    }
  }
</style>
