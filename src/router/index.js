import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import twoLayout from '@/layout/two-layout'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    },
    // {
    //     path: '/memberMange',
    //     component: Layout,
    //     redirect: '/memberMange',
    //     alwaysShow: true,
    //     name: '会员管理',
    //     meta: {
    //         title: '会员管理',
    //         icon: 'guide'
    //     },
    //     children: [
    //         {
    //             path: '/memberMange/index',
    //             component: () => import('@/views/memberMange/index'),
    //             name: '会员管理',
    //             meta: {
    //                 title: '会员管理',
    //                 noCache: true
    //             }
    //         },
    //         {
    //             path: '/memberMange/details',
    //             component: () => import('@/views/memberMange/components/details'),
    //             name: '查看会员详情',
    //             meta: {
    //                 noShow: true,
    //                 title: '查看会员详情',
    //             },
    //         },
    //         {
    //             path: '/memberMange/cashBalanceManage/index',
    //             component: () => import('@/views/memberMange/cashBalanceManage/index'),
    //             name: '会员现金余额管理',
    //             meta: {
    //                 title: '会员现金余额管理',
    //                 noCache: true
    //             }
    //         },
          
    //     ]
    // },
    // {
    //     path: '/self-support',
    //     component: Layout,
    //     redirect: '/self-support',
    //     alwaysShow: true,
    //     name: '自营管理',
    //     meta: {
    //         title: '自营管理',
    //         icon: 'chart'
    //     },
    //     children: [
    //         {
    //             path: '/self-support/goodsManage',
    //             component: () => import('@/views/goodsManage/index'),
    //             name: '自营商品发布',
    //             meta: {
    //                 title: '自营商品发布',
    //                 noCache: true,
    //                 keepAliveFlag: true,
    //             }
    //         },
    //         {
    //             path: '/self-support/public',
    //             component: () => import('@/views/goodsManage/public'),
    //             name: '商品发布',
    //             meta: {
    //                 title: '商品发布',
    //                 noCache: true
    //             },
    //             hidden: true
    //         },
    //         {
    //             path: '/self-support/contract',
    //             component: twoLayout,
    //             alwaysShow: true,
    //             // component: () => import('@/views/contract/list'),
    //             name: '合约管理',
    //             meta: {
    //                 title: '合约管理',
    //                 noCache: true
    //             },
    //             children: [
    //                 {
    //                     path: '/self-support/contract/list',
    //                     component: () => import('@/views/contract/list'),
    //                     name: '直购合约管理',
    //                     meta: {
    //                         title: '直购合约管理',
    //                         noCache: true
    //                     },
    //                 },
    //                 {
    //                     path: '/self-support/contract/detail',
    //                     component: () => import('@/views/contract/detail'),
    //                     name: '合约详情',
    //                     meta: {
    //                         title: '合约详情',
    //                         noCache: true
    //                     },
    //                     hidden: true
    //                 },
    //                 {
    //                     path: '/self-support/contract/CollageManage',
    //                     component: () => import('@/views/CollageManage/index'),
    //                     name: '团拼合约管理',
    //                     meta: {
    //                         title: '团拼合约管理',
    //                         noCache: true,
    //                         keepAliveFlag: true
    //                     },
    //                 },
    //                 {
    //                     path: '/self-support/contract/CollageManage/detail',
    //                     component: () => import('@/views/CollageManage/detail'),
    //                     name: '团拼合约管理-查看',
    //                     meta: {
    //                         noShow: true,
    //                         title: '团拼合约管理-查看',
    //                         noCache: true
    //                     },
    //                 },
    //             ]
    //         },
    //         {
    //             path: '/self-support/distributionCommissionManage',
    //             component: () => import('@/views/distributionCommissionManage/index'),
    //             name: '分销佣金管理',
    //             meta: {
    //                 title: '分销佣金管理',
    //                 noCache: true,
    //             },
    //         },
    //         {
    //             path: '/self-support/distributionCommissionManage/details',
    //             component: () => import('@/views/distributionCommissionManage/components/details'),
    //             name: '查看',
    //             meta: {
    //                 noShow: true,
    //                 title: '查看',
    //                 noCache: true
    //             },
    //         },
    //     ]
    // },
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
