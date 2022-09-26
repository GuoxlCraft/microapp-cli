<template>
  <div class="MicroAppView">
    <div
      v-for="app of apps"
      :class="{ hidden: !isVisible(app) }"
      :key="app.name"
      class="container"
      :id="app.name + 'Container'"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MicroAppView'
})
</script>
<script setup lang="ts">
import {
  reactive,
  watch,
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted
} from 'vue'
import fetch from '@/axios-config'
import { Route } from 'vue-router'
import router from '@/router'
import { loadMicroApp } from 'qiankun'
import { microAppStore } from '@/store/modules/microApp'
import { tagsViewStore } from '@/store/modules/tags-view'
import action from '@/shared'

// 注册微应用配置
const apps = microAppStore.getAppList
// 微应用路由数据
const appRoutes = microAppStore.getAppRoute
// 微应用实例列表
const microList = reactive<any>({})

// 处理路由变化
const activationHandleChange = async (path: string) => {
  const activeRules: string[] = apps.map((app: any) => app.activeRule as unknown as string)
  const isMicro = activeRules.some((rule) => path.startsWith(rule))
  if (!isMicro) return
  const conf = apps.find((app: any) => path.startsWith(app.activeRule.toString()))
  if (!conf) return
  // 如果已经加载过一次，则无需再次加载

  if (Object.keys(microList).includes(conf.activeRule.toString())) return

  // 缓存当前子应用
  console.log('loading micro app:', conf.name)
  const micro = loadMicroApp(
    {
      ...conf,
      props: { route: appRoutes[conf.name], router: router, action: action, Fetch: fetch }
    },
    {
      sandbox: {
        experimentalStyleIsolation: true
      },
      excludeAssetFilter: (assetUrl: string) => {
        console.log(assetUrl, 'assetUrl')
        return true
      }
    }
  )
  microList[conf.activeRule.toString()] = micro
  try {
    await micro.mountPromise
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

// 监听关闭的标签、卸载没用的子应用
const unmountMicApp = (newVal: number, oldVal: number) => {
  if (newVal > oldVal) return
  const keys = Object.keys(microList)
  keys.forEach((key: string) => {
    console.log(key, tagsViewStore.microCachedViews, 'key')
    if (!hasCachedViews(key, tagsViewStore.microCachedViews)) {
      microList[key].unmount()
      delete microList[key]
    }
  })
}

const hasCachedViews = (key: string, arr: (string | undefined)[]) => {
  return arr.some((url: string) => ('/' + url).startsWith(key))
}

// 监听路由变化
const root = (getCurrentInstance() as any).proxy
const route = computed(() => root.$route)
watch(route, (route: Route) => {
  activationHandleChange(route.path)
})

watch(() => tagsViewStore.microCachedViews.length, unmountMicApp)

function isVisible(app: any) {
  return root.$route.path.startsWith('/' + app.name)
}

onMounted(() => {
  console.log('onMounted')
  if ((window as any).qiankunStarted) return
  ;(window as any).qiankunStarted = true
  activationHandleChange(root.$route.path)
})

onUnmounted(() => {
  console.log('all microapp unmounted')
  ;(window as any).qiankunStarted = false
  Object.values(microList).forEach((mic: any) => {
    mic.unmount()
  })
})
</script>

<style lang="less" scoped>
.MicroAppView {
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
  }
  .hidden {
    height: 0px;
    overflow: hidden;
  }
}
</style>
