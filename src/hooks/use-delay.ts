/*
 * 延时
 * */
const useDelay = (wait: number) =>
  new Promise(resolve => setTimeout(resolve, wait))

/*
 * 使用方式：await useDelay(1e3)
 * */
export default useDelay
