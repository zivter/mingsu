const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"":'',
     */
    publicPath: "./", // 构建好的文件输出到哪里
    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    transpileDependencies: [
        /* string or regex */
    ], // 是否为生产环境构建生成sourceMap?
    productionSourceMap: true, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
        config.resolve.alias
            .set('img', resolve('./src/assets/')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    },
    configureWebpack: () => {}, // CSS 相关选项
    pwa: {}, // configure webpack-dev-server behavior
    devServer: {
        disableHostCheck: false,
        // host: "172.22.18.56",
        port: 8089,
        proxy: {
            [process.env.VUE_APP_BASE_API + '/api']: {
                target: 'https://www.shigvg77.cn/',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            },
            [process.env.VUE_APP_BASE_API]: {
                target: 'https://www.shigvg77.cn/tow/',
                // target: 'http://47.110.245.184:8080/',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            },
            
            
        }, // string | Object
        // before: app => {}
    }, // 第三方插件配置

    pluginOptions: {
        // ...
    }
};