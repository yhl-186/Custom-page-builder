<!-- ButtonComponent.vue -->
<template>
  <el-button :type="buttonType" @click="handleClick($event)">
    <slot>{{ label }}</slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

// 定义 SelectOption 接口
export interface SelectOption {
  label: string
  value: string // Select option 的值
}

// 定义 ComponentProperty 接口
export interface ComponentProperty {
  key: string
  label: string
  type: 'text' | 'select' | 'number'
  options?: SelectOption[]
  defaultValue?: string | number | null // 更具体的默认值类型
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

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String as PropType<
        'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'text'
      >,
      default: 'primary'
    }
  },
  computed: {
    buttonType() {
      return this.type
    }
  },
  methods: {
    handleClick(event: MouseEvent) {
      event.stopPropagation() // Prevent event bubbling
      this.$emit('click', event) // Emit with event payload
    }
  }
})
</script>

<style scoped>
.el-button {
  margin: 5px;
}
</style>
