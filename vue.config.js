/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const {
    DefinePlugin,
    BannerPlugin
} = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const _ = require('lodash')
const proxyTable = require('./src/setupProxy')

function getClientEnvironment () {
    return {
        'process.env': Object.keys(process.env).reduce((env, key) => {
            env[key] = JSON.stringify(process.env[key])
            return env
        }, {})
    }
}

// 审查webpack配置: vue inspect > xxx.js
module.exports = {
    configureWebpack: {
        devServer: {
            port: 3000,
            proxy: proxyTable || {},
            open: true
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@view': path.resolve(__dirname, './src/views'),
                '@router': path.resolve(__dirname, './src/router'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@component': path.resolve(__dirname, './src/components'),
                '@service': path.resolve(__dirname, './src/service')
            }
        },
        plugins: [
            // 注入全局常量
            new DefinePlugin(getClientEnvironment()),
            // 生成build分析报告
            new BundleAnalyzerPlugin(
                {
                    analyzerMode: 'static',
                    reportFilename: 'report.html',
                    openAnalyzer: false
                }
            )
        ]
    },
    chainWebpack: config => {
        // 对打包好的js文件开头添加注释
        config
            .plugin('banner')
            .use(BannerPlugin, [{
                banner: `BUILD METADATA\n${JSON.stringify({
                    tag: process.env.CI_COMMIT_TAG || 'unknown',
                    'ref-name': process.env.CI_COMMIT_REF_NAME || 'unknown',
                    commit: process.env.CI_COMMIT_SHORT_SHA || 'unknown'
                })}`,
                entryOnly: false
            }])
            .before('terser') // 指定当前插件在xx之前调用

        // svg rule loader
        config.module
            .rule('svg')
            .exclude
            .add(
                path.resolve(__dirname, './src/assets/icons')
            )
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include
            .add(
                path.resolve(__dirname, './src/assets/icons')
            )
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

        // build选项
        config.optimization
            .minimizer('terser')
            .tap(args => {
                args[0] = _.defaultsDeep({
                    terserOptions: {
                        // 解析选项
                        parse: {
                            ecma: 8 // 指定EcmaScript标准版本
                        },
                        // 压缩选项
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false, // 是否对一些短句进行优化。!(a <= b) → a > b
                            inline: 2,
                            drop_console: true,
                            drop_debugger: true
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            ecma: 5,
                            comments: /BUILD METADATA/i,
                            ascii_only: true
                        }
                    },
                    extractComments: /LICENSE/i
                }, args[0])
                return args
            })
    }
}
