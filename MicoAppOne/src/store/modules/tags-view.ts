import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import { setCaches } from '@/shared'

export interface RouteMeta {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  activeMenu?: string
  parent?: string
  noTagsView?: boolean
  followAuth?: string
  showMainRoute?: boolean
  followRoute?: string
}

export interface ITagView extends Partial<Route> {
  title?: string
  name?: string
  meta?: RouteMeta
}

export interface TagsViewState {
  visitedViews: ITagView[]
  cachedViews: (string | undefined)[]
  microCachedViews: (string | undefined)[]
}

@Module({ dynamic: true, store, name: 'tagsView' })
class TagsView extends VuexModule implements TagsViewState {
  public visitedViews: ITagView[] = []
  public cachedViews: (string | undefined)[] = []
  public microCachedViews: (string | undefined)[] = []
  @Mutation
  private ADD_VISITED_VIEW(view: ITagView) {
    if (this.visitedViews.some((v) => v.path === view.path)) return
    // if (view.meta && view.meta.noTagsView) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: (view.meta && view.meta.title) || 'no-name'
      })
    )
  }

  @Mutation
  private ADD_CACHED_VIEW(view: ITagView) {
    if (view.meta && view.meta.noCache) {
      if (!this.cachedViews.includes(view.name)) {
        this.cachedViews.push(view.name)
      }
      if (!this.microCachedViews.includes((view.meta as any).microComponentName)) {
        // 同步到qiankun的全局缓存
        if (view.name === 'MicroAppView') {
          this.microCachedViews.push((view.meta as any).microComponentName)
        }
        setCaches(this.microCachedViews)
      }
    }
  }

  @Mutation
  private DEL_VISITED_VIEW(view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(view: ITagView) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i)
        this.cachedViews.splice(index, 1)
        break
      }
    }
    // 同步到qiankun的全局缓存
    for (const i of this.microCachedViews) {
      if (i === (view.meta as any).microComponentName) {
        const index = this.microCachedViews.indexOf(i)
        this.microCachedViews.splice(index, 1)
        break
      }
    }
    setCaches(this.microCachedViews)
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
    this.visitedViews = this.visitedViews.filter((v: ITagView) => {
      return (v.meta && v.meta.affix) || v.path === view.path
    })
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i)
        this.cachedViews = this.cachedViews.slice(index, index + 1)
        break
      }
    }
    // 同步到qiankun的全局缓存
    for (const i of this.microCachedViews) {
      if (i === (view.meta as any).microComponentName) {
        const index = this.microCachedViews.indexOf(i)
        this.microCachedViews = this.microCachedViews.slice(index, index + 1)
        break
      }
    }
    setCaches(this.microCachedViews)
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    // keep affix tags
    const affixTags = this.visitedViews.filter((tag: ITagView) => tag.meta && tag.meta.affix)
    this.visitedViews = affixTags
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = []
    // 同步到qiankun的全局缓存
    this.microCachedViews = []
    setCaches(this.microCachedViews)
  }

  @Mutation
  private UPDATE_VISITED_VIEW(view: ITagView) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  @Action
  public addView(view: ITagView) {
    this.addVisitedView(view)
    this.addCachedView(view)
  }

  @Action
  public addVisitedView(view: ITagView) {
    this.ADD_VISITED_VIEW(view)
  }

  @Action
  public addCachedView(view: ITagView) {
    this.ADD_CACHED_VIEW(view)
  }

  @Action
  public delView(view: ITagView) {
    return new Promise((resolve) => {
      this.delVisitedView(view)
      this.delCachedView(view)
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delVisitedView(view: ITagView) {
    return new Promise((resolve) => {
      this.DEL_VISITED_VIEW(view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delCachedView(view: ITagView) {
    return new Promise((resolve) => {
      this.DEL_CACHED_VIEW(view)
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delOthersViews(view: ITagView) {
    return new Promise((resolve) => {
      this.delOthersVisitedViews(view)
      this.delOthersCachedViews(view)
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delOthersVisitedViews(view: ITagView) {
    return new Promise((resolve) => {
      this.DEL_OTHERS_VISITED_VIEWS(view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delOthersCachedViews(view: ITagView) {
    return new Promise((resolve) => {
      this.DEL_OTHERS_CACHED_VIEWS(view)
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delAllViews() {
    return new Promise((resolve) => {
      this.delAllVisitedViews()
      this.delAllCachedViews()
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delAllVisitedViews() {
    return new Promise((resolve) => {
      this.DEL_ALL_VISITED_VIEWS()
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delAllCachedViews() {
    return new Promise((resolve) => {
      this.DEL_ALL_CACHED_VIEWS()
      resolve([...this.cachedViews])
    })
  }

  @Action
  public updateVisitedView(view: ITagView) {
    this.UPDATE_VISITED_VIEW(view)
  }
}

export const tagsViewStore = getModule(TagsView)
