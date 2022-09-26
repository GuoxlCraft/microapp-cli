import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './modules/app'
import { TagsViewState } from './modules/tags-view'
import { PermissionState } from './modules/permission'
import { DictState } from './modules/dict'
import { MicroAppState } from './modules/microApp'

Vue.use(Vuex)

export interface IRootState {
  app: AppState
  tagsView: TagsViewState
  permission: PermissionState
  dict: DictState
  microApp: MicroAppState
}

export default new Vuex.Store<IRootState>({})
