const webpack = require('webpack');
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  devServer: {
      port: 9000,
      open: true,
      // 解决 invalid host header
      allowedHosts: [
          'yf.com', // 允许访问的域名地址，即花生壳内网穿透的地址
          '.yf.com'   // .是二级域名的通配符
      ],
      proxy: {
          "/api": {
              //请求源地址
              target: 'http://localhost:1314',
              //是否跨域
              changeOrigin: true,  
              ws: true,
              // pathRewrite: {
              //     '^/api': ''
              // }
          }
      }
  },
  chainWebpack: config => {
      config.plugin('provide').use(webpack.ProvidePlugin, [{
          // other modules
          introJs: ['intro.js'],
      }])
  }
}