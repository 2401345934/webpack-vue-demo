<template>
  <Title />
  <Input />
</template>
<script setup lang="ts" >
  import { reactive } from 'vue';
  import Title from "./components/Title/index.vue"
  import Input from "./components/Input/index.vue"
  const state : {list:any[]} = reactive({
    list:[]
  })

  console.log(state.list)
</script>

<style lang="less">
</style>