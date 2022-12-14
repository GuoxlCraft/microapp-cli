import { constantRouterMap } from '@/router'
import { deepClone } from '_u'
import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { useCache } from '_h/web/useCache'
const { wsCache } = useCache()
import { appStore } from '@/store/modules/app'
const RETURN_URL = appStore.getReturnUrl
const LOGIN_OUT_URL = appStore.getLoginOutUrl
import { logout } from '@/common-api'

import path from 'path'
/* Layout */
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import errorPage from '@/views/err-page/404.vue'

export interface PermissionState {
  routers: RouteConfig[]
  addRouters: RouteConfig[]
  isAddRouters: boolean
  activeTab: string
  menuTabRouters: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  private isMicroApp = (window as any).__POWERED_BY_QIANKUN__
  public routers: RouteConfig[] = []
  public addRouters: RouteConfig[] = []
  public isAddRouters = false
  public menuTabRouters: RouteConfig[] = []
  public activeTab = ''

  @Mutation
  private SET_ROUTERS(routers: RouteConfig[]) {
    // 过滤路由，多级变为二级，如不需要动态路由，把下面一行的routers换成asyncRouterMap
    const flatRoutes = getFlatRoutes(deepClone(routers, ['component']))
    // 动态路由，404一定要放到最后面
    this.addRouters = this.isMicroApp
      ? flatRoutes
      : flatRoutes.concat([
          {
            path: '*',
            redirect: '/404',
            meta: {
              hidden: true
            }
          }
        ])
    // 渲染菜单的所有路由
    this.routers = deepClone(constantRouterMap, ['component']).concat(routers)
  }

  @Mutation
  private SET_ISADDROUTERS(isAddRouters: boolean) {
    this.isAddRouters = isAddRouters
  }

  @Mutation
  private SET_MENUTABROUTERS(menuTabRouters: RouteConfig[]) {
    this.menuTabRouters = menuTabRouters
  }

  @Mutation
  private SET_ACTIVETAB(activeTab: string) {
    this.activeTab = activeTab
  }

  @Action
  public generateRoutes(): Promise<void> {
    return new Promise((resolve) => {
      // 路由权限控制
      let routerMap: RouteConfig[] = []
      const dataMenus =
        wsCache.get('dataMenus')[0]?.children.find((item) => item.code === appStore.microAppName)
          ?.children || []
      const routes = [
        {
          url: '/',
          component: '#',
          redirect: `/${dataMenus[0]?.url}`,
          code: 'Root',
          noTagsView: true,
          children: dataMenus,
          alwaysShow: false
        }
      ]
      routerMap = getFilterRoutes(routes)
      this.SET_ROUTERS(routerMap)
      resolve()
    })
  }

  @Action
  public setIsAddRouters(isAddRouters: boolean) {
    this.SET_ISADDROUTERS(isAddRouters)
  }

  @Action
  public setMenuTabRouters(menuTabRouters: RouteConfig[]) {
    this.SET_MENUTABROUTERS(menuTabRouters)
  }

  @Action
  public setAcitveTab(activeTab: string) {
    this.SET_ACTIVETAB(activeTab)
  }

  @Action
  public async logout() {
    await logoutUser()
  }
}

// 二级以上的菜单降级成二级菜单
function formatRouter(
  routes: RouteConfig[],
  basePath = '/',
  list: RouteConfig[] = [],
  parent: RouteConfig
) {
  routes.map((item: any) => {
    // 在这里处理component
    if (item.component === '##') {
      item.component = ParentView
    } else {
      const url = item.component.toString()
      try {
        item.component = require('@/' + url).default
      } catch (error) {
        console.error('找不到' + url + '对应的组件')
        item.component = errorPage
      }
    }
    item.path = path.resolve(basePath, item.path)
    const meta = item.meta || {}
    if (!meta.parent && parent) {
      meta.parent = parent.path
      item.meta = meta
    }
    if (item.redirect && item.redirect !== 'noredirect') {
      item.redirect = path.resolve(basePath, item.redirect as string)
    }
    if (item.children && item.children.length > 0) {
      const arr = formatRouter(item.children, item.path, list, item)
      delete item.children
      list.concat(arr)
    }
    list.push(item)
  })
  return list
}

// 菜单降级
function getFlatRoutes(routes: RouteConfig[]) {
  return routes.map((child: any) => {
    child.component = Layout
    if (child.children && child.children.length > 0) {
      child.children = formatRouter(child.children, child.path, [], child)
    }
    return child
  })
}

// 模拟后端过滤路由
function getFilterRoutes(routes: any[]) {
  const res: RouteConfig[] = []
  for (const route of routes) {
    const data: any = {
      path: route.url,
      name: route.code,
      redirect: route.redirect,
      component: route.component
    }
    data.meta = {
      tagName: route.tagName,
      title: route.name,
      noCache: route.noCache,
      btnPower: (route.btnPower && route.btnPower.map((item: any) => item.code)) || [],
      affix: route.affix,
      noTagsView: route.noTagsView,
      activeMenu: route.activeMenu,
      icon: route.icon,
      hidden: !!route.hidden
    }

    // 过滤alwaysShow属性
    // eslint-disable-next-line no-prototype-builtins
    if (route.hasOwnProperty('alwaysShow')) {
      data.alwaysShow = route.alwaysShow
    } else {
      data.alwaysShow = !!(route.children && route.children.length)
    }

    // 过滤redirect属性
    // eslint-disable-next-line no-prototype-builtins
    if (route.hasOwnProperty('redirect')) {
      data.redirect = route.redirect
      // eslint-disable-next-line no-prototype-builtins
    } else if (!route.hasOwnProperty('redirect') && route.children && route.children.length) {
      data.redirect = resolvePath(route).join('/')
    } else {
      data.redirect = ''
    }
    // recursive child routes
    if (route.children) {
      data.children = getFilterRoutes(route.children)
    }
    res.push(data)
  }
  return res
}

// 过滤redirect
function resolvePath(data, url: any[] = []) {
  url.push((data as any).url)
  if (data.children && data.children.length) {
    resolvePath(data.children[0], url)
  }
  return url
}

// 退出登录
async function logoutUser() {
  const res = await logout({
    data: { ticket: wsCache.get(appStore.userInfo).ticket }
  })
  if (res) {
    wsCache.clear()
    window.location.href = `${LOGIN_OUT_URL}?services=${RETURN_URL}`
  }
}
export const permissionStore = getModule(Permission)
