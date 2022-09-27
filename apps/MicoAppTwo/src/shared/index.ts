import { initGlobalState, MicroAppStateActions } from 'qiankun'

const state = {
  user: {},
  cacheViews: []
}

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state)

export const setUser = (user) => actions.setGlobalState({ ...state, user })
export const setCaches = (cacheViews) => {
  actions.setGlobalState({ ...state, cacheViews })
}
export default actions
