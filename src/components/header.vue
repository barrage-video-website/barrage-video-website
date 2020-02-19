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

                    <li class="nav-item" >
                        <div class="title">登录</div>
                    </li>
                    <li class="nav-item contribute" >
                        <div class="title" @click="goToContribute">投稿</div>
                    </li>
                    <li class="nav-item register" >
                        <div class="title">注册</div>
                    </li>
              </ul>

      </div>
  </div>
</template>

<script>
export default {
    name: 'HearderNavitation',
    methods: {
        goToContribute() {
            this.$router.push({ name: 'Account' })
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

    .register{
        margin-right: 40px;
    }

</style>
