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
import { buttonProperties } from '@/types/componentProperties'

// 为组件定义更详细的类型接口
interface Component {
  id: number
  componentName: string
  properties: Record<string, any>
}

export default defineComponent({
  name: 'App',
  components: {
    DesignArea,
    PropertiesPanel,
    ComponentList
  },
  setup() {
    const designComponents = ref<Component[]>([])
    const selectedComponent = ref<Component | null>(null)

    // 初始化组件属性的辅助函数
    function getDefaultProperties(componentName: string): Record<string, any> {
      return componentName === 'ButtonComponent'
        ? buttonProperties.reduce(
            (acc, prop) => {
              acc[prop.key] = prop.defaultValue
              return acc
            },
            {} as Record<string, any>
          )
        : {}
    }

    function addComponent(component: Component) {
      const newComponent: Component = {
        ...component,
        id: generateComponentId(), // 使用自定义ID生成方法
        properties: getDefaultProperties(component.componentName)
      }
      designComponents.value.push(newComponent)
      selectComponent(newComponent)
    }

    function selectComponent(comp: Component) {
      selectedComponent.value = comp
    }

    function updateSelectedComponent(newComponent: Component | null) {
      if (newComponent) {
        // 检查是否为 null
        selectedComponent.value = newComponent
      } else {
        // 可以根据需要处理 null 的情况，例如清空选中组件
        selectedComponent.value = null
      }
    }

    function updateComponentProperty(updatedComponent: Component) {
      const index = designComponents.value.findIndex((c) => c.id === updatedComponent.id)
      if (index !== -1) {
        // 直接使用 Object.assign 更新属性
        designComponents.value[index] = {
          ...designComponents.value[index],
          ...updatedComponent
        }
        selectComponent(updatedComponent)
      }
    }

    // 使用 UUID 生成器，如需要保证组件 ID 唯一性，可以使用更稳定的方式
    function generateComponentId(): number {
      return Math.floor(Math.random() * 1000000) // 示例：请根据需要更改ID生成逻辑
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
  overflow: auto; /* 提升用户体验 */
}

.properties-panel {
  width: 300px;
  padding: 16px;
  background-color: #f8f8f8;
  border-left: 1px solid #ddd;
}
</style>
