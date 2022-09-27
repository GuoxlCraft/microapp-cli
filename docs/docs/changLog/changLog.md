# 更新日志

## 2.3.2

`2021-11-14`

### Features

- 新增 useWork 单选操作

### Fix Bugs

- 修复 ComForm 无法操作数据项BUG

### Types

- 优化 useWork 类型

## 2.3.1

`2021-11-06`

### Features

- 重构 ComSearch 组件

### Mods

- 删除 components.d.ts
- 删除 table-demo 中不必要属性

### Docs

- 更新文档有误的地方

### Fix Bugs

- 修复 ComTable 序号问题
- 修复 ComTable 多级表头插槽问题
- 修复 综合示例 查询组件展示问题
- 修复 权限管理 查询组件展示问题

### Builds

- 新增 npm run clean:cache 命令，用于清除缓存

## 2.3.0

`2021-11-02`

### Features

- 新增 ComForm 组件
- 新增 ComForm 示例

### Docs

- 更新文档
- 更新 Readme 文件

### Refactors

- 重构 ComSearch 组件

### Styles

- 优化 ComTable 组件

### Builds

- 升级依赖版本

### Types

- 优化 types 目录
- 统一放置 全局 type

## 2.2.1

`2021-10-28`

### Features

- 新增 script setup 写法
- 新增 自动导入 element-ui 插件
- 新增 vue-tsc 类型检测

### Builds

- 删除 fork-ts-checker-webpack-plugin
- 删除 thread-loader

### Fix Bugs

- 修复 无法使用 IP 进行本地预览

## 2.1.1

`2021-10-09`

### Mods

- 删除 v-clickoutside 指令

### Builds

- 升级依赖

## 2.1.0

`2021-10-01`

### Features

- 新增 echarts 词云示例
- 更新 Echart 组件

### Docs

- 修复文档展示错误
- 更新 Echart 组件文档

### Builds

- 使用 thread-loader 替代 happypack
- 新增 vue-loader 缓存

## 2.0.0

`2021-09-30`

### Refactors

- 使用 composition-api 代替 vue-property-decorator

### Builds

- 升级 echarts
- 删除无用的依赖

### Docs

- 更新 v2.0.0 对应文档

## 1.8.0

`2021-09-20`

### Features

- 支持 .json 文件导入

### Styles

- 去除 vue/html-indent 规则验证，与 prettier 自带的格式化冲突

### Docs

- 更新 Stylelint 文档

## 1.7.0

`2021-09-16`

### Builds

- 升级所有依赖

## 1.6.0

`2021-09-15`

### Features

- 新增 stylelint

## 1.5.0

`2021-09-14`

### Features

- 新增 Ellipsis 组件

### Docs

- 新增 Ellipsis 对应文档

## 1.4.0

`2021-08-24`

### Docs

- 重构 项目文档

## 1.3.0

`2021-08-20`

### Features

- 新增 Preview 组件

### Builds

- 删除 eslint-loader 插件，不再维护
- 新增 eslint-webpack-plugin 插件 替代 eslint-loader
- 新增 package.json 运行命令

## 1.2.0

`2021-08-15`

### Features

- 新增 TreeSelect 组件

### Builds

- 修改 打包时候的缓存配置
- 升级 shelljs 版本，解决 node14 警告问题
- 新增 babel-loader 缓存
- 新增 eslint-loader 缓存
- 新增 happy-pack 多线程
- 删除 script-ext-html-webpack-plugin 插件，不再维护
- 新增 @vue/preload-webpack-plugin 替代 script-ext-html-webpack-plugin

## 1.1.0

`2021-08-05`

### Features

- 新增 Timer 组件
- 新增 Marquee 组件
- 新增 WaterFall 组件

### Styles

- 去除 Setting 组件 model 属性

## 1.0.0

`2021-08-01`

### Features

- 新增 Echart 组件
- 新增 Search 组件
- 新增 Message 组件
- 新增 Dialog 组件
- 新增 Detail 组件
- 新增 Avatars 组件
- 新增 Highlight 组件
- 新增 Editor 组件
- 新增 Qrcode 组件
- 新增 Table 组件
- 新增 SvgIcon 组件
- 新增 exportFile 工具函数
- 新增 isCode 正则验证
- 新增 isIP 正则验证
- 新增 isInteger 正则验证
- 新增 isEnglish 正则验证
- 新增 isChinese 正则验证
- 新增 isServer 正则验证
- 新增 form-rules 表单验证文件
- 新增 dom-uitls 操作 dom 工具类文件
- 新增 watermark 添加水印工具类文件

## Bugs Fixs

- 修复 后端权限登录之后多级缓存菜单无法正确加载

### Styles

- commitlint.config.js 添加注释
- 删除 index.less 中无用的样式
- 调整 Sider 菜单名与 icon 图标的间距保持一致

### Docs

- 更新 README.md
- 文档代码迁移至根目录下
