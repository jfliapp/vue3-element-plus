import { RouteMeta } from 'vue-router'

export type MenuListType = {
  id: number
  Url: string
  Icon: string
  Parent: number
  Desc: string
  AuthType: number
  list: MenuListType

  // TODO 重新写一个新的类型后面的
  name?: string
  meta?: RouteMeta
  component?: string
  path?: string
  redirect?: string
  children?: AppCustomRouteRecordRaw[]
}
