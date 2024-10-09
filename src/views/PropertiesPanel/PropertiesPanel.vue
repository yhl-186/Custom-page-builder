<template>
  <el-card class="properties-panel">
    <template #header>
      <span>属性面板</span>
    </template>
    <component-property-editor
      v-if="selectedComponent"
      :componentName="selectedComponent.componentName"
      :componentProperties="selectedComponent.properties"
      @update:property="updateProperty"
    />
    <p v-else>未选择组件</p>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard } from 'element-plus'
import ComponentPropertyEditor from '../../components/ComponentPropertyEditor.vue'
import type { PropType } from 'vue'
// 定义组件属性类型
interface Component {
  id: number
  componentName: string
  properties: Record<string, any> // 具体属性可以替换为更详细的接口
}

export default defineComponent({
  name: 'PropertiesPanel',
  components: {
    ElCard,
    ComponentPropertyEditor
  },
  props: {
    selectedComponent: {
      type: Object as PropType<Component | null>,
      default: null
    }
  },
  emits: ['update:property'],
  setup(props, { emit }) {
    const updateProperty = (property: { key: string; value: any }) => {
      if (props.selectedComponent) {
        // 保持原有属性，更新指定的属性
        const updatedComponent = {
          ...props.selectedComponent,
          properties: {
            ...props.selectedComponent.properties,
            [property.key]: property.value
          }
        }
        emit('update:property', updatedComponent)
      }
    }

    return {
      updateProperty
    }
  }
})
</script>

<style scoped>
.properties-panel {
  width: 300px;
  padding: 16px;
  background-color: #f8f8f8;
  border-left: 1px solid #ddd;
}
</style>
