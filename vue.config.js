module.exports = {
    // 部署应用时的基本 URL
    publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_URL : '/',

    // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    outputDir: 'dist',

    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: '',

    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',

    // 默认在生成的静态资源文件名中包含hash以控制缓存
    // filenameHashing: true,

    // // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
    // lintOnSave: process.env.NODE_ENV !== 'production',

    // // 是否使用包含运行时编译器的 Vue 构建版本
    // runtimeCompiler: false,

    // // Babel 显式转译列表
    // transpileDependencies: [],

    // // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    // productionSourceMap: true,

    // // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
    // crossorigin: '',

    // // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
    // integrity: false,

    // // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
    // configureWebpack: {},

    // // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
    // chainWebpack: () => {

    // },

    // // css的处理
    css: {
        // 当为true时，css文件名可省略 module 默认为 false
        requireModuleExtension: true,
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
        // 默认生产环境下是 true，开发环境下是 false
        extract: false,
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
        sourceMap: false,
        //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
        loaderOptions: {
            css: {
              // 这里的选项会传递给 css-loader
            },
            // css预设器配置项
            sass: {
              // @/ 是 src/ 的别名
              // data: `@import "~@/variables.css";`  // 向所有 Sass 样式传入共享的全局变量
            },
            less: {},
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        // minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
                ]
            }
        }
    },

    // px转rem
    chainWebpack: config => {
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 75
            })
    },

    // 所有 webpack-dev-server 的选项都支持
    devServer: {
        host: '0.0.0.0', // 允许外部ip访问
        https: false, // 是否启用https
        port: 8088,
        // open: false, // 启动服务后是否自动打开浏览器，true-每次启动都会打开新的
        // hotOnly: true, // 热更新
        // 设置代理
        proxy: {
            '/': { // 本地mock服务器
                target: 'http://47.103.75.24/CRMZJZYC/',
                // secure: false,      // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                ws: false
            }
        }
    },
    // // 是否为 Babel 或 TypeScript 使用 thread-loader
    // parallel: require('os').cpus().length > 1,

    // // 向 PWA 插件传递选项
    // pwa: {},

    // // 可以用来传递任何第三方插件选项
    // pluginOptions: {}
}
