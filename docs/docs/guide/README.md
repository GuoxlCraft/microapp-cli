# 介绍
`起源微前端框架`是一个基于[qiankun2.0](https://qiankun.umijs.org/zh/guide)微前端库，[vue2.7](https://github.com/vuejs/vue)、[typescript](https://www.typescriptlang.org/)、[webpack5](https://webpack.docschina.org/)、[element-ui](https://github.com/ElemeFE/element)的微前端后台集成方案。内置了动态路由，权限验证，单点登录和基础结构组件和工具类，开箱即用，可以用来作为微前端项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。

微前端作为基础架构有着很高的适应性需求，所以在设计之初就要求要兼容IE10+。目前已经实现。

::: tip 建议
`起源微前端框架`的设计和开发初心，是针对构建`基于微服务架构的大型web应用`所服务的前端架构。与当下许多主要利用微前端技术去迭代现有的老项目的目标理念是不吻合的。它依然拥有子应用逐步迭代而不影响主体使用的优势，但这个框架集成和融合了完善的页面结构、单点登录和权限管理等组件。这对老项目的改造是多余且危险的。
:::


## 微前端

随着web应用技术的发展，应用项目越来越庞大和复杂。与之而来的微服务的架构理念被更多人所接受，微前端借鉴了微服务的架构理念，将一个庞大的前端应用拆分为多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用联合为一个完整的应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活。更多微前端的介绍推荐阅读[什么是微前端](https://qiankun.umijs.org/zh/guide#%E4%BB%80%E4%B9%88%E6%98%AF%E5%BE%AE%E5%89%8D%E7%AB%AF)

现如今，主流微前端的实现库有许多，其中京东的[MicroApp](http://cangdu.org/micro-app/docs.html#/)、腾讯的[WUJIE](https://wujie-micro.github.io/doc/wujie/)、阿里的[qiankun](https://qiankun.umijs.org/zh/guide)是目前国内热度最高，生态最完善的几个微前端实现库。其中MicoApp是2020年末开源这个项目，而WUJIE更是在2022年7月才开源这个项目。二者对微前端的构建都吸取了很多qiankun的思路进行优化。也使用了诸如WebComponent和shadowDom等新的浏览器Api。但也正因为如此，使得以上两者的使用成本过高。毕竟对于大多数ToB的企业，IE是绕不开的坎。

相比于新发布的几个实现库，qiankun有着更多实现案例。已知许多大型的web项目使用了该框架。也使得我们在使用的过程有了更多底气，另外使用者更多社区也更完善。最重要的是，使用single-spa来实现微前端的qiankun能兼容IE。这也是为什么我选择qiankun。

## 前序准备

你需要在本地安装[node](https://nodejs.org/en/)和[git](https://git-scm.com/)。本项目技术栈基于[ES2015+](https://es6.ruanyifeng.com/)、[typescript4](https://www.typescriptlang.org/)、[vue2.7](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh/guide/)、[vue-router](https://router.vuejs.org/zh/)、[axios](https://github.com/axios/axios)和[element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。


## 功能

```sh
- 模拟的单点登录/退出

- 权限验证
  - 页面权限
  - 按钮权限
  - 权限配置

- 内置标签页控件

- 快捷脚本

- 可选保活
```

## 项目结构

```sh
.
├── mian # 主应用
├── npmScript # 快捷脚本配置
├── apps # 子应用目录
    ├── MicoAppOne # 范例子应用1
    └── MicoAppTwo # 范例子应用2

```

## 浏览器支持

现代浏览器和 Internet Explorer 10+。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                 | last 2 versions                                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                |
