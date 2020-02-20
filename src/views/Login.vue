<template>
  <div class="Login">
      <bilil-header></bilil-header>
      <!-- TODO -->
      <main>
        <div class="top-banner">
            <img src="../pictures/rl_top.35edfde-1.png" alt="">
        </div>
        <div class="title-line">
            <span class="tit">登录</span>
        </div>
        <div class="login-box">
            <div class="login-left">
                <div class="bilii-logo"></div>
            </div>
            <div class="line"></div>
            <div class="login-right">
                <div class="form">
                    <el-input v-model="account" placeholder="请输入账号"></el-input>
                    <el-input v-model="password" placeholder="请输入密码"></el-input>
                    <div class="forget">忘记密码</div>
                    <div class="btn-box">
                        <div class="btn btn-login" @click="login">登录</div>
                        <div class="btn btn-register">注册</div>
                    </div>
                </div>
            </div>
        </div>
      </main>
  </div>
</template>

<script>
import api from '@/api'
import apiPrefix from '@/api/apiPrefix.js'
import bililHeader from '@/components/header.vue'
import { Input, Message } from 'element-ui'

export default {
    name: 'login',
    components: {
        bililHeader,
        [Input.name]: Input
    },
    data () {
        return {
            account: '',
            password: ''
        }
    },
    methods: {
        login(){
            this.$axios.post(apiPrefix.api + api.login, {
                account: this.account,
                password: this.password
            }).then(()=>{
                Message.success('请求成功')
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login{
        height: 100%;
    }
    .top-banner{
        background: #00a0d8;
        height: 86px;
        text-align: center;
        margin-bottom: 20px;
    }
    .title-line{
        width: 980px;
        height: 28px;
        margin: 0 auto;
        // border:1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin-bottom: 28px;
        text-align: center;
        .tit{
            font-size: 38px;
            height: 56px;
            line-height: 56px;
            margin: 0 auto;
            padding: 0 20px;
            background: #fff;
            text-align: center;
        }
    }
    .login-box{
        width: 980px;
        height: 367px;
        margin: 0 auto;
    }
    .login-left{
        height: 100%;
        float: left;
        width: 488px;
        position: relative;
        .bilii-logo{
            background: url('../pictures/2233login.af9c53d.png')  no-repeat;
            width: 100%;
            height: 200px;
            position: absolute;
            left: 0;
            top: 100px;
        }
    }
    .line{
        float: left;
        border-right: 1px solid #ddd;
        height: 300px;
        margin-top: 28px;
    }
    .login-right{
        padding: 20px;
        height: 100%;
        float: left;
        width: 490px !important;
        padding-left: 45px;
        padding-top: 50px;
    }
    .form{
        width: 388px;
    }
    .el-input{
        height: 28px;
        margin-bottom: 40px;
    }
    .forget{
        text-align: right;
        color: #00a0d8;
        font-size: 16px;
    }
    .forget{
        margin-bottom: 40px;
    }
    .btn-box{
        display: flex;
    }
    .btn{
        border: 1px solid #0381aa;
        color: #fff;
        width: 184px;
        line-height: 36px;
        height: 36px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        background: #00a7de;
        border-radius: 2px;
    }
    .btn-register{
        margin-left: 20px;
        border: 1px solid black;
        background: white;
        color: #000;
    }
</style>
