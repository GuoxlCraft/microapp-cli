# WaterFall 瀑布流

瀑布流组件。

`WaterFall` 组件代码位于`src/components/WaterFall`

## 使用

``` vue
<template>
  <div style="max-height: 400px; overflow: auto; padding: 10px">
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
            <img :src="item.src" style="width: 100%">
          </div>
        </water-fall-slot>
      </template>
    </water-fall>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Mock from 'mockjs'
const RandomNum = function(start = 0, end = 100) {
  return start + Math.floor(Math.random() * (end - start))
}

@Component({
  components: {
    WaterFall: () => import('_c/WaterFall/index.vue'),
    WaterFallSlot: () => import('_c/WaterFall/WaterFallSlot.vue')
  }
})
export default class WaterFallDemo extends Vue {
  private isHorizontal = true
  private showImgs: any[] = []

  private getImgs() {
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

  created() {
    this.showImgs = this.getImgs()
  }
}
</script>

```

## Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------- |---------- |---------- |---------- |
| isHorizontal | 是否水平模式 | boolean | true/false | true |
| data | 展示的数据，用于监听变化 | array | — | [] |
| itemHeight | 容器高度 | number | — | 200 |
| margin | 每个项的间距 | number | — | 5 |
