<template>
  <div class="header">
      <div class="nav-wrapper-left">
          <ul class="nav-con-ul">
              <li class="nav-item">
                  <div class="title">主页</div>
                    <div class="background"></div>
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
          <div class="nav-con">
              <ul class="nav-con-ul">
                    <li class="nav-item">
                        <div class="title">动态</div>
                    </li>
                    <li class="nav-item">
                        <div class="title">历史</div>
                     </li>
                    <li class="nav-item">
                        <div class="title">创作中心</div>
                     </li>
              </ul>

          </div>

      </div>
      <div></div>
  </div>
</template>

<script>
export default {
    name: 'HearderNavitation'
}
</script>

<style lang="less" scoped>
    .header{
        display: flex;
        width: 980px;
        margin: 0 auto;
    }
    .nav-con-ul{
        display: flex;
        list-style: none;
        .nav-item{
            margin-left: 12px; 
            padding-left: 12px; 
            float: left;
            text-align: center;
            line-height: 42px;
            height: 42px;
            position: relative;
            white-space: nowrap;
            .title{
                color:#222;
                height: 100%;
                padding: 0 7px;
                padding-left: 20px;
            }
            .background{
                position: absolute;
                left: 9px;
                top: -1px;
                columns: #00a1d0;
                font-size: 20px;
            }
        }
    }
    .nav-wrapper-right{
        display: flex;
    }

</style>