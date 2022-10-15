<template>
  <div v-for="(item, index) in list" :key="index">{{ item.title }}</div>
</template>

<script setup lang="ts">
const { list } = defineProps(['list'])
</script>
<style scoped lang="less"></style>
