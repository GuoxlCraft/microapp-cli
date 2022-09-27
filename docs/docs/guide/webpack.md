# webpack入门教学

## 介绍

`webpack`是一个现代 JavaScript 应用程序的静态模块打包器，已经成为前端开发不可获取的工具。特别是在开发大型项目时，项目太大，文件过多导致难以维护，或者是优化网络请求时，`webpack`都是不可获取的利器。但是`webpack`配置并没有那么容易，`webpack`配置项繁多，繁多的背后是配置的灵活性。许多的框架都是由`webpack`搭建而成，因此学会使用`webpack`可以让自己更好的理解脚手架搭建过程，甚至自己写一个灵活高效的脚手架工具。

`webpack`曾经对我来说是一个令人沮丧和压倒性的野兽。我觉得使用诸如`create-react-app`、`vue-cli`设置项目之类的东西是安全的，所以尽可能避免使用`webpack`，因为它看起来很复杂且令人困惑。

如果你不喜欢从头开始设置`webpack`，或者不知道为什么要使用`webpack`，那么这篇文章非常适合您。像所有事情一样，一旦你深入研究并学习它，你就会意识到它并没有那么可怕，只有几个主要概念需要学习。

而如今`webpack`已经发展到了第五个版本，基本上处于一个稳定的版本了，所以本文将手摸手教学，让客官们知道如何构建一套`webpack5`的脚手架。

## webpack5的新特性

在开始之前，我们先要了解下`webpack5`给我们带来的一些相对来说比较重要的变化及新特性

### 持久化缓存

在`webpack5`之前的版本中，我们可以通过`cache-loader`、设置`babel-loader option.cacheDirectory`、使用`hard-source-webpack-plugin`等手段来将编译的结果写入到磁盘中。而在`webpack5`中，默认会把编译的结果缓存到内存中，提高第二次的构建速度。

### 对资源模块提供了内置支持

`webpack5`允许应用使用资源文件（图片，字体等)而不需要配置额外的`loader`。

### 更友好的 Long Term Cache 支持性

长效缓存特性减少了由于模块变更导致的文件`hash`值的改变而导致文件缓存失效的情况，使得应用可以充分利用浏览器缓存。

### 更强大的tree shaking

`tree-shaking`能够帮助我们在打包的时候剔除无用的代码。`webpack5`开启`tree-shaking`的条件与之前一样，需要使用ES6模块化，并开启`production`环境。

### 移除了 Node.js Polyfills

`webpack5`之前的版本中提供了许多`Node.js`核心模块的`polyfills`，一旦某个模块引用了任何一个核心模块（如 cypto 模块），`webpack`就会自动引用这些`polyfills`。这会导致应用体积增大，尽管这些`polyfills`大多是用不上的，`webpack5`开始不再自动填充这些`polyfills`，如果你在`webpack5`中使用到了`polyfill`，会得到相对应的警告，控制台中也给你提供了解决的方案，按照控制台的提示去安装对应的包和添加对应的配置就可以了。

### Module Federation 模块联邦

这是`webpack`官网中对该功能的动机的解释，简单来说就是允许一个应用中动态地去加载和引入另一个应用的代码。简单点理解就是`微前端`的一种实现方式。

## 安装

::: tip 提示
在开始之前，我们默认你对前端知识有了一定了解，并且对`webpack`有了一定的基础概念。
:::

首先，为你的项目创建一个目录，我们取名为`webpck5-cli`

```shell
mkdir webpack-cli
cd webpack-cli
npm init -y # 创建 package.json
```

安装`webpack`和`webpack-cli`，这些脚手架的核心技术。

```shell
yarn add webpack webpack-cli -D
```

- webpack - 模块打包器
- webpack-cli - 用于在命令行中运行webpack

我们将创建一个`src`文件夹来存放我们所有的源文件。并且在`src`底下创建一个`views`文件夹，来存放我们的所有视图相关文件，具体目录如下：

![](https://sanyuanda.oss-cn-hangzhou.aliyuncs.com/imgs/1636982358%281%29.png)

接下来，在根目录下分别创建三个js文件`webpack.base.conf.js`、`webpack.dev.conf.js`、`webpack.prod.conf.js`

- webpack.base.conf.js 用于存放公用配置，如果资源解析等
- webpack.dev.conf.js 用于配置开发环境
- webpack.prod.conf.js 用于配置生产环境

在开始配置之前，我们首先先要了解下，`webpack`中的配置，大致的骨架是这样的：

```javascript
{
  entry: '', // 入口配置
  mode: '', // 环境配置
  output: {}, // 打包输出配置
  module: {}, // loader 配置项
  plugins: [], // 插件配置项
  devServer: {} // 服务器配置
}
```

了解完之后，就可以开始一一进行配置。

## 配置

我们先来配置一下公用的配置，如一些公用的loader解析器，因为是公用的，所以我们把他放在`webpack.base.conf.js`中。

### webpack.base.conf

在`webpack.base.conf.js`文件中，我们需要定义一下`entry`，这是最为关键的一步，只有设置了`entry`，`webpack`才能正确的去解析。

```javascript
const path = require('path')

module.exports = {
  // webpack入口文件
  entry: {
    index: './src/views/index/index.js'
  }
}
```

`output`是捆绑文件将解析的位置，定义好`entry`之后，还要设置一下`output`的位置，我们将在`dist`文件夹中输出，这是构建生产代码的地方。

```javascript
module.exports = {
  /* ... */

  // webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: path.resolve(__dirname, './dist'),
    // webpack输出bundle文件命名格式
    filename: '[name].js'
  }
}
```

`entry`和`output`配置好后，就可以配置`module`，用于处理不同类型资源的处理规则。

一个正常的项目中，是需要有`html`、`javascript`、`css`三种资源类型的，所以我们优先来配置这三个资源类型的规则。

首先我们需要先安装以下依赖：

```shell
yarn add html-loader babel-loader @babel/core @babel/preset-env css-loader postcss-loader postcss-import postcss-url autoprefixer less-loader mini-css-extract-plugin -D
```

| 名称 | 说明 |
|---------- |---------- |
| html-loader | 可以将一个html文件通过 JS 加载进来 |
| babel-loader |  babel 与 webpack 协同工作的模块 |
| @babel/core | babel 编译器的核心模块 |
| @babel/preset-env | 它是官方推荐的预置器，可根据用户设置的目标环境自动添加所需的插件和补丁来编译 ES6+ 代码 |
| css-loader | 允许在js中import一个css文件，会将css文件当成一个模块引入到js文件中 |
| postcss-loader | 使用 PostCSS 处理 CSS 的 loader |
| postcss-import | 遵循@import规则，你可以将其他样式合并到你的主样式表中，如此一来，加载相同的CSS就只需要一个http请求就够了 |
| postcss-url | 用于转换 url() |
| autoprefixer | 跨浏览器兼容性，自动添加前缀 |
| mini-css-extract-plugin | 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap |
| less-loader | 解析less文件 |

```javascript

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  /* ... */
  // 不同类型模块的处理规则
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: [resolve('src')],
        exclude: resolve('node_modules')
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
          'less-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  }
}
```

之后在根目录下创建`.postcssrc.js`、`.babelrc.js`文件

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    autoprefixer: {}
  }
}
```

```javascript
{
  'presets': [
    ['@babel/env', // 每一个 preset 就是数组的每一项
      // 当有的 preset 需要配置时，这一项将也是一个数组
      // 数组的第一项是 preset 名称，第二项是该 preset 的配置内容，是一个对象
      { // @babel/preset-env 会将 ES6 module 转成 CommonJS 的形式
        // 将 mudules 设置成 false，可以禁止模块语句的转化
        // 而将 ES6 module 的语法交给 webpack 本身处理
        'mudules': false,
        // targets 可以指定兼容的各个环境的最低版本
        'targets': {
          'edge': '17',
          'firefox': '60',
          'chrome': '67',
          'safari': '11.1',
          'ie': '10'
        }
      }
    ]
  ],
  'plugins': []
}

```

当`html`、`javascript`、`css`三种资源类型都配置完之后，我们设想一下，一个网页中，不单单只有这三种类型资源，还有图片资源、音频资源、字体资源等其他常用的静态资源。这些也是需要进行配置才能正常被`webpack`解析。

在`webpack5`之前，对于这些资源我们是采用了`url-loader`或者`file-loader`来进行解析，在`webpack5`中，已经内置了这些模块，所以我们可以直接去进行这些静态资源的解析。

```javascript
module.exports = {
  /* ... */
  // 不同类型模块的处理规则
  module: {
    rules: [
      /* ... */
      // 对图片资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[contenthash:7].[ext]'
        }
      },
      // 对音频资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[contenthash:7].[ext]'
        }
      },
      // 对字体资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[contenthash:7].[ext]'
        }
      }
    ]
  }
}
```

至此，我们共用配置就到这边告一段落了，接下来就是配置`webpack.dev.conf`，主要是针对`devServer`属性，该配置主要用于构建一个服务，来运行我们的工程，简单理解为就是开发环境配置。

### webpack.dev.conf

首先，我们先来安装下以下依赖：

```shell
yarn add webpack-dev-server webpack-merge -D
```

| 名称 | 说明 |
|---------- |---------- |
| webpack-dev-server | webpack 的开发服务器 |
| webpack-merge | 对象合并，用于合并配置 |