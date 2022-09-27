# TreeSelect 下拉树

下拉树组件。

由于之前写法的原因，改写成`composition-api`成本太高，所以单独剥离出去，做成一个插件来维护。

## 使用

```vue
<template>
  <div>
    <tree-select
      v-model="value1"
      option-max-width="300px"
      :clearable="true"
      :default-expand-all="false"
      :data="options"
      placeholder="请选择"
      @change="treeSelectChange"
    />
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref } from '@vue/composition-api'
import TreeSelect from 'vue2-tree-select'
import 'vue2-tree-select/dist/css/index.css'

export default defineComponent({
  components: {
    TreeSelect
  },
  setup() {
    const options = ref<IObj>([])
    const value1 = ref<string>('')

    setTimeout(() => {
      options.value = [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'formWrap',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ]
    }, 2000)

    function treeSelectChange(val: any) {
      console.log(val)
    }

    return {
      options,
      value1,
      treeSelectChange
    }
  }
})
</script>

<style></style>
```

## Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 渲染的数组 | array | — | [] |
| id | 标签 Id | string | — | — |
| name | 标签 name | string | — | — |
| value | v-model 值 | string/number/array | — | — |
| multiple | 是否多选 | boolean | true/false | false |
| clearable | 是否可以清空选项 | boolean | true/false | false |
| defaultExpandAll | 是否展开所有 | boolean | true/false | false |
| size | 输入框尺寸 | string | medium/small/mini | — |
| props | 配置选项，详见[下表](#Props) | object | — | — |
| placeholder | 提示语 | string | — | 请选择 |
| nodeKey | 唯一标识 | string/number/array | — | value |
| lazy | 是否懒加载 | boolean | true/false | false |
| load | 加载子树数据的方法，仅当 lazy 属性为 true 时生效 | function | — | — |
| showCheckbox | 是否显示多选框 | boolean | true/false | false |
| checkStrictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false | boolean | true/false | false |
| expandOnClickNode | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 | boolean | true/false | true |
| filterable | 是否可搜索 | boolean | true/false | false |
| filterMethod | 搜索方法，当 filterable 为 true 时生效 | function | — | — |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean | true/false | false |
| collapseTagsMaxNum | 多选时将选中值按文字的形式展示最大个数 | number | — | 1 |
| tooltipEffect | tooltip 默认提供的主题 | string | dark/light | dark |
| optionMaxWidth | 下拉项最大宽度 | string | — | — |
| renderContent | 自定义渲染方法 | function | — | — |

## Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 指定节点标签为节点对象的某个属性值 | string, function(data, node) | — | — |
| children | 指定子树为节点对象的某个属性值 | string | — | — |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | boolean, function(data, node) | — | — |
| isLeaf | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | — | — |

## Events

| 事件名称 | 说明             | 回调参数 |
| -------- | ---------------- | -------- |
| change   | 值改变的后的回到 | value    |
