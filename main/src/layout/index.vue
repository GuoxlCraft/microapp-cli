<template>
  <div class="app-wrapper">
    <component :is="Classic" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Layout'
})
</script>

<script setup lang="ts">
// @ts-ignore
import Classic from './modules/Classic.vue'
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
