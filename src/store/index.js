import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
    state: {
        token: '',
        refreshToken: '',
        clientIpAddress: null, // 客户端IP存储
    },
    getters: {
        getToken(state) {
            return state.token || localStorage.getItem("token");
        },
        getRefreshToken(state) {
            return state.refreshToken || localStorage.getItem("refresh_token");
        }
    },
    mutations: {
        SET_TOKEN: (state,token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_REFRESH_TOKEN: (state,token) => {
            state.refreshToken = token
            localStorage.setItem("refresh_token", token)
        },
        CLEAR_TOKEN: (state) => {
            state.token = ''
            state.refreshToken = ''
            localStorage.clear("token")
            localStorage.clear("refresh_token")
        },
        init(state){
            state.list=[]
        },
        setIpAddress(state, ipAddress) {
            state.clientIpAddress = ipAddress;
        },
    },
    actions: {
        getTokenFromStorage({ commit, state }) {
            commit('SET_TOKEN', state.token || localStorage.getItem("token"));
        },
        storeIpAddress({ commit }, ipAddress) {
            commit('setIpAddress', ipAddress);
        },
    },
    modules: {}
})

export default store