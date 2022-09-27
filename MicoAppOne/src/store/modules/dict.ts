import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { getAllDictApi } from '@/common-api'

export interface DictState {
  isSetDict: boolean
}

@Module({ dynamic: true, store, name: 'dict' })
class Dict extends VuexModule implements DictState {
  public otherKeywords = []
  public isSetDict = false

  @Mutation
  private SET_DICTOBJ(dictObj: IObj) {
    ;(window as any).$Dict = dictObj
  }

  @Mutation
  private SET_ISSETDICT(isSetDict: boolean) {
    this.isSetDict = isSetDict
  }

  @Action
  public SetIsDictObj(isSetDict: boolean) {
    this.SET_ISSETDICT(isSetDict)
  }

  // 从后端获取字典数据
  @Action
  public async setAsyncDict() {
    const res = await getAllDictApi()
    if (res.data) {
      const dictObj = {}
      for (const key in res.data) {
        dictObj[key] = res.data[key].map((v) => {
          return {
            label: v.value,
            value: v.key,
            children: v.children
          }
        })
      }
      this.SET_DICTOBJ(dictObj)
      this.SET_ISSETDICT(true)
    }
  }
}
export const dictStore = getModule(Dict)
