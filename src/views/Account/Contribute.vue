<template>
  <div id="contribute" style="height: 100%;">
      <div class="container">
            <el-upload
            class="upload-demo upload-btn"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handlePreview"
            :auto-upload="false"
            :file-list="fileList"
            :limit="1">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">上传文件:</div>
            </el-upload>
      </div>
  </div>
</template>

<script>
import api from '@/api'
import apiPrefix from '@/api/core/apiPrefix.js'
import { Message } from 'element-ui'
export default {
    name: 'Contribute',
    data() {
        return {
            file: '',
            fileList: ''
        }
    },
    methods: {
        // 获取文件
        handlePreview(file) {
            this.file = file.raw
        },
        // 上传
        submitUpload(){
            const formData = new FormData()
            formData.append('video', this.file)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            this.$axios
                .post(apiPrefix.api + api.upload, formData, config)
                .then((response)=>{
                    Message.success('请求成功')
                    this.file = ''
                })
        }
    }
}

</script>

<style lang="less" >
    .contribute{
        width: 100%;
        height: 100%;
    }
    .container{
        margin: 40px auto;
        width: 650px;
        height: 500px;
        border: 1px dashed #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-upload{
        display: flex;
        flex-direction:column;
        .el-button{
            margin: 10px;
        }
    }
    // .upload-btn{
    //     width: 200px;
    //     height: 44px;
    //     cursor: pointer;
    //     background: #00a1d6;
    //     border-radius: 4px;
    //     transition: background-color .3s ease;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     color:#fff;
    // }
</style>
