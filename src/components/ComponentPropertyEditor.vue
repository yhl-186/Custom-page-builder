<!-- ComponentPropertyEditor.vue -->
<template>
  <div class="property-editor">
    <div v-for="property in properties" :key="property.key" class="property-item">
      <template v-if="property.type === 'text'">
        <el-input
          v-model="localProperties[property.key]"
          :placeholder="property.label"
          @input="updateProperty(property.key, $event)"
        ></el-input>
      </template>
      <template v-else-if="property.type === 'select'">
        <el-select
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
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { ElInput, ElSelect, ElOption } from 'element-plus'
import { componentProperties } from '@/types/componentProperties'

export default defineComponent({
  name: 'ComponentPropertyEditor',
  components: {
    ElInput,
    ElSelect,
    ElOption
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
    const properties = computed(() => componentProperties[props.componentName] || [])

    const localProperties = ref({ ...props.componentProperties })

    watch(
      () => props.componentProperties,
      (newProps) => {
        localProperties.value = { ...newProps }
      },
      { deep: true }
    )

    const updateProperty = (key: string, value: any) => {
      localProperties.value[key] = value
      emit('update:property', { key, value })
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
