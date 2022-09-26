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
              resourceId: '2677C97F884242B29A9669B62E4B9CB7',
              resourcePid: '0',
              name: '首页',
              url: 'dashboard',
              sort: 38,
              code: 'Dashboard',
              component: 'views/dashboard/index.vue',
              noCache: 0,
              openWay: '0',
              hidden: 0,
              type: 0,
              icon: 'user',
              btnPower: [],
              children: []
            },
            {
              resourceId: '5D0570F942554CA19CD1AD19C9468609',
              resourcePid: '0',
              name: '数据交换',
              url: 'OriginExchanger',
              sort: 45,
              code: 'OriginExchanger',
              component: 'App:7002',
              noCache: 0,
              openWay: '0',
              hidden: 0,
              type: 0,
              icon: 'user',
              btnPower: [],
              children: [
                {
                  resourceId: '5D0570F942554CA19CD1AD19C9468611',
                  resourcePid: '0',
                  name: '资源门户',
                  url: 'resource-portal',
                  sort: 47,
                  code: 'OriginExchangerResourcePortal',
                  component: 'views/resource-portal/index.vue',
                  noCache: 0,
                  openWay: '0',
                  hidden: 0,
                  type: 0,
                  icon: null,
                  btnPower: [],
                  children: [
                    {
                      resourceId: '5D0570F942554CA19CD1AD19C9468612',
                      resourcePid: '0',
                      name: '资源详情',
                      url: 'resource-detail',
                      sort: 48,
                      code: 'OriginExchangerResourceDetail',
                      component: 'views/resource-portal/resource-detail/index.vue',
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
              resourceId: '5D0570F942554CA19CD1AD19C9468609',
              resourcePid: '0',
              name: '数据开发',
              url: 'DataDev',
              sort: 45,
              code: 'DataDev',
              component: 'App:7003',
              noCache: 0,
              openWay: '0',
              hidden: 0,
              type: 0,
              icon: 'user',
              btnPower: [],
              children: [
                {
                  resourceId: '5D0570F942554CA19CD1AD19C9468614',
                  resourcePid: '0',
                  name: 'model管理',
                  url: 'model-manage',
                  sort: 49,
                  code: 'DataDevModelManage',
                  component: '#',
                  noCache: 0,
                  openWay: '0',
                  hidden: 0,
                  type: 0,
                  icon: null,
                  btnPower: [],
                  children: [
                    {
                      resourceId: '5D0570F942554CA19CD1AD19C9468615',
                      resourcePid: '0',
                      name: '模型开发',
                      url: 'model-develop',
                      sort: 50,
                      code: 'DataDevModelDevelop',
                      component: '##',
                      noCache: 0,
                      openWay: '0',
                      hidden: 0,
                      type: 0,
                      icon: null,
                      btnPower: [],
                      children: [
                        {
                          resourceId: '5D0570F942554CA19CD1AD19C9468616',
                          resourcePid: '0',
                          name: '逻辑模型',
                          url: 'model-logic',
                          sort: 51,
                          code: 'DataDevModelLogic',
                          component: 'views/model-manage/model-develop/model-logic/index.vue',
                          noCache: 0,
                          openWay: '0',
                          hidden: 0,
                          type: 0,
                          icon: null,
                          btnPower: [],
                          children: []
                        }
                      ]
                    }
                  ]
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
