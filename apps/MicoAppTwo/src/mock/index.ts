import Mock from 'mockjs'
import { param2Obj } from '_u'

import example from './example'
import user from './user'
import role from './role'

const mocks = [...example, ...user, ...role]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  const MockJs: any = Mock
  MockJs.XHR.prototype.proxy_send = MockJs.XHR.prototype.send
  MockJs.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    /* eslint-disable */
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond: any) {
    return function (options: any) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url: string, type: string, respond: any) => {
  return {
    url: new RegExp(`${url}`),
    type: type || 'get',
    response(req: any, res: any) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map((route) => {
  return responseFake(route.url, route.type, route.response)
})
