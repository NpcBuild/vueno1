// import qs from "querystring";
// import {compile} from "vue-template-compiler";
import  axios from '../axios';
// import * as common from './common'
// import db from "@/store/sessionStorage";
// import router from "@/router";

let header = {
    'content-type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
    'X-Powered-By':' 3.2.1',
    'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
}

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params, headers) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        headers: headers?headers:header
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${url}`,
        data: params
    })
}
export const getRequest = (url, params, headers) => {
    let apiUrl = `${url}`;
    apiUrl = getApiUrl(apiUrl,params);
    // 请求
    return axios({
        method: 'get',
        url: apiUrl,
        data: params,
        headers: headers?headers:header
    })
}
export const deleteRequest = (url, params) => {
    let apiUrl = `${url}`;
    apiUrl = getApiUrl(apiUrl,params);
    return axios({
        method: 'delete',
        url: apiUrl,
        data: params
    })
}


// 处理参数转换
function getApiUrl(url,params){
    let apiUrl = url;
    let i = 0;
    for (const key in params) {
        const value = params[key];
        const param = key+"="+value;
        let s = '?';
        if ( i > 0 ){
            s = '&';
        }
        apiUrl = apiUrl+s+param;
        i++;
    }
    return apiUrl;
}