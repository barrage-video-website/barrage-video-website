<template>
    <div class="home">
        <header id="header">
            <bilil-header id="bilil-header"></bilil-header>
            <div class="head-banner">
                <img  src="../pictures/7197cae46569a49abd98e0c51348068831be6a85.png">
            </div>
        </header>

        <main>
            <bilil-wrapper></bilil-wrapper>
            <img class="guanggao" src="../pictures/60b856e5b5fcbaa16ee8fd1fe54b8670.jpg">
            <bilil-cartoon></bilil-cartoon>
        </main>
    </div>
</template>

<script>
import bililHeader from '@/components/header.vue'
import bililWrapper from '@/components/wrapper.vue'
import bililCartoon from '@/components/cartoon.vue'
export default {
    name: 'Home',
    components: {
        bililHeader,
        bililWrapper,
        bililCartoon
    }
}
</script>

<style lang="less" scoped>
*{
    font-size: 14px;
    box-sizing: border-box;
}
ul{
    list-style-type : none;
}
    .homg{
        height: 100%;
    }
    main{
        width: 1200px;
        margin: 0 auto;
    }
    #header{
        width: 100%;
        height: 170px;
        position: relative;
        display: flex;
    }
    #bilil-header{
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        z-index: 100;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
    }
    .head-banner{
        z-index: 1;
        float: left;
    }
    .guanggao{
        width: 1200px;
        height: 100px;
    }
</style>
