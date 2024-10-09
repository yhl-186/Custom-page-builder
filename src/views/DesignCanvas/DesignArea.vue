<!-- DesignArea.vue -->
<template>
  <div class="design-area">
    <h3 class="text-lg font-medium mb-4">Design Area</h3>
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
          @click.stop="handleComponentClick(comp)"
        ></component>
      </div>
    </VueDraggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import ButtonComponent from '../../components/ButtonComponent.vue'
import InputComponent from '../../components/InputComponent.vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'DesignArea',
  components: {
    VueDraggable,
    ButtonComponent,
    InputComponent
  },
  props: {
    selectedComponent: {
      type: Object as PropType<Record<string, any> | null>,
      default: null
    }
  },
  emits: ['update:selectedComponent', 'update:property'],
  setup(props, { emit }) {
    const designComponents = ref<any[]>([])

    function onUpdate(value: any[]) {
      designComponents.value = value
    }

    function handleChange(event: any) {
      if (event.added) {
        const newComponent = {
          ...event.added.element,
          id: Date.now(),
          type: 'default',
          value: '',
          properties: {}
        }
        designComponents.value.push(newComponent)
        emit('update:selectedComponent', newComponent) // 选中新添加的组件
      }
    }

    function selectComponent(comp: any) {
      emit('update:selectedComponent', comp)
    }

    function handleComponentClick(comp: any) {
      console.log('Component clicked:', comp)
    }

    function handleInputChange(comp: any, value: string) {
      const index = designComponents.value.findIndex((c) => c.id === comp.id)
      if (index !== -1) {
        designComponents.value[index].value = value
        emit('update:selectedComponent', { ...designComponents.value[index] })
      }
    }

    function updateComponentProperty(property: { key: string; value: any }) {
      if (props.selectedComponent) {
        const updatedComponent = { ...props.selectedComponent }
        updatedComponent.properties[property.key] = property.value
        const index = designComponents.value.findIndex((c) => c.id === updatedComponent.id)
        if (index !== -1) {
          designComponents.value[index] = { ...updatedComponent }
          emit('update:selectedComponent', { ...updatedComponent })
        }
      }
    }

    return {
      designComponents,
      onUpdate,
      handleChange,
      selectComponent,
      handleComponentClick,
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
