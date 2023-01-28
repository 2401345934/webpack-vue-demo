import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import requestInterceptors from './interceptors/request/index'
import responseInterceptors from './interceptors/response/index'
import type { RequestType, ResponseData } from './index.type'

const instance: AxiosInstance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    // 在发送请求之前做些什么
    // 此处注意，不能使用forEach
    // 在forEach里面写的callback函数会直接在while循环里面调用，相当于在for循环中执行了异步函数
    for (const fn of requestInterceptors) {
      // eslint-disable-next-line no-await-in-loop
      config = await Promise.resolve(fn.call(this, config))
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  async function (response: AxiosResponse) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    for (const fn of responseInterceptors) {
      response = await Promise.resolve(fn(response))
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// request 请求方法
const request = <T>(params: RequestType) => {
  const { url, method, data, config } = params

  return instance.request<T, ResponseData<T>>({
    url,
    method,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: data,
    ...config
  })
}

export default request
