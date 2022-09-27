<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent.native="handleScroll"
  >
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts">
export default {
  name: 'ScrollPane'
}
</script>

<script setup lang="ts">
import { nextTick, getCurrentInstance } from 'vue'
import { useScrollTo } from '_h/event/useScrollTo'

const root = getCurrentInstance()?.proxy as any
console.log(getCurrentInstance())
const tagAndTagSpacing = 4 // tagAndTagSpacing

defineExpose({
  moveToTarget,
  moveTo
})

function handleScroll(e: WheelEvent) {
  // @ts-ignore
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = (root.$refs.scrollContainer as any).$root.$refs.wrap as HTMLElement
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

function moveToTarget(currentTag: HTMLElement) {
  const $container = (root.$refs.scrollContainer as any).$el as HTMLElement
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = (root.$refs.scrollContainer as any).$refs.wrap as HTMLElement
  const tagList = (root.$parent as any).$refs.tag as any[]

  let firstTag: any = null
  let lastTag: any = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item: any) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]
    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
      (nextTag.$el as HTMLElement).offsetLeft +
      (nextTag.$el as HTMLElement).offsetWidth +
      tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = (prevTag.$el as HTMLElement).offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      nextTick(() => {
        const { start } = useScrollTo({
          el: $scrollWrapper,
          position: 'scrollLeft',
          to: afterNextTagOffsetLeft - $containerWidth,
          duration: 500
        })
        start()
      })
      // $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      // $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
      nextTick(() => {
        const { start } = useScrollTo({
          el: $scrollWrapper,
          position: 'scrollLeft',
          to: beforePrevTagOffsetLeft,
          duration: 500
        })
        start()
      })
    }
  }
}

function moveTo(to: number) {
  const $scrollWrapper = (root.$refs.scrollContainer as any).$root.$refs.wrap as HTMLElement
  nextTick(() => {
    const { start } = useScrollTo({
      el: $scrollWrapper,
      position: 'scrollLeft',
      to: $scrollWrapper.scrollLeft + to,
      duration: 500
    })
    start()
  })
}
</script>

<style lang="less">
.scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  .el-scrollbar__bar {
    bottom: 0;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>
