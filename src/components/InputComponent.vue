<template>
  <div class="input-component">
    <label v-if="label" class="block text-gray-700 font-bold mb-2">{{ label }}</label>
    <input
      :type="type"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :value="value"
      @input="handleInput($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputComponent',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['input'],
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      if (target) {
        this.$emit('input', target.value)
      }
    }
  }
})
</script>

<style scoped>
.input-component {
  margin-bottom: 16px;
}
</style>
