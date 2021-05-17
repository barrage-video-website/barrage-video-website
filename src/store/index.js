import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // cartoons: '',
        serverIp: 'zxczxczxczx'
    },
    mutations: {
        // setCartoons(state, cartoons){
        //     state.cartoons = cartoons
        // },
        setServerIp(state, serverIp){
            state.serverIp = serverIp
        }
    },
    actions: {
        setIp({ commit, state }, serverIp){
            // 跟后台打交道
            // 调用mutaions里面的方法
            commit('setServerIp', serverIp)
        }
    },
    modules: {
    }
})
