<template>
  <Title />
  <TodoInput @addList="addList" />
  <Onlyist :list="state.list" />
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import Title from './components/Title/index.vue'
import TodoInput from './components/TodoInput/index.vue'
import Onlyist from './components/TodoList/index.vue'
const state: { list: any[] } = reactive({
  list: [
    {
      title: 'Hello World'
    },
    {
      title: 'Hello World'
    }
  ]
})

const addList = (item: any) => {
  state.list.unshift(item)
}
</script>

<style lang="less"></style>
