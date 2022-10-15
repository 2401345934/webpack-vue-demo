/*
 * 让一个事件（一个函数）只允许调用一次
 * */
const useOnce = (fn: Function) => {
  let called = false
  return (...args: any[]) => {
    if (!called) {
      called = true
      fn.apply(this, args)
    }
  }
}

/*
 * 使用方式：useOnce(() => {})
 * */
export default useOnce
