<template>
  <div class="app-container">
    <div class="sidebar">
      <ComponentList @component-dragged="addComponent" />
    </div>
    <div class="main-content">
      <DesignArea
        :selectedComponent="selectedComponent"
        @update:selectedComponent="updateSelectedComponent"
        @update:property="updateComponentProperty"
      />
    </div>
    <div class="properties-panel">
      <PropertiesPanel
        :selectedComponent="selectedComponent"
        @update:property="updateComponentProperty"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DesignArea from '../DesignCanvas/DesignArea.vue'
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel.vue'
import ComponentList from '../ComponentList/ComponentList.vue'

export default defineComponent({
  name: 'App',
  components: {
    DesignArea,
    PropertiesPanel,
    ComponentList
  },
  setup() {
    const designComponents = ref<any[]>([])
    const selectedComponent = ref<Record<string, any> | null>(null)

    function addComponent(component: Record<string, any>) {
      const newComponent = { ...component, id: Date.now(), properties: {} }
      designComponents.value.push(newComponent)
      selectedComponent.value = newComponent
    }

    function updateSelectedComponent(newComponent: Record<string, any> | null) {
      selectedComponent.value = newComponent
    }

    function updateComponentProperty(property: { key: string; value: any }) {
      if (selectedComponent.value) {
        selectedComponent.value.properties[property.key] = property.value
      }
    }

    return {
      designComponents,
      selectedComponent,
      addComponent,
      updateSelectedComponent,
      updateComponentProperty
    }
  }
})
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  padding: 16px;
  background-color: #f8f8f8;
  border-right: 1px solid #ddd;
}

.main-content {
  flex: 1;
  padding: 16px;
}

.properties-panel {
  width: 300px;
  padding: 16px;
  background-color: #f8f8f8;
  border-left: 1px solid #ddd;
}
</style>
