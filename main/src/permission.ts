import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { appStore } from '@/store/modules/app'
import { dictStore } from './store/modules/dict'
import { microAppStore, appConfig } from './store/modules/microApp'
import { permissionStore } from '@/store/modules/permission'
import { useCache } from '_h/web/useCache'
const { wsCache } = useCache()
import { Loading } from 'element-ui'
import { Route } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { param2Obj } from '_u'
import { isExternal } from '_u/validate'
import path from 'path'
const RETURN_URL = appStore.getReturnUrl
import { ElMessage } from '_c/Message'
import { auth } from '@/common-api'

NProgress.configure({ showSpinner: false }) // NProgress configuration

// const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start()
  // 获取当前环境的地址配置
  if (wsCache.get(appStore.userInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!dictStore.isSetDict) {
        await dictStore.setAsyncDict()
      }
      if (permissionStore.isAddRouters) {
        next()
        return
      }
      const res = wsCache.get(appStore.userInfo).userMenus
      if (res.length) {
        filterMicroAppRoutes(res || [])
        const newRoutes = filterRoutes(recursionRoutes(res || []))
        wsCache.set('dataMenus', newRoutes)
        permissionStore.generateRoutes().then(() => {
          router.addRoutes(permissionStore.addRouters) // 动态添加可访问路由表
        })
        permissionStore.setIsAddRouters(true)
      } else {
        ElMessage.error('该账户没有菜单权限，请联系管理员')
        setTimeout(() => {
          permissionStore.logout()
        }, 2000)
      }
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(!permissionStore.routers.length ? '/403' : nextData)
    }
  } else {
    // 判断URL是否有ticket，有的话就代表登录过了
    const ticket = param2Obj(window.location.href).ticket
    if (ticket) {
      const loadingInstance = Loading.service({
        text: '正在登录中，请耐心等待',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      try {
        const res = await auth({
          data: {
            ticket,
            service: RETURN_URL
          }
        })
        if (res) {
          wsCache.set(appStore.userInfo, res.data)
          const menu = wsCache.get(appStore.userInfo).userMenus
          if (menu.length) {
            // 获取路由中微应用的路由
            filterMicroAppRoutes(menu || [])
            const newRoutes = filterRoutes(recursionRoutes(menu || []))
            wsCache.set('dataMenus', newRoutes)
            permissionStore.generateRoutes().then(() => {
              router.addRoutes(permissionStore.addRouters) // 动态添加可访问路由表
              // next() // 直接跳转的话，会一直带ticket，不美观
              // window.location = RETURN_URL
              if (!newRoutes.length) {
                next('/403')
              } else {
                const targetPath = window.location.href.split('#/')
                if (targetPath[1]) {
                  next('/' + targetPath[1]) // 跳转到指定path
                } else {
                  next(permissionStore.addRouters[0].path) // 跳转到指定path
                }
              }
            })
            permissionStore.setIsAddRouters(true) // 先跳转还是先设置以获取路由没有影响吧，没影响
          } else {
            ElMessage.error('该账户没有菜单权限，请联系管理员')
            setTimeout(() => {
              permissionStore.logout()
            }, 2000)
          }
        } else {
          setTimeout(() => {
            // 为什么要加2秒的延时,显示错误信息
            JumpToLogout()
          }, 2000)
        }
      } finally {
        loadingInstance.close()
      }
    } else {
      JumpToLogin()
    }
  }
})

function JumpToLogin() {
  /**
   *  重定向到单点登录页
   *  注意：演示版本，只是模拟了单点登录携带TiCKET
   * **/
  // const LOGIN_URL = appStore.getLoginUrl
  // const targetPath = window.location.pathname.split('/')
  // window.location.href = `${LOGIN_URL}?service=${RETURN_URL}${
  //   targetPath[1] ? targetPath[1] : ''
  // }`
  window.location.href = window.location.href + '?ticket=123456'
}
function JumpToLogout() {
  /**
   *  重定向到单点退出登录页
   *  注意：演示版本，只是模拟了单点登录携带TiCKET
   * **/
  // const LOGIN_OUT_URL = appStore.getLoginOutUrl
  // window.location.href = `${LOGIN_OUT_URL}?services=${RETURN_URL}`
  window.location.href = window.location.href + '?ticket=123456'
}

router.afterEach((to: Route) => {
  useTitle(to?.meta?.title)
  NProgress.done() // 结束Progress
})

function filterRoutes(routes) {
  // 最外层包裹layout
  const newRoutes = [
    {
      url: '/',
      component: '#',
      redirect: `/${routes[0]?.url}`,
      code: 'Root',
      noTagsView: true,
      children: routes,
      alwaysShow: false
    }
  ]
  return newRoutes
}

function recursionRoutes(routes, basePath = '/') {
  const res: IObj[] = []
  for (const route of routes) {
    res.push(route)
    if (route.children && route.children.length) {
      route.children = recursionRoutes(route.children || [], resolvePath(basePath, route.url))
    }
    // 路由规则： 有效页面下带有子页面，拉平到同级共用一个router-view，并且设置noTagsView将activeMenu设为该有效页面
    if (
      route.component !== '#' &&
      route.component !== '##' &&
      route.component !== '###' &&
      !route.component.startsWith('App') &&
      route.children?.length
    ) {
      for (const v of route.children) {
        v.noTagsView = true
        v.hidden = true
        v.activeMenu = resolvePath(basePath, route.url)
        res.push(v)
      }
      delete route.children
    }
  }
  return res
}

function filterMicroAppRoutes(routes) {
  const appList: appConfig[] = []
  const appRoute: { [key: string]: IObj } = {}
  for (const route of routes) {
    if (route.component.startsWith('App')) {
      const appconfig: appConfig = {
        name: route.code,
        entry: '',
        container: `#${route.code}Container`,
        activeRule: '/' + route.url
      }
      console.log(process.env.API_CURENV, 'process.env.API_CURENV')
      if (process.env.API_CURENV === 'base') {
        appconfig.entry =
          location.protocol + '//' + location.hostname + route.component.replace('App', '')
      } else {
        appconfig.entry = location.origin + '/App-' + route.code + '/'
      }
      appList.push(appconfig)
      appRoute[route.code] = route.children
    }
  }
  console.log(appList, 'appList')
  microAppStore.SetAppList(appList)
  microAppStore.SetAppRoute(appRoute)
}

function resolvePath(basePath, routePath) {
  if (isExternal(routePath)) {
    return routePath
  }
  return path.resolve(basePath, routePath)
}
