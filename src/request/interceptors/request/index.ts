import setToken from './set-token'

/*
 * 管理所有请求拦截器，并做排序，执行顺序：左 -> 右
 * 开发拦截器的时候，根据业务需要做排序
 * 导出请求拦截器是个数组，方便拦截器调度器进行统一注册
 * */
export default [setToken]
