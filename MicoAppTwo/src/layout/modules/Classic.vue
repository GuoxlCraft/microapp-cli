<template>
  <div :class="classObj" class="app__wrap">
    <div :class="classObj" class="app__wrap_header">
      <TopBar />
    </div>
    <div :class="classObj" class="app__wrap_body">
      <!-- Classic -->
      <div
        class="sidebar__wrap"
        :class="{
          'sidebar__wrap--collapsed': collapsed,
          'sidebar__wrap--tab': showMenuTab
        }"
      >
        <div style="display: flex; height: 100%">
          <div v-if="showMenuTab" class="menu__tab">
            <menu-tab />
          </div>
          <div class="side_bar" style="height: 100%; flex: 1">
            <sider :layout="layout" mode="vertical" />
          </div>
        </div>
        <div class="sidebar__btn" @click="setCollapsed(!collapsed)">
          <i :class="collapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </div>
      </div>

      <div
        class="main__wrap"
        :class="{
          'main__wrap--collapsed': collapsed,
          'main__wrap--tab': showMenuTab,
          'main__wrap--tab--collapsed': showMenuTab && collapsed
        }"
      >
        <div
          class="main__wrap--content"
          :class="{
            'main__wrap--fixed--all': fixedHeader && showNavbar && showTags,
            'main__wrap--fixed--nav': fixedHeader && showNavbar && !showTags,
            'main__wrap--fixed--tags': fixedHeader && !showNavbar && showTags
          }"
        >
          <div
            class="header__wrap"
            :class="{
              'header__wrap--fixed': fixedHeader,
              'header__wrap--tab--fixed': fixedHeader && showMenuTab,
              'header__wrap--collapsed': fixedHeader && collapsed,
              'header__wrap--tab': showMenuTab,
              'header__wrap--tab--collapsed': showMenuTab && collapsed
            }"
          >
            <div v-if="showTags" id="tag-container" class="tags__wrap">
              <tags-view />
            </div>
          </div>
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Classic'
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { appStore } from '@/store/modules/app'

import AppMain from '../components/AppMain/index.vue'
import TagsView from '../components/TagsView/index.vue'
import Sider from '../components/Sider/index.vue'
import MenuTab from '../components/MenuTab/index.vue'
import TopBar from '../components/TopBar/index.vue'

const layout = computed(() => appStore.layout)
const collapsed = computed(() => appStore.collapsed)
const showTags = computed(() => appStore.showTags)
const showNavbar = computed(() => appStore.showNavbar)
const fixedHeader = computed(() => appStore.fixedHeader)
const showMenuTab = computed(() => appStore.showMenuTab)
const classObj = computed(() => {
  const obj = {}
  obj[`app__wrap--${layout.value}`] = true
  return obj
})

function setCollapsed(collapsed: boolean) {
  appStore.setCollapsed(collapsed)
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>
