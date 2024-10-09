<template>
  <div class="component-list">
    <h3 class="text-lg font-medium mb-4">组件列表</h3>
    <VueDraggable
      tag="ul"
      :modelValue="components"
      :group="{ name: 'components', pull: 'clone', put: false }"
      @update:modelValue="onUpdate"
    >
      <li
        v-for="comp in components"
        :key="comp.id"
        class="component-item p-2 mb-2 bg-white rounded shadow hover:bg-blue-100 cursor-move"
      >
        <component :is="comp.componentName" v-bind="{ label: comp.label }"></component>
      </li>
    </VueDraggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import ButtonComponent from '../../components/ButtonComponent.vue'
import InputComponent from '../../components/InputComponent.vue'

// 定义组件的类型
interface ComponentItem {
  id: number
  componentName: string
  label: string
}

export default defineComponent({
  name: 'ComponentList',
  components: {
    VueDraggable,
    ButtonComponent,
    InputComponent
  },
  setup() {
    // 使用具体类型定义 components
    const components = ref<ComponentItem[]>([
      { id: 1, componentName: 'ButtonComponent', label: '按钮' },
      { id: 2, componentName: 'InputComponent', label: '输入框' } // 演示添加输入框组件
    ])

    // 合并商的为参数提供具体类型
    function onUpdate(value: ComponentItem[]) {
      console.log('更新的组件:', value)
    }

    return {
      components,
      onUpdate
    }
  }
})
</script>

<style scoped>
.component-item {
  transition: background-color 0.2s;
}

.component-item:hover {
  background-color: #f0f8ff; /* 更亮的背景色 */
}
</style>
