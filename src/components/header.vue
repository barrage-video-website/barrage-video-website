<template>
  <div class="header">
      <div class="nav-wrapper-left">
          <ul class="nav-con-ul">
              <li class="nav-item">
                  <div class="title">主页</div>
                    <div id="background"></div>
              </li>
                <li class="nav-item">
                  <div class="title">游戏中心</div>
              </li>
                <li class="nav-item">
                  <div class="title">直播</div>
              </li>
                <li class="nav-item">
                  <div class="title">会员购</div>
              </li>
                <li class="nav-item">
                  <div class="title">漫画</div>
              </li>
                <li class="nav-item">
                  <div class="title">赛事</div>
              </li>
                <li class="nav-item">
                  <div class="title">BML</div>
              </li>

          </ul>
      </div>
      <div class="nav-wrapper-right">
              <ul class="nav-con-ul">

                    <li class="nav-item" v-if="!islogin">
                        <div class="title">登录</div>
                    </li>
                    <li class="nav-item contribute"  >
                        <div class="title" @click="goToContribute">投稿</div>
                    </li>
                    <li class="nav-item register"  v-if="!islogin">
                        <div class="title">注册</div>
                    </li>
                    <li class="nav-item"  v-if="islogin">
                        <img :src="`http://localhost/barrage-video-website-serve/public/${headPhotoUrl}`" alt="头像">
                    </li>
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
import tokenManager from '@/api/core/tokenManager.js'
import tokenPlayLoad from '@/api/core/tokenPlayLoad.js'
import axios from '@/api/core/axios.js'
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import { Message } from 'element-ui'
export default {
    name: 'HearderNavitation',
    data(){
        return {
            islogin: false,
            nickname: '',
            headPhotoUrl: ''
        }
    },
    created(){
        this.haslogin()
    },
    methods: {
        goToContribute() {
            this.$router.push({ name: 'Account' })
        },
        haslogin(){
            // 是否登录了
            if(tokenManager.hasToken()){
                const userId = tokenPlayLoad.getUserId()
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
    }
    .nav-wrapper-right{
        float: right;
    }
    .nav-con-ul{
        position: relative;
        display: flex;
        list-style: none;
        .nav-item{
            cursor: pointer;
            padding-left: 12px;
            float: left;
            text-align: center;
            line-height: 14px;
            height: 14px;
            position: relative;
            white-space: nowrap;
            img{
                width: 26px;
                height: 26px;
            }
            .title{
                font-size: 14px;
                color:#222;
                height: 100%;
                padding: 0 7px;
                padding-left: 20px;
            }
            #background{
                background-image: url('../pictures/icons.png');
                background-position-x: -80px;
                background-position-y: -210px;
                width: 41px;
                height: 36px;
                position: absolute;
                left: -1px;
                top: -4px;
                columns: #00a1d0;
            }
            #background-ceter{
                left: -1px;
                top: 0;
                position: absolute;
                width: 41px;
                height: 36px;
                background-image: url('../pictures/icons.png');
                background-position-x: -80px;
                background-position-y: -1240px;
            }
        }
    }
    #create-centre{
        border-radius: 5px;
        background-color:#fb7299;
    }

    .register,.user{
        margin-right: 40px;
    }

</style>
