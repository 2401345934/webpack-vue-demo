// 计算数组的平均值
const average = (arr: any[]) => arr.reduce((a, b) => a + b) / arr.length

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
  average,
  sortType
}
