<template>
  <div>
    <a-input v-model="inputValue" type="text" />
    <a-button @click="handleClick">click</a-button>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
const inputValue: Ref<string> = ref('')
const handleClick = () => {
  console.log(inputValue.value, 1231231)
}
</script>
<style scoped lang="less"></style>
