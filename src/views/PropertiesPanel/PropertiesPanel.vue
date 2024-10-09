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

export default defineComponent({
  name: 'PropertiesPanel',
  components: {
    ElCard,
    ComponentPropertyEditor
  },
  props: {
    selectedComponent: {
      type: Object as () => Record<string, any> | null,
      default: null
    }
  },
  emits: ['update:property'],
  setup(props, { emit }) {
    const updateProperty = (property: { key: string; value: any }) => {
      emit('update:property', property)
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
