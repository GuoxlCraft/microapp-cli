/**
 * 打包时候的入口文件
 */

'use strict'

// 检查NodeJS和npm的版本,加（）代表直接调用该函数，首先检查node和npm的版本
require('./check-versions')()

process.env.NODE_ENV = (process.argv[2] !== 'base') ? 'production' : 'development'

// process.env.NODE_ENV = 'production'

// 一个可以在终端显示spinner的插件
const ora = require('ora')

// 用于删除文件或文件夹的插件
const rm = require('rimraf')

// webpack 自带模块
const path = require('path')

// 用于在控制台输出带颜色字体的插件
const chalk = require('chalk')

// 引入webpack
const webpack = require('webpack')

// 导入配置文件
const config = require('../config')

// 导入生产环境的配置文件
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora(`${process.argv[2]}环境正在打包中...`)

// 开启loading动画
spinner.start()

// 首先将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件
// 删除完成后才开始webpack构建打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
  if (err) throw err
  // 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    )
  })
})
