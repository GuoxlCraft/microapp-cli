# Ellipsis 省略号

省略号组件。

`Ellipsis` 组件代码位于`src/components/Ellipsis`

## 使用

```vue
<template>
  <div>
    <ellipsis :content="content" :height="height" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  components: {
    Ellipsis: () => import('_c/Ellipsis/index.vue')
  },
  setup() {
    const content = ref<string>(
      '是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示是否显示分隔线。默认数值轴显示，类目轴不显示,是否显示分隔线。默认数值轴显示，类目轴不显示'
    )
    const height = ref<number>(400)

    return {
      content,
      height
    }
  }
})
</script>
```

## Attributes

| 属性        | 说明               | 类型           | 可选值     | 默认值 |
| ----------- | ------------------ | -------------- | ---------- | ------ |
| content     | 内容               | string         | —          | —      |
| showTooltip | 是否显示 tooltip   | boolean        | true/false | false  |
| height      | 按高度显示省略号   | boolean/number | —          | —      |
| rows        | 按行数显示省略号   | number         | —          | —      |
| chars       | 按字符数显示省略号 | number         | —          | —      |
