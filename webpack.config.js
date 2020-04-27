const path = require('path');
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({// 给webpack 编译时以及页面上的来判断环境
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin({
            title: "这是我的webpack之vue项目",
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            filename: 'index.html',

        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
}

if (isDev) {
    config.module.rules.push(
        {
            test: /\.s[ac]ss$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                },
                "sass-loader"
            ]
        },
    )
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8090,
        host: '0.0.0.0',
        overlay: {
            errors: true,   // webpack配置错误显示到浏览器
        },
        hot: true
        // open: true   // 自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),   // 热更新插件
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'), // 业务代码
        vendor: ['vue']   // 第三方库
    }
    config.output.filename = "[name].[chunkhash:8].js"   // 生产环境要有 chunkhash:8
    config.module.rules.push(
        {
            test: /\.s[ac]ss$/,
            use: ExtractPlugin.extract({         // 将 css单独打包
                fallback: 'style-loader',
                use: [
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    "sass-loader"
                ]
            })
        },
    )
    config.optimization = {
        minimize: false,   // 是否开启压缩
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                },
            },
        },
        runtimeChunk: true
    }
    config.plugins.push(
        new ExtractPlugin('styles.[md5:contentHash:hex:8].css'),

        // new webpack.optimize.RuntimeChunkPlugin({
        //     name: "vendor"
        // })
    )

}

module.exports = config 