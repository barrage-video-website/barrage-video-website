// localStorage键名
const tokenKey = 'xhwzyn'
export default {
    // 设置token
    setToken(token){
        localStorage.setItem(tokenKey, token)
    },
    // 移除token
    removeToken(){
        localStorage.removeItem(tokenKey)
    },
    // token是否存在
    hasToken(){
        return localStorage.getItem(tokenKey) !== null
    },
    // 获取token
    getToken(){
        if(!this.hasToken()){
            throw new Error('当前还未登录')
        }
        return localStorage.getItem(tokenKey)
    }
}
