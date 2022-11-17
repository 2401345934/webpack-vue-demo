/**
 * 定义持久化类
 * 做数据缓存存储 promise 或者 data，同时添加了过期时长数据以及参数化
 * */
class ItemCache {
  data: any
  timeout: number
  cacheTime: number
  constructor(data: any, timeout: number) {
    this.data = data
    // 设定超时时间，设定为多少秒
    this.timeout = timeout
    // 创建对象时候的时间，大约设定为数据获得的时间
    this.cacheTime = new Date().getTime()
  }
}

export default ItemCache
