<template>
  <div class="cartoon">
      <div class="live-list">
          <!-- 标题 -->
          <cartoon-head>
                <template v-slot:head-img >
                        <div class="cartoon-head-img"></div>
                </template>
                <template v-slot:head-title >
                        动画
                </template>
          </cartoon-head>
          <!-- 动画列表 -->
          <cartoon-list v-bind:cartoons="cartoons">
              
          </cartoon-list>

      </div>
        <!-- 排行榜 -->
        <cartoon-rank-list >
              
        </cartoon-rank-list>
  </div>
</template>

<script>
import cartoonHead from '@/components/cartoon/head.vue'
import cartoonList from '@/components/cartoon/zoneListBox.vue'
import cartoonRankList from '@/components/cartoon/rankList.vue'
import axios from '@/api/core/axios.js'
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import { Message } from 'element-ui'
export default {
    name: 'cartoon',
    components: {
        cartoonHead,
        cartoonList,
        cartoonRankList
    },
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
                // console.log(this.$store.state.count)
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
    }
    .live-list{
        width: 854px !important;
        height: 100%;
        float: left;
    }

    .cartoon-head-img{
        width: 36px;
        height: 36px;
        background-image: url('../pictures/icons.png');
        background-position-x: -83px;
        background-position-y: -140px;
    }
</style>
