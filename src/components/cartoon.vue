<template>
  <div class="cartoon">
      <div class="live-list">
          <header class="strong-title">
              <div class="l-con">
                  <div class="img"></div>
                  <div class="title">动画</div>
                  <div class="text-info"></div>
              </div>
              <div class="exchange-btn"></div>
          </header>
          <div class="zone-list-box">
              <div class="live-card" @click="gotoVideo" v-for="cartoon in cartoons" :key="cartoon.videoId">
                    <div class="pi">
                        <img :src="`http://localhost/barrage-video-website-serve/public/image/${cartoon.coverPath}`">
                    </div>
                    <div class="title">{{cartoon.coverTitle}}</div>
                    <div class="up">
                        <div class="img"></div>
                        {{cartoon.userName}}
                    </div>
              </div>
          </div>
      </div>
      <div class="live-tabs">
          <header class="rank-header">
              <span>排行榜</span>
          </header>
          <div class="rank-wrap wrap">
              <span class="number sp-number">1</span>
                <div class="preiviews">
                    <img class="pic" src="../pictures/3458dbc1e7aebf7a683598d6862f3cef645aa3c7.jpg@112w_63h_1c_100q.webp">
                    <div class="text">
                        <div class="title">你为什么不戴口罩    我在吃饭【阅片无数34】</div>
                        <span style="color:#999">综合得分：248.8万</span>
                    </div>
                </div>
          </div>
          <div class="rank-wrap">
              <span class="number sp-number">2</span>
              <div class="title">沙 雕 情 人 节</div>
          </div>
          <div class="rank-wrap">
              <span class="number sp-number">3</span>
              <div class="title">每天一遍、爱情再见！！</div>
          </div>
          <div class="rank-wrap">
              <span class="number">4</span>
              <div class="title">祖 安 妹 妹 ????</div>
          </div>
          <div class="rank-wrap">
              <span class="number">5</span>
              <div class="title">【本色出演】天  津  出  租  车</div>
          </div>
          <div class="rank-wrap">
              <span class="number">6</span>
              <div class="title">（自制动画）咏春VS咏春 叶问3</div>
          </div>
          <div class="rank-wrap">
              <span class="number">7</span>
              <div class="title">黑丝颜艺，复仇人生，令人惊艳的两部神作！</div>
          </div>
          <div class="rank-wrap">
              <span class="number">8</span>
              <div class="title">因为太怕痛就全点防御力了</div>
          </div>
          <div class="rank-wrap">
              <span class="number">9</span>
              <div class="title">某科学的超电磁炮T</div>
          </div>
          <div class="rank-wrap">
              <span class="number">10</span>
              <div class="title">今年的22娘杀伤力更强</div>
          </div>
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
export default {
    name: 'cartoon',
    data(){
        return {
            cartoons: [{
                // 视频id
                videoId: '',
                // 封面路径
                coverPath: '',
                // 视频标题
                coverTitle: '',
                // 发表用户
                userName: ''
            }]
        }
    },
    created(){
        this.getCartoon(1)
    },
    methods: {
        gotoVideo(){
            this.$router.push({ path: '/video/1' })
        },
        getCartoon(page){
            axios.get(apiPrefix.api + api.getVideoList, {
                params: {
                    page
                }
            }).then(response => {
                Message({
                    message: response.data.msg,
                    type: 'success',
                    duration: 5 * 1000
                })
                this.cartoons = response.data.data.videolists
                console.log(this.videolists)
            })
        }
    }
}
</script>

<style lang="less" scoped>
*{
    box-sizing: border-box;
}
    .cartoon{
        width: 100%;
        height: 456px;
        margin-top: 40px;
        cursor: pointer;
    }
    .live-list{
        width: 854px !important;
        height: 100%;
        float: left;
    }
    .live-tabs{
        width: 320px;
        height: 100%;
        float: right;
        .rank-header{
            margin-bottom: 16px;
            width: 320px;
            height: 36px;
            font-size: 20px;
            line-height: 28px;
        }
        .rank-wrap{
            display: flex;
            justify-content: space-between;
            margin-bottom: 18px;
            .number{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 18px;
                height: 18px;
                color: #999;
            }
            .sp-number{
                color: #fff;
                background:#00a1d6;
            }
            .title{
                width: 290px;
                height: 20px;
            }
        }
        .wrap{
            width: 320px;
            height: 64px;
            .preiviews{
                display: flex;
                width: 290px;
                height: 64px;
                justify-content: space-between;
                .title{
                    width: 166px;
                    height: 45px;
                }
            }
        }
    }
    .strong-title{
        width: 100%;
        height: 36px;
        margin-bottom: 16px;
        .l-con{
            float: left;
            display: flex;
            .img{
                width: 36px;
                height: 36px;
                background-image: url('../pictures/icons.png');
                background-position-x: -83px;
                background-position-y: -140px;
            }
            .title{
                font-size: 20px;
                line-height:36px;
            }
        }
        .exchange-btn{
            float: right;
        }
    }
    .zone-list-box{
        width: 100%;
        height: 404px;
        .live-card{
            display: inline-block;
            width: 206px;
            height: 190px;
            margin-right: 10px;
            margin-bottom: 24px;
            &:nth-child(4n){
            margin-right: 0;
            }
            &:nth-child(5,6,7,8){
            margin-bottom: 0;
            }
            .title{
                font-size: 14px;
                line-height: 20px;
                width: 100%;
                height: 40px;
            }
            .up{
                display: flex;
                color: #999;
                .img{
                    width: 16px;
                    height: 16px;
                    background-image: url('../pictures/icons.png');
                    background-position-x: -536px;
                    background-position-y: -1046px;
                    margin-right: 8px;
                }
            }
        }
    }
</style>
