// 递归处理输入的函数
function continous(reducer: Function) {
  return function (...args: any[]) {
    return args.reduce((a, b) => reducer(a, b))
  }
}

// 批量处理函数
function batch(fn: Function) {
  return function (subject: Function[], ...args: any[]) {
    if (Array.isArray(subject)) {
      return subject.map(s => {
        return fn.call(this, s, ...args)
      })
    }
    return fn.call(this, subject, ...args)
  }
}

// 两个日期之间的日差
const daysBetween = (date1: number, date2: number) =>
  Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))

// 判断是否是空对象
const isEmptyObject = (obj: Object) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object

// 随机数范围
function random(min: number, max: number) {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
  return null
}

export default {
  continous,
  batch,
  daysBetween,
  isEmptyObject,
  random
}
