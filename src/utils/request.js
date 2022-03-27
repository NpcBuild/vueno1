import axios from "axios";
// import qs from "querystring";
// import {compile} from "vue-template-compiler";

/*
处理失败的方法
status:状态码
info:信息
 */
const errorHandle = (status,info) =>{
    switch (status){
        case 400:
            console.log("语义有误，当前请求无法被服务器理解。")
            break;
        case 401:
            //token令牌
            console.log("服务器认证失败")
            break;
        case 403:
            console.log("服务器已经理解请求，但是拒绝执行它")
            break;
        case 404:
            console.log("请检查网络请求地址")
            break;
        case 500:
            console.log("服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。")
            break;
        case 502:
            console.log("作为网关或者代理工作的服务器尝试执行请求时，从上游服务器······")
            break;
        default:
            console.log(info)
            break;
    }
}

// const axios = new axios();
export default errorHandle()