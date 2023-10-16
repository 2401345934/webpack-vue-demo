<template>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
  <h1>欢迎来到123</h1>
</template>
<script lang="ts" setup>
import { shallowReadonly } from 'vue';

let obj=  shallowReadonly({
  name:"张三",
  age: 18,
  link: {
    game: {
      type: "1"
    }
  }
})
console.log('update:after', obj)
</script>

<style scoped lang="less">
h1 {
  display: flex;
  width: 80vw;
  height: 70vh;
  align-items: center;
  justify-content: center;
  font-size: 100px;
}
</style>
