/**
 * 工具类函数文件
 * 1. 计算资源文件存放路径
 * 2. 生成cssLoaders用于加载.vue文件中的样式
 * 3. 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件
 */

'use strict'

// webpack 自带模块
const path = require('path')

// 引入配置文件
const config = require('../config')

// 来提取css样式
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 引入package文件
const packageConfig = require('../package.json')

// 资源文件的存放路径
// 导出文件的位置，根据环境判断开发环境和生产环境，为config文件中index.js文件中定义的build.assetsSubDirectory或dev.assetsSubDirectory
exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.argv[2] !== 'base' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

  // Node.js path 模块提供了一些用于处理文件路径的小工具
  return path.posix.join(assetsSubDirectory, _path)
}

// 生成css、sass、scss等各种用来编写样式的语言所对应的loader配置
exports.cssLoaders = function (options) {
  options = options || {}

  // 使用了css-loader和postcssLoader，通过options.usePostCSS属性来判断是否使用postcssLoader中压缩等方法
  // css-loader配置
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否使用source-map
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      // 是否使用source-map
      sourceMap: options.sourceMap
    }
  }

  // 生成各种loader配置
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../' // 这个是关键，为了能让html和css中的图片能同时显示出来
          }
        }
      ].concat(loaders)
    } else {
      return [
        {
          loader: 'vue-style-loader'
        }
      ].concat(loaders)
    }
  }

  // 得到各种不同处理样式的语言所对应的loader
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less').concat({
      loader: 'style-resources-loader',
      options: {
        patterns: path.resolve(__dirname, '../src/styles/variables.less')
      }
    })
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 生成处理单独的.css、.sass、.scss等样式文件的规则
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    // 将各种css,less,sass等综合在一起得出结果输出output
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, '../public/logo.png')
    })
  }
}
