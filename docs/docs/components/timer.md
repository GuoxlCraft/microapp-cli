# Timer 计时器

基于`dayjs`的计时器组件。

`Timer` 组件代码位于`src/components/Timer`

## 使用

```vue
<template>
  <div>
    <timer auto />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    Timer: () => import('_c/Timer/index.vue')
  }
})
</script>

<style></style>
```

## Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| target | 设定值，String 为时间格式，Number 是秒数，countdown 为 true，是开始值，countdown 为 false 时结束值 | string/number | — | — |
| format | 显示格式 | string | — | HH:mm:ss |
| countdown | 倒数模式 | boolean | true/false | false |
| type | 颜色类型 | string | primary/success/warning/danger/info | — |
| auto | 是否自动开始 | boolean | true/false | false |
| interval | 执行时间隔 单位 ms | number | — | 1000 |
| interval | 执行时间隔 单位 ms | number | — | 1000 |

## Events

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| start    | 开始的回调         | —        |
| stop     | 暂停或者结束的回调 | —        |
| reset    | 重置的回调         | —        |
