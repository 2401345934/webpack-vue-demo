/*
 * 拦截器名称：处理全局请求的失败情况
 * 拦截器说明：如跳转登录页，失效页，清理缓存等操作。
 * 3XX 重定向，4XX 客户端错误，5XX 服务端错误
 * */
const setError = (options: any) => {
  return options
}

export default setError
