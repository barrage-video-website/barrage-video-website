<template>
    <div class="wrapper">
        <div class="bili-wrapper">
            <div class="primary-menu-left">
                <ul class="con">
                    <li>
                        <div class="img" style="background: #ff5c7c;">
                            <div class="picture1"></div>
                        </div>
                        <div class="title">首页</div>
                    </li>
                    <li>
                        <div class="img" style="background: #fcba2a">
                            <div class="picture1"></div>
                        </div>
                        <div class="title">动态</div>
                    </li>
                    <li>
                        <div class="img" style="background: #00a1d6;">
                            <div class="picture3"></div>
                        </div>
                        <div class="title">排名表</div>
                    </li>
                </ul>
            </div>
            <div class="tab-line-itnl"></div>
            <div class="primary-menu-center">
                <div class="center-contaniner">
                    <div class="title">动画</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">音乐</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">舞蹈</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">歌曲</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">科技</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">生活</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">时尚</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">娱乐</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">放映</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">番剧</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">国创</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">游戏</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">数码</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">鬼畜</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">广告</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">影视</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">影视</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">影视</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">影视</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">影视</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">影视</div>
                    <em>999+</em>
                </div>
                <div class="center-contaniner">
                    <div class="title">影视</div>
                    <em>999+</em>
                </div>
            </div>
            <div class="tab-line-itnl"></div>
            <div class="primary-menu-right">
                <div class="right-container">
                    <div class="img"></div>
                    <div class="title">专栏</div>
                </div>
                <div class="right-container">
                    <div class="img"></div>
                    <div class="title">赛事</div>
                </div>
                <div class="right-container">
                    <div class="img"></div>
                    <div class="title">广播</div>
                </div>
                <div class="right-container">
                    <div class="img"></div>
                    <div class="title">直播</div>
                </div>
                <div class="right-container">
                    <div class="img"></div>
                    <div class="title">活动</div>
                </div>
                <div class="right-container">
                    <div class="img"></div>
                    <div class="title">专题</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HearderNavitation'
}
</script>

<style lang="less" scoped>
*{
    box-sizing: border-box;
}
ul{
    list-style-type : none;
}
    .bili-wrapper{
        margin: 0 auto;
        position: relative;
        height: 108px;
        width: 1200px;
        margin-top: 10px;
        align-items: center;
        padding: 20px 0;
        box-sizing: border-box;
        display: flex;
        .primary-menu-left{
            width: 150px;
            height: 68px;
            .con{
                margin:  0;
                padding: 0;
                display: flex;
                height: 68px;
                li{
                    width: 50px;
                    display: flex;
                    flex-direction:column;
                    justify-content: center;
                    align-items: center;
                    .title{
                        box-sizing: border-box;
                    }
                    .img{
                        width: 36px;
                        height: 36px;
                        border-radius: 36px;
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .picture1{
                            width: 100%;
                            height: 100%;
                            background-image: url('../pictures/icons.png');
                            background-position-x: -654px;
                            background-position-y: -1165px;
                        }
                    }
                }
            }
        }
        .tab-line-itnl{
            margin: 0 15px;
            display: inline-block;
            height: 46px;
            border-left: 1px solid #e7e7e7;
        }
        .primary-menu-center{
            display: flex;
            width: 831px;
            height: 100%;
            flex-wrap: wrap;
            .center-contaniner{
                height: 34px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 71px;
                em{
                    height: 15px;
                    font-style: normal;
                    font-size: 12px;
                    display: inline-block;
                    background: #73c9e5;
                    border-radius: 2px;
                    color: #fff;
                }
            }
        }
        .primary-menu-right{
            width: 220px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            .right-container{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 34px;
                width: 68px;
                .img{
                    width: 25px;
                    height: 25px;
                    background-image: url('../pictures/icons.png');
                    background-position-x: -658px;
                    background-position-y: -1109px;
                }
            }
        }
    }
</style>
