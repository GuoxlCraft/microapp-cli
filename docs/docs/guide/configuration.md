# 项目配置

## 环境变量配置

在项目中，难免会碰到需要在不同环境下做不同的事，这时候，就需要自己去配置环境变量。目前`vue-element-admin`提供了四种环境变量。除了`base.env`是针对开发的时候，其他三种环境变量是针对打包的时候去构建不同环境的。目前主要的一个区别就是为了区分出接口前缀。

开发人员可以根据实际项目情况去进行扩展改造。

环境变量文件都存放在`config`文件夹中。

::: tip 提示
获取全局环境变量：process.env.xxx
:::

### base.env

当运行`npm run serve`的时候，默认取的是`base.env`中的环境变量以及参数。

```javascript
'use strict'
module.exports = {
  // 默认为 development 环境
  NODE_ENV: '"development"',
  // api接口前缀需要使用哪个环境的前缀
  API_CURENV: '"base"'
}
```

### dev.env

当运行`npm run build:dev`的时候，默认取的是`dev.env`中的环境变量以及参数，打包开发环境的项目代码，适用于开发人员的自我测试。

```javascript
'use strict'
module.exports = {
  // 默认为 development 环境
  NODE_ENV: '"development"',
  // api接口前缀需要使用哪个环境的前缀
  API_CURENV: '"dev"'
}
```

### test.env

当运行`npm run build:test`的时候，默认取的是`test.env`中的环境变量以及参数，打包测试环境的项目代码，适用于测试人员进行项目测试。

```javascript
'use strict'
module.exports = {
  // 默认为 development 环境
  NODE_ENV: '"development"',
  // api接口前缀需要使用哪个环境的前缀
  API_CURENV: '"test"'
}
```

### pro.env

当运行`npm run build:pro`的时候，默认取的是`pro.env`中的环境变量以及参数，打包生产环境的项目代码，用于上线交付。

```javascript
'use strict'
module.exports = {
  // 默认为 production 环境
  NODE_ENV: '"production"',
  // api接口前缀需要使用哪个环境的前缀
  API_CURENV: '"pro"'
}
```

## 主题色和样式配置

主要用于配置侧边栏菜单和顶部菜单的主题色以及`layout`整体布局

侧边栏菜单和顶部菜单的样式主要代码位置位于`src/styles/sidebar.less`

目前`vue-element-admin`的布局和主题采用的是样式变量，如果需要更改主题色或者样式变量，可在`src/styles/variables.less`中进行更改，更改后将影响整个项目的主题和布局。

::: tip 提示
目前并没有开放主题更改，只能手动在代码上进行变更，后续也会针对这个需求去进行主题的改造。

`variables.less`已经配置在全局中，无需各自引入，如需更改或新增全局 less 文件，可在`build/utils`的`style-resources-loader`进行更改，之后重启项目即可。
:::

```less
// Silder
@menuText: #bfcbd9; # 侧边菜单默认字体颜色
@menuActiveText: #fff; # 侧边菜单选中字体颜色
@menuActiveBg: #2d8cf0; # 侧边菜单选中背景颜色

@menuBg: #001529; # 侧边菜单默认背景颜色

@subMenuBg: #1f2d3d; # 侧边菜单子菜单背景颜色
@subMenuHover: #2d8cf0; # 侧边菜单子菜单悬停背景颜色
@subMenuActiveText: #fff; # 侧边菜单子菜单悬停字体颜色

@menuWidth: 200px; # 侧边菜单宽度
@menuMinWidth: 64px; # 侧边菜单最小宽度

// topSider
@topSiderHeight: 60px; # 顶部操作栏高度

@topMenuText: #303133; # 顶部菜单栏目默认字体颜色
@topMenuActiveText: #2d8cf0; # 顶部菜单栏目选中字体颜色
@topMenuActiveBg: #fff; # 顶部菜单栏目选中背景颜色

@topMenuBg: #fff; # 顶部菜单栏目默认背景颜色

@topSubMenuBg: #1f2d3d; # 顶部菜单栏子菜单默认背景颜色
@topSMenuHover: #2d8cf0; # 顶部菜单栏子菜单悬停背景颜色
@topSMenuActiveText: #2d8cf0; # 顶部菜单栏子菜单悬停字体颜色

// navbar
@navbarHeight: 40px; # navbar高度

// tagsView
@tagsViewHeight: 40px; # 标签页高度
@tagActiveBg: #304156; # 标签页选中背景颜色

// content
@contentBg: #fff; # 主体内容背景颜色
@appBg: #f5f7f9; # 项目背景颜色

// html body
@minWidth: 992px; # 项目最小宽度

```

## 项目配置

::: tip 提示
项目配置用于配置项目内展示的内容/布局/文本等效果，存于 vuex 中。

文件位置`src/store/modules/app.ts`，更改保存之后将会立即作用于整个项目中，开发者可根据实际项目进行扩展。
:::

```javaScript
public collapsed = false // 菜单栏是否栏缩收
public showLogo = true // 是否显示logo
public showTags = true // 是否显示标签栏
public showNavbar = true // 是否显示navbar
public fixedHeader = true // 是否固定header
public layout: LayoutType = 'Classic' // layout布局
public showBreadcrumb = true // 是否显示面包屑
public showHamburger = true // 是否显示侧边栏缩收按钮
public showScreenfull = true // 是否全屏按钮
public showUserInfo = true // 是否显示用户头像
public title = 'vue-element-admin' // 标题
public logoTitle = 'vue-ele-admin' // logo标题
public userInfo = 'userInfo' // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
public greyMode = false // 是否开始灰色模式，用于特殊悼念日
public showBackTop = true // 是否显示回到顶部
public showMenuTab = false // 是否固定一级菜单
public requestTime = false // 是否在接口调用时添加时间戳，避免IE缓存
```
