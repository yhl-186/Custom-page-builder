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
        <component :is="comp.componentName" :label="comp.label"></component>
      </li>
    </VueDraggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import ButtonComponent from '../../components/ButtonComponent.vue'
import InputComponent from '../../components/InputComponent.vue'
export default defineComponent({
  name: 'ComponentList',
  components: {
    VueDraggable,
    ButtonComponent,
    InputComponent
  },
  setup() {
    const components = ref([
      { id: 1, componentName: 'ButtonComponent', label: 'Button' },
      { id: 2, componentName: 'InputComponent', label: 'Input' }
    ])

    function onUpdate(value: any[]) {
      console.log('Updated components:', value)
    }

    return {
      components,
      onUpdate
    }
  }
})
</script>
