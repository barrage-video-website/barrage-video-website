<template>
  <div class="live-tabs">
          <header class="rank-header">
              <span>排行榜</span>
          </header>
          <div class="rank-wrap wrap">
              <span class="number sp-number">1</span>
                <div class="preiviews">
                    <img class="pic" src="@/pictures/3458dbc1e7aebf7a683598d6862f3cef645aa3c7.jpg@112w_63h_1c_100q.webp">
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
</template>

<script>
export default {
    name: 'rankList'
}
</script>

<style lang="less" scoped>
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
</style>
