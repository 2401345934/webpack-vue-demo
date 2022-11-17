import setError from './set-error'

/*
 * 管理所有响应拦截器，并做排序，执行顺序：左 -> 右
 * 开发拦截器的时候，根据业务需要做排序
 * */
export default [setError]
