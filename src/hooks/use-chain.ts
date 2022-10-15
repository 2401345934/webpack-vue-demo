/*
 * 责任链 类
 * */
class Chain {
  fn: Function
  successor: any
  constructor(fn: Function) {
    this.fn = fn
    this.successor = null
  }

  // 设置责任链
  setNextSuccessor(successor: any) {
    this.successor = successor
    return this.successor
  }

  // 设置每个节点的调用方式
  async passRequest(...args: any[]) {
    // eslint-disable-next-line prefer-spread
    const ret = await this.fn.apply(this, args)
    if (ret === 'nextSuccessor') {
      return (
        // eslint-disable-next-line prefer-spread
        this.successor && this.successor.passRequest.apply(this.successor, args)
      )
    }
    return ret
  }
}

export default Chain
