declare interface FormColProps {
  span?: number
  offset?: number
  push?: number
  pull?: number
  xs?: number | IObj
  sm?: number | IObj
  md?: number | IObj
  lg?: number | IObj
  xl?: number | IObj
  tag?: string
}

declare type FormComponent =
  | 'Radio'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'Cascader'
  | 'Switch'
  | 'Slider'
  | 'TimePicker'
  | 'DatePicker'
  | 'Rate'
  | 'ColorPicker'
  | 'Transfer'
  | 'Divider'
  | 'TreeSelect'

declare interface FormOptionsConfig {
  label: string // 名称
  value: string | number | boolean // 值
  disabled?: boolean // 是否禁用
  key?: string | number // 唯一标识
  children?: FormOptionsConfig[]
}

declare interface FormOptionsField {
  labelField?: string // label别名
  valueField?: string // value 别名
}

declare type FormValueType = string | number | string[] | number[] | boolean | null

declare interface FormSchemaConfig {
  field: string // 字段名
  label?: string // label名
  colProps?: FormColProps // el-col props
  formItemProps?: IObj // form-item的props
  component?: FormComponent // 组件名称
  inputDisabled?: boolean
  componentProps?: IObj // 组件对应的props
  value?: FormValueType // 值
  options?: FormOptionsConfig[] // 下拉项
  optionsField?: FormOptionsField // 下拉项别名
  onChange?: (T: IObj) => void // change事件
  hidden?: boolean // 是否隐藏
  required?: boolean // 是否可以为空
}
