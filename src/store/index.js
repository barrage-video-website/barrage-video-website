import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartoons: ''
    },
    mutations: {
        setCartoons(state, cartoons){
            state.cartoons = cartoons
        }
    },
    actions: {
    },
    modules: {
    }
})
