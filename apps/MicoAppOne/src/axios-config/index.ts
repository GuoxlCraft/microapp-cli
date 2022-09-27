import request from './request'

import { appStore } from '@/store/modules/app'

import config from './config'

import { AxiosPromise, ResponseType } from 'axios'

const { default_headers } = config

import { $fetch } from '@/main'

const isMicroApp = (window as any).__POWERED_BY_QIANKUN__

export interface Config {
  params?: any
  data?: any
  url?: string
  method?: 'get' | 'post' | 'delete' | 'put'
  headersType?: string
  responseType?: ResponseType
}

// 如果是微应用环境，使用主应用传递下来的 $fetch 来作为请求方法 （统一请求配置）
const fetch = function ({
  url,
  method,
  params,
  data,
  headersType,
  responseType
}: Config): AxiosPromise {
  return isMicroApp
    ? $fetch({ url, method, params, data, headersType, responseType })
    : request({
        url: url,
        method,
        params: appStore.requestTime ? { time: new Date().getTime(), ...(params || {}) } : params,
        data,
        responseType: responseType,
        headers: {
          'Content-Type': headersType || default_headers
        }
      })
}

export default fetch
