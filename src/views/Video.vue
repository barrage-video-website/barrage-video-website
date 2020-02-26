<template>
  <div class="video">
    <bilil-header id="bilil-header"></bilil-header>
      <div class="video-main">
          <div class="l-con" >
                <div class="video-info">
                    <div class="video-title">
                        <span class="activity">活动作品</span>
                        <span>{{this.videoTitle}}</span>
                    </div>
                </div>
                <div class="play-wrapp">
                    <div class="play-wrapp-top"></div>
                    <div class="play-wrapp-video">
                        <video  ref="video" id="video" :src="`http://localhost/barrage-video-website-serve/public/video/${this.videoPath}`"></video>
                    </div>
                    <div class="player-video-buttom">
                        <div class="player-video-control-top">
                            <!-- 进度条 -->
                            <div class="play-video-progress" id="play-video-progress" ref="playVideoProgress" @mousedown="videoSeek" v-bind:style="{width:percent + '%'}">
                                <div class="bui-track" id="bui-track"  ref="buiTrack" ></div>
                            </div>
                        </div>
                    </div>
                    <div class="player-pause" @click="pause()">
                        <div class="player-sig-container">
                            <div class="player-sig"></div>
                        </div>
                    </div>
                </div>
          </div>
          <div class="r-con"></div>
      </div>
  </div>
</template>

<script>
import tokenManager from '@/api/core/tokenManager.js'
import tokenPlayLoad from '@/api/core/tokenPlayLoad.js'
import axios from '@/api/core/axios.js'
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import { Message } from 'element-ui'
import bililHeader from '@/components/header.vue'
export default {
    name: 'video',
    components: {
        bililHeader
    },
    data(){
        return{
            coverPath: '',
            userId: '',
            videoPath: '',
            videoTitle: '',
            percent: this.percentProeecss,
            duration: 0,
            currentTime: 0
        }
    },
    props: ['videoId'],
    mounted(){
        this.getVideo()
    },
    computed: {
        percentProeecss(){
            return (this.currentTime / this.duration) * 100
        }
    },
    watch: {
        percentProeecss (cur, old){
            this.percent = cur
        }
    },
    methods: {
        getVideo(){
            axios.get(apiPrefix.api + api.getVideo, {
                params: {
                    videoId: this.videoId
                }
            }).then(response => {
                Message({
                    message: response.data.msg,
                    type: 'success',
                    duration: 5 * 1000
                })
                const video = response.data.data.video
                this.coverPath = video.coverPath
                this.userId = video.userId
                this.videoPath = video.videoPath
                this.videoTitle = video.videoTitle
            })
        },
        changVideoTime(currentTime = 0){
            this.currentTime = currentTime
            // 60帧数
            setInterval(()=>{
                this.currentTime = this.$refs.video.currentTime
            }, 1000 / 60)
        },
        pause(){
            const myVid = this.$refs.video
            if(myVid.paused){
                myVid.play()
                this.duration = this.$refs.video.duration
                this.changVideoTime()
            }else{
                myVid.pause()
            }
        },
        videoSeek(e){
            var video = this.$refs.video
            var progress = this.$refs.playVideoProgress
            var buiTrack = this.$refs.buiTrack
            var length = e.clientX - progress.offsetLeft
            var percent = length / buiTrack.offsetWidth
            video.currentTime = percent * video.duration
            this.percent = percent * 100
            this.changVideoTime()
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
            video{
                width: 964px;
                height: 100%;
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
            cursor: pointer;
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
    .player-video-buttom{
        width: 100%;
        height: 94px;
        position: relative;
        box-sizing: border-box;
        padding: 0 12px;
        .player-video-control-top{
            transition:  opacity .2s ease-in;
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
</style>
