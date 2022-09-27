<template>
  <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="changeTab">
    <el-tab-pane
      v-for="(item, $index) in tabRouters"
      :key="$index"
      :name="item.path === '/' ? '/dashboard' : '/' + item.path"
    >
      <template #label>
        <div class="label-item">
          <svg-icon :icon-class="filterTab(item, 'icon')" />
          <div class="title-item">{{ filterTab(item, 'title') }}</div>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuTabs'
})
</script>

<script setup lang="ts">
import { ref, watch, computed, getCurrentInstance } from 'vue'
import { findIndex } from '_u'
import { isExternal } from '_u/validate'
import { appStore } from '@/store/modules/app'
import { permissionStore } from '@/store/modules/permission'
import { RouteConfig } from 'vue-router'
import { SvgIcon } from '_c'
const root = (getCurrentInstance() as any).proxy

const route = computed(() => root.$route)
// const router = root.$router
const activeName = ref<string>('')
const routers = computed(() => {
  return permissionStore.routers.find((item) => item.name === 'Root')?.children || []
})
const layout = computed(() => appStore.layout)
const tabPosition = computed(() => (layout.value === 'Classic' ? 'left' : 'top'))
const tabRouters = computed(() => routers.value.filter((v) => !(v.meta && v.meta.hidden)))

watch(activeName, (val: string) => {
  setAcitveTab(val)
})

watch(route, () => {
  init()
})

function setAcitveTab(activeName: string) {
  permissionStore.setAcitveTab(activeName)
}

function setMenuTabRouters(routers: RouteConfig[]) {
  permissionStore.setMenuTabRouters(routers)
}

function init() {
  const currentPath = route.value.fullPath.split('/')
  const index = findIndex(tabRouters.value, (v) => {
    return v.path === `${currentPath[1]}`
  })
  if (index > -1) {
    activeName.value = `/${currentPath[1]}`
    setActive(index)
    setAcitveTab(activeName.value)
  }
}

function filterTab(item: RouteConfig, key: string) {
  return item.meta ? item.meta[key] : (item as any).children[0].meta[key]
}

function setActive(index: number) {
  const menuTabsRouters = (tabRouters.value[index] as any).children.length
    ? (tabRouters.value[index] as any).children
    : [tabRouters.value[index]]
  setMenuTabRouters(menuTabsRouters)
}

function changeTab(item: any) {
  appStore.setCollapsed(false)
  const menuTabsRouters = (tabRouters.value[item.index] as any).children.length
    ? (tabRouters.value[item.index] as any).children
    : [tabRouters.value[item.index]]
  setMenuTabRouters(menuTabsRouters)
  if (isExternal((tabRouters.value[item.index] as any).children[0]?.path)) {
    window.open((tabRouters.value[item.index] as any).children[0].path)
  } else {
    // 这里注释掉，修改逻辑为切换tab不跳转页面
    // router.push(
    //   `${activeName.value === '/dashboard' ? '' : activeName.value}/${
    //     (tabRouters.value[item.index] as any).children[0].path
    //   }`
    // )
    setAcitveTab(activeName.value)
  }
}

init()
</script>

<style lang="less" scoped>
.label-item {
  display: flex;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  & > div {
    width: 100%;
  }

  .title-item {
    position: relative;
    top: -12px;
    font-size: 12px;
  }
  .svg-icon {
    height: 22px !important;
    width: 22px !important;
  }
}
</style>
