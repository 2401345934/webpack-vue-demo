// 随机数范围
function random(min: number, max: number) {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
  return null
}

export default {
  random
}
