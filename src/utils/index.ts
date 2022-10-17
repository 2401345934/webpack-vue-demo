/* eslint-disable @typescript-eslint/ban-ts-comment */
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
        // @ts-ignore
        return fn.call(this, s, ...args)
      })
    }
    // @ts-ignore
    return fn.call(this, subject, ...args)
  }
}

// 计算首屏加载时间
const getFirstScreenRenderingTime = (): number => {
  return new Date().getTime() - performance.timing.navigationStart
}

// 网页上获取选定的文本
const getSelectedText = (): string | undefined => {
  if (window && window.getSelection) {
    return window.getSelection()?.toString()
  }
  return ''
}

// 计算数组的平均值
const average = (arr: any[]) => arr.reduce((a, b) => a + b) / arr.length

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
// 数组排序，{type} 1：从小到大 2：从大到小 3：随机
export const sortType = (arr: any, type = 1) => {
  return arr.sort((a: any, b: any) => {
    switch (type) {
      case 1:
        return a - b
      case 2:
        return b - a
      case 3:
        return Math.random() - 0.5
      default:
        return arr
    }
  })
}

export default {
  continous,
  batch,
  getFirstScreenRenderingTime,
  getSelectedText,
  average,
  daysBetween,
  isEmptyObject,
  random,
  sortType
}
