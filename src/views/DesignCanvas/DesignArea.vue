<template>
  <div class="design-area">
    <h3 class="text-lg font-medium mb-4">设计区域</h3>
    <VueDraggable
      tag="div"
      :modelValue="designComponents"
      group="components"
      @update:modelValue="onUpdate"
      @change="handleChange"
    >
      <div
        v-for="comp in designComponents"
        :key="comp.id"
        class="component-item p-2 mb-2 bg-white rounded shadow hover:bg-blue-100 cursor-move"
        @click="selectComponent(comp)"
      >
        <component
          :is="comp.componentName"
          v-bind="comp.properties"
          @input="handleInputChange(comp, $event)"
        />
      </div>
    </VueDraggable>

    <!-- 只在 selectedComponent 存在时显示属性编辑器 -->
    <ComponentPropertyEditor
      v-if="selectedComponent"
      :componentName="selectedComponent.componentName"
      :componentProperties="selectedComponent.properties"
      @update:property="updateComponentProperty"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import ButtonComponent from '../../components/ButtonComponent.vue'
import InputComponent from '../../components/InputComponent.vue'
import ComponentPropertyEditor from '../../components/ComponentPropertyEditor.vue'
import type { PropType } from 'vue'

// 定义组件属性的接口
interface Component {
  id: number
  componentName: string
  properties: Record<string, any>
  value?: string
}

export default defineComponent({
  name: 'DesignArea',
  components: {
    VueDraggable,
    ButtonComponent,
    InputComponent,
    ComponentPropertyEditor
  },
  props: {
    selectedComponent: {
      type: Object as PropType<Component | null>,
      default: null
    }
  },
  emits: ['update:selectedComponent', 'update:property'],
  setup(props, { emit }) {
    const designComponents = ref<Component[]>([])

    const findComponentIndex = (id: number) => {
      return designComponents.value.findIndex((c) => c.id === id)
    }

    function onUpdate(updatedComponents: Component[]) {
      designComponents.value = updatedComponents
    }

    function handleChange(event: any) {
      if (event.added) {
        const newComponent: Component = {
          ...event.added.element,
          id: Date.now(),
          properties: {}
        }
        designComponents.value.push(newComponent)
        emit('update:selectedComponent', newComponent)
      }
    }

    function selectComponent(comp: Component) {
      emit('update:selectedComponent', comp)
    }

    function handleInputChange(comp: Component, value: string) {
      const index = findComponentIndex(comp.id)
      if (index !== -1) {
        designComponents.value[index].value = value
        emit('update:selectedComponent', { ...designComponents.value[index] })
      }
    }

    function updateComponentProperty(property: { key: string; value: any }) {
      if (props.selectedComponent) {
        const updatedComponent = {
          ...props.selectedComponent,
          properties: {
            ...props.selectedComponent.properties,
            [property.key]: property.value
          }
        }
        const index = findComponentIndex(updatedComponent.id)
        if (index !== -1) {
          designComponents.value[index] = { ...updatedComponent }
          emit('update:selectedComponent', { ...updatedComponent }) // 更新选中的组件
        }
      }
    }

    return {
      designComponents,
      onUpdate,
      handleChange,
      selectComponent,
      handleInputChange,
      updateComponentProperty
    }
  }
})
</script>

<style scoped>
.design-area {
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.component-item {
  cursor: move;
}
</style>
