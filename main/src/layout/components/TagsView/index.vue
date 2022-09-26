<template>
  <div class="tags-view-container">
    <div class="container-left hover-container" @click="move(-200)">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!(tag.meta && tag.meta.affix)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </scroll-pane>
    <div class="container-right">
      <div class="hover-container">
        <i class="el-icon-d-arrow-right" @click="move(200)"></i>
      </div>
      <div class="hover-container" @click="refreshSelectedTag(selectedTag)">
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <span>
            <svg-icon icon-class="refresh" />
          </span>
        </el-tooltip>
      </div>
      <div class="hover-container" @click="closeSelectedTag(selectedTag)">
        <el-tooltip effect="dark" content="关闭" placement="bottom">
          <span>
            <svg-icon icon-class="close" />
          </span>
        </el-tooltip>
      </div>
    </div>

    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <!-- <li @click="closeAllTags(selectedTag)">关闭全部</li> -->
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TagsView'
})
</script>

<script setup lang="ts">
import { watch, computed, ref, nextTick, onMounted, getCurrentInstance } from 'vue'
import { SvgIcon } from '_c'
import ScrollPane from './ScrollPane.vue'

import { tagsViewStore, ITagView } from '@/store/modules/tags-view'
import { permissionStore } from '@/store/modules/permission'
import path from 'path'
import { RouteConfig } from 'vue-router'

const { refs } = getCurrentInstance() as any
const root = (getCurrentInstance() as any).proxy

const route = computed(() => root.$route)
const router = root.$router
const visible = ref<boolean>(false)
const top = ref<number>(0)
const left = ref<number>(0)
const selectedTag = ref<ITagView>({})
const affixTags = ref<ITagView[]>([])
const visitedViews = computed(() => tagsViewStore.visitedViews)
const routers = computed(() => permissionStore.routers)

watch(route, () => {
  console.log(visitedViews, 'visitedViews')
  addTags()
  moveToCurrentTag()
})

watch(visible, (value: boolean) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

function isActive(r: ITagView) {
  return r.path === route.value.path
}

function filterAffixTags(routes: RouteConfig[], basePath = '/') {
  let tags: RouteConfig[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      } as any)
    }
    if ((route as any).children) {
      const tempTags = filterAffixTags((route as any).children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })

  return tags
}

function initTags() {
  affixTags.value = filterAffixTags(routers.value)
  for (const tag of affixTags.value) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

function addTags() {
  const { name } = route.value as ITagView
  if (name) {
    selectedTag.value = route.value as ITagView
    tagsViewStore.addView(route.value as ITagView)
  }
  return false
}

function moveToCurrentTag() {
  const tags = refs.tag as any[]
  nextTick(() => {
    for (const tag of tags) {
      if ((tag as any).to.path === route.value.path) {
        ;(refs.scrollPane as any).moveToTarget(tag as any)
        // when query is different then update
        if ((tag as any).to.fullPath !== route.value.fullPath) {
          tagsViewStore.updateVisitedView(route.value as RouteConfig)
        }
        break
      }
    }
  })
}

function refreshSelectedTag(view: ITagView) {
  tagsViewStore.delCachedView(view).then(() => {
    const { fullPath } = view as any
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}

function closeSelectedTag(view: ITagView) {
  if (view.meta && view.meta.affix) return
  tagsViewStore.delView(view).then(({ visitedViews }: any) => {
    if (isActive(view)) {
      toLastView(visitedViews)
    }
  })
}

function closeOthersTags() {
  tagsViewStore.delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
  if (selectedTag.value.fullPath === route.value.path) {
    return
  }
  router.push(selectedTag.value)
}

// function closeAllTags(view: ITagView) {
//   tagsViewStore.delAllViews().then(({ visitedViews }: any) => {
//     if (affixTags.value.some((tag) => tag.path === view.path)) {
//       return
//     }
//     toLastView(visitedViews)
//   })
// }

function toLastView(visitedViews: ITagView[]) {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    console.log(permissionStore.addRouters, 'No visited view found')
    if (
      route.value.path === permissionStore.addRouters[0].path ||
      route.value.path === permissionStore.addRouters[0].redirect
    ) {
      addTags()
      return
    }
    // You can set another route
    router.push(permissionStore.addRouters[0].path)
  }
}

function openMenu(tag: ITagView, e: MouseEvent) {
  const menuMinWidth = 105
  // const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = (root.$el as HTMLElement).offsetWidth // container width
  const maxLeft = offsetWidth + menuMinWidth // left boundary
  const _left = e.clientX

  if (_left > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = _left
  }
  top.value = e.clientY

  visible.value = true
  selectedTag.value = tag
}

function closeMenu() {
  visible.value = false
}

function move(to: number) {
  ;(refs.scrollPane as any).moveTo(to)
}

function getUserInfo() {
  return {
    name: 'admin',
    avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}
// function toHome() {
//   if (
//     permissionStore.addRouters[0].path === route.value.fullPath ||
//     permissionStore.addRouters[0].redirect === route.value.fullPath
//   ) {
//     return
//   }
//   router.push(permissionStore.addRouters[0].path)
// }

onMounted(() => {
  getUserInfo()
  initTags()
  addTags()
})
</script>

<style lang="less" scoped>
.tags-view-container {
  z-index: 1;
  display: flex;
  width: 100%;
  height: @tagsViewHeight;
  background-color: @menuBg;
  box-shadow: 0px 2px 8px 0px rgba(115, 117, 136, 0.15);

  .container-left {
    width: 45px;
    line-height: @tagsViewHeight;
    text-align: center;
    cursor: pointer;
  }

  .container-right {
    display: flex;
    flex: 0 0 120px;
    line-height: @tagsViewHeight;

    & > div {
      text-align: center;
      cursor: pointer;
    }
  }

  .tags-view-wrapper {
    height: @tagsViewHeight;

    .tags-view-item {
      position: relative;
      top: -1px;
      display: inline-block;
      height: @tagsViewHeight - 20px;
      padding: 0px 40px 0px 20px;
      border-right: 1px solid #818a91;
      font-size: 14px;
      margin: 10px;
      line-height: @tagsViewHeight - 20px;
      color: #495770;
      box-sizing: border-box;
      cursor: pointer;
      background-color: @menuBg;
      &.active {
        position: relative;
        background-color: @menuBg;
        color: #687bff;
      }
    }
    .tags-view-item:nth-child(1) {
      border-left: 1px solid #818a91;
    }
  }

  .contextmenu {
    position: fixed;
    z-index: 100;
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    list-style-type: none;
    background: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      padding: 7px 16px;
      margin: 0;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      position: absolute;
      top: 50%;
      right: 0;
      width: 18px;
      height: 18px;
      color: #bfc7cd;
      text-align: center;
      vertical-align: 2px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &::before {
        display: inline-block;
        vertical-align: -2px;
      }

      &:hover {
        color: #fff;
        background-color: #b4bccc;
      }
    }
  }
}

.hover-container {
  flex: 0 0 40px;
  color: #818a91;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: @subMenuHover;
  }
}
</style>
