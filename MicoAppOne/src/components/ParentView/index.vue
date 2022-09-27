<template>
  <keep-alive :include="cacheList" :exclude="notCacheName">
    <router-view />
  </keep-alive>
</template>

<script lang="ts">
export default {
  name: 'ParentView'
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { tagsViewStore } from '@/store/modules/tags-view'
const root = (getCurrentInstance() as any).proxy

const route = root.$route
const tagNavList = computed(() => tagsViewStore.visitedViews)
const notCacheName = computed(() => [route.meta && route.meta.noCache ? route.name : ''])
const cacheList = computed(() => {
  return [
    'ParentView',
    'MicroAppView',
    ...(tagNavList.value.length
      ? tagNavList.value
          .filter((item) => !(item.meta && item.meta.noCache))
          .map((item) => item.name)
      : [])
  ]
})
</script>
