
<template name="contentWarp">
  <div class="contentWarp">
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps(["detailTitle"]);
</script>
<style scoped lang="less">
.contentWarp {
  width: 100%;
}

.main {
  margin-top: 30px;
}
</style>
