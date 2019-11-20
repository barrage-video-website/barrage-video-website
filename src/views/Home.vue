<template>
    <div class="home">
        <header id="header">
            <bilil-header id="bilil-header"></bilil-header>
            <div class="head-banner">
                <img  src="../pictures/1ee3febf53becf8ca9e84387c4578f1b41c354be.png" alt="" style="width:100%">
            </div>
            
        </header>
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
    .homg{
        height: 100%;
    }
    #header{
        width: 100%;
        height: 190px;
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
        background: hsla(0,0%,100%,.4);
    }
    .head-banner{
        z-index: 1;
        float: left;
    }
</style>