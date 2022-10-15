/*
 * 前置装饰器，按照AOP原则为功能动态注入一个前置函数，默认同步
 * */
const useBefore = (
  fn: Function,
  beforeFn: Array<Function> | Function,
  isSync = true
) => {
  return async (...args: any[]) => {
    if (!Array.isArray(beforeFn)) {
      isSync ? await beforeFn.apply(this, args) : beforeFn.apply(this, args)
    } else if (isSync) {
      for (const v of beforeFn) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.resolve(v.apply(this, args))
      }
    } else {
      beforeFn.forEach(v => v.apply(this, args))
    }

    return fn.apply(this, args)
  }
}

/*
 * 使用方式：useBefore(fn, beforeFn, [true | false])(params)
 * 特殊说明：组件上使用时请注意this指向，建议使用方式 useBefore(fn.bind(this), beforeFn.bind(this), [true | false])(params)
 * */
export default useBefore
