# Marquee 无缝滚动

无缝滚动组件。

`Marquee` 组件代码位于`src/components/Marquee`

## 使用

```vue
<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="瀑布流组件。"
      type="info"
      style="margin-bottom: 20px"
    />
    <div style="max-height: 400px; padding: 10px; overflow: auto">
      <water-fall
        ref="waterFall"
        :is-horizontal="isHorizontal"
        :data="showImgs"
        :margin="5"
        :item-height="200"
        :columns="{
          xxl: 8,
          xl: 6,
          lg: 4,
          md: 3,
          sm: 2,
          xs: 2
        }"
      >
        <template #default="{ scope }">
          <water-fall-slot
            v-for="(item, index) in scope.data"
            :key="index"
            :width="item.$width"
            :height="item.$height"
            :left="item.$left"
            :top="item.$top"
          >
            <div style="height: 100%">
              <img :src="item.src" style="width: 100%" />
            </div>
          </water-fall-slot>
        </template>
      </water-fall>
    </div>
    <div style="margin-top: 20px">
      <el-button type="small" @click="loadMore">更多</el-button>
      <el-button type="small" @click="isHorizontal = !isHorizontal">toggle</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Mock from 'mockjs'
const RandomNum = function (start = 0, end = 100) {
  return start + Math.floor(Math.random() * (end - start))
}

export default defineComponent({
  name: 'WaterFallDemo',
  components: {
    WaterFall: () => import('_c/WaterFall/index.vue'),
    WaterFallSlot: () => import('_c/WaterFall/WaterFallSlot.vue')
  },
  setup() {
    const isHorizontal = ref<boolean>(true)
    const showImgs = ref<IObj>([])

    function getImgs() {
      const arr = []
      for (let index = 0; index < 10; index++) {
        const w = RandomNum(100, 350)
        const h = RandomNum(100, 350)
        arr.push({
          width: w,
          height: h,
          name: 'img' + index,
          src: Mock.Random.dataImage(`${w}x${h}`)
        })
      }
      return arr
    }

    showImgs.value = getImgs()

    function loadMore() {
      showImgs.value = showImgs.value.concat(getImgs())
      console.log(showImgs.value)
    }

    return {
      isHorizontal,
      showImgs,
      loadMore
    }
  }
})
</script>
```

## Attributes

| 属性         | 说明                                  | 类型    | 可选值             | 默认值 |
| ------------ | ------------------------------------- | ------- | ------------------ | ------ |
| data         | 滚动数据，用作监听数据变更，更新 html | array   | —                  | []     |
| disabled     | 是否禁用                              | boolean | true/false         | false  |
| direction    | 滚动方向                              | string  | up/down/left/right | up     |
| auto         | 是否自动开始                          | boolean | true/false         | true   |
| speed        | 滚动速度，数值越大速度越快            | number  | —                  | 1      |
| waitTime     | 间隔滚动停顿等待时间                  | number  | —                  | 3000   |
| scrollLength | 间隔滚动，每次滚动的长度，单位 px     | number  | —                  | 0      |

## Events

| 事件名称 | 说明       | 回调参数 |
| -------- | ---------- | -------- |
| start    | 开始的回调 | —        |
| stop     | 结束的回调 | —        |
| pause    | 暂停的回调 | —        |
