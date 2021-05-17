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
                <div class="comment-container">
                    <!-- 发送评论 -->
                    <div class="comment-send">
                        <div class="islogin" v-if="islogin">
                            <div class="send-left">
                                <img :src="`http://${$store.state.serverIp}/barrage-video-website-serve/public/${headPhotoUrl}`" alt="头像" class="head-photo">
                            </div>
                            <div class="send-right">
                                <el-input id="send" type="textarea" v-model="userComment" placeholder="请输入评论" resize="none"></el-input>
                            </div>
                            <el-button  type="primary" class="comment-btn" @click="sendComment()">发表评论</el-button>
                        </div>
                        <div class="notlogin" v-else>
                            <div class="send-left">
                                <img :src="`http://${$store.state.serverIp}/barrage-video-website-serve/public/${headPhotoUrl}`" alt="头像" class="head-photo">
                            </div>
                            <div class="send-right">
                                <div class="ban-container">
                                    <div class="text">请先</div>
                                    <el-button  type="primary" class="login-btn" @click="goToLogin">登录</el-button>
                                    <div class="text">后发表评论 (・ω・)</div>
                                </div>
                            </div>
                            <el-button  type="info" class="comment-btn">发表评论</el-button>
                        </div>

                    </div>
                    <!-- 发送评论完 -->

                    <!-- 展示评论列表 -->
                    <div class="comment-list" v-for="commentList in commentLists" :key="commentList.commentId">
                        <div class="list-left">
                            <img :src="`http://${$store.state.serverIp}/barrage-video-website-serve/public/${commentList.headPhotoUrl}`" alt="头像" class="head-photo">
                        </div>
                        <div class="list-right">
                            <div class="comment-user-nickname">{{commentList.commentNickname}}</div>
                            <div class="comment-text" >{{commentList.commentText}}</div>
                        </div>
                    </div>
                    <!-- 展示评论列表完 -->
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
import tokenManager from '@/api/core/tokenManager.js'
import VueDPlayer from 'vue-dplayer'
import bililHeader from '@/components/header.vue'
import { Input } from 'element-ui'
export default {
    name: 'videoLayout',
    components: {
        bililHeader,
        'd-player': VueDPlayer,
        [Input.name]: Input
    },
    data(){
        return{
            serverIp: '',
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
            color: null,
            isBindWebSocker: false,
            userComment: null,
            options: {
                container: this.$refs.dplayer,
                danmaku: {
                    id: '9E2E3368B56CDBB4',
                    api: '',
                    // token: 'tokendemo',
                    maximum: 1000,
                    bottom: '25%',
                    unlimited: true
                }
            },
            headPhotoUrl: '/image/hp.jpg',
            // 评论头像
            commentLists: [
                // {
            //     commentId: 1,
            //     // 评论区内容
            //     commentText: '阿斯顿卢卡斯经济带来困难萨那十多年艰难',
            //     // 评论昵称
            //     commentNickname: '测试',
            //     // 评论头像
            //     headPhotoUrl: '/image/hp.jpg'

            // },
            ],
            islogin: false
        }
    },
    props: ['videoId'],
    mounted(){
        this.getVideo()
        this.dp = this.$refs.dplayer.dp
        this.getCommentList()
        // 是否登录了
        if(tokenManager.hasToken()){
            this.islogin = true
        }
        // this.getServerIp()
    },
    destroyed(){
        this.websocket.close()
    },
    methods: {
        // 跳转到登录页
        goToLogin(){
            this.$router.push({ name: 'Login' })
        },
        // 获取评论区内容
        getCommentList(page = 1){
            axios.get(apiPrefix.api + api.getCommentList, {
                params: {
                    videoId: this.videoId,
                    page
                }
            }).then(response => {
                this.commentLists = response.data.data.commentLists
            })
        },
        // 发送评论
        sendComment(){
            axios.post(apiPrefix.api + api.sendComment, {
                userId: this.userId,
                videoId: this.videoId,
                commentText: this.userComment
            }).then(response => {
            })
        },
        sentBarrage(){
            axios.post(apiPrefix.api + api.sentBarrage, {
                videoId: this.videoId,
                barrage: this.barrageContent,
                currentTime: this.currentTime
            }).then(response => {
                this.dp.danmaku.draw({
                    text: this.barrageContent
                })
            })
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
                this.dp.switchVideo({ url: 'http://' + this.$store.state.serverIp + '/barrage-video-website-serve/public/video/' + this.videoPath })
            })
        },
        bindWebSocker(){
            const wsServer = 'ws://' + this.$store.state.serverIp + ':5200'
            this.websocket = new WebSocket(wsServer)
            this.websocket.onopen = (evt) =>{
                this.websocket.send('videoId' + ':' + this.videoId)
            }
            this.websocket.onclose = function (evt) {
            }
            this.websocket.onmessage = (evt) =>{
                const data = evt.data
                if(Number(data) === Number(this.time)){
                }else{
                    this.dp.danmaku.draw({
                        text: data
                    })
                }
            }
            this.websocket.onerror = function (evt, e) {
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
    box-sizing: border-box;
}
    .comment-container{
        margin-top: 100px;
        width: 100%;

        .comment-send{
            width: 100%;
            height: 130px;
            padding: 10px;
            margin-bottom: 10px;
            .islogin{
                width: 100%;
                height: 100%;
                display: flex;

            }
            .notlogin{
                width: 100%;
                height: 100%;
                display: flex;
                color: #777;
                .send-right{
                    background-color: #e5e9ef;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .ban-container{
                        // width: 50px;
                        // height: 50px;
                        // background: red;
                        // text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
            .send-left{
                width: 100px;
                height: 100%;
                margin-right: 20px;
                img{
                    width: 70px;
                    height: 70px;
                    border-radius: 70px;
                }
            }

            .send-right{
                width: 100%;
                height: 100%;
                margin-right: 10px;
                #send{
                    height: 108px;
                }
            }
        }
        .comment-list{
            margin-top: 20px;
            width: 100%;
            min-height: 130px;
            max-height: 530px;
            padding: 10px;
            padding-top: 20px;
            display: flex;
            border-top:1px solid #e5e9ef;
            .list-left{
                width: 100px;
                height: 100%;
                margin-right: 20px;
                img{
                    width: 70px;
                    height: 70px;
                    border-radius: 70px;
                }
            }

            .list-right{
                width: 100%;
                height: 100%;
                margin-right: 10px;
                .comment-user-nickname{
                    color:#6d757a;
                    margin-bottom: 5px;
                }
                .comment-text{
                    line-height: 20px;
                    padding: 2px 0;
                    font-size: 14px;
                    text-shadow: none;
                    overflow: hidden;
                    word-wrap: break-word;
                    word-break: break-word;
                    white-space: pre-wrap;
                }
            }
        }
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
            // video{
            //     width: 964px;
            //     height: 550px;
            // }
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
