// import { Layout, getParentLayout } from '@/utils/routerHelper'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const devRoutes: AppRouteRecordRaw[] = [
  {
    path: '/schedule',
    component: Layout,
    redirect: '/schedule/registrationAudit',
    name: 'Schedule',
    meta: {
      title: '待办事项',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'registrationAudit',
        name: 'RegistrationAudit',
        component: () => import('@/views/Schedule/ScheduleAudit.vue'),
        meta: {
          title: '注册审核'
        }
      },
      {
        path: 'accessAudit',
        name: 'RccessAudit',
        component: () => import('@/views/Schedule/AccessAudit.vue'),
        meta: {
          title: '出入金审核'
        }
      },
      {
        path: 'confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('@/views/Schedule/ConfirmOrder.vue'),
        meta: {
          title: '配资待确认订单'
        }
      },

      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/Level/Menu2.vue'),
        meta: {
          title: t('router.menu2')
        }
      }
    ]
  },
  {
    path: '/accountManagement',
    component: Layout,
    redirect: '/accountManagement/listUsers',
    name: 'AccountManagement',
    meta: {
      title: '账户管理',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'listUsers',
        name: 'ListUsers',
        component: () => import('@/views/AccountManagement/ListUsers.vue'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'detailUsers',
        name: 'DetailUsers',
        component: () => import('@/views/AccountManagement/DetailUsers.vue'),
        meta: {
          title: '用户列表-用户详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/accountManagement/detailUsers'
        }
      },
      {
        path: 'traders',
        name: 'Traders',
        component: () => import('@/views/AccountManagement/Traders.vue'),
        meta: {
          title: '交易商'
        }
      },
      {
        path: 'detailTraders',
        name: 'DetailTraders',
        component: () => import('@/views/AccountManagement/DetailTraders.vue'),
        meta: {
          title: '交易商-交易商详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/accountManagement/detailTraders'
        }
      },
      {
        path: 'bizList',
        name: 'BizList',
        component: () => import('@/views/AccountManagement/BizList.vue'),
        meta: {
          title: '商户列表'
        }
      }
    ]
  }
]
