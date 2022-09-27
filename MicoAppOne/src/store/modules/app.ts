import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
export type LayoutType = 'Classic' | 'Microapp'

export interface AppState {
  microAppName: string
  collapsed: boolean
  showTags: boolean
  showLogo: boolean
  showNavbar: boolean
  fixedHeader: boolean
  layout: LayoutType
  showBreadcrumb: boolean
  showHamburger: boolean
  showScreenfull: boolean
  showUserInfo: boolean
  title: string
  logoTitle: string
  userInfo: string
  showBackTop: boolean
  showMenuTab: boolean
  requestTime: boolean
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  private isMicroApp = (window as any).__POWERED_BY_QIANKUN__
  public collapsed = true // 菜单栏是否栏缩收
  public showLogo = true // 是否显示logo
  public showTags = true // 是否显示标签栏
  public showNavbar = false // 是否显示navbar
  public fixedHeader = true // 是否固定header
  public layout: LayoutType = this.isMicroApp ? 'Microapp' : 'Classic' // layout布局
  public showBreadcrumb = true // 是否显示面包屑
  public showHamburger = true // 是否显示侧边栏缩收按钮
  public showScreenfull = true // 是否全屏按钮
  public showUserInfo = true // 是否显示用户头像
  public title = 'Origin-MicoApp-Cli' // 标题
  public logoTitle = '起源微前端框架' // logo标题
  public userInfo = 'userInfo' // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  public showBackTop = true // 是否显示回到顶部
  public showMenuTab = true // 是否固定一级菜单
  public requestTime = false // 是否在接口调用时添加时间戳，避免IE缓存
  public microAppName = 'MicoAppOne'
  // 单点登录页地址
  public loginUrl = {
    base: 'http://192.168.168.114:1180/dsports-sso/login',
    // 开发环境
    dev: 'http://192.168.168.114:1180/dsports-sso/login',
    // 生产环境
    pro: 'http://192.168.168.114:1180/dsports-sso/login',
    // 测试环境
    test: 'http://192.168.168.114:1180/dsports-sso/login'
  }
  // 单点退出地址
  public loginOutUrl = {
    base: 'http://192.168.168.114:1180/dsports-sso/logout',
    // 开发环境
    dev: 'http://192.168.168.114:1180/dsports-sso/logout',
    // 生产环境
    pro: 'http://192.168.168.114:1180/dsports-sso/logout',
    // 测试环境
    test: 'http://192.168.168.114:1180/dsports-sso/logout'
  }
  // 单点登录成功之后回调地址
  public returnUrl = {
    base: 'http://localhost:7001/',
    // 开发环境
    dev: 'http://localhost:7001/',
    // 生产环境
    pro: 'http://localhost:7001/',
    // 测试环境
    test: 'http://localhost:7001/'
  }

  // 获取当前环境的单点登录地址
  get getLoginUrl(): string {
    return this.loginUrl[(process.env as any).API_CURENV]
  }

  // 获取当前环境的单点退出地址
  get getLoginOutUrl(): string {
    return this.loginOutUrl[(process.env as any).API_CURENV]
  }

  // 获取当前环境的单点登录成功之后回调地址
  get getReturnUrl(): string {
    return this.returnUrl[(process.env as any).API_CURENV]
  }

  @Mutation
  private SET_COLLAPSED(collapsed: boolean): void {
    this.collapsed = collapsed
  }

  @Mutation
  private SET_SHOWLOGO(showLogo: boolean): void {
    this.showLogo = showLogo
  }

  @Mutation
  private SET_SHOWTAGS(showTags: boolean): void {
    this.showTags = showTags
  }

  @Mutation
  private SET_NAVBAR(showNavbar: boolean): void {
    this.showNavbar = showNavbar
  }

  @Mutation
  private SET_FIXEDHEADER(fixedHeader: boolean): void {
    this.fixedHeader = fixedHeader
  }

  @Mutation
  private SET_LAYOUT(layout: LayoutType): void {
    this.layout = layout
  }

  @Mutation
  private SET_BREADCRUMB(showBreadcrumb: boolean): void {
    this.showBreadcrumb = showBreadcrumb
  }

  @Mutation
  private SET_HAMBURGER(showHamburger: boolean): void {
    this.showHamburger = showHamburger
  }

  @Mutation
  private SET_SCREENFULL(showScreenfull: boolean): void {
    this.showScreenfull = showScreenfull
  }

  @Mutation
  private SET_USERINFO(showUserInfo: boolean): void {
    this.showUserInfo = showUserInfo
  }

  @Mutation
  private SET_TITLE(title: string): void {
    this.title = title
  }

  @Mutation
  private SET_LOGOTITLE(logoTitle: string): void {
    this.logoTitle = logoTitle
  }

  @Mutation
  private SET_SHOWBACKTOP(showBackTop: boolean): void {
    this.showBackTop = showBackTop
  }

  @Mutation
  private SET_SHOWMENUTAB(showMenuTab: boolean): void {
    this.showMenuTab = showMenuTab
  }

  @Mutation
  private SET_REQUESTTIME(requestTime: boolean): void {
    this.requestTime = requestTime
  }

  @Action
  public setCollapsed(collapsed: boolean): void {
    this.SET_COLLAPSED(collapsed)
  }

  @Action
  public setShowLogo(showLogo: boolean): void {
    this.SET_SHOWLOGO(showLogo)
  }

  @Action
  public setShowTags(showTags: boolean): void {
    this.SET_SHOWTAGS(showTags)
  }

  @Action
  public setShowNavbar(showNavbar: boolean): void {
    this.SET_NAVBAR(showNavbar)
  }

  @Action
  public setFixedHeader(fixedHeader: boolean): void {
    this.SET_FIXEDHEADER(fixedHeader)
  }

  @Action
  public setLayout(layout: LayoutType): void {
    this.SET_LAYOUT(layout)
  }

  @Action
  public setBreadcrumb(showBreadcrumb: boolean): void {
    this.SET_BREADCRUMB(showBreadcrumb)
  }

  @Action
  public setHamburger(showHamburger: boolean): void {
    this.SET_HAMBURGER(showHamburger)
  }

  @Action
  public setScreenfull(showScreenfull: boolean): void {
    this.SET_SCREENFULL(showScreenfull)
  }

  @Action
  public setUserInfo(showUserInfo: boolean): void {
    this.SET_USERINFO(showUserInfo)
  }

  @Action
  public setTitle(title: string): void {
    this.SET_TITLE(title)
  }

  @Action
  public setLogoTitle(logoTitle: string): void {
    this.SET_LOGOTITLE(logoTitle)
  }

  @Action
  public setShowBackTop(showBackTop: boolean): void {
    this.SET_SHOWBACKTOP(showBackTop)
  }

  @Action
  public setShowMenuTab(showMenuTab: boolean): void {
    this.SET_SHOWMENUTAB(showMenuTab)
  }

  @Action
  public setRequestTime(requestTime: boolean): void {
    this.SET_REQUESTTIME(requestTime)
  }
}

export const appStore = getModule(App)
