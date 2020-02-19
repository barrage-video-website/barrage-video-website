<template>
  <div class="account">
    <header>
        <bilil-header id="bilil-header"></bilil-header>
        <div class="top-banner">
            <img src="../pictures/rl_top.35edfde-1.png" alt="">
        </div>
    </header>
    <main>
        <div class="security-left">
            <div class="security-title">个人中心</div>
            <ul class="security-ul">
                <li class="security-li">
                    <div class="img"></div>
                    <div class="security-name" @click="goToContribute">投稿</div>
                </li>
            </ul>
        </div>
        <div class="security-right">
            <router-view/>
        </div>
    </main>
  </div>
</template>

<script>
import bililHeader from '@/components/header.vue'
export default {
    name: 'account',
    components: {
        bililHeader
    },
    methods: {
        goToContribute(){
            this.$router.push({ name: 'Contribute' })
        }
    }
}
</script>

<style lang="less" scoped>
ul{
    list-style-type : none;
    margin: 0;
    padding: 0;
}
    #bilil-header{
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    }
    .top-banner{
        background: #00a0d8;
        height: 86px;
        text-align: center;
        margin-bottom: 20px;
    }
    main{
        margin:0 auto;
        max-width: 1000px !important;
        margin-top: 20px;
        border:1px solid #e1e2e5;
        box-shadow:0px 2px 4px rgba(0,0,0,0.14);
        height: 800px;
        display: flex;
    }
    .security-left{
        width: 150px !important;
        height: 100%;
        overflow: hidden;
        border-right: 1px solid #ddd;
        background: #eee;
        .security-title{
            width: 100%;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #99a2aa;
            border-bottom: 1px solid #e1e2e5;
        }
        .security-ul{
            border-bottom: 1px solid #e1e2e5;
            color: #717171;
            font-size: 12px;
            .security-li{
                cursor: pointer;
                width: 150px;
                height: 48px;
                line-height: 48px;
                font-size: 16px;
                display: flex;
                justify-content: center;
                .img{
                    background-image: url('../pictures/icons.png');
                    background-position-x: -657px;
                    background-position-y: -137px;
                    width: 24px;
                    height: 48px;
                    margin-right: 18px;
                    line-height: 48px;
                }
            }
        }
    }
    .security-right{
        width: 849px;
        height: 100%;
    }
</style>
