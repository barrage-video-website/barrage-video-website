<template>
  <div class="live">
        <bilil-header id="bilil-header"></bilil-header>
        <div class="video-main">
          <div class="l-con" >
                <div class="video-info">
                    <div class="video-title">
                        <span class="activity">活动作品</span>
                        <span>直播标题</span>
                    </div>
                </div>
                <div class="play-wrapp">
                    <div class="play-wrapp-top"></div>
                    <div class="play-wrapp-video">
                        <d-player class="video" ref="dplayer" :options="options"></d-player>
                        <!-- <video id="video" ref="video"></video> -->
                    </div>
                </div>
          </div>
          <div class="r-con"></div>
      </div>
  </div>
</template>

<script>
import bililHeader from '@/components/header.vue'
import flvjs from 'flv.js'
import VueDPlayer from 'vue-dplayer'
export default {
    name: 'live',
    components: {
        bililHeader,
        'd-player': VueDPlayer
    },
    data(){
        return{
            dp: null,
            options: {
                container: this.$refs.dplayer,
                live: true,
                video: {
                    url: 'http://192.168.145.128:8080/live?port=9999&app=myapp&stream=mystream',
                    type: 'customFlv',
                    customType: {
                        customFlv: function (video, player) {
                            const flvPlayer = flvjs.createPlayer({
                                type: 'flv',
                                url: video.src,
                                fixAudioTimestampGap: false
                            })
                            flvPlayer.attachMediaElement(video)
                            flvPlayer.load()
                        }
                    }
                }
                // danmaku: {
                //     id: '9E2E3368B56CDBB4',
                //     api: 'https://api.prprpr.me/dplayer/',
                //     // token: 'tokendemo',
                //     maximum: 1000,
                //     bottom: '25%',
                //     unlimited: true
                // }
            }
        }
    },
    mounted(){
        // setTimeout(()=>{
        //     this.load()
        // }, 2000)
        this.dp = this.$refs.dplayer.dp
        // this.load()
        // console.log(this.dp)
    },
    methods: {
        load(){
            if (flvjs.isSupported()) {
                var videoElement = this.$refs.video
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    hasAudio: false,
                    isLive: true, // 如果是直播流需要设置这个值为 true
                    url: 'http://192.168.145.128:8080/live?port=9999&app=myapp&stream=mystream'
                    // ↑ 拉流示例地址，stream参数一定要和推流时所设置的流密钥一致
                }, {
                    enableStashBuffer: false,
                    autoCleanupSourceBuffer: true
                })
                flvPlayer.attachMediaElement(videoElement)
                flvPlayer.load()
                flvPlayer.play()
            }
        },
        fullscreen(){
            this.$refs.video.webkitRequestFullScreen()
        }
    },
    beforeDestroy(){
        // var videoElement = this.$refs.video
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true, // 如果是直播流需要设置这个值为 true
            url: 'http://192.168.145.128:8080/live?port=9999&app=myapp&stream=mystream'
            // ↑ 拉流示例地址，stream参数一定要和推流时所设置的流密钥一致
        })
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.destroy()
    }
    
}
</script>

<style lang="less">
    // .video{
    //     width: 100%;
    //     height: 100%;
    // }
    #bilil-header{
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    }
    .video-main{
        margin: 0 auto;
        margin-top: 20px;
        width: 1300px;
    }
    .l-con{
        width: 964px;
    }
    .r-con{
        width: 320px;
    }
    .video-info{
        width: 100%;
        height: 81px;
        margin-bottom: 16px;
        display: flex;
        .video-title{
            margin:  0;
            font-size: 18px;
            .activity{
                color : #fff;
                background-color:#ffafc9;
                border-radius:2px;
                transition: none;
                display: inline-block;
                vertical-align: text-bottom;
                font-size: 12px;
                margin-right: 10px;
                padding: 0 5px;
                width: 58px;
                height: 22px;
            }
        }
    }
     .play-wrapp{
        // width: 100%;
        // height: 676px;
        background: black;
        position: relative;
        .play-wrapp-top{
            width: 100%;
            height: 48px;
        }
        .play-wrapp-video{
            cursor: pointer;
            video{
            }

        }
    }

</style>
