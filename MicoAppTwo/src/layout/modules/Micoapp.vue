<template>
  <div class="Micoapp-main">
    <keep-alive :include="canKeepAlive">
      <router-view :key="key" class="view-main" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Micoapp'
})
</script>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { appStore } from '@/store/modules/app'
const root = (getCurrentInstance() as any).proxy
const route = computed(() => root.$route)
const key = computed(() => route.value.name)

const cacheViews = ref<(string | undefined)[]>([])
root.$mainAciton.onGlobalStateChange((state: Record<string, any>) => {
  cacheViews.value = state.cacheViews || []
}, true)

const canKeepAlive = computed((): (string | undefined)[] => {
  // 获取子应用开头的缓存信息
  console.log('cacheViews', cacheViews.value)
  const appCacheViews = cacheViews.value.filter((item: string) =>
    item.startsWith(appStore.microAppName)
  )
  // 获取缓存组件 name
  console.log(appCacheViews, 'appCacheViews')
  return appCacheViews
})
</script>

<style lang="less" scoped>
.Micoapp-main {
  height: 100%;
}
</style>
