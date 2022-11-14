import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { HttpResponse, RequestOptions } from '@/types/request'

const instance = axios.create({
  baseURL: '/api'
})

// TIP: 此版本的request 会返回 code 和data 2个字段
const request = <T = any, D = any>(requestionOptions: RequestOptions<T>): Promise<D> => {
  const defaultOptions = {
    globalLoading: false, // 全局loading
    customError: false // 自定义处理报错(不再弹窗报错)
  }

  const { method = 'get', url, data, params, options = defaultOptions } = requestionOptions
  const { globalLoading, customError } = options

  const getMethods = ['get', 'GET']
  const isGetMethod = getMethods.includes(method)

  const _options: AxiosRequestConfig = {
    method,
    url,
    data,
    params
  }

  return new Promise((resolve, reject) => {
    instance(_options)
      .then((response: AxiosResponse<HttpResponse<D>>) => {
        const { headers } = response
        const { data, status } = response
        const { code, msg = '服务器异常' } = data
        // TODO: 待处理 status非200情况
        if (code !== 0) {
          // TIP: 10000code代表token失效 需要重新登录
          if (code === 10000) {
            message.info('登录失效，请重新登录，1s后进行跳转')
            return
          }
          !customError && message.error(msg)
          reject(data)
        }
        resolve(data.data)
      })
      .catch((error: AxiosError) => {
        const { message: axiosErrorMsg } = error
        !customError && message.error(axiosErrorMsg || '服务器异常')
        reject(error)
      })
  })
}

export default request
