<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script>
export default {
  name: ''
}
</script>
<style scoped lang="less"></style>
