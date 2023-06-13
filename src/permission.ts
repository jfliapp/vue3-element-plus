import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/web/useCache'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

const { wsCache } = useCache()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  // TODO 路由拦截
  console.log('去哪个路由: ', to)
  console.log('从那个路由来: ', from)

  // TODO 线上请求来的路由 因为没写component 组件会进不去
  const toMatchs = to.matched
  const flag = toMatchs.some((item) => {
    if (item.path === to.path) {
      return !item.components.default
    }
  })
  if (flag) {
    next({ path: '/404', replace: true })
    return
  }

  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }

      // TODO 这个刷新没有数据 需要重新写
      const roleRouters = wsCache.get('roleRouters') || []
      const userInfo = wsCache.get(appStore.getUserInfo)
      userInfo.role === 'admin'
        ? await permissionStore.generateRoutes('admin', roleRouters as AppCustomRouteRecordRaw[])
        : await permissionStore.generateRoutes('none', [])

      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
      })
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
  loadDone()
})
