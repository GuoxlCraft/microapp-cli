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

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
