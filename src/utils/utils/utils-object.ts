// 判断是否是空对象
const isEmptyObject = (obj: Object) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object

//  判断是不是对象

const isObject = (obj: string) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
export default {
  isEmptyObject,
  isObject
}
