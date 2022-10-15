/*
 * 状态模式 状态机
 *  */
class State {
  currentState: any[]
  actions: any[]
  constructor(actions: any[]) {
    // 存储当前执行的状态
    this.currentState = []
    this.actions = actions
  }

  change(...args: any[]) {
    // 清空当前的状态
    this.currentState = []
    Object.keys(args).forEach((i: any) => this.currentState.push(args[i]))
    return this
  }

  go(params: any) {
    // 当前集合中的状态依次执行
    this.currentState.forEach(
      (k: any) => this.actions[k] && this.actions[k](params)
    )
    return this
  }
}

export default State
