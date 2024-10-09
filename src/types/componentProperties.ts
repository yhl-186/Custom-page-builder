// src/types/ComponentProperties.ts
export interface ComponentProperty {
  key: string
  label: string
  type: 'text' | 'select' | 'number'
  options?: { label: string; value: string }[]
  defaultValue?: any
}

export const buttonProperties: ComponentProperty[] = [
  {
    key: 'type',
    label: '按钮类型',
    type: 'select',
    options: [
      { label: '默认', value: 'default' },
      { label: '主要', value: 'primary' },
      { label: '成功', value: 'success' },
      { label: '警告', value: 'warning' },
      { label: '危险', value: 'danger' },
      { label: '信息', value: 'info' }
    ],
    defaultValue: 'default'
  },
  {
    key: 'label',
    label: '按钮文字',
    type: 'text',
    defaultValue: '按钮'
  }
]

export const componentProperties: Record<string, ComponentProperty[]> = {
  ButtonComponent: buttonProperties
}
