<template>
    <div class="zone-list-box">
        <div class="live-card" @click="gotoVideo(cartoon.videoId)" v-for="cartoon in cartoons" :key="cartoon.videoId">
            <div class="pi">
                <img :src="`http://localhost/barrage-video-website-serve/public/image/${cartoon.coverPath}`">
            </div>
            <div class="title">{{cartoon.coverTitle}}</div>
            <div class="up">
                <div class="img"></div>
                {{cartoon.userName}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zoneListBox',
    props: {
        cartoons: Array
    },
    methods: {
        gotoVideo(videoId){
            this.$router.push({ name: 'Video', params: { videoId } })
        }
    }
}
</script>

<style lang="less" scoped>
 .zone-list-box{
    width: 100%;
    height: 404px;
    .live-card{
        cursor: pointer;
        display: inline-block;
        width: 206px;
        height: 190px;
        margin-right: 10px;
        margin-bottom: 24px;
        &:nth-child(4n){
        margin-right: 0;
        }
        &:nth-child(5,6,7,8){
        margin-bottom: 0;
        }
        .title{
            font-size: 14px;
            line-height: 20px;
            width: 100%;
            height: 40px;
        }
        .up{
            display: flex;
            color: #999;
            .img{
                width: 16px;
                height: 16px;
                background-image: url('../../pictures/icons.png');
                background-position-x: -536px;
                background-position-y: -1046px;
                margin-right: 8px;
            }
        }
        }
    }
</style>
