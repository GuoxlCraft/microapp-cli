# 快速上手

::: tip 提示
本项目需要[Node.js](https://nodejs.org/en/)版本>=14
:::

## 代码获取

::: warning 注意
注意存放代码的目录及所有父级目录不能存在中文、韩文、日文以及空格，否则安装依赖后启动会出错。
:::

```sh
# clone 代码
git clone http://192.168.169.57:9000/scm/git/hzt-webdocs.git
```

## 安装

### 安装 Node.js

如果您电脑未安装[Node.js](https://nodejs.org/en/)，请安装它。

#### 验证

```sh
# 出现相应npm版本即可
npm -v

# 出现相应node版本即可
node -v
```

### 安装依赖

推荐使用[Yarn](https://github.com/yarnpkg/yarn)进行依赖安装。

在项目根目录下，打开命令窗口执行，耐心等待安装完成即可

```sh
# 安装依赖
yarn
```

::: tip 提示
安装依赖时`husky`安装失败

请查看你的源码是否从`gitee`直接下载的，直接下载是没有`.git`文件夹的，而`husky`需要依赖`git`才能安装。此时需使用`git init`初始化项目，再尝试重新安装即可。

或者，当前安装依赖的命令框，没有`git`环境，请确保存在`git`环境。
:::

## 运行项目

```sh
# 运行项目
npm run serve
```

## npm scripts

```sh
"scripts": {
  # 安装所有依赖
  "i:all": "npm run i && npm run docs:i",
  # 安装项目依赖
  "i": "yarn install",
  # 启动项目
  "serve": "webpack serve --progress --no-stats --config build/webpack.dev.conf.js",
  # eslint 检测修复
  "lint": "eslint --fix --ext .js,.ts,.vue ./src",
  # prettier 代码格式化
  "format": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,vue,html,md}\"",
  # stylelint 样式格式化
  "lint:style": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
  # 提交前的统一格式化
  "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js",
  # 只对已提交文件进行格式化
  "lint:pretty": "pretty-quick --staged",
  # 打包开发环境
  "build:dev": "node build/build.js dev",
  # 打包生产环境
  "build:pro": "node build/build.js pro",
  # 打包测试环境
  "build:test": "node build/build.js test",
  # 生成打包分析
  "build:report": "node build/build.js pro report",
  # 删除项目和文档中的node包
  "clean": "npx rimraf docs/node_modules && npx rimraf node_modules",
  # 删除文档中的node包
  "clean:docs": "npx rimraf docs/node_modules",
  # 删除项目中的node包
  "clean:main": "npx rimraf node_modules",
  # husky初始化
  "postinstall": "husky install",
  # 文档依赖安装
  "docs:i": "cd docs && yarn install",
  # 文档开发环境运行
  "docs:dev": "cd docs && npm run dev",
  # 文档打包
  "docs:build": "cd docs && npm run dev build",
  # 检测所有依赖可升级版本
  "check": "npm-check-updates"
}
```
