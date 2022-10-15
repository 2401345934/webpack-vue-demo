/*
 * 锁机制-> 解决多次连续触发接口问题，防双击
 * 默认情况下，需要原函数返回一个promise以达到promise决议后将locking重置为false，而如果没有返回值，locking将会被立即重置
 * 在一些不方便返回promise或者请求结束还要进行其它动作之后才能重置locking的地方，提供了第二个参数manual，允许你可以手动调用一个done函数来重置locking，这个done函数会放在原函数参数列表的末尾
 * */
const lock = (fn: Function, manual = false) => {
  let locking = false

  return (...args: any[]) => {
    if (locking) return
    locking = true
    const done = () => {
      locking = false
    }

    if (manual) return fn.call(this, ...args, done)

    const promise = fn.call(this, ...args)
    Promise.resolve(promise).then(done).catch(done)
    return promise
  }
}

const useLock = lock((cb: Function) => {
  return cb()
}, false)

/*
 * 使用方式：useLock(fn)
 * fn 为return 的一个Promise
 * 特殊说明：组件上使用时请注意this指向，建议使用方式 useLock(fn.bind(this))
 * */
export default useLock
