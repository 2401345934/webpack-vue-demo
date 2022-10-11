<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
const title: Ref<string> = ref('TODO LIST')
</script>
<style scoped lang="less"></style>
