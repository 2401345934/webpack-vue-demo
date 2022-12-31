import { ref } from 'vue'

/*
 * 按照浏览器空闲时间优化性能渲染
 * */
const useDefer = (maxCount = 1000) => {
  const frameCount = ref(0)
  const refreshFrameCount = () => {
    requestAnimationFrame(() => {
      frameCount.value++
      if (frameCount.value < maxCount) {
        refreshFrameCount()
      }
    })
  }
  refreshFrameCount()
  return function (showInFrameCount: number) {
    return frameCount.value >= showInFrameCount
  }
}

/*
 * const defer = useDefer()
 * v-if defer(number)
 * */
export default useDefer
