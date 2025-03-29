import axios from "axios";
import router from "@/router";
// import Element from "element-ui"
import db from "@/store/sessionStorage";
import store from "@/store";
import { Message } from 'element-ui';
import {postRequest} from "./utils/request"

axios.defaults.baseURL = getBackendURL() // 配置请求的根路径
axios.defaults.withCredentials = true // 支持跨域访问
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 为post请求设置请求头

function getBackendURL() {
    return process.env.VUE_APP_API_BASE_URL
    // 在这里编写获取后端地址的逻辑
    // return 'http://192.168.1.5:1314'; // 这可以是从API请求或其他途径获取的值
}

const request = axios.create({
    timeout: 60000, // 超时时间
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
        'X-Powered-By':' 3.2.1',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})

// // 请求结果拦截
// request.interceptors.response.use(response => {
//     let res = response.data
//     if (res.code === 200) {
//         return response
//     } else {
//         Element.Message.error(res.msg?res.msg:'系统异常')
//         return Promise.reject(response.data.msg)
//     }
// }, error => {
//         if (error.response.data) {
//             error.massage = error.response.data.msg
//         }
//         if (error.response.status === 401) {
//             router.push("/Login")
//         }
//
//         Element.Message.error(error.message,{duration:3000})
//         return Promise.reject(error)
//     }
// )
// 请求结果拦截
request.interceptors.response.use(success => {
    let res = handleError(success)
    if (res === "none") {
        return success.data;
    }
    return res;
}, error => {
    console.log('error', error)
    if (!error.status) {
        if (error.message.includes("Network Error")) {
            Message.error ("服务器失效")
            return toLogin()
        } else if (error.message.includes("401")) {
            error.response.data.code = "401"
            // return toLogin()
        } else if (error.message.includes("404")) {
            error.response.data.code = "404"
        } else {
            Message.error ("请求错误，" + error)
        }
    }
    let res = handleError(error.response)
    if (res === "none") {
        return error.response;
    }
    return res;
})

function handleError(response) {
    if (response.status === 404) {
        // 对于 404 错误，可以进行特殊处理，比如重定向到一个 404 页面或者显示一个特定的错误消息
        return Message.error ('404 错误：资源未找到')
    }

    let { data,config } = response
    if (data.code == 504 || data.code == 404) {
        Message.error ('服务器迷路了( ╯□╰ )，再试一次吧。');
    } else if (data.code == 500) {
        Message.error ('服务器内部错误，' + data.message);
    } else if (data.code == 403) {
        Message.error ('权限不足，请联系管理员');
    } else if (data.code == 429) {
        // Message.error ('骚年，你的手速有点快哦！(￣.￣)...')
        globalMessage(429, '骚年，你的手速有点快哦！(￣.￣)...')
    } else if (data.code == 401) {
        let routePath = router.app._route.path;
        if (!config.url.includes('/refreshToken')) {
            // 刷新token重新登录
            return refreshToken()
                .then(res => {
                    if (res.code === 200) {
                        return setToken(res).then(result => {
                            config.headers['Authorization'] = result.data.accessToken
                            return axios.request(config).then(response => response.data); // 提取响应体数据
                        })
                    } else {
                        return toLogin(routePath)
                    }
                })
        } else {
            // 防止重复弹出消息
            if(db.get("LOGINFLAG") == "0"){
                Message.error ('尚未登录或登录状态已过期，请登录')
                db.remove("LOGINFLAG")
                db.save("LOGINFLAG","1")
            }
            toLogin(routePath)
        }
    }
    // else {
    //     console.log(data)
    //     Message.error ('未知错误!')
    // }
    return "none";
}

let promise;
function refreshToken() {
    if (promise) {
        return promise
    }
    promise = new Promise((resolve) => {
        resolve(postRequest('/refreshToken/' + store.getters.getRefreshToken))
    })
    promise.finally(() => {
        promise = null
    })
    return promise
}
function setToken(res) {
    return new Promise(resolve => {
        store.commit('SET_TOKEN', res.data.accessToken)
        store.commit('SET_REFRESH_TOKEN', res.data.refreshToken)
        resolve(res)
    })
}

// 相同消息每次（相邻只算一次）只提醒一次
// var map = {429: '骚年，你的手速有点快哦！(￣.￣)...'}
function globalMessage(status, msg) {
    Message.error(msg)
}

function toLogin(routePath) {
    if (routePath && routePath !== '/logins') {
        router.replace('/logins?redirect=' + routePath)
    } else {
        router.replace('/logins')
    }
}
export default request