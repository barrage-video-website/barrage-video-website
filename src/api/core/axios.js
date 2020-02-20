import axios from 'axios'
import tokenManager from './tokenManager'
import { MessageBox, Message } from 'element-ui'

// 超时时间
axios.defaults.timeout = 10000

axios.defaults.useToken = true

// 添加响应(返回)拦截器处理
export const defaultResponseInterceptor = axios.interceptors.response.use(response =>{
    const data = response.data
    if(typeof data !== 'object'){
        Message({
            message: '接口格式有误，请检查接口链接或数据结果',
            type: 'error',
            duration: 5 * 1000
        })
    }
    if(data.code === '0000'){
        return response
    }
    switch(data.code){
        // 未登录状态
        case '4001':
            tokenManager.removeToken()
            MessageBox.alert('您还未登录!请登录账号', '温馨提示', {
                showClose: false
            }).then(()=>{
                location.reload()
            })
            break
        // 其他错误
        default :
            Message({
                message: data.msg,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(data.msg))
    }
}, error =>{
    Message({
        message: '网络有波动，请刷新页面',
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default axios
