<template>
  <div
    v-if="!(item.meta && item.meta.hidden)"
    :style="{ display: 'block' }"
  >
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!(onlyOneChild && onlyOneChild.children) ||
          (onlyOneChild && onlyOneChild.noShowingChildren)) &&
        !(item.meta && item.meta.alwaysShow)
      "
    >
      <el-menu-item
        :index="
          resolvePath(
            onlyOneChild.path,
            showMenuTab ? `${activeTab === '/dashboard' ? '' : activeTab}/${basePath}` : ''
          )
        "
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <item
          v-if="onlyOneChild.meta"
          :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
        />
        <template #title>
          <span class="anticon-item">{{ onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-submenu
      v-else
      :popper-class="'nest-popper-menu'"
      :index="
        resolvePath(
          item.path,
          showMenuTab ? `${activeTab === '/dashboard' ? '' : activeTab}/${basePath}` : ''
        )
      "
    >
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :layout="layout"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarItem'
})
</script>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import path from 'path'
import { isExternal } from '_u/validate'
import { appStore, LayoutType } from '@/store/modules/app'
import { permissionStore } from '@/store/modules/permission'
import { RouteConfig } from 'vue-router'
import Item from './Item.vue'
const props = defineProps({
  item: {
    type: Object as PropType<RouteConfig>,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  },
  layout: {
    type: String as PropType<LayoutType>,
    default: 'Classic'
  }
})

const onlyOneChild = ref<Nullable<RouteConfig | any>>(null)
const showMenuTab = computed(() => appStore.showMenuTab)
const activeTab = computed(() => permissionStore.activeTab)

function hasOneShowingChild(children: RouteConfig[] = [], parent: RouteConfig) {
  const showingChildren = children.filter((item) => {
    if (item.meta && item.meta.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = {
      ...parent,
      path: '',
      noShowingChildren: true
    } as any
    return true
  }

  return false
}

function resolvePath(routePath: string, otherPath?: string) {
  if (isExternal(routePath)) {
    return routePath
  }
  return path.resolve((otherPath || props.basePath) as string, routePath)
}
</script>

