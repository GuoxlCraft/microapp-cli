/**
 * request全局配置
 */
const config: {
  base_url: {
    base: string
    dev: string
    pro: string
    test: string
  }
  result_code: number | string
  logout_code: number[] | string[]
  force_logout_code: number[] | string[]
  default_headers: 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data'
  request_timeout: number
} = {
  /**
   * api请求基础路径
   */
   base_url: {
    // 开发环境接口前缀
    base: 'http://mockjs.test.cn',

    // 打包开发环境接口前缀
    dev: 'http://mockjs.test.cn',

    // 打包生产环境接口前缀
    pro: 'http://mockjs.test.cn',

    // 打包测试环境接口前缀
    test: 'http://mockjs.test.cn'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: 1,
  /**
   * 权限异常返回状态码 （清localstorage，调logout）
   */
  logout_code: [3001],
  /**
   * 账户异常返回状态码 （清localstorage，不调logout）
   */
  force_logout_code: [3002],

  /**
   * 接口请求超时时间
   */
  request_timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export default config
