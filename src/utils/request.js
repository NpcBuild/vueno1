// import qs from "querystring";
// import {compile} from "vue-template-compiler";
import  axios from '../axios';
import store from '../store/index';
// import * as common from './common'
// import db from "@/store/sessionStorage";
// import router from "@/router";

let header = {
    'content-type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
    'X-Powered-By':' 3.2.1',
    'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
    'X-Client-Ip': '',
}

// 调用获取IP地址函数，传入一个回调函数来处理获取到的IP地址
getIpAddress(ipAddress => {
    header['X-Client-Ip'] = ipAddress;
});
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

// 获取IP地址，回调处理获取到的IP地址
function getIpAddress(callback) {
    const storedIpAddress = store.state.clientIpAddress;
    if (storedIpAddress) {
        console.log('Stored IP address:', storedIpAddress);
        callback(storedIpAddress); // 使用回调传递IP地址
    } else {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const clientIpAddress = data.ip;
                console.log('Fetched IP address:', clientIpAddress);
                // fetch(process.env.VUE_APP_API_BASE_URL + '/vid?i=' + clientIpAddress).catch(error => {error})

                // 将IP地址存储在 Vuex 中
                store.dispatch('storeIpAddress', clientIpAddress);
                callback(clientIpAddress); // 使用回调传递IP地址
            })
            .catch(error => {
                console.error('Error:', error);
                callback(''); // 使用回调传递空IP地址或其他默认值
            });
    }
}