import axios from "axios";
import router from "@/router";
// import Element from "element-ui"
import db from "@/store/sessionStorage";
// import store from "@/store";

axios.defaults.baseURL = "http://localhost:1314" //配置请求的根路径

const request = axios.create({
    timeout: 5000,
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
        'X-Powered-By':' 3.2.1',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token1")
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
    if (success.status && success.status == 200 && success.data.status == 500) {
        alert(success.data.msg);
        return;
    }
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        alert('服务器迷路了( ╯□╰ )，再试一次吧。');
    } else if (error.response.status == 403) {
        alert('权限不足，请联系管理员');
    } else if (error.response.status == 401) {
        // 防止重复弹出消息
        if(db.get("LOGINFLAG") == "0"){
            alert('尚未登录或登录状态已过期，请登录')
            db.remove("LOGINFLAG")
            db.save("LOGINFLAG","1")
        }
        router.replace('/');
    } else if (error.response.status == 429) {
        alert('骚年，你的手速有点快哦！(￣.￣)...')
    } else {
        alert('未知错误!')
    }
    return;
})

export default request