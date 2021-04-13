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
                        <div class="play-wrapp-top"></div>
                        <!-- 播放器 -->
                        <div class="play-wrapp-video" @click="pause()">
                                <d-player :options="options" ref="dplayer"></d-player>
                            <!-- <video  ref="video"  :src="`http://192.168.145.128/barrage-video-website-serve/public/video/${this.videoPath}`"></video> -->
                        </div>
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
                        </div>
                    </div>
                </div>
                
          </div>
          <div class="r-con"></div>
      </div>
  </div>
</template>

<script>
import axios from '@/api/core/axios.js'
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import VueDPlayer from 'vue-dplayer'
import bililHeader from '@/components/header.vue'
export default {
    name: 'videoLayout',
    components: {
        bililHeader,
        'd-player': VueDPlayer

    },
    data(){
        return{
            coverPath: '',
            userId: '',
            videoPath: '',
            videoTitle: '',
            currentTime: 0,
            barrageContent: '你好',
            websocket: '',
            currentId: 0,
            position: 'top',
            time: 0,
            dp: null,
            isBindWebSocker: false,
            options: {
                container: this.$refs.dplayer,
                danmaku: {
                    id: '9E2E3368B56CDBB4',
                    api: 'https://api.prprpr.me/dplayer/',
                    // token: 'tokendemo',
                    maximum: 1000,
                    bottom: '25%',
                    unlimited: true
                }
            }
        }
    },
    props: ['videoId'],
    mounted(){
        this.getVideo()
        this.dp = this.$refs.dplayer.dp
    },
    destroyed(){
        this.websocket.close()
    },
    methods: {
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
            this.websocket.send(this.barrageContent)
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
                this.dp.switchVideo({ url: 'http://192.168.145.128/barrage-video-website-serve/public/video/' + this.videoPath })
            })
        },
        bindWebSocker(){
            const wsServer = 'ws://192.168.145.128:5200'
            this.websocket = new WebSocket(wsServer)
            this.websocket.onopen = (evt) =>{
                console.log('连接websocket成功')
                this.websocket.send('videoId' + ':' + this.videoId)
            }

            this.websocket.onclose = function (evt) {
                console.log('关闭websocket连接')
            }

            this.websocket.onmessage = (evt) =>{
                const data = evt.data
                if(Number(data) === Number(this.time)){
                }else{
                    this.dp.danmaku.draw({
                        text: data,
                        color: '#fff'
                    })
                }
            }
            let lastTime
            setInterval(()=>{
                this.time = Math.floor(this.dp.video.currentTime)
                if(lastTime === this.time){
                }else{
                    this.websocket.send(this.time)
                }
                lastTime = this.time
            }, 1000)

            this.websocket.onerror = function (evt, e) {
                console.log('错误信息: ' + evt.data)
            }
        },
        pause(){
            if(!this.isBindWebSocker){
                this.bindWebSocker()
                this.isBindWebSocker = true
            }
        }
    }
}
</script>

<style lang="less">
*{
    font-size: 14px;
}
    .video{
        width: 100%;
        height: 100%;
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
