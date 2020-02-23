import tokenManager from '@/api/core/tokenManager'
// import apiPrefix from '@/api/core/apiPrefix'
import base64url from 'base64url'
export default {

    getUserId(){
        const token = tokenManager.getToken()
        return computePayload(token).userId
    },

    getNickname(){
        const token = tokenManager.getToken()
        return computePayload(token).nickname
    },

    logout(){
        tokenManager.removeToken()
    },

    getHeadPhoto(){
        const token = tokenManager.getToken()
        return computePayload(token).headPhoto
    }
    
}

function computePayload(token){
    const payload = token.split('.')[1]
    return JSON.parse(base64url.decode(payload))
}
