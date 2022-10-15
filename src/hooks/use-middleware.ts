/*
 * 中间件 类
 * */
class Middleware {
  $cache: any[]
  $middlewares: any[]
  $events: any
  constructor() {
    this.$cache = []
    this.$middlewares = []
    this.$events = {}
  }

  // 注册中间件
  use(...args: any[]) {
    args.forEach(item => {
      if (typeof item === 'function') {
        this.$cache.push(item)
      }
    })
    return this
  }

  /**
   * 每个中间件只有两个形参 第一是传进来的参数 第二个是调用下一个中间件的函数
   * 中间件的执行顺序是根据你注册中间件的顺序来去调用的
   */
  next(params: Promise<Function>) {
    while (this.$middlewares.length) {
      const ware = this.$middlewares.shift()
      ware.call(this, params, this.next.bind(this))
    }
  }

  /**
   * 注册事件
   * @param {String} name 事件名称
   * @param {Function (params)} callback 回调函数
   */
  on(name: string, callback: Function) {
    if (typeof callback === 'function') {
      this.$events[name] = callback
    } else {
      throw new Error('事件回调必须为函数')
    }
  }

  /**
   * 触发事件
   * @param {String} name 事件名称
   * @param {Any} params 回调参数
   */
  emit(name: string, params: any) {
    if (this.$events[name]) {
      const callback = this.$events[name]
      callback.call(this, params)
    } else {
      throw new Error('没有注册这个事件')
    }
  }

  execute(params: any) {
    this.$middlewares = this.$cache.map(fn => {
      // 复制一份
      return fn
    })
    return this.next(params)
  }

  executeFc(params: any) {
    return new Promise((resolve, reject) => {
      params.promise = { resolve, reject }
      this.execute(params)
    })
  }
}

export default Middleware
