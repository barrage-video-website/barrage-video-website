<template>
  <div class="header">
      <div class="nav-wrapper-left">
          <ul class="nav-con-ul">
              <nav-item>
                <template v-slot:img>
                    <div id="background"></div>
                </template>
                <template v-slot:title>
                    主页
                </template>
              </nav-item>
              <nav-item>
                <template v-slot:title>
                    游戏中心
                </template>
              </nav-item>
                <nav-item>
                    <template v-slot:title>
                        直播
                    </template>
                </nav-item>
                <nav-item>
                    <template v-slot:title>
                        会员购
                    </template>
                </nav-item>
                <nav-item>
                    <template v-slot:title>
                        漫画
                    </template>
                </nav-item>
                <nav-item>
                    <template v-slot:title>
                        赛事
                    </template>
                </nav-item>
                <nav-item>
                    <template v-slot:title>
                        BML
                    </template>
                </nav-item>
          </ul>
      </div>
      <div class="nav-wrapper-right">
                <ul class="nav-con-ul">
                    <div v-if="!islogin">
                        <nav-item>
                            <template v-slot:title>
                                <div @click="goTologin">登录</div>
                            </template>
                        </nav-item>
                    </div>
                    <nav-item>
                        <template v-slot:title >
                            <div @click="goToContribute">投稿</div>
                        </template>
                    </nav-item>
                    <div v-if="!islogin">
                        <nav-item>
                            <template v-slot:title >
                                <div  class="register" @click="goToRegister">注册</div>
                            </template>
                        </nav-item>
                    </div>
                    <div v-if="islogin">
                        <nav-item>
                            <template v-slot:title >
                                <img :src="`http://${$store.state.serverIp}/barrage-video-website-serve/public/${headPhotoUrl}`" alt="头像" class="head-photo">
                            </template>
                        </nav-item>
                    </div>
                    <li class="nav-item user" v-if="islogin">
                        <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{this.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="goToCenter">个人中心</el-dropdown-item>
                            <el-dropdown-item command="logout">注销</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                  </li>
              </ul>

      </div>
  </div>
</template>

<script>
import navItem from '@/components/header/nav-item.vue'
import tokenManager from '@/api/core/tokenManager.js'
import tokenPlayLoad from '@/api/core/tokenPlayLoad.js'
import axios from '@/api/core/axios.js'
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import { Message } from 'element-ui'
export default {
    name: 'HearderNavitation',
    components: {
        navItem
    },
    data(){
        return {
            islogin: false,
            nickname: '',
            headPhotoUrl: '',
            serverIp: null
        }
    },
    created(){
        this.haslogin()
        this.getServerIp()
    },
    updated(){
        // this.serverIp = this.$store.state.serverIp
    },
    methods: {
        getServerIp(){
            axios.get(apiPrefix.api + api.getServerIp, {

            }).then(response => {
                this.$store.dispatch('setIp', response.data.data.serverIp)
            })
        },
        goToRegister(){
            this.$router.push({ name: 'Register' })
        },
        goTologin(){
            this.$router.push({ name: 'Login' })
        },
        goToContribute() {
            this.$router.push({ name: 'Center' })
        },
        haslogin(){
            // 是否登录了
            if(tokenManager.hasToken()){
                // const userId = tokenPlayLoad.getUserId()
                const nickname = tokenPlayLoad.getNickname()
                const headPhotoUrl = tokenPlayLoad.getHeadPhoto()
                this.headPhotoUrl = headPhotoUrl
                this.nickname = nickname
                this.islogin = true
            }
        },
        handleCommand(command){
            switch(command){
                case 'logout' :
                    axios.post(apiPrefix.api + api.logout).then(response => {
                        tokenPlayLoad.logout()
                        this.islogin = false
                        Message({
                            message: response.data.msg,
                            type: 'success',
                            duration: 5 * 1000
                        })
                    })
                    break
                case 'goToCenter' :
                    this.$router.push({ name: 'Center' })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .header{
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        height: 56px !important;
    }
    .nav-wrapper-right{
        float: right;
    }
    .nav-con-ul{
        position: relative;
        display: flex;
        list-style: none;
    }
    #create-centre{
        border-radius: 5px;
        background-color:#fb7299;
    }

    .register,.user{
        margin-right: 40px;
    }
    #background{
        position: absolute;
        left: -24px;
        top: -18px;
        background-image: url('../pictures/icons.png');
        background-position-x: -80px;
        background-position-y: -210px;
        width: 30px;
        height: 30px;
    }
    .head-photo{
        width: 20px;
        height: 20px;
        border-radius: 20px;
    }
</style>
