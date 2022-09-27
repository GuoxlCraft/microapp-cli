<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIcon'
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  // svg文件名
  iconClass: {
    type: String,
    required: true
  },
  // 自定义类名
  className: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  } else {
    return 'svg-icon'
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
