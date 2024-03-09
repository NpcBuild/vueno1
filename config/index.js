'use strict'  // 严格模式
module.exports = {
    dev: {
        proxyTable: {
            '/api': {
                target: process.env.VUE_APP_API_BASE_URL, // 后台服务器
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置 改变源地址
            },
        }
    }
}