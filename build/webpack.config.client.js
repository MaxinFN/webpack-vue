const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack配置
// const cheerio = require('cheerio')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin  = require('friendly-errors-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // webpack打包文件体积和依赖关系的可视化
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'

const defaulePlugins = [
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: ${isDev ? 'dev环境' : '生产环境'}`],
    },
    clearConsole: true
  }),
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({ // 给webpack 编译时以及页面上的来判断环境
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    // title: "这是我的webpack6之vue项目",
    template: path.join(__dirname, '../index.html'),
    minify: { // 压缩HTML文件
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 删除空白符与换行符
      minifyCSS: true// 压缩内联css
    },
    filename: 'index.html'
  }),
  // new PrerenderSPAPlugin({
  //   staticDir: path.join(__dirname, '../dist'),
  //   outputDir: path.join(__dirname, '../dist/render'),
  //   routes: [ '/', '/home' ],
  //   postProcess (context) {
  //     // 获取编译后的html内容
  //     console.log('text------------', text)
  //     const html = context.html
  //     const $ = cheerio.load(html)
  //     const contentHtml = '<div class="app">' + $('.app').html() + '</div>'
  //     context.html = contentHtml.replace(/<img[^>]*>/gi, '')
  //     context.html = context.html.replace(/style="[^"]*"/g, function (matched) {
  //       // 如果符合以下布局属性，则保留，这里没考虑margin、padding等
  //       const reg = /(width|height|left|top|bottom|right):[^rem]*rem;/g
  //       const result = matched.match(reg)
  //       if (result) return 'style="' + result.join('') + '"'
  //       return ''
  //     })
  //     // 输出处理好的预渲染内容
  //     return context
  //   }
  // })
]

const devServer = {
  port: 8090,
  host: 'localhost',
  overlay: {
    errors: true // webpack配置错误显示到浏览器
  },
  // history模式防止找不到页面
  historyApiFallback: {
    index: '/index.html'
  },
  hot: true,
  open: true,   // 自动打开浏览器
  clientLogLevel: "none"
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaulePlugins.concat([
      new BundleAnalyzerPlugin({ analyzerPort: 8099 }),
      new webpack.HotModuleReplacementPlugin(), // 热更新插件
      new webpack.NoEmitOnErrorsPlugin()
    ]),
    stats: 'errors-only' // 减少控制台输出的无用信息 （只在发生错误的时候进行输出）
  })

} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/index.js'), // 业务代码
      vendor: ['vue'] // 第三方库
    },
    output: {
      filename: '[name].[chunkhash:8].js' // 生产环境要有 chunkhash:8
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: ExtractPlugin.extract({ // 将 css单独打包
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'sass-loader'
            ]
          })
        }
      ]
    },
    optimization: { // 抽离出公共代码复用
      minimize: false, // 是否开启压缩
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendor'
          }
        }
      },
      runtimeChunk: true
    },
    plugins: defaulePlugins.concat([
      new ExtractPlugin('styles.[md5:contentHash:hex:8].css'),

      // new webpack.optimize.RuntimeChunkPlugin({
      //     name: "vendor"
      // })
    ])
  })
}

module.exports = config
