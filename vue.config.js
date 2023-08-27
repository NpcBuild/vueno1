const webpack = require('webpack');
const path = require('path');
module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    // assetsDir: 'static',
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
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            // other modules
            introJs: ['intro.js'],
        }])

        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        const svgRule = config.module.rule('svg')  // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader，不这样做会添加到此loader之后，svg-sprite-loader不会生效
        svgRule.exclude.add(/node_modules/)   // 正则匹配排除node_modules目录
        svgRule
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.resolve('src/assets/static/img'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end()

        config.module.rule('images')
            .use('url-loader')
            .tap(
                // eslint-disable-next-line no-unused-vars
                options => ({
                    name: './assets/images/[name].[ext]',
                    quality: 85,
                    limit: 0,
                    esModule: false,
                }))
        // 添加GLTF loader的配置
        config.module
            .rule('gltf')
            .test(/\.gltf$/)
            .use('gltf-webpack-loader')
            .loader('gltf-webpack-loader')
            .end();
        config.module
            .rule('bin')
            .test(/\.bin$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: '[name].[ext]'
            })
            .end();
        // // 添加处理纹理图片文件的loader配置 （影响其他图片显示）
        // config.module
        //     .rule('textures')
        //     .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        //     .use('file-loader')
        //     .loader('file-loader')
        //     .options({
        //         name: 'textures/[name].[ext]',
        //     });
    },
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@': path.resolve(__dirname, 'src')
    //         }
    //     }
    // }
}