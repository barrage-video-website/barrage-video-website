<template>
  <li class="nav-item">
    <div class="background">
        <slot name="img"></slot>
    </div>
    <div class="title">
        <slot name="title"></slot>
    </div>
  </li>
</template>

<script>
export default {
    name: 'head-nav-item'
}
</script>

<style lang="less" scoped>
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
        display: inline-block;
    }
    .background{
        // background-image: url('../pictures/icons.png');
        // background-position-x: -80px;
        // background-position-y: -210px;
        display: inline-block;
        position: relative;
        // width: 100%;
        // height: 100%;
        columns: #00a1d0;
    }
    #background-ceter{
        left: -1px;
        top: 0;
        position: absolute;
        width: 41px;
        height: 36px;
        // background-image: url('../pictures/icons.png');
        // background-position-x: -80px;
        // background-position-y: -1240px;
    }
}
</style>
