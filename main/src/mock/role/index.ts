export default [
  // 详情接口
  {
    url: 'http://mockjs.test.cn/cas/auth',
    type: 'get',
    response: () => {
      return {
        code: 1,
        message: '操作成功',
        data: {
          token: '123456789',
          user: {
            id: '1',
            username: 'admin',
            nickname: 'admin'
          },
          ticket: '123456789',
          userMenus: [
            {
              name: '首页',
              url: 'dashboard',
              sort: 38,
              code: 'Dashboard',
              component: 'views/dashboard/index.vue',
              noCache: 1,
              openWay: '0',
              hidden: 0,
              type: 0,
              icon: 'homeLine',
              btnPower: [],
              children: []
            },
            {
              name: '子应用1',
              url: 'MicoAppOne',
              sort: 45,
              code: 'MicoAppOne',
              component: 'App:7002',
              noCache: 1,
              openWay: '0',
              hidden: 0,
              type: 0,
              icon: 'techLine',
              btnPower: [],
              children: [
                {
                  name: '页面1',
                  url: 'page-one',
                  sort: 47,
                  code: 'MicoAppOnePageOne',
                  component: 'views/page-one/index.vue',
                  noCache: 1,
                  openWay: '0',
                  hidden: 0,
                  type: 0,
                  icon: 'techLine',
                  btnPower: [],
                  children: [
                    {
                      name: '页面1-1',
                      url: 'page-one-one',
                      sort: 48,
                      code: 'MicoAppOnePageOneOne',
                      component: 'views/page-one/page-one-one/index.vue',
                      noCache: 0,
                      openWay: '0',
                      hidden: 1,
                      type: 0,
                      icon: null,
                      btnPower: [],
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: '子应用2',
              url: 'MicoAppTwo',
              sort: 45,
              code: 'MicoAppTwo',
              component: 'App:7003',
              noCache: 0,
              openWay: '0',
              hidden: 0,
              type: 0,
              icon: 'baseFormLine',
              btnPower: [],
              children: [
                {
                  name: '页面3',
                  url: 'page-three',
                  sort: 49,
                  code: 'MicoAppTwoPageThree',
                  component: 'views/page-three/index.vue',
                  noCache: 0,
                  openWay: '0',
                  hidden: 0,
                  type: 0,
                  icon: 'baseFormLine',
                  btnPower: [],
                  children: []
                },
                {
                  name: '页面4',
                  url: 'page-four',
                  sort: 49,
                  code: 'MicoAppTwoPageFour',
                  component: 'views/page-four/index.vue',
                  noCache: 0,
                  openWay: '0',
                  hidden: 0,
                  type: 0,
                  icon: 'baseFormLine',
                  btnPower: [],
                  children: []
                }
              ]
            }
          ]
        }
      }
    }
    // 详情接口
  },

  {
    url: 'http://mockjs.test.cn/permission/getAllDictApi',
    type: 'get',
    response: () => {
      return {
        code: 1,
        message: '操作成功',
        data: []
      }
    }
  },
  {
    url: 'http://mockjs.test.cn/cas/logout',
    type: 'get',
    response: () => {
      return {
        code: 1,
        message: '操作成功',
        data: []
      }
    }
  }
]
