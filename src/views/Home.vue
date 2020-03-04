<template>
    <div class="home">
        <header id="header">
            <bilil-header id="bilil-header"></bilil-header>
            <div class="head-banner">
                <img  src="../pictures/7197cae46569a49abd98e0c51348068831be6a85.png">
            </div>
        </header>

        <main>
            <bilil-wrapper></bilil-wrapper>
            <img class="guanggao" src="../pictures/60b856e5b5fcbaa16ee8fd1fe54b8670.jpg">
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
        </main>
    </div>
</template>

<script>
import bililHeader from '@/components/header.vue'
import bililWrapper from '@/components/wrapper.vue'
import cartoonHead from '@/components/cartoon/head.vue'
import cartoonList from '@/components/cartoon/zoneListBox.vue'
import cartoonRankList from '@/components/cartoon/rankList.vue'
import axios from '@/api/core/axios.js'
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import { Message } from 'element-ui'
export default {
    name: 'Home',
    components: {
        bililHeader,
        bililWrapper,
        cartoonHead,
        cartoonList,
        cartoonRankList
    },
    created(){
        this.getCartoon(1)
        this.cartoons = this.setC
    },
    data(){
        return{
            cartoons: []
        }
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
            })
        }
    }
}
</script>

<style lang="less" scoped>
*{
    font-size: 14px;
    box-sizing: border-box;
}
ul{
    list-style-type : none;
}
    .homg{
        height: 100%;
    }
    main{
        width: 1200px;
        margin: 0 auto;
    }
    #header{
        width: 100%;
        height: 170px;
        position: relative;
        display: flex;
    }
    #bilil-header{
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        z-index: 100;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
    }
    .head-banner{
        z-index: 1;
        float: left;
    }
    .guanggao{
        width: 1200px;
        height: 100px;
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
