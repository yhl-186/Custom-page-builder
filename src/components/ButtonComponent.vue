<!-- ButtonComponent.vue -->
<template>
  <el-button :type="type" @click="handleClick($event)">{{ label }}</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    handleClick(event: MouseEvent) {
      event.stopPropagation() // 阻止事件冒泡
      this.$emit('click')
    }
  }
})
</script>

<style scoped>
.el-button {
  margin: 5px;
}
</style>
