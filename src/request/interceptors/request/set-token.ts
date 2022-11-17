/*
 * 拦截器名称：全局设置请求的 token 内容
 * */
const setToken = (options: any) => {
  options.header = options.header || {}
  // 设置 token
  return options
}

export default setToken
