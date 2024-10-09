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
      { label: 'default', value: 'default' },
      { label: 'primary', value: 'primary' },
      { label: 'succes', value: 'success' },
      { label: 'warning', value: 'warning' },
      { label: 'danger', value: 'danger' },
      { label: 'info', value: 'info' }
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
