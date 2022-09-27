<template>
  <div style="display: inline">
    <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon', 'anticon']"></i>
    <svg-icon v-else-if="icon" :icon-class="icon" class="anticon" />
    <slot v-if="title" name="title">
      <span class="anticon-item">{{ title }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Item'
}
</script>
<script setup lang="ts">
import { SvgIcon } from '_c'
defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.anticon-item {
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
