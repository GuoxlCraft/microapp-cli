/**
 * 该文件是开发和生产共同使用提出来的基础配置文件，主要实现配制入口，配置输出环境，配置模块resolve和插件等
 */

'use strict'
// webpack自带模块
const path = require('path')
const { name } = require('../package')
const webpack = require('webpack')

// 导入工具函数
const utils = require('./utils')

// 导入配置文件
const config = require('../config')

// 导入vue-loader配置
const vueLoaderConfig = require('./vue-loader.conf')

// 引入vue-loader插件
const { VueLoaderPlugin } = require('vue-loader')

const vueComponentsWebpackPlugin = require('unplugin-vue-components/webpack')

const ElementUiResolver = require('unplugin-vue-components/resolvers').ElementUiResolver

// 获取绝对路径
function resolve(dir) {
  // 拼接出绝对路径
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  target: ['web', 'es5'],

  // webpack入口文件
  entry: {
    app: './src/main.ts'
  },

  // webpack输出路径和命名规则
  output: {
    library: `${name}-[name]`,
    libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    publicPath:
      process.argv[2] === 'serve' ? config.dev.assetsPublicPath : config.build.assetsPublicPath,

    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: false,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false
    }
  },

  // 模块resolve的规则
  resolve: {
    // 针对 NPM 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    // mainFields: ['jsnext:main', 'browser', 'main'],
    fallback: {
      process: 'process/browser',
      // zlib: false,
      // os: false,
      // fs: false,
      // os: false,
      // stream: false,
      path: require.resolve('path-browserify')
    },
    // 自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.css', '.less'],
    // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      _c: resolve('src/components'),
      _v: resolve('src/views'),
      _u: resolve('src/utils'),
      _h: resolve('src/hooks')
    }
  },

  // 不同类型模块的处理规则
  module: {
    rules: [
      // 对所有.vue文件使用vue-loader进行编译
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        include: [resolve('src'), resolve('test')]
      },

      // 处理svg文件
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },

      // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
      {
        test: /\.(t|j)s$/,
        // loader: 'happypack/loader?id=babel',
        use: ['babel-loader?cacheDirectory'],
        include: [resolve('src'), resolve('test')],
        exclude: resolve('node_modules')
      },

      {
        test: /\.tsx?$/,
        // loader: 'happypack/loader?id=babel',
        use: ['babel-loader?cacheDirectory'],
        include: [resolve('src'), resolve('test')],
        exclude: resolve('node_modules')
      },

      // 对图片资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        exclude: [resolve('src/assets/icons')],
        generator: {
          filename: utils.assetsPath('img/[name].[contenthash:7].[ext]')
        }
      },

      // 对音频资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: utils.assetsPath('media/[name].[contenthash:7].[ext]')
        }
      },

      // 对字体资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: utils.assetsPath('fonts/[name].[contenthash:7].[ext]')
        }
      }
    ]
  },

  node: {
    global: false
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new VueLoaderPlugin(),
    vueComponentsWebpackPlugin({
      dts: true,
      deep: true,
      dirs: ['src/components', 'src/layout'],
      resolvers: [ElementUiResolver()]
    })
  ]
}
