<template>
    <header class="strong-title">
        <div class="l-con">
            <div class="img">
                <slot name="head-img"></slot>
            </div>
            <div class="title" >
                <slot name="head-title"></slot>
            </div>
            <div class="text-info"></div>
        </div>
        <div class="exchange-btn"></div>
    </header>
</template>

<script>
export default {
    name: 'cartoonHead'
}
</script>

<style lang="less" scoped>
 .strong-title{
        width: 100%;
        height: 36px;
        margin-bottom: 16px;
        .l-con{
            float: left;
            display: flex;
            .img{
                width: 36px;
                height: 36px;
            }
            .title{
                font-size: 20px;
                line-height:36px;
            }
        }
        .exchange-btn{
            float: right;
        }
    }
</style>
