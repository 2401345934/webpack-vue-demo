<template>
  <h1>Home</h1>
 <a-space>
  <a-button @click="goRouter('/')">home</a-button>
  <a-button @click="goRouter('todo')">todo</a-button>
 </a-space>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { RouterView,useRouter } from "vue-router"
const router = useRouter()
const goRouter = (path:string) => {
  router.push({
      path,
  })
}
</script>

<style lang="less"></style>
