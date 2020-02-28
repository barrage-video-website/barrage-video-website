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
                    <!-- 低层 -->
                    <div class="player-video-buttom">
                        <div class="player-video-control-top" >
                            <!-- 进度条 -->
                            <div class="play-video-progress" id="play-video-progress" ref="playVideoProgress"  >
                                <div class="bui-track" id="bui-track"  ref="buiTrack" ></div>
                            </div>
                        </div>
                        <!-- 进度条底下控件 -->
                        <div class="player-video-control-main">
                            <!-- 播放暂停,记录当前时间,总时间 -->
                            <div class="buttom-left">
                                <div class="video-pause"></div>
                            </div>
                            <div class="buttom-right">
                                <div class="buttom-music button-container" title="音量">
                                    <div class="music-progress-container">
                                        <div class="music-num"></div>
                                        <div class="music-progress-wrap" ref="musicProgressWrap">
                                            <div class="music-progress" ref="musicProgress"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="button-container" >自动</div>
                                <div class="buttom-full-screen button-container" title="全屏" @click="fullscreen"></div>
                            </div>
                        </div>
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
    mounted(){
        this.load()
    },
    methods: {
        load(){
            if (flvjs.isSupported()) {
                var videoElement = this.$refs.video
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
        },
        fullscreen(){
            this.$refs.video.webkitRequestFullScreen()
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
        height: 676px;
        background: black;
        position: relative;
        .play-wrapp-top{
            width: 100%;
            height: 48px;
        }
        .play-wrapp-video{
            cursor: pointer;
            video{
                width: 964px;
                height: 614px;
            }

        }
        // 暂停符号
        .player-pause{
            width: 64px;
            height: 64px;
            background: white;
            position: absolute;
            right: 34px;
            bottom: 70px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            .player-sig-container{
                position: relative;
            }
            .player-sig{
                position: absolute;
                top: -15px;
                left: -10px;
                width: 0;
                border-top: 20px solid transparent;
                border-right: 20px solid transparent;
                border-bottom: 20px solid transparent;
                border-left: 20px solid black;

            }
        }
    }
    // 进度条
    .player-video-buttom{
        width: 100%;
        height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        padding: 0 12px;
            .player-video-control-top{
                transition:  opacity .2s ease-in;
                cursor: pointer;
                opacity: 1;
                height: 16px;
                .play-video-progress{
                    width: 0;
                    height: 4px !important;
                    transition: all .5;
                    background: hsla(0,0%,100%,.2);
                    .bui-track{
                        width: 940px;
                        background: hsla(0,0%,100%,.3);
                        height: 4px ;
                    }
                }
            }
    }
    // 进度条下面
    .player-video-control-main{
        width: 100%;
        height: 35px;
        .buttom-left{
            height: 100%;
            float: left;
            .video-pause{
                cursor: pointer;
                width: 0;
                border-top: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-left: 10px solid white;
                border-radius: 4px;
                margin-left: 10px;
                margin-right: 10px;
                display: inline-block;
                vertical-align: top;
            }
            .video-time{
                display: inline-block;
                width: 90px;
                height: 22px;
                color: #fff
            }
        }
        .buttom-right{
            height: 100%;
            float: right;
            display: flex;
            color: #fff;
            .button-container{
                margin-right: 10px;
                font-size: 15px;
                height: 22px;
                width: 30px;
                cursor: pointer;
            }
            .buttom-full-screen{
                background-image: url('../pictures/icons.png');
                background-position-x: -276px;
                background-position-y: -918px;
            }
            .buttom-music{
                background-image: url('../pictures/icons.png');
                background-position-x: -666px;
                background-position-y: -1686px;
                position: relative;
                &:hover{
                    .music-progress-container{
                        display: block;
                    }
                }
                .music-progress-container{
                    width: 36px;
                    height: 100px;
                    position: absolute;
                    left: -10px;
                    top: -124px;
                    background: #104;
                    color: #fff;
                    display: none;
                    .music-num{
                        display: flex;
                        justify-content: center;
                    }
                    .music-progress-wrap{
                        transform: rotate(180deg);
                        transform-origin:50 50%;
                        position: absolute;
                        left: 15px;
                        top: 23px;
                        line-height: 70px;
                        text-align: center;
                        width: 4px;
                        height: 70px;
                        background: white;
                    }
                    .music-progress{
                        width: 100%;
                        background:blue;
                    }
                }
            }
        }
    }
</style>
