<template>
  <div class="app-main">
    <keep-alive :include="cachedViews">
      <router-view :key="key" class="view-main" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppMain'
})
</script>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { tagsViewStore } from '@/store/modules/tags-view'

const root = (getCurrentInstance() as any).proxy

const route = computed(() => root.$route)
const cachedViews = computed(() => ['MicroAppView', ...tagsViewStore.cachedViews])
const key = computed(() => route.value.name)
</script>

<style lang="less" scoped>
.app-main {
  height: calc(100% - 40px);
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #F3F8FF
}
</style>
