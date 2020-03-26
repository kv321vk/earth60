<template>
    <div class="wrap">
        <div class="uploadPicture bg" v-show="status === 0">
            <img src="@/assets/img/uploadPicture/t1.png" class="t1 animated fadeIn">
            <img src="@/assets/img/uploadPicture/t2.png" class="t2 animated fadeIn">
            <div class="cut">
                <vue-cropper
                        ref="cropper"
                        v-show="option.img"
                        :img="option.img"
                        :output-size="option.size"
                        :output-type="option.outputType"
                        :info="true"
                        :full="option.full"
                        :fixed="option.fixed"
                        :fixed-number="option.fixedNumber"
                        :can-move="option.canMove"
                        :can-move-box="option.canMoveBox"
                        :fixed-box="option.fixedBox"
                        :original="option.original"
                        :auto-crop="option.autoCrop"
                        :auto-crop-width="option.autoCropWidth"
                        :auto-crop-height="option.autoCropHeight"
                        :center-box="option.centerBox"
                        :high="option.high"
                        mode="cover"></vue-cropper>
                <van-button v-show="option.img"
                            round
                            size="small"
                            @click="previewPoster"
                            class="previewBtm"
                            type="info">确定</van-button>
            </div>
            <van-uploader
                    class="info-upload"
                    accept="image/*"
                    :after-read="httpRequest">
                <div class="upBtm animated fadeIn"></div>
            </van-uploader>
        </div>
        <div class="previewPicture bg" v-show="status === 1">
            <img v-if="headImg" :src="headImg" class="headPic">
            <img v-else src="@/assets/img/uploadPicture/header.jpg" class="headPic">
            <img :src="cropperSrc" class="previewImg">
            <div class="createPoster btm" @click="createPoster"></div>
            <div class="anewUpload btm" @click="anewUpload"></div>
        </div>
        <div class="poster-wrap" ref="poster" v-show="status === 2">
            <img v-if="headImg" :src="headImg" class="headPic">
            <img v-else src="@/assets/img/uploadPicture/header.jpg" class="headPic">
            <img src="@/assets/img/uploadPicture/posterBg.jpg" class="posterBg">
            <img :src="cropperSrc" class="posterImg">
        </div>
        <img :src="canvasUrl" class="canvas" v-show="status === 3">
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import {mapGetters} from 'vuex'
export default {
    data () {
      return {
          status: 0, // 0上传，1预览，2海报页面html, 3海报页面图片
          option: {
              img: '',
              size: 1,
              full: false,
              outputType: '',
              canMove: true,
              fixedBox: false,
              original: false,
              canMoveBox: true,
              autoCrop: true,
              // 只有自动截图开启 宽度高度才生效
              // autoCropWidth: 200,
              // autoCropHeight: 150,
              centerBox: false,
              high: true,
              fixedNumber: [70, 41],
              fixed: true
          },
          cropperSrc: '',
          canvasUrl: ''
      }
    },
    mounted () {
        // alert(this.headImg)
    },
    computed: {
      ...mapGetters({
          headImg: 'headImg',
      })
    },
    methods: {
        httpRequest(f) {
            //上传图片
            let file = f.file
            let reader = new FileReader()
            reader.onload = e => {
                let data
                if (typeof e.target.result === "object") {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                this.option.img = data
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
        },
        previewPoster () {
            this.$refs.cropper.getCropData(data => {
                this.cropperSrc = data;
            });
            this.status = 1
        },
        createPoster () {
            this.status = 2
            // 等下次dom更新完之后再去执行，否则的话this.$refs.poster状态还是隐藏的
            this.$nextTick(() => {
                new html2canvas(this.$refs.poster, {
                    allowTaint: true,
                    useCORS: true
                }).then(canvas => {
                    this.canvasUrl = canvas.toDataURL()
                    this.status = 3
                })
            })
        },
        anewUpload () {
            this.status = 0
            this.option.img = ''
        }
    }
}
</script>

<style lang="less" scoped>
    .wrap{
        .fadeIn{
            animation-duration: 2s
        }
        height: 100%;
        width: 100%;
        .bg{
            height: 100%;
            background-size: 100% 100%;
            padding-top: 1px;
            position: relative;
        }
        .uploadPicture{
            background-image: url('../../assets/img/uploadPicture/upBg.jpg');
            position: relative;
            .t1{
                display: block;
                width: 35px;
                height: 469px;
                margin: 160px auto 0;
            }
            .t2{
                display: block;
                width: 477px;
                height: 83px;
                margin: 70px auto 0;
                &.fadeIn{
                    animation-delay: 1s
                }
            }
            .cut {
                position: absolute;
                width: 673px;
                height: 673px;
                top: calc(40% - 336px);
                left: calc(50% - 336px);
                text-align: center;
            }
            .previewBtm {
                margin-top: 20px;
            }
            .uploads{
                /*visibility: hidden;*/
                display: none;
            }
            .info-upload{
                position: absolute;
                bottom: 100px;
                left: calc(50% - 133px);
            }
            .upBtm{
                background-image: url('../../assets/img/uploadPicture/upBtm.png');
                width: 266px;
                height: 91px;
                background-size: 100% 100%;
                &.fadeIn{
                    animation-delay: 2s
                }
            }
        }
        .previewPicture{
            background-image: url('../../assets/img/uploadPicture/preview.jpg');
            .headPic{
                border-radius: 50%;
                height: 64px;
                width: 64px;
                border: 1px solid black;
                position: absolute;
                top: 15vh;
                left: calc(50% - 32px);
            }
            .previewImg{
                width: 559px;
                height: 24vh;
                position: absolute;
                top: 26vh;
                left: 95px;
            }
            .btm{
                position: absolute;
                width: 266px;
                height: 91px;
                bottom: 100px;
                background-size: 100% 100%;
            }
            .createPoster{
                background-image: url('../../assets/img/uploadPicture/pb1.png');
                left: 70px;
            }
            .anewUpload{
                background-image: url('../../assets/img/uploadPicture/pb2.png');
                right: 70px;
            }
        }
        .poster-wrap{
            position: relative;
            /*background-image: url('../../assets/img/uploadPicture/posterBg.jpg');*/
            /*background-size: 100% 100%;*/
            height: 100%;
            .headPic{
                border-radius: 50%;
                height: 70px;
                width: 70px;
                border: 1px solid black;
                position: absolute;
                top: 10.5vh;
                left: calc(50% - 38px);
            }
            .posterBg{
                height: 100%;
                width: 100%;
            }
            .posterImg{
                width: 673px;
                height: 30vh;
                position: absolute;
                top: 22vh;
                /*left: 40px;*/
                left: 50%;
                transform: translateX(-50%)
            }
        }
        .canvas{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
</style>
