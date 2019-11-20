<template>
    <div class="home">
        <header id="header">
            <bilil-header id="bilil-header"></bilil-header>
            <div class="head-banner">
                <img  src="../pictures/1ee3febf53becf8ca9e84387c4578f1b41c354be.png">
            </div>

        </header>
        <div class="bili-wrapper">
            <div class="primary_menu">
                <ul class="nav-menu">
                    <li class="nav-item-header">
                        <div id="nav-pictures"></div>
                        <div class="nav-name">首页</div>
                    </li>
                    <li class="nav-item-header">
                        <div class="number-click">
                            <div class="number-click-color"></div>
                        </div>
                        <div class="nav-name">首页</div>
                    </li>
                    <li class="nav-item-header">
                        <div class="number-click">
                            <div class="number-click-color"></div>
                        </div>
                        <div class="nav-name">首页</div>
                    </li>
                </ul>
            </div>
        </div>
        <main>

        </main>
    </div>
</template>

<script>
import bililHeader from '@/components/header.vue'
export default {
    name: 'Home',
    components: {
        bililHeader
    }
}
</script>

<style lang="less" scoped>
*{
    font-size: 12px;
}
    .homg{
        height: 100%;
    }
    #header{
        width: 100%;
        height: 170px;
        position: relative;
        display: flex;
    }
    #bilil-header{
        justify-content: center;
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        z-index: 100;
        background: hsla(0,0%,100%,.6);
    }
    .head-banner{
        z-index: 1;
        float: left;
    }
    .bili-wrapper{
        width: 980px !important;
        margin: 0 auto;
        position: relative;
        // background: red;
        height: 50px;
        .primary_menu{
            width: 100%;
            padding: 8px 0 0;
            margin: 0 auto 4px;
            border-bottom:1pox solid #fff;
            .nav-menu{
                position: relative;
                height: 42px;
                color: #222;
                list-style: none;
                display: flex;
               .nav-item-header{
                   margin-right: 15px;
                   width: 24px; 
                   text-align: center;
                   position: relative;
                //    .nav-name{
                //        position: relative;
                //        top: 15px;
                //    }
                   #nav-pictures{
                       background: url('../pictures/icons.png') -660px -1170px no-repeat;
                       width: 30px;
                       height: 30px;
                   }
                   .number-click{
                       .number-click-color{
                           border-radius: 3px;
                           position: absolute;
                           top: 10px;
                           height: 12px;
                           width: 100%;
                            background-color: #ffafc9;
                       }
                       width: 30px;
                       height: 30px;
                    //    padding: 1px 3px;
                   }
                }
            }
        }
    }
</style>