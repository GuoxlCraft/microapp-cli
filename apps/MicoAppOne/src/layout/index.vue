<template>
  <div class="app-wrapper">
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { appStore } from '@/store/modules/app'
// @ts-ignore
import Classic from './modules/Classic.vue'
// @ts-ignore
import Micoapp from './modules/Micoapp.vue'
const layout = computed(() => {
  const layout = appStore.layout
  return layout === 'Classic' ? Classic : Micoapp
})
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
