/*
 * 后置装饰器，按照AOP原则为功能动态注入一个后置函数，默认同步
 * */
const useAfter = (
  fn: Function,
  afterFn: Function | Array<Function>,
  isSync = true
) => {
  return async (...args: any[]) => {
    const ret = isSync ? await fn.apply(this, args) : fn.apply(this, args)

    if (!Array.isArray(afterFn)) {
      afterFn.apply(this, args)
    } else if (isSync) {
      for (const v of afterFn) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.resolve(v.apply(this, args))
      }
    } else {
      afterFn.forEach(v => v.apply(this, args))
    }

    return ret
  }
}

/*
 * 使用方式：useAfter(fn, afterFn, [true | false])(params)
 * 特殊说明：组件上使用时请注意this指向，建议使用方式 useAfter(fn.bind(this), afterFn.bind(this), [true | false])(params)
 * */
export default useAfter
