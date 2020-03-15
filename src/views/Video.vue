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
                <!-- 左边整个页面 -->
                <div class="bililbili-left">
                    <div class="play-wrapp ">
                    <!-- 头部 -->
                        <div class="barragreshow">
                            <vue-baberrage
                                    :isShow = "barrageIsShow"
                                    :barrageList = "barrageList"
                                    :maxWordCount = "60"
                                    :throttleGap="10">
                                <template v-slot:default="slotProps">
                                    <span style="color: #FAEBD7">
                                    {{slotProps.item.msg}}
                                    </span>
                                </template>
                            </vue-baberrage>
                        </div>
                        <div class="play-wrapp-top"></div>
                        <!-- 播放器 -->
                        <div class="play-wrapp-video" @click="pause()">
                            <video  ref="video"  :src="`http://localhost/barrage-video-website-serve/public/video/${this.videoPath}`"></video>
                        </div>
                        <!-- 低层 -->
                        <div class="player-video-buttom">
                            <div class="player-video-control-top" @mousedown="videoSeek">
                                <!-- 进度条 -->
                                <div class="play-video-progress" id="play-video-progress" ref="playVideoProgress"  v-bind:style="{width:percent + '%'}">
                                    <div class="bui-track" id="bui-track"  ref="buiTrack" ></div>
                                </div>
                            </div>
                            <!-- 进度条底下控件 -->
                            <div class="player-video-control-main">
                                <!-- 播放暂停,记录当前时间,总时间 -->
                                <div class="buttom-left">
                                    <div class="video-pause"></div>
                                    <div class="video-time">
                                        <!-- new Date(endDate ) -->
                                        <span>{{this.comThisCurrentTime}}</span>
                                        <span>/</span>
                                        <span>{{this.comThisDurationTime}}</span>
                                    </div>
                                </div>
                                <div class="buttom-right">
                                    <div class="buttom-music button-container" title="音量">
                                        <div class="music-progress-container">
                                            <div class="music-num">{{this.musicPercent}}</div>
                                            <div class="music-progress-wrap" @mousedown="musicSeek" ref="musicProgressWrap">
                                                <div class="music-progress" ref="musicProgress" v-bind:style="{height:musicPercent + '%'}"></div>
                                            </div>
                                        </div>
                                    </div>
                                <div class="button-container" >自动</div>
                                <div class="buttom-full-screen button-container" title="全屏" @click="fullscreen"></div>
                            </div>
                        </div>
                    </div>
                    <!-- 暂停按钮 -->
                    <div class="player-pause" @click="pause()">
                        <div class="player-sig-container">
                            <div class="player-sig"></div>
                        </div>
                    </div>
                    <!-- 暂停按钮完 -->
                    </div>
                    <!-- 播放器完 -->
                    <!-- 底部 -->
                    <div class="barrage-container">
                        <div class="barrage-left">
                            <div class="info-people">
                                <span class="number">214</span>
                                <span>正在看,</span>
                            </div>
                            <div class="info-barrage">
                                <span >511</span>
                                <span>实时弹幕</span>
                            </div>
                        </div>
                        <div class="barrage-right">
                            <!-- 是否打开弹幕按钮 -->
                            <el-switch
                            v-model="color"
                            active-color="#00a1d6"
                            inactive-color="#757575">
                            </el-switch>
                            <div class="barrage-input-wrap" >
                                <input class="barrage-input" placeholder="发送弹幕互动一下吧" v-model="barrageContent">
                            </div>
                            <div class="barrage-input-button" @click="sentBarrage">
                                发送
                            </div>
                            <div class="barrage-input-button" @click="addToList">
                                add
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
import { MESSAGE_TYPE } from 'vue-baberrage'
import axios from '@/api/core/axios.js'
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import bililHeader from '@/components/header.vue'
export default {
    name: 'videoLayout',
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
            musicPercent: 100,
            duration: 0,
            currentTime: 0,
            color: false,
            barrageContent: '你好',
            websocket: '',
            currentId: 0,
            position: 'top',
            barrageIsShow: true,
            barrageList: []
        }
    },
    props: ['videoId'],
    mounted(){
        this.getVideo()
    },
    destroyed(){
        this.websocket.close()
    },
    computed: {
        percentProeecss(){
            return (this.currentTime / this.duration) * 100
        },
        comThisCurrentTime(){
            const s = this.currentTime
            var day = Math.floor(s / (24 * 3600))
            var hour = Math.floor((s - day * 24 * 3600) / 3600)
            var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60)
            var second = Math.floor(s - day * 24 * 3600 - hour * 3600 - minute * 60)
            if(minute < 10){
                minute = '0' + minute
            }
            if(second < 10){
                second = '0' + second
            }
            return minute + ':' + second
        },
        comThisDurationTime(){
            const s = this.duration
            var day = Math.floor(s / (24 * 3600))
            var hour = Math.floor((s - day * 24 * 3600) / 3600)
            var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60)
            var second = Math.floor(s - day * 24 * 3600 - hour * 3600 - minute * 60)
            if(minute < 10){
                minute = '0' + minute
            }
            if(second < 10){
                second = '0' + second
            }
            return minute + ':' + second
        }
    },
    watch: {
        percentProeecss (cur, old){
            this.percent = cur
        }
    },
    methods: {
        addToList () {
            this.barrageList.push({
                id: ++this.currentId,
                msg: this.barrageContent,
                time: 10,
                type: MESSAGE_TYPE.NORMAL
            })
        },
        deleteBarrage(){
            axios.post(apiPrefix.api + api.deleteBarrage, {
            }).then(response => {
                console.log('删除成功')
            })
        },
        sentBarrage(){
            axios.post(apiPrefix.api + api.sentBarrage, {
                videoId: this.videoId,
                barrage: this.barrageContent,
                currentTime: this.currentTime
            }).then(response => {

            })
            this.websocket.send('哈哈哈')
        },
        // 获取
        getVideo(){
            axios.get(apiPrefix.api + api.getVideo, {
                params: {
                    videoId: this.videoId
                }
            }).then(response => {
                const video = response.data.data.video
                this.coverPath = video.coverPath
                this.userId = video.userId
                this.videoPath = video.videoPath
                this.videoTitle = video.videoTitle
            })
        },
        // 改变时间
        changVideoTime(currentTime = 0){
            if(currentTime !== 0){
                this.currentTime = currentTime
            }
            const video = this.$refs.video
            video.addEventListener('timeupdate', ()=>{
                this.currentTime = video.currentTime
            })
        },
        pause(){
            const myVid = this.$refs.video
            if(myVid.paused){
                myVid.play()
                this.duration = this.$refs.video.duration
                this.changVideoTime()
                var wsServer = 'ws://192.168.145.128:5200'
                this.websocket = new WebSocket(wsServer)
                this.websocket.onopen = (evt) =>{
                    console.log('连接websocket成功')
                }

                this.websocket.onclose = function (evt) {
                    console.log('关闭websocket连接')
                }

                this.websocket.onmessage = (evt) =>{
                    const data = evt.data
                    const time = data.split(':')[0]
                    const content = data.split(':')[1]
                    console.log(data)
                    this.barrageList.push({
                        id: ++this.currentId,
                        msg: content,
                        time: 10,
                        type: MESSAGE_TYPE.NORMAL
                    })
                }

                this.websocket.onerror = function (evt, e) {
                    console.log('错误信息: ' + evt.data)
                }
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
        },
        musicSeek(e){
            var video = this.$refs.video
            var musicProgress = this.$refs.musicProgress
            var musicProgressWrap = this.$refs.musicProgressWrap
            var length = e.clientY - 630 - musicProgress.offsetHeight
            var percent = length / musicProgressWrap.offsetHeight
            percent = Math.floor(percent * 100)
            if(percent > 100){
                percent = 100
            }
            this.musicPercent = percent
            video.preventDefault()
            video.volume = percent / 100
        },
        fullscreen(){
            this.$refs.video.webkitRequestFullScreen()
        }
    }
}
</script>

<style lang="less">
*{
    font-size: 14px;
}
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
        background: black;
        position: relative;
        .play-wrapp-top{
            width: 100%;
            height: 48px;
        }
        .play-wrapp-video{
            position: relative;
            cursor: pointer;
            video{
                width: 964px;
                height: 550px;
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
    // 弹幕
    .barrage-container{
        width: 100%;
        height: 46px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        float: left;
        padding: 0 12px 0 20px;
        .barrage-left{
            width: 242px;
            float: left;
            display: flex;
            margin-right: 20px;
            .info-people{
                margin-right: 20px;
                .number{
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-right: 6px;
                }
            }
        }
        .barrage-right{
            display: flex;
            align-items: center;
            height: 30px;
            width: 100%;
            .barrage-input-button{
                width: 60px;
                height: 100%;
                background: #00a1d6;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-radius: 4px;
            }
            .barrage-input-wrap{
                color: rgb(153, 153, 153);
                margin-left: 10px;
                background: #eee;
                height: 100%;
                width: 100%;
                padding:  4px  16px;
                .barrage-input{
                    width: 100%;
                    border: 0;  // 去除未选中状态边框
                    outline: none; // 去除选中状态边框
                    background-color: rgba(0, 0, 0, 0);// 透明背景
                }
            }
        }
    }
    .barragreshow{
        width: 100%;
        height: 90%;
        position: absolute;
        z-index: 100;
        pointer-events: none;
        left: 0;
        top: 0;
    }
</style>
