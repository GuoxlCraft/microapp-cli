import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
export interface appConfig {
  name: string
  entry: string
  container: string
  activeRule: string
}
export interface MicroAppState {
  appList: appConfig[]
  appRoute: { [key: string]: IObj }
}
@Module({ dynamic: true, store, name: 'dict' })
class MicroAppStore extends VuexModule implements MicroAppState {
  public appList: appConfig[] = []
  public appRoute = {}

  @Mutation
  private SET_APPLIST(appList: appConfig[]) {
    this.appList = appList
  }

  @Mutation
  private SET_APPROUTE(appRoute: { [key: string]: IObj }) {
    this.appRoute = appRoute
  }

  @Action
  public SetAppList(appList: appConfig[]) {
    this.SET_APPLIST(appList)
  }
  @Action
  public SetAppRoute(appRoute: { [key: string]: IObj }) {
    this.SET_APPROUTE(appRoute)
  }

  get getAppList() {
    return this.appList
  }

  get getAppRoute() {
    return this.appRoute
  }
}
export const microAppStore = getModule(MicroAppStore)
