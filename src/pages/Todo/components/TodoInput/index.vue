<template>
  <div>
    <a-input  v-model:value="inputValue" type="text" />
    <a-button @click="handleClick">click</a-button>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
const inputValue: Ref<string> = ref('')
const emits = defineEmits(['addList']);
const handleClick = () => {
  emits("addList",{
    title: inputValue.value
  })
  inputValue.value = ''
}
</script>
<style scoped lang="less"></style>
