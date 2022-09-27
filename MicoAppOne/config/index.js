'use strict'
const path = require('path')
const distName = process.argv[2]

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        // target: 'http://192.168.169.206:22010/',
        target: 'http://192.168.171.53:22010/',
        // target: 'http://192.168.169.120:22010/',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: '0.0.0.0',
    port: 7001,
    autoOpenBrowser: false,
    poll: false,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, `../dist-${distName}/index.html`),

    // Paths
    assetsRoot: path.resolve(__dirname, `../dist-${distName}`),
    assetsSubDirectory: '',
    assetsPublicPath: `http://192.168.171.53:8088/App-MicoAppOne/`,
    productionGzipExtensions: ['js', 'css']
  }
}
