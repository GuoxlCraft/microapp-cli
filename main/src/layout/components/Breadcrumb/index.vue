<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <svg-icon
          v-if="item.meta.icon && !item.meta.icon.includes('el-icon')"
          :icon-class="item.meta.icon"
          class="icon-breadcrumb"
        />
        <span
          v-else-if="item.meta.icon && item.meta.icon.includes('el-icon')"
          class="icon-breadcrumb"
        >
          <i :class="item.meta.icon"></i>
        </span>
        <span
          v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<script setup lang="ts">
import { compile } from 'path-to-regexp'
import { permissionStore } from '@/store/modules/permission'
import { watch, ref, computed, getCurrentInstance } from 'vue'
import { RouteRecord, Route } from 'vue-router'
import { SvgIcon } from '_c'
const root = (getCurrentInstance() as any).proxy

const route = computed(() => root.$route)
const router = root.$router
const levelList = ref<RouteRecord[]>([])
const addRouters = computed(() => permissionStore.addRouters)

watch(route, (route: Route) => {
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
})

function getBreadcrumbRoutes() {
  let currentRoutes: RouteRecord[] = []
  const first = route.value.matched[0]
  let last = route.value.matched[route.value.matched.length - 1]
  const matched: RouteRecord[] = []

  // 倒序遍历有meta.parent标识的路由
  for (let i = route.value.matched.length - 1; i >= 0; i--) {
    const match = route.value.matched[i]
    const meta = match.meta || {}
    matched.unshift(match)
    if (meta.parent) {
      last = match
      break
    }
  }

  // 填充降级后缺失的各级路由
  addRouters.value.map((item) => {
    if (item.path === first.path) {
      currentRoutes = item.children as RouteRecord[]
      getParentRoute(currentRoutes, last, matched)
    }
  })
  matched.unshift(first)
  return matched
}

function getParentRoute(
  currentRoutes: RouteRecord[],
  last: RouteRecord,
  matched: RouteRecord[] = []
) {
  const meta = last.meta || {}
  currentRoutes.forEach((item) => {
    if (item.path === meta.parent) {
      matched.unshift(item)
      getParentRoute(currentRoutes, item, matched)
    }
  })
  return matched
}

function getBreadcrumb() {
  const matched = getBreadcrumbRoutes().filter((item) => item.meta && item.meta.title)
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

function pathCompile(path: string) {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route.value
  const toPath = compile(path)
  return toPath(params)
}

function handleLink(item: RouteRecord) {
  const { redirect, path } = item
  // 如果已经是当前路由，不重定向，不然控制台会报错。
  if (redirect === route.value.fullPath) {
    return
  }
  if (redirect) {
    router.push(redirect as any)
    return
  }
  router.push(pathCompile(path))
}

getBreadcrumb()
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .icon-breadcrumb {
    color: #97a8be;
  }
}
</style>
