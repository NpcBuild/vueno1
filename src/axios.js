import axios from "axios";
import router from "@/router";
import Element from "element-ui"
// import store from "@/store";

axios.defaults.baseURL = "http://localhost:1314"

//前后置拦截

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

//请求结果拦截
request.interceptors.response.use(response => {
    let res = response.data
    debugger
    if (res.code === 200) {
        return response
    } else {
        Element.Message.error(res.msg?res.msg:'系统异常')
        return Promise.reject(response.data.msg)
    }
}, error => {
        if (error.response.data) {
            error.massage = error.response.data.msg
        }
        if (error.response.status === 401) {
            router.push("/Login")
        }

        Element.Message.error(error.message,{duration:3000})
        return Promise.reject(error)
    }
)
export default request