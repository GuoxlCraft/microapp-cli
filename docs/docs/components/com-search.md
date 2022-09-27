# ComSearch 查询

针对常用的查询业务场景，对 `ComForm` 组件进行二次封装。

只需传入 `schema` 即可渲染整个查询组件。

`ComSearch` 组件代码位于`src/components/ComSearch`

## 使用

``` vue
<div class="searh">
  <com-search
    :schema="data"
    @search-submit="searchSubmit"
    @reset-submit="resetSubmit"
  />
</div>
```

## Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------- |---------- |---------- |---------- |
| labelWidth | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | string | — | - |
| showReset | 是否显示重置按钮 | boolean | false/true | true |
| layout | 布局风格 | string | right/bottom/classic | classic |
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
| searchSubmit | 点击查询时的回调事件 | data |
| resetSubmit | 点击重置时的回调事件 | data |
