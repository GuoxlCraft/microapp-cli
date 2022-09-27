<template>
  <div class="sidebar-container">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="false"
        :mode="mode"
        @select="selectMenu"
      >
        <sidebar-item
          v-for="item in showMenuTab ? menuTabRouters : routers"
          :key="item.path"
          :item="item"
          :layout="layout"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Sider'
})
</script>

<script setup lang="ts">
import { PropType, computed, getCurrentInstance } from 'vue'
import { appStore, LayoutType } from '@/store/modules/app'
import { permissionStore } from '@/store/modules/permission'
import { isExternal } from '_u/validate'

import sidebarItem from './SidebarItem.vue'
const root = (getCurrentInstance() as any).proxy

type ModeType = 'vertical' | 'horizontal'

defineProps({
  layout: {
    type: String as PropType<LayoutType>,
    default: 'Classic'
  },
  mode: {
    type: String as PropType<ModeType>,
    default: 'vertical'
  }
})

const route = computed(() => root.$route)
const router = root.$router
const routers = computed(() => {
  return permissionStore.routers.find((item) => item.name === 'Root')?.children
})
const collapsed = computed(() => appStore.collapsed)
const menuTabRouters = computed(() => permissionStore.menuTabRouters)
const showMenuTab = computed(() => appStore.showMenuTab)
const activeMenu = computed(() => {
  const { meta, path }: any = route.value
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

function selectMenu(path: string) {
  if (route.value.fullPath === path) return
  if (isExternal(path)) {
    window.open(path)
  } else {
    router.push(path)
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;

  /deep/ .svg-icon {
    margin-right: 7px;
    width: 16px;
    height: 16px;
  }

  /deep/ .el-scrollbar {
    width: 100%;
    height: 100%;

    .el-scrollbar__wrap {
      overflow: scroll;
      overflow-x: hidden;

      .el-menu {
        width: 100%;
        border: none;
      }
    }
  }
}
</style>
