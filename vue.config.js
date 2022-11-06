const webpack = require('webpack');
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  devServer: {
      port: 9000,
      open: true,
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