# ComForm 表单

对 `element-ui` 中的 `Form` 组件进行二次封装。

数据渲染采用的是数据驱动，只需传入 `schema` 就可以进行最简单的数据展示。

`ComForm` 组件代码位于`src/components/ComForm`

## 使用

``` vue
<template>
  <div>
    <com-form :schema="formSchema" @register="register" />
  </div>
</template>

<script setup lang="ts">
import { unref } from '@vue/composition-api'
import { useForm } from '_h/web/useForm'
const { register, formRef, formData } = useForm()

const requiredRule: {
  required: boolean
  message: string
} = {
  required: true,
  message: '该项为必填项'
}

const formSchema: FormSchemaConfig[] = [
  {
    field: 'field1',
    label: '单选框',
    component: 'Radio',
    value: '1',
    formItemProps: {
      rules: [requiredRule]
    },
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field2',
    label: '单选框组',
    value: '',
    component: 'RadioGroup',
    formItemProps: {
      rules: [requiredRule]
    },
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field3',
    label: '单选框组',
    value: '',
    component: 'Checkbox',
    formItemProps: {
      rules: [requiredRule]
    },
    options: [
      {
        label: '选项1',
        value: '1'
      }
    ],
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field4',
    label: '多选框组',
    value: [],
    component: 'CheckboxGroup',
    formItemProps: {
      rules: [requiredRule]
    },
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field5',
    label: '输入框',
    formItemProps: {
      rules: [requiredRule]
    },
    value: '',
    component: 'Input',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field6',
    label: '输入框',
    formItemProps: {
      rules: [requiredRule]
    },
    value: '',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 2,
      placeholder: '请输入内容'
    },
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field18',
    component: 'Divider',
    colProps: {
      span: 24
    }
  },
  {
    field: 'field7',
    label: '计数器',
    formItemProps: {
      rules: [requiredRule]
    },
    value: 0,
    component: 'InputNumber',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field8',
    label: '选择器',
    value: '',
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'Select',
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field9',
    label: '级联选择器',
    value: [],
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'Cascader',
    options: [
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
            value: 'form',
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
    ],
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field10',
    label: '开关',
    value: false,
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'Switch',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field12',
    label: '时间选择器',
    value: '',
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'TimePicker',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field13',
    label: '日期选择器',
    value: '',
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'DatePicker',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field14',
    label: '日期时间选择器',
    value: '',
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'DatePicker',
    componentProps: {
      type: 'datetime'
    },
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field15',
    label: '评分',
    value: 1,
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'Rate',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field16',
    label: '颜色选择器',
    value: '',
    formItemProps: {
      rules: [requiredRule]
    },
    component: 'ColorPicker',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field17',
    label: '穿梭框',
    value: [],
    formItemProps: {
      rules: [requiredRule]
    },
    options: [
      {
        label: '备选项1',
        value: '1',
        key: '1'
      },
      {
        label: '备选项2',
        value: '2',
        key: '2'
      },
      {
        label: '备选项3',
        value: '3',
        key: '3',
        disabled: true
      }
    ],
    component: 'Transfer',
    onChange: (item) => {
      console.log(item)
    }
  },
  {
    field: 'field19',
    label: '下拉树',
    component: 'TreeSelect',
    value: '',
    options: [
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
          }
        ]
      }
    ],
    formItemProps: {
      rules: [requiredRule]
    },
    onChange: (item) => {
      console.log(item)
    }
  }
]
</script>

<style></style>

```

## Attributes

::: tip 提示
除以下参数外，官方文档内的 `Attributes` 都支持，具体可以参考 [element Form](https://element.eleme.cn/#/zh-CN/component/form)
:::

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------- |---------- |---------- |---------- |
| schema | 布局展示的数据，具体项详见[下表](#Schema) | array | — | [] |

## Schema<span id="Schema"></span>

| 属性  | 说明                               | 类型   | 可选值  | 默认值 |
| ----- | ---------------------------------- | ------ | ------- | ------ |
| field | 字段名 | string | —       | —      |
| label | 标题                               | string | —       | —      |
| colProps  | el-col的props                     | Object | — | —    |
| formItemProps  | form-item的props                     | Object | — | —    |
| component  | 组件名称                    | Radio/RadioGroup/Checkbox/CheckboxGroup/Input/InputNumber/Select/Cascader/Switch/Slider/TimePicker/DatePicker/Rate/ColorPicker/Transfer/Divider/TreeSelect | — | —    |
| componentProps  | 组件对应的props                    | Object | — | —    |
| value  | 值                    | string/number/boolean/array/null | — | —    |
| options  | 下拉项，具体项详见[下表](#Options)                    | array | — | —    |
| optionsField  | 下拉项别名，具体项详见[下表](#OptionsField)                    | Object | — | —    |
| onChange  | change事件                    | Function | — | —    |
| hidden  | 是否隐藏                   | boolean | ture/false | false    |

## Options<span id="Options"></span>

| 属性  | 说明                               | 类型   | 可选值  | 默认值 |
| ----- | ---------------------------------- | ------ | ------- | ------ |
| label | 名称                               | string | —       | —      |
| value  | 值                     | string/number | — | —    |
| disabled  | 是否禁用                     | boolean | ture/false | false    |
| key  | 唯一标识                    | string | — | —    |
| children  | 属性解构                    | array | — | —    |

## OptionsField<span id="OptionsField"></span>

| 属性  | 说明                               | 类型   | 可选值  | 默认值 |
| ----- | ---------------------------------- | ------ | ------- | ------ |
| labelField | label别名                               | string | —       | —      |
| valueField  | value别名                     | string | — | —    |

## Events

| 事件名 | 说明 | 参数 |
|---------- |-------- |-------- |
| register | 注册事件，可以配合useForm使用 | el, _this, data |

## Slot

| name | 说明 |
|---------- |-------- |
| — | 默认内容 |
| custom | 自定义内容 |

## UseForm

| 事件名/属性 | 类型 | 说明 | 参数 |
|---------- |---------- |-------- |-------- |
| register | Function | 注册事件，需要注册到Form组件的Events中 | el, _this, data |
| formRef | Object | Form实例 | — |
| formData | Object | 表单数据 | — |
| setProps | Function | 用于修改schema中的对应属性 | (field: string, val: any, path: string) |
| addSchema | Function | 用于新增schema属性 | (formCong: FormSchemaConfig, index?: number) |
| delSchema | Function | 用于删除schema属性 | (index?: number) |
| setValue | Function | 用于设置表单值 | (field: string, value: FormValueType) |
