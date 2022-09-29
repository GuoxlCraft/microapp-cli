# 项目规范

## ESlint

### 介绍

::: tip
使用 lint 的好处不管是多人合作还是个人项目，具备基本工程素养的同学都会注重编码规范，而代码风格检查（Code Linting，简称 Lint）是保障代码规范一致性的重要手段。

遵循相应的代码规范有以下好处

- 较少 bug 错误率
- 高效的开发效率
- 更高的可读性
:::

### 配置项

所有的配置文件都在`.eslintrc.js`中。 本项目基本规范是依托于 `vue` 官方的 `eslint` 规则 [eslint-config-vue](https://github.com/vuejs/eslint-config-vue) 做了少许的修改。大家可以按照自己的需求进行定制化配置。

比如：我个人或者项目组习惯于使用两个空格，但你可能觉得四个空格更顺眼，你可以做如下修改。 进入项目 `.eslintrc.js` 中，找到 `indent`，然后修改为 `4` 即可。 还有各种各样的配置信息，详情见 [ESLint](https://eslint.org/docs/rules/) 文档。

默认情况下使用了最严格的`plugin:vue/recommended`来校验代码，若你觉得太严格可自行修改。

```javaScript
eslintrc.js

module.exports = {
  extends: ['plugin:vue/recommended', 'eslint:recommended']
  //你可以修改为  extends: ['plugin:vue/essential', 'eslint:recommended']
}
```

### 取消 ESLint 校验

如果你不想使用 `ESLint` 校验（不推荐取消），在`build/webpack.base.conf.js`中的`new ESLintPlugin`相关代码注释掉即可，之后重启项目。

### 自动修复

运行如下命令，`eslint` 会自动修复一些简单的错误。

```sh
npm run lint
```

## CommitLint

### 介绍

在一个团队中，每个人的`git`的`commit`信息都不一样，五花八门，没有一个机制很难保证规范化，如何才能规范化呢？可能你想到的是`git`的`hook`机制，去写`shell`脚本去实现。这当然可以，其实`JavaScript`有一个很好的工具可以实现这个模板，它就是`commitlint`（用于校验 git 提交信息规范）。

### 配置项

commit-lint 的配置位于项目根目录下`commitlint.config.js`

### 提交规范

- feat 新功能(feature)
- fix 修补 bug
- docs 文档(documentation)
- style 格式、样式(不影响代码运行的变动)
- refactor 重构(即不是新增功能，也不是修改 BUG 的代码)
- perf 优化相关，比如提升性能、体验
- test 添加测试
- build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
- ci 持续集成修改
- chore 构建过程或辅助工具的变动
- revert 回滚到上一个版本
- workflow 工作流改进
- mod 不确定分类的修改
- wip 开发中
- types 类型修改

### 如何关闭

在`.husky/commit-msg`内注释以下代码即可

```sh
# npx --no-install commitlint --edit "$1"
```

### 提交示例

```sh
git commit -m 'feat(home): add home page'
```
## Prettier

### 介绍

`prettier`可以用于统一项目代码风格，统一的缩进，单双引号，尾逗号等等风格。

### 配置

`prettier` 配置文件位于项目根目录下 prettier.config.js

### 编辑器配合

如果您使用的是 `vscode` 编辑器的话，只需要安装[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)插件，即可在保存的时候自动格式化文件内部 `js | ts` 格式。


### 总结

最佳的 `lint` 规范流程就是推荐团队成员先在自己的编辑器中配置 `eslint`，在 `webpack` 中配置并开启 `eslint-webpack-plugin` 错误提示，这样平时写的时候编辑器就能帮你修正一些简单的格式错误，同时提醒你有哪些不符合 `lint` 规范的的地方，并在命令行中提示你错误。。

但这并不是强制的，有些团队成员或者说刚来的实习生没有在编辑器中配置或者无视命令行中提示的错误，这时候就需要配置`pre-commit` 这种强制性校验的东西，保证所有提交到远程仓库的内容都是符合团队规范的。
