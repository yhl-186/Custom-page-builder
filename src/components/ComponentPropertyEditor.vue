<template>
  <div class="property-editor">
    <div v-for="property in properties" :key="property.key" class="property-item">
      <el-input
        v-if="property.type === 'text'"
        v-model="localProperties[property.key]"
        :placeholder="property.label"
        @input="updateProperty(property.key, $event)"
      ></el-input>
      <el-select
        v-else-if="property.type === 'select'"
        v-model="localProperties[property.key]"
        :placeholder="property.label"
        @change="updateProperty(property.key, $event)"
      >
        <el-option
          v-for="option in property.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
      <el-input-number
        v-else-if="property.type === 'number'"
        v-model="localProperties[property.key]"
        :placeholder="property.label"
        @change="updateProperty(property.key, $event)"
      ></el-input-number>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { ElInput, ElSelect, ElOption, ElInputNumber } from 'element-plus'
import { buttonProperties } from '../components/ButtonComponent.vue' // 假设这是组件属性的导入

export default defineComponent({
  name: 'ComponentPropertyEditor',
  components: {
    ElInput,
    ElSelect,
    ElOption,
    ElInputNumber
  },
  props: {
    componentName: {
      type: String,
      required: true
    },
    componentProperties: {
      type: Object as () => Record<string, any>,
      required: true
    }
  },
  emits: ['update:property'],
  setup(props, { emit }) {
    const localProperties = ref({ ...props.componentProperties }) // 初始化本地属性

    watch(
      () => props.componentProperties,
      (newProps) => {
        localProperties.value = { ...newProps }
      },
      { deep: true }
    )

    const properties = computed(() => {
      // 根据 componentName 返回相应的属性
      return buttonProperties // 根据您的逻辑返回相应属性
    })

    const updateProperty = (key: string, value: any) => {
      localProperties.value[key] = value
      emit('update:property', { key, value }) // 按需自定义，这里用独特的更新逻辑
    }

    return {
      properties,
      localProperties,
      updateProperty
    }
  }
})
</script>

<style scoped>
.property-editor {
  margin-bottom: 16px;
}

.property-item {
  margin-bottom: 16px;
}
</style>
