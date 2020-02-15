<template>
  <div class="video">
    <bilil-header id="bilil-header"></bilil-header>
      <div class="video-main">
          <div class="l-con">
                <div class="video-info">
                    <div class="video-title">
                        <span class="activity">活动作品</span>
                        <span>【1080P/极致画质/FGO】绝对 臀部 战线巴比伦尼亚</span>
                    </div>
                </div>
                <div class="play-wrapp">
                    <div class="play-wrapp-top"></div>
                    <div class="play-wrapp-video">
                        <video src=""></video>
                    </div>
                </div>
          </div>
          <div class="r-con"></div>
      </div>
  </div>
</template>

<script>
import bililHeader from '@/components/header.vue'
export default {
    name: 'video',
    components: {
        bililHeader
    }
}
</script>

<style lang="less">
    #bilil-header{
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    }
    .video-main{
        margin: 0 auto;
        margin-top: 20px;
        width: 1300px;
    }
    .l-con{
        width: 964px;
    }
    .r-con{
        width: 320px;
    }
    .video-info{
        width: 100%;
        height: 81px;
        margin-bottom: 16px;
        display: flex;
        .video-title{
            margin:  0;
            font-size: 18px;
            .activity{
                color : #fff;
                background-color:#ffafc9;
                border-radius:2px;
                transition: none;
                display: inline-block;
                vertical-align: text-bottom;
                font-size: 12px;
                margin-right: 10px;
                padding: 0 5px;
                width: 58px;
                height: 22px;
            }
        }
    }
    .play-wrapp{
        width: 100%;
        height: 676px;
        background: black;
        .play-wrapp-top{
            width: 100%;
            height: 48px;
        }
    }
</style>
