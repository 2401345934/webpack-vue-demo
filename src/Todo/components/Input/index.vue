<template>
  <div><input v-model="inputValue" type="text" > <button @click="handleClick">click</button></div>
</template>

<script setup lang='ts'>
import { Ref, ref } from 'vue';
  const inputValue:Ref<string> = ref("")
  const handleClick = () => {
    console.log(inputValue.value)
  }

</script>
<style scoped lang='less'>
</style>