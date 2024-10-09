export interface ComponentProperty {
  key: string
  label: string
  type: 'text' | 'select' | 'number'
  options?: SelectOption[]
  defaultValue?: string | number | null // 更具体的默认值类型
}

export interface SelectOption {
  label: string
  value: string // Select option 的值
}

// 定义按钮类型选项
const buttonTypeOptions: SelectOption[] = [
  { label: '默认', value: 'default' },
  { label: '主要', value: 'primary' },
  { label: '成功', value: 'success' },
  { label: '警告', value: 'warning' },
  { label: '危险', value: 'danger' },
  { label: '信息', value: 'info' }
]

// 定义按钮的属性
export const buttonProperties: ComponentProperty[] = [
  {
    key: 'type',
    label: '按钮类型',
    type: 'select',
    options: buttonTypeOptions, // 使用常量替换
    defaultValue: 'default'
  },
  {
    key: 'label',
    label: '按钮文字',
    type: 'text',
    defaultValue: '按钮'
  }
]

// 组件属性集合
export const componentProperties: Record<string, ComponentProperty[]> = {
  ButtonComponent: buttonProperties
}
