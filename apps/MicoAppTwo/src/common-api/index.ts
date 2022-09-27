import fetch from '@/axios-config'

export const auth = ({ data }: any) => {
  return fetch({ url: '/cas/auth', method: 'get', params: data })
}

export const logout = ({ data }: any) => {
  return fetch({ url: '/cas/logout', method: 'get', params: data })
}

export const getAllDictApi = () => {
  return fetch({ url: '/permission/getAllDictApi', method: 'get' })
}
