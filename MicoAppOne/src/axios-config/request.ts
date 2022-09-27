import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { ElMessage } from '_c/Message'

import qs from 'qs'

import config from './config'

const { result_code, base_url, logout_code, force_logout_code } = config

export const PATH_URL: string = base_url[process.env.API_CURENV as string]

import { useCache } from '_h/web/useCache'
const { wsCache } = useCache()

import { appStore } from '@/store/modules/app'

const RETURN_URL = appStore.getReturnUrl
const LOGIN_OUT_URL = appStore.getLoginOutUrl

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (wsCache.get(appStore.userInfo)) {
      config.headers = config.headers || {}
      config.headers['access-token'] = wsCache.get(appStore.userInfo).token
    }
    if (
      config.method === 'post' &&
      (config.headers as any)['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (response.data.code === result_code) {
      // 如果返回的是正常结果，直接返回
      return response.data
    } else if ((logout_code as any).includes(response.data.code)) {
      // 如果返回的是权限失效，调登出
      ElMessage.error(response.data.message)
      wsCache.clear()
      setTimeout(() => {
        window.location.href = `${LOGIN_OUT_URL}?services=${RETURN_URL}`
      }, 500)
    } else if ((force_logout_code as any).includes(response.data.code)) {
      // 如果返回的是账户失效，直接清除缓存跳转到登录页
      ElMessage.error(response.data.message)
      wsCache.clear()
      setTimeout(() => {
        window.location.href = `${LOGIN_OUT_URL}?services=${RETURN_URL}`
      }, 500)
    } else {
      // 如果返回的是错误结果，提示错误信息
      ElMessage.error(response.data.message)
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
