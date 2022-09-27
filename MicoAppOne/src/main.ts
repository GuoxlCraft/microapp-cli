import './public-path'
import 'core-js/stable'
import 'custom-event-polyfill'
import 'core-js/web/url'
import 'regenerator-runtime/runtime'

import Vue from 'vue'

import '@/plugins/element-ui' // 按需引入element

import '@/components' // 引入全局组件

import App from './App.vue'

import router from './router'

import store from './store' // 状态管理

import 'normalize.css' // 重置不同浏览器之间的标签默认样式

import VueBus from 'vue-bus' // bus总线
Vue.use(VueBus)

import '@/styles/index.less' // 引入全局样式

import './permission' // permission control

import { mockXHR } from '@/mock'
mockXHR()

Vue.config.productionTip = false

let instance: any = null
function render(props = {}) {
  const container = (props as any).container
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#MicoAppOne-app') : '#MicoAppOne-app')
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

let microAppRoute: any = null
let $fetch: any = null

export async function mount(props: any) {
  console.log('[vue] props from main framework', props)

  Vue.prototype.$mainRouter = (props as any).router
  Vue.prototype.$mainAciton = (props as any).action
  $fetch = (props as any).Fetch
  microAppRoute = (props as any).route
  return new Promise<void>((resolve) => {
    // Always reject with an Error.
    render(props)
    resolve()
  })
}
export async function unmount() {
  console.log('[vue] vue app unmount')
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

export async function update() {
  console.log('[vue] vue app update')
}

export { microAppRoute, $fetch }
