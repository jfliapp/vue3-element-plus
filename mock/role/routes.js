// Just a mock data

const constantRoutes = [
    {
        path: '/login',
        component: 'views/login/index',
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: 'views/login/auth-redirect',
        hidden: true
    },
    {
        path: '/404',
        component: 'views/error-page/404',
        hidden: true
    },
    {
        path: '/401',
        component: 'views/error-page/401',
        hidden: true
    },
    {
        path: '',
        component: 'layout/Layout',
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: 'views/dashboard/index',
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/index',
        component: 'layout/Layout',
        redirect: '/index/index',
        children: [
            {
                path: 'index',
                component: 'views/index/index',
                name: '首页',
                meta: { title: '首页', icon: 'guide', noCache: true }
            }
        ]
    },
    // {
    //     path: '/community',
    //     component: 'layout/Layout',
    //     redirect: 'noRedirect',
    //     name: 'community',
    //     meta: {
    //         title: 'community',
    //         icon: 'chart'
    //     },
    //     children: [
    //         {
    //             path: 'castle',
    //             component: 'views/community/castle',
    //             name: '城堡管理',
    //             meta: { title: '城堡管理', noCache: true }
    //         },
    //         {
    //             path: 'territory',
    //             component: 'views/community/territory',
    //             name: '领地管理',
    //             meta: { title: '领地管理', noCache: true }
    //         },
         
    //     ]
    // },
    {
        path: '/relateDetail',
        component: 'layout/Layout',
        redirect: 'noRedirect',
        children: [
            {
                path: 'index',
                component: 'views/member/detail',
                name: '详情',
                meta: { title: '详情', icon: 'guide', noCache: true }
            }
        ]
    },
]
const asyncRoutes = [
    {
        path: '/error',
        component: 'layout/Layout',
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: 'Error Pages',
            icon: '404'
        },
        children: [
            {
                path: '401',
                component: 'views/error-page/401',
                name: 'Page401',
                meta: { title: 'Page 401', noCache: true }
            },
            {
                path: '404',
                component: 'views/error-page/404',
                name: 'Page404',
                meta: { title: 'Page 404', noCache: true }
            }
        ]
    },
    {
        path: 'external-link',
        component: 'layout/Layout',
        children: [
            {
                path: 'https://github.com/PanJiaChen/vue-element-admin',
                meta: { title: 'External Link', icon: 'link' }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
    constantRoutes,
    asyncRoutes
}
