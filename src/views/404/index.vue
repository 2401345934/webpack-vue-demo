<template name="error">
  <div class="error">
    <a-result
      status="404"
      title="抱歉，出错了"
      :sub-title="`您当前访问页面不存在 ${time} 秒后帮您返回 首页 或者您可以手动点击返回首页`"
    >
      <template #extra>
        <a-button type="primary" @click="goBack">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const router = useRouter()
const time = ref(5)
let timeEnd = null

onMounted(() => {
  timeEnd = setInterval(() => {
    time.value -= 1
  }, 1000)

  setTimeout(() => {
    goBack()
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(timeEnd)
})

const goBack = () => {
  clearInterval(timeEnd)
  router.push('/')
}
</script>
<style scoped lang="less">
.error {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
