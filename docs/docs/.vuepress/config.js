module.exports = {
  title: '起源微前端框架',
  description: '基于qiankun2.0搭建且集成完善的的微前端框架。',
  base: process.argv[2] === 'dev' ? '/' : '/microapp-cli-doc/', // 这是部署到github相关的配置
  // base: '/',
  // base: '/dist-doc2.0/',
  // base: '/ue/2019/doc/vue-standard/dist/',
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    search: true, // 是否开启搜索
    searchMaxSuggestions: 10, // 搜索最大条数
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            '/guide/',
            '/guide/quick-start'
          ]
        },
        {
          title: '进阶',
          collapsable: false,
          children: [ 
          '/guide/router',
          '/guide/mock',
          '/guide/configuration',
          '/guide/standard',
          '/guide/style']
        }
      ]
    },
    // 导航栏
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: '更新日志',
        link: '/changLog/changLog'
      },
      {
        text: 'Github',
        link: 'http://192.168.169.57:9000/scm/git/hzt-webdocs.git'
      }
    ]
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
        }
      }
    ]
  ]
}
