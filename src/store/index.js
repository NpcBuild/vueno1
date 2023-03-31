import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
    state: {
        token: ''
    },
    mutations: {
        SET_TOKEN: (state,token) => {
            // eslint-disable-next-line no-debugger
            debugger
            state.token = token
            localStorage.setItem("token1", token)
        },
        CLEAR_TOKEN: (state) => {
            state.token = ''
            localStorage.clear("token1")
        },
        GET_TOKEN: (state) => {
            state.token = state.token || localStorage.getItem("token1")
        },
        init(state){
            state.list=[]
        }
    },
    action: {},
    modules: {}
})

export default store