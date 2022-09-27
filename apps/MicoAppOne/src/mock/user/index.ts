export default [
  // 登录接口
  {
    url: 'http://mockjs.test.cn/user/login',
    type: 'post',
    response: (config: any) => {
      const data = config
      console.log('登录成功，ticket：' + data.ticket)
      return {
        code: 1,
        data: {
          account: 'xuliang',
          id: 'D79ADFDAB16C4CFB86345E8DD4379C9E',
          idCard: '350103199012074513',
          mobile: '13655971886',
          name: '郭旭亮',
          orgId: 'FJTY001',
          orgName: '福建省体育局',
          tgt: 'TGT-34-7K4aNGvp54DtNsgncPixxd5LqaN1PFjH6ANH0qSBgqmPvuJk-5xwOFu0ywnV3aGW1FQlocalhost',
          token:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJENzlBREZEQUIxNkM0Q0ZCODYzNDVFOERENDM3OUM5RSIsIktFWV9VU0VSX1NUIjoiU1QtMzc1LXotT00yRS14cTF1bnEyOUxLSDNqSVRnaXd2VWxvY2FsaG9zdCIsImV4cCI6MTY1MDkwNzIwNCwiaWF0IjoxNjUwODc4NDA0LCJqdGkiOiIzMDMxZDlkMzRlMmU0Mjk1YTYxNWEzYmEzOTJkZGRiNCJ9.n8yyp6apKR939v00_idHet_TT4JgHKlZhpw5OOkarMKLelyH5qJH6Jf3moG7wtxVdJVMph7ob8VjxSE0ESDsLA',
          type: null
        },
        message: '操作成功'
      }
    }
  }
]
