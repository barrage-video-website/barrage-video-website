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
                        <video id="video"></video>
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
export default {
    name: 'live',
    components: {
        bililHeader
    },
    created(){
        this.load()
    },
    methods: {
        load(){
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('video')
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true, // 如果是直播流需要设置这个值为 true
                    url: 'http://101.132.142.25:8080/live?port=9999&app=standardClearing&stream=mystream'
                // ↑ 拉流示例地址，stream参数一定要和推流时所设置的流密钥一致
                })
                flvPlayer.attachMediaElement(videoElement)
                flvPlayer.load()
                flvPlayer.play()
            }
        }
    }
    
}
</script>

<style lang="less">
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
        width: 100%;
        height: 676px !important;
        background: black;
        position: relative;
        .play-wrapp-top{
            width: 100%;
            height: 48px;
        }
        .play-wrapp-video{
            video{
                width: 964px;
                height: 100%;
            }
        }
        .player-video-buttom{
            width: 100%;
            height: 142px;
            position: relative;
            box-sizing: border-box;
            .player-video-control-top{
                transition:  opacity .2s ease-in;
                opacity: 1;
            }
        }
    }
</style>
